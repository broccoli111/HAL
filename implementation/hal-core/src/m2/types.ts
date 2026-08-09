import type { AuthorityDecisionDisposition } from "../authority/decision.js";
import type { LocalDataClassification, LocalRequest } from "../request/model.js";
import type { CommandId, CorrelationId, ImmutableIdentifier, RequestId } from "../shared/types.js";

export const M2_SCHEMA_VERSION = "m2.v1" as const;
export const M2_PROVENANCE = "local_fixture_demo" as const;

export type M2SchemaVersion = typeof M2_SCHEMA_VERSION;
export type M2Provenance = typeof M2_PROVENANCE | "local_owner_approved_repository_canon";

export type M2BaseMetadata = Readonly<{
  commandId: CommandId;
  correlationId: CorrelationId;
  causationEventId?: ImmutableIdentifier;
  schemaVersion: M2SchemaVersion;
  dataClassification: LocalDataClassification;
  provenance: M2Provenance;
  timestampIso8601: string;
}>;

export type IntentStatus = "recorded";
export type PlanStatus = "proposed";
export type DecisionStatus = "recorded";
export type TransactionStatus =
  "not_started" | "blocked" | "completed_without_effect" | "cancelled";
export type EvidenceStatus = "attached";
export type OutcomeStatus =
  | "achieved_without_effect"
  | "awaiting_approval_no_effect"
  | "not_achieved_no_effect"
  | "cancelled_no_effect";

export type IntentRecord = Readonly<
  M2BaseMetadata & {
    intentId: ImmutableIdentifier;
    requestId: RequestId;
    declaredAction: string;
    declaredTarget: string;
    declaredPurpose: string;
    status: IntentStatus;
  }
>;

export type PlanRecord = Readonly<
  M2BaseMetadata & {
    planId: ImmutableIdentifier;
    intentId: ImmutableIdentifier;
    boundedSteps: readonly string[];
    constraints: readonly string[];
    assumptions: readonly string[];
    riskSummary: string;
    status: PlanStatus;
  }
>;

export type DecisionRecord = Readonly<
  M2BaseMetadata & {
    decisionId: ImmutableIdentifier;
    intentId: ImmutableIdentifier;
    planId: ImmutableIdentifier;
    disposition: AuthorityDecisionDisposition;
    reason: string;
    uncertainty: string;
    status: DecisionStatus;
  }
>;

export type ClaimedEffect = "none" | "inspection_only";

export type TransactionRecord = Readonly<
  M2BaseMetadata & {
    transactionId: ImmutableIdentifier;
    intentId: ImmutableIdentifier;
    planId: ImmutableIdentifier;
    decisionId: ImmutableIdentifier;
    status: TransactionStatus;
    declaredEffectClass:
      | "local_synthetic_inspection"
      | "local_synthetic_inquiry"
      | "local_owner_approved_canon_inquiry";
    claimedEffect: ClaimedEffect;
    recoveryDisposition: "reconstruct_from_journal";
  }
>;

export type EvidenceRecord = Readonly<
  M2BaseMetadata & {
    evidenceId: ImmutableIdentifier;
    subjectKind: "transaction";
    subjectId: ImmutableIdentifier;
    claim: string;
    confidence: "high";
    status: EvidenceStatus;
  }
>;

export type OutcomeRecord = Readonly<
  M2BaseMetadata & {
    outcomeId: ImmutableIdentifier;
    intentId: ImmutableIdentifier;
    transactionId: ImmutableIdentifier;
    decisionId: ImmutableIdentifier;
    status: OutcomeStatus;
    summary: string;
    claimedEffect: ClaimedEffect;
  }
>;

export type DurableRecordKind =
  "intent" | "plan" | "decision" | "transaction" | "evidence" | "outcome";

export type DurableRecord =
  IntentRecord | PlanRecord | DecisionRecord | TransactionRecord | EvidenceRecord | OutcomeRecord;

export type DurableEventType =
  | "IntentRecorded"
  | "PlanProposed"
  | "DecisionRecorded"
  | "TransactionOpened"
  | "EvidenceAttached"
  | "OutcomeFinalized"
  | "CommandRejected"
  | "CommandConflictDenied";

export type CommandName =
  | "RecordIntent"
  | "ProposePlan"
  | "RecordDecision"
  | "OpenTransaction"
  | "AttachEvidence"
  | "FinalizeOutcome";

export type CommandResult = Readonly<{
  accepted: boolean;
  status: "applied" | "denied";
  reason: string;
  eventType: DurableEventType;
  recordKind?: DurableRecordKind;
  recordId?: ImmutableIdentifier;
}>;

export type CommandEnvelope<TPayload> = Readonly<{
  commandName: CommandName;
  commandId: CommandId;
  correlationId: CorrelationId;
  causationEventId?: ImmutableIdentifier;
  schemaVersion: M2SchemaVersion;
  dataClassification: LocalDataClassification;
  provenance: M2Provenance;
  payload: Readonly<TPayload>;
}>;

export type RecordIntentCommand = CommandEnvelope<{ request: LocalRequest }>;
export type ProposePlanCommand = CommandEnvelope<{
  intentId: ImmutableIdentifier;
  boundedSteps: readonly string[];
  constraints: readonly string[];
  assumptions: readonly string[];
  riskSummary: string;
}>;
export type RecordDecisionCommand = CommandEnvelope<{
  intentId: ImmutableIdentifier;
  planId: ImmutableIdentifier;
  disposition: AuthorityDecisionDisposition;
  reason: string;
  uncertainty: string;
}>;
export type OpenTransactionCommand = CommandEnvelope<{
  intentId: ImmutableIdentifier;
  planId: ImmutableIdentifier;
  decisionId: ImmutableIdentifier;
  declaredEffectClass:
    "local_synthetic_inspection" | "local_synthetic_inquiry" | "local_owner_approved_canon_inquiry";
  status: TransactionStatus;
  claimedEffect: ClaimedEffect;
}>;
export type AttachEvidenceCommand = CommandEnvelope<{
  subjectKind: "transaction";
  subjectId: ImmutableIdentifier;
  claim: string;
  confidence: "high";
}>;
export type FinalizeOutcomeCommand = CommandEnvelope<{
  intentId: ImmutableIdentifier;
  transactionId: ImmutableIdentifier;
  decisionId: ImmutableIdentifier;
  status: OutcomeStatus;
  summary: string;
  claimedEffect: ClaimedEffect;
}>;

export type DurableEventRecord = Readonly<
  M2BaseMetadata & {
    eventRecordId: ImmutableIdentifier;
    eventType: DurableEventType;
    owner: string;
    status: "applied" | "denied";
    payloadSummary: string;
    previousIntegrityHash?: string;
    integrityHash: string;
    commandName?: CommandName;
    commandFingerprint?: string;
    commandResult?: CommandResult;
    recordKind?: DurableRecordKind;
    record?: DurableRecord;
  }
>;

export function ensureIso8601(value: string, fieldName: string): void {
  if (!value.trim()) {
    throw new Error(`${fieldName} must be non-empty.`);
  }
  if (Number.isNaN(Date.parse(value))) {
    throw new Error(`${fieldName} must be a valid ISO-8601 timestamp.`);
  }
}
