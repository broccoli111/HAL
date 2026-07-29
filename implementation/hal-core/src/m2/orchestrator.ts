import type { ControlledConfiguration } from "../kernel/config.js";
import { createAuthorityDecision } from "../authority/decision.js";
import { evaluateLocalPolicy } from "../authority/localPolicy.js";
import { loadLocalRequestFixture, type LocalRequestFixtureName } from "../request/fixtures.js";
import { createCommandId } from "../shared/id.js";
import type { CorrelationId } from "../shared/types.js";
import { SafeMode } from "../kernel/safeMode.js";
import { AuditService } from "./auditService.js";
import { DecisionService } from "./decisionService.js";
import { EvidenceService } from "./evidenceService.js";
import { IntentManager } from "./intentManager.js";
import { OutcomeService } from "./outcomeService.js";
import { Planner } from "./planner.js";
import { TransactionCoordinator } from "./transactionCoordinator.js";
import type {
  ClaimedEffect,
  DecisionRecord,
  DurableEventRecord,
  OutcomeRecord,
  TransactionRecord,
  TransactionStatus
} from "./types.js";
import { M2_PROVENANCE, M2_SCHEMA_VERSION } from "./types.js";

export type M2DemoResult = Readonly<{
  fixtureName: LocalRequestFixtureName;
  correlationId: CorrelationId;
  intentId: string;
  planId: string;
  decisionId: string;
  transactionId: string;
  outcomeId: string;
  disposition: "allow" | "deny" | "approval_required";
  transactionStatus: TransactionStatus;
  claimedEffect: ClaimedEffect;
  eventCount: number;
  stateDirectory: string;
  journalPath: string;
}>;

export type ReconstructedTrace = Readonly<{
  correlationId: CorrelationId;
  events: readonly DurableEventRecord[];
  summary: Readonly<{
    intentId: string | undefined;
    planId: string | undefined;
    decisionId: string | undefined;
    transactionId: string | undefined;
    outcomeId: string | undefined;
    disposition: "allow" | "deny" | "approval_required" | undefined;
    transactionStatus: TransactionStatus | undefined;
    claimedEffect: ClaimedEffect | undefined;
  }>;
}>;

