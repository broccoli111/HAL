import type { CommandId, CorrelationId, ImmutableIdentifier } from "../shared/types.js";

export const M4_SCHEMA_VERSION = "m4.v1" as const;
export const M4_PROVENANCE = "local_m4_verified_outcome" as const;

export type M4SchemaVersion = typeof M4_SCHEMA_VERSION;
export type M4Provenance = typeof M4_PROVENANCE;

export type FinalOutcomeStatus =
  | "achieved_without_effect"
  | "blocked"
  | "failed_no_effect"
  | "cancelled_no_effect"
  | "timed_out_no_effect"
  | "verification_rejected_no_effect"
  | "incomplete_evidence_no_effect";

export type RecoveryFailureCategory =
  | "m2_journal_integrity_failure"
  | "m3_journal_integrity_failure"
  | "missing_evidence"
  | "evidence_linkage_mismatch"
  | "verification_rejected"
  | "artifact_integrity_failure"
  | "malformed_request"
  | "idempotency_conflict";

export type M4BaseMetadata = Readonly<{
  commandId: CommandId;
  correlationId: CorrelationId;
  causationEventId?: ImmutableIdentifier;
  schemaVersion: M4SchemaVersion;
  dataClassification: "synthetic_non_sensitive";
  provenance: M4Provenance;
  timestampIso8601: string;
}>;

export type OutcomeAttestationRecord = Readonly<
  M4BaseMetadata & {
    attestationId: ImmutableIdentifier;
    attestationRequestId: ImmutableIdentifier;
    capabilityRequestId?: ImmutableIdentifier;
    executionAttemptId?: ImmutableIdentifier;
    artifactId?: ImmutableIdentifier;
    verificationId?: ImmutableIdentifier;
    intentId?: ImmutableIdentifier;
    planId?: ImmutableIdentifier;
    decisionId?: ImmutableIdentifier;
    transactionId?: ImmutableIdentifier;
    requestedCapabilityId: string;
    finalOutcomeStatus: FinalOutcomeStatus;
    claimedEffect: "inspection_only" | "none";
    m3AttemptRan: boolean;
    verificationPassed: boolean;
    uncertainty: string;
    evidenceSummary: string;
    integrityHash: string;
    status: "attested";
  }
>;

export type RecoveryCaseRecord = Readonly<
  M4BaseMetadata & {
    recoveryCaseId: ImmutableIdentifier;
    attestationRequestId: ImmutableIdentifier;
    attestationId?: ImmutableIdentifier;
    failureCategory: RecoveryFailureCategory;
    restrictionState: "reconstruction_and_explanation_only";
    recoveryDisposition: "preserve_evidence_and_reconstruct_only";
    affectedReferences: readonly string[];
    integrityHash: string;
    status: "open";
  }
>;

export type ExplanationRecord = Readonly<
  M4BaseMetadata & {
    explanationId: ImmutableIdentifier;
    attestationId: ImmutableIdentifier;
    recoveryCaseId?: ImmutableIdentifier;
    finalOutcomeStatus: FinalOutcomeStatus;
    claimedEffect: "inspection_only" | "none";
    boundedExplanation: string;
    integrityHash: string;
    status: "issued";
  }
>;

export type M4RecordKind = "outcome_attestation" | "recovery_case" | "explanation";
export type M4DurableRecord = OutcomeAttestationRecord | RecoveryCaseRecord | ExplanationRecord;

export type M4EventType =
  | "OutcomeAttested"
  | "RecoveryCaseOpened"
  | "ExplanationIssued"
  | "AttestationRequestRejected"
  | "AttestationRequestConflictDenied";

export type M4CommandName = "FinalizeOutcomeAttestation" | "OpenRecoveryCase" | "IssueExplanation";

export type M4CommandResult = Readonly<{
  accepted: boolean;
  status: "applied" | "denied";
  reason: string;
  eventType: M4EventType;
  recordKind?: M4RecordKind;
  recordId?: ImmutableIdentifier;
}>;

export type M4EventRecord = Readonly<
  M4BaseMetadata & {
    eventRecordId: ImmutableIdentifier;
    eventType: M4EventType;
    owner: string;
    status: "applied" | "denied";
    payloadSummary: string;
    previousIntegrityHash?: string;
    integrityHash: string;
    commandName?: M4CommandName;
    commandFingerprint?: string;
    commandResult?: M4CommandResult;
    recordKind?: M4RecordKind;
    record?: M4DurableRecord;
  }
>;

export type FinalizeOutcomeAttestationInput = Readonly<{
  attestationRequestId: ImmutableIdentifier;
  correlationId: CorrelationId;
  requestedCapabilityId: string;
  expectedM3CapabilityRequestId?: ImmutableIdentifier;
}>;
