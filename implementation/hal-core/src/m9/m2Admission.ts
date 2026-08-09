import { SafeMode } from "../kernel/safeMode.js";
import { createAuthorityDecision } from "../authority/decision.js";
import { evaluateLocalPolicy } from "../authority/localPolicy.js";
import { createLocalRequest } from "../request/model.js";
import type { CommandId, CorrelationId, ImmutableIdentifier, RequestId } from "../shared/types.js";
import { AuditService } from "../m2/auditService.js";
import { DecisionService } from "../m2/decisionService.js";
import { EvidenceService } from "../m2/evidenceService.js";
import { IntentManager } from "../m2/intentManager.js";
import { OutcomeService } from "../m2/outcomeService.js";
import { Planner } from "../m2/planner.js";
import { TransactionCoordinator } from "../m2/transactionCoordinator.js";
import { M2_PROVENANCE, M2_SCHEMA_VERSION } from "../m2/types.js";
import { sha256Hex } from "./canonical.js";
import { M9_HAL_CANON_PACK_ID } from "./halCanonSourceScope.js";
import type {
  M9OwnerConfirmationClaimCategory,
  M9OwnerDisposition,
  M9ReasonCode
} from "./types.js";

export type M9AdmissionContext = Readonly<{
  correlationId: CorrelationId;
  intentId: ImmutableIdentifier;
  planId: ImmutableIdentifier;
  decisionId: ImmutableIdentifier;
  transactionId: ImmutableIdentifier;
  decisionDisposition: "allow" | "approval_required" | "deny";
  resultReasonCode: M9ReasonCode;
}>;

