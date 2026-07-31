import { createAuthorityDecision } from "../authority/decision.js";
import { evaluateLocalPolicy, LOCAL_POLICY_ACTIONS } from "../authority/localPolicy.js";
import { SafeMode } from "../kernel/safeMode.js";
import { AuditService } from "../m2/auditService.js";
import { DecisionService } from "../m2/decisionService.js";
import { EvidenceService } from "../m2/evidenceService.js";
import { IntentManager } from "../m2/intentManager.js";
import { OutcomeService } from "../m2/outcomeService.js";
import { Planner } from "../m2/planner.js";
import { TransactionCoordinator } from "../m2/transactionCoordinator.js";
import { M2_PROVENANCE, M2_SCHEMA_VERSION } from "../m2/types.js";
import { createLocalRequest } from "../request/model.js";
import { createCommandId, createCorrelationId, createRequestId } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";

export type M6AdmissionMode = "allow" | "approval_required" | "deny";

export type M6M2Context = Readonly<{
  correlationId: CorrelationId;
  intentId: ImmutableIdentifier;
  planId: ImmutableIdentifier;
  decisionId: ImmutableIdentifier;
  transactionId: ImmutableIdentifier;
  decisionDisposition: "allow" | "approval_required" | "deny";
  transactionStatus: "completed_without_effect" | "blocked";
  claimedEffect: "none";
  stateDirectory: string;
}>;