export function runM2DurableIntentDemo(input: {
  configuration: ControlledConfiguration;
  fixtureName: LocalRequestFixtureName;
  stateDirectory: string;
}): M2DemoResult {
  const auditService = new AuditService(input.stateDirectory);
  const intentManager = new IntentManager(auditService);
  const planner = new Planner(auditService);
  const decisionService = new DecisionService(auditService);
  const transactionCoordinator = new TransactionCoordinator(auditService);
  const evidenceService = new EvidenceService(auditService);
  const outcomeService = new OutcomeService(auditService);

  const request = loadLocalRequestFixture(input.fixtureName);
  const decision = evaluateLocalPolicy(request, new SafeMode(input.configuration.safeMode));

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
        `interpret request action=${request.declaredAction}`,
        "evaluate local deterministic policy",
        "record non-effectful transaction disposition"
      ],
      constraints: ["local-only", "synthetic-only", "non-live-effect"],
      assumptions: ["fixture data is trusted synthetic input"],
      riskSummary: "No external effects admitted."
    }
  });
  if (!planResponse.planRecord || !planResponse.eventId) {
    throw new Error(`ProposePlan failed closed: ${planResponse.reason}`);
  }

  const decided = createAuthorityDecision(
    decision.disposition,
    decision.reason,
    request.correlationId
  );
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
      disposition: decided.disposition,
      reason: decided.reason,
      uncertainty:
        decided.disposition === "allow"
          ? "low_in_fixture_context"
          : "restricted_by_policy_or_unknown_action"
    }
  });
  if (!decisionResponse.decisionRecord || !decisionResponse.eventId) {
    throw new Error(`RecordDecision failed closed: ${decisionResponse.reason}`);
  }

  const transactionStatus: TransactionStatus =
    decisionResponse.decisionRecord.disposition === "allow"
      ? "completed_without_effect"
      : "blocked";
  const claimedEffect: ClaimedEffect =
    decisionResponse.decisionRecord.disposition === "allow" ? "inspection_only" : "none";
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
      declaredEffectClass: "local_synthetic_inspection",
      status: transactionStatus,
      claimedEffect
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
      claim: `transaction status=${transactionResponse.transactionRecord.status}; claimedEffect=${transactionResponse.transactionRecord.claimedEffect}`,
      confidence: "high"
    }
  });
  if (!evidenceResponse.evidenceRecord || !evidenceResponse.eventId) {
    throw new Error(`AttachEvidence failed closed: ${evidenceResponse.reason}`);
  }

  const outcomeStatus = mapOutcomeStatus(
    decisionResponse.decisionRecord,
    transactionResponse.transactionRecord
  );
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
      summary: `Decision ${decisionResponse.decisionRecord.disposition}; transaction ${transactionResponse.transactionRecord.status}; no live effect admitted.`,
      claimedEffect: transactionResponse.transactionRecord.claimedEffect
    }
  });
  if (!outcomeResponse.outcomeRecord) {
    throw new Error(`FinalizeOutcome failed closed: ${outcomeResponse.reason}`);
  }

  return Object.freeze({
    fixtureName: input.fixtureName,
    correlationId: request.correlationId,
    intentId: intentResponse.intentRecord.intentId,
    planId: planResponse.planRecord.planId,
    decisionId: decisionResponse.decisionRecord.decisionId,
    transactionId: transactionResponse.transactionRecord.transactionId,
    outcomeId: outcomeResponse.outcomeRecord.outcomeId,
    disposition: decisionResponse.decisionRecord.disposition,
    transactionStatus: transactionResponse.transactionRecord.status,
    claimedEffect: transactionResponse.transactionRecord.claimedEffect,
    eventCount: auditService.getEventCountByCorrelationId(request.correlationId),
    stateDirectory: auditService.getStateDirectory(),
    journalPath: auditService.getJournalPath()
  });
}

export function reconstructM2Trace(
  stateDirectory: string,
  correlationId: CorrelationId
): ReconstructedTrace {
  const auditService = new AuditService(stateDirectory);
  const events = auditService.listEventsByCorrelationId(correlationId);
  let latestDecision: DecisionRecord | undefined;
  let latestTransaction: TransactionRecord | undefined;
  let latestOutcome: OutcomeRecord | undefined;
  let intentId: string | undefined;
  let planId: string | undefined;

  for (const event of events) {
    if (event.recordKind === "intent" && event.record) {
      intentId = (event.record as { intentId: string }).intentId;
    } else if (event.recordKind === "plan" && event.record) {
      planId = (event.record as { planId: string }).planId;
    } else if (event.recordKind === "decision" && event.record) {
      latestDecision = event.record as DecisionRecord;
    } else if (event.recordKind === "transaction" && event.record) {
      latestTransaction = event.record as TransactionRecord;
    } else if (event.recordKind === "outcome" && event.record) {
      latestOutcome = event.record as OutcomeRecord;
    }
  }

  return Object.freeze({
    correlationId,
    events,
    summary: Object.freeze({
      intentId,
      planId,
      decisionId: latestDecision?.decisionId,
      transactionId: latestTransaction?.transactionId,
      outcomeId: latestOutcome?.outcomeId,
      disposition: latestDecision?.disposition,
      transactionStatus: latestTransaction?.status,
      claimedEffect: latestOutcome?.claimedEffect
    })
  });
}

function mapOutcomeStatus(
  decision: DecisionRecord,
  transaction: TransactionRecord
): OutcomeRecord["status"] {
  if (transaction.status === "cancelled") {
    return "cancelled_no_effect";
  }
  if (transaction.status === "completed_without_effect") {
    return "achieved_without_effect";
  }
  return decision.disposition === "approval_required"
    ? "awaiting_approval_no_effect"
    : "not_achieved_no_effect";
}