export function runM2ForM9Activation(input: {
  operationRequestId: ImmutableIdentifier;
  operationFingerprintSha256: string;
  stateDirectory: string;
  ownerDisposition: M9OwnerDisposition;
  ownerConfirmationClaimCategory: M9OwnerConfirmationClaimCategory;
  reasonCode: string;
  packId: string;
  packVersion: string;
  manifestHashSha256: string;
}): M9AdmissionContext {
  const isHalCanonPack = input.packId === M9_HAL_CANON_PACK_ID;
  const dataClassification = isHalCanonPack
    ? ("owner_approved_repository_canon" as const)
    : ("synthetic_non_sensitive" as const);
  const provenance = isHalCanonPack
    ? ("local_owner_approved_repository_canon" as const)
    : M2_PROVENANCE;
  const declaredEffectClass = isHalCanonPack
    ? ("local_owner_approved_canon_inquiry" as const)
    : ("local_synthetic_inquiry" as const);
  const requestTimestampIso8601 = new Date().toISOString();
  const operationHash = sha256Hex(input.operationRequestId).slice(0, 32);
  const stableCorrelationId =
    `m9-${operationHash.slice(0, 8)}-${operationHash.slice(8, 12)}-${operationHash.slice(
      12,
      16
    )}-${operationHash.slice(16, 20)}-${operationHash.slice(20, 32)}` as CorrelationId;
  const commandIdFor = (step: string): CommandId =>
    `m9_${step}_${sha256Hex(`${input.operationRequestId}:${step}`).slice(0, 24)}` as CommandId;
  const request = createLocalRequest({
    requestId: input.operationRequestId as unknown as RequestId,
    correlationId: stableCorrelationId,
    declaredAction:
      input.ownerDisposition === "activate"
        ? "m9_owner_pack_activation_request"
        : "m9_owner_pack_deactivation_request",
    declaredTarget: "m9_controlled_local_knowledge_pack",
    declaredPurpose: `m9_operation_fingerprint_sha256=${input.operationFingerprintSha256}`,
    requestedAtIso8601: requestTimestampIso8601,
    dataClassification
  });
  const conflictContext = (): M9AdmissionContext =>
    Object.freeze({
      correlationId: request.correlationId,
      intentId: "unavailable" as ImmutableIdentifier,
      planId: "unavailable" as ImmutableIdentifier,
      decisionId: "unavailable" as ImmutableIdentifier,
      transactionId: "unavailable" as ImmutableIdentifier,
      decisionDisposition: "deny",
      resultReasonCode: "operation_request_conflict"
    });
  const policy = evaluateLocalPolicy(request, new SafeMode("restrictive"));
  const forcedDisposition: "allow" | "deny" =
    input.ownerConfirmationClaimCategory === "local_owner_confirmed" &&
    policy.disposition === "allow" &&
    /^[a-z0-9_]{3,64}$/.test(input.reasonCode)
      ? "allow"
      : "deny";
  const decision = createAuthorityDecision(forcedDisposition, policy.reason, request.correlationId);

  const auditService = new AuditService(input.stateDirectory);
  const intentManager = new IntentManager(auditService);
  const planner = new Planner(auditService);
  const decisionService = new DecisionService(auditService);
  const transactionCoordinator = new TransactionCoordinator(auditService);
  const evidenceService = new EvidenceService(auditService);
  const outcomeService = new OutcomeService(auditService);

  const intentResponse = intentManager.recordIntent({
    commandName: "RecordIntent",
    commandId: commandIdFor("record_intent"),
    correlationId: request.correlationId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance,
    dataClassification,
    payload: { request }
  });
  if (!intentResponse.intentRecord || !intentResponse.eventId) {
    if (intentResponse.reason.toLowerCase().includes("conflict")) {
      return conflictContext();
    }
    throw new Error(`RecordIntent failed closed: ${intentResponse.reason}`);
  }
  const planResponse = planner.proposePlan({
    commandName: "ProposePlan",
    commandId: commandIdFor("propose_plan"),
    correlationId: request.correlationId,
    causationEventId: intentResponse.eventId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance,
    dataClassification,
    payload: {
      intentId: intentResponse.intentRecord.intentId,
      boundedSteps: [
        "validate explicit owner-confirmation claim semantics",
        "validate approved local synthetic pack tuple",
        "apply activation/deactivation with no external effect"
      ],
      constraints: [
        "local-only",
        "synthetic-only",
        "deterministic",
        "non-live-effect",
        "no authentication inference"
      ],
      assumptions: ["owner-confirmation claim is local operator-provided and non-authenticating"],
      riskSummary: "No external effects admitted; fail closed when evidence unavailable."
    }
  });
  if (!planResponse.planRecord || !planResponse.eventId) {
    if (planResponse.reason.toLowerCase().includes("conflict")) {
      return conflictContext();
    }
    throw new Error(`ProposePlan failed closed: ${planResponse.reason}`);
  }
  const decisionResponse = decisionService.recordDecision({
    commandName: "RecordDecision",
    commandId: commandIdFor("record_decision"),
    correlationId: request.correlationId,
    causationEventId: planResponse.eventId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance,
    dataClassification,
    payload: {
      intentId: intentResponse.intentRecord.intentId,
      planId: planResponse.planRecord.planId,
      disposition: decision.disposition,
      reason: decision.reason,
      uncertainty:
        decision.disposition === "allow"
          ? "bounded_local_owner_claim_admitted"
          : "owner_claim_or_policy_not_admitted"
    }
  });
  if (!decisionResponse.decisionRecord || !decisionResponse.eventId) {
    if (decisionResponse.reason.toLowerCase().includes("conflict")) {
      return conflictContext();
    }
    throw new Error(`RecordDecision failed closed: ${decisionResponse.reason}`);
  }
  const transactionResponse = transactionCoordinator.openTransaction({
    commandName: "OpenTransaction",
    commandId: commandIdFor("open_transaction"),
    correlationId: request.correlationId,
    causationEventId: decisionResponse.eventId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance,
    dataClassification,
    payload: {
      intentId: intentResponse.intentRecord.intentId,
      planId: planResponse.planRecord.planId,
      decisionId: decisionResponse.decisionRecord.decisionId,
      declaredEffectClass,
      status:
        decisionResponse.decisionRecord.disposition === "allow"
          ? "completed_without_effect"
          : "blocked",
      claimedEffect: "none"
    }
  });
  if (!transactionResponse.transactionRecord || !transactionResponse.eventId) {
    if (transactionResponse.reason.toLowerCase().includes("conflict")) {
      return conflictContext();
    }
    throw new Error(`OpenTransaction failed closed: ${transactionResponse.reason}`);
  }
  const evidenceResponse = evidenceService.attachEvidence({
    commandName: "AttachEvidence",
    commandId: commandIdFor("attach_evidence"),
    correlationId: request.correlationId,
    causationEventId: transactionResponse.eventId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance,
    dataClassification,
    payload: {
      subjectKind: "transaction",
      subjectId: transactionResponse.transactionRecord.transactionId,
      claim: `m9 operationRequestId=${input.operationRequestId}; operationFingerprintSha256=${input.operationFingerprintSha256}; ownerDisposition=${input.ownerDisposition}; reasonCode=${input.reasonCode}; packId=${input.packId}; packVersion=${input.packVersion}; manifestHashSha256=${input.manifestHashSha256}; requestedAtIso8601=${requestTimestampIso8601}`,
      confidence: "high"
    }
  });
  if (!evidenceResponse.evidenceRecord || !evidenceResponse.eventId) {
    if (evidenceResponse.reason.toLowerCase().includes("conflict")) {
      return conflictContext();
    }
    throw new Error(`AttachEvidence failed closed: ${evidenceResponse.reason}`);
  }
  const outcomeResponse = outcomeService.finalizeOutcome({
    commandName: "FinalizeOutcome",
    commandId: commandIdFor("finalize_outcome"),
    correlationId: request.correlationId,
    causationEventId: evidenceResponse.eventId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance,
    dataClassification,
    payload: {
      intentId: intentResponse.intentRecord.intentId,
      transactionId: transactionResponse.transactionRecord.transactionId,
      decisionId: decisionResponse.decisionRecord.decisionId,
      status:
        decisionResponse.decisionRecord.disposition === "allow"
          ? "achieved_without_effect"
          : "not_achieved_no_effect",
      summary: `M9 ${input.ownerDisposition} admission disposition=${decisionResponse.decisionRecord.disposition}; no external effect admitted.`,
      claimedEffect: "none"
    }
  });
  if (!outcomeResponse.outcomeRecord) {
    if (outcomeResponse.reason.toLowerCase().includes("conflict")) {
      return conflictContext();
    }
    throw new Error(`FinalizeOutcome failed closed: ${outcomeResponse.reason}`);
  }

  return Object.freeze({
    correlationId: request.correlationId,
    intentId: intentResponse.intentRecord.intentId,
    planId: planResponse.planRecord.planId,
    decisionId: decisionResponse.decisionRecord.decisionId,
    transactionId: transactionResponse.transactionRecord.transactionId,
    decisionDisposition: decisionResponse.decisionRecord.disposition,
    resultReasonCode:
      decisionResponse.decisionRecord.disposition === "allow"
        ? input.ownerDisposition === "activate"
          ? "owner_local_activation"
          : "owner_local_deactivation"
        : ("m2_admission_blocked" as M9ReasonCode)
  });
}