export function runM2ForM6Inquiry(input: {
  stateDirectory: string;
  admissionMode: M6AdmissionMode;
}): M6M2Context {
  const action =
    input.admissionMode === "allow"
      ? LOCAL_POLICY_ACTIONS.M6_ALLOWED_ACTION
      : input.admissionMode === "approval_required"
        ? LOCAL_POLICY_ACTIONS.APPROVAL_REQUIRED_ACTION
        : "unknown_effectful_action";

  const request = createLocalRequest({
    requestId: createRequestId(),
    correlationId: createCorrelationId(),
    declaredAction: action,
    declaredTarget: "local_synthetic_corpus",
    declaredPurpose: "deterministic local synthetic corpus inquiry",
    requestedAtIso8601: new Date().toISOString(),
    dataClassification: "synthetic_non_sensitive"
  });
  const policyDecision = evaluateLocalPolicy(request, new SafeMode("restrictive"));
  const forcedDecision =
    input.admissionMode === "allow"
      ? createAuthorityDecision("allow", policyDecision.reason, request.correlationId)
      : input.admissionMode === "approval_required"
        ? createAuthorityDecision("approval_required", policyDecision.reason, request.correlationId)
        : createAuthorityDecision("deny", policyDecision.reason, request.correlationId);

  const auditService = new AuditService(input.stateDirectory);
  const intentManager = new IntentManager(auditService);
  const planner = new Planner(auditService);
  const decisionService = new DecisionService(auditService);
  const transactionCoordinator = new TransactionCoordinator(auditService);
  const evidenceService = new EvidenceService(auditService);
  const outcomeService = new OutcomeService(auditService);

  const intentResponse = intentManager.recordIntent({
    commandName: "RecordIntent",
    commandId: createCommandId("record_intent"),
    correlationId: request.correlationId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance: M2_PROVENANCE,
    dataClassification: "synthetic_non_sensitive",
    payload: { request }
  });
  if (!intentResponse.intentRecord || !intentResponse.eventId) {
    throw new Error(`RecordIntent failed closed: ${intentResponse.reason}`);
  }

  const planResponse = planner.proposePlan({
    commandName: "ProposePlan",
    commandId: createCommandId("propose_plan"),
    correlationId: request.correlationId,
    causationEventId: intentResponse.eventId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance: M2_PROVENANCE,
    dataClassification: "synthetic_non_sensitive",
    payload: {
      intentId: intentResponse.intentRecord.intentId,
      boundedSteps: [
        "evaluate deterministic inquiry admission",
        "execute local synthetic inquiry if allowed",
        "attest no external effect"
      ],
      constraints: ["local-only", "synthetic-only", "deterministic", "non-live-effect"],
      assumptions: ["single-question inquiry"],
      riskSummary: "No external effects admitted."
    }
  });
  if (!planResponse.planRecord || !planResponse.eventId) {
    throw new Error(`ProposePlan failed closed: ${planResponse.reason}`);
  }

  const decisionResponse = decisionService.recordDecision({
    commandName: "RecordDecision",
    commandId: createCommandId("record_decision"),
    correlationId: request.correlationId,
    causationEventId: planResponse.eventId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance: M2_PROVENANCE,
    dataClassification: "synthetic_non_sensitive",
    payload: {
      intentId: intentResponse.intentRecord.intentId,
      planId: planResponse.planRecord.planId,
      disposition: forcedDecision.disposition,
      reason: forcedDecision.reason,
      uncertainty:
        forcedDecision.disposition === "allow"
          ? "low_in_local_synthetic_inquiry_context"
          : "restricted_by_policy_or_unknown_action"
    }
  });
  if (!decisionResponse.decisionRecord || !decisionResponse.eventId) {
    throw new Error(`RecordDecision failed closed: ${decisionResponse.reason}`);
  }

  const transactionStatus =
    decisionResponse.decisionRecord.disposition === "allow"
      ? "completed_without_effect"
      : "blocked";
  const transactionResponse = transactionCoordinator.openTransaction({
    commandName: "OpenTransaction",
    commandId: createCommandId("open_transaction"),
    correlationId: request.correlationId,
    causationEventId: decisionResponse.eventId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance: M2_PROVENANCE,
    dataClassification: "synthetic_non_sensitive",
    payload: {
      intentId: intentResponse.intentRecord.intentId,
      planId: planResponse.planRecord.planId,
      decisionId: decisionResponse.decisionRecord.decisionId,
      declaredEffectClass: "local_synthetic_inquiry",
      status: transactionStatus,
      claimedEffect: "none"
    }
  });
  if (!transactionResponse.transactionRecord || !transactionResponse.eventId) {
    throw new Error(`OpenTransaction failed closed: ${transactionResponse.reason}`);
  }

  const evidenceResponse = evidenceService.attachEvidence({
    commandName: "AttachEvidence",
    commandId: createCommandId("attach_evidence"),
    correlationId: request.correlationId,
    causationEventId: transactionResponse.eventId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance: M2_PROVENANCE,
    dataClassification: "synthetic_non_sensitive",
    payload: {
      subjectKind: "transaction",
      subjectId: transactionResponse.transactionRecord.transactionId,
      claim: `transaction status=${transactionResponse.transactionRecord.status}; claimedEffect=none`,
      confidence: "high"
    }
  });
  if (!evidenceResponse.evidenceRecord || !evidenceResponse.eventId) {
    throw new Error(`AttachEvidence failed closed: ${evidenceResponse.reason}`);
  }

  const outcomeStatus =
    transactionResponse.transactionRecord.status === "completed_without_effect"
      ? "achieved_without_effect"
      : forcedDecision.disposition === "approval_required"
        ? "awaiting_approval_no_effect"
        : "not_achieved_no_effect";
  const outcomeResponse = outcomeService.finalizeOutcome({
    commandName: "FinalizeOutcome",
    commandId: createCommandId("finalize_outcome"),
    correlationId: request.correlationId,
    causationEventId: evidenceResponse.eventId,
    schemaVersion: M2_SCHEMA_VERSION,
    provenance: M2_PROVENANCE,
    dataClassification: "synthetic_non_sensitive",
    payload: {
      intentId: intentResponse.intentRecord.intentId,
      transactionId: transactionResponse.transactionRecord.transactionId,
      decisionId: decisionResponse.decisionRecord.decisionId,
      status: outcomeStatus,
      summary: `M6 inquiry decision=${forcedDecision.disposition}; transaction=${transactionStatus}; no external effect admitted.`,
      claimedEffect: "none"
    }
  });
  if (!outcomeResponse.outcomeRecord) {
    throw new Error(`FinalizeOutcome failed closed: ${outcomeResponse.reason}`);
  }

  return Object.freeze({
    correlationId: request.correlationId,
    intentId: intentResponse.intentRecord.intentId,
    planId: planResponse.planRecord.planId,
    decisionId: decisionResponse.decisionRecord.decisionId,
    transactionId: transactionResponse.transactionRecord.transactionId,
    decisionDisposition: decisionResponse.decisionRecord.disposition,
    transactionStatus,
    claimedEffect: "none",
    stateDirectory: auditService.getStateDirectory()
  });
}
