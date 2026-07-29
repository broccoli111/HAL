import type { CommandId, CorrelationId, ImmutableIdentifier } from "../shared/types.js";

export const M3_SCHEMA_VERSION = "m3.v1" as const;
export const M3_PROVENANCE = "local_m3_bounded_capability" as const;
export const M3_CAPABILITY_ID = "inspect_synthetic_corpus_summary" as const;
export const M3_PROVIDER_ID = "LocalSyntheticCorpusInspector" as const;
export const M3_PROVIDER_VERSION = "1.0.0" as const;

export type M3SchemaVersion = typeof M3_SCHEMA_VERSION;
export type M3Provenance = typeof M3_PROVENANCE;
export type M3CapabilityId = typeof M3_CAPABILITY_ID;
export type M3ProviderId = typeof M3_PROVIDER_ID;
export type M3ProviderVersion = typeof M3_PROVIDER_VERSION;

export type M3BaseMetadata = Readonly<{
  commandId: CommandId;
  correlationId: CorrelationId;
  causationEventId?: ImmutableIdentifier;
  schemaVersion: M3SchemaVersion;
  dataClassification: "synthetic_non_sensitive";
  provenance: M3Provenance;
  timestampIso8601: string;
}>;

export type CapabilityRegistrationRecord = Readonly<
  M3BaseMetadata & {
    capabilityRegistrationId: ImmutableIdentifier;
    capabilityId: M3CapabilityId;
    providerId: M3ProviderId;
    providerVersion: M3ProviderVersion;
    enabled: true;
    inputLimits: Readonly<{ maxItems: number; maxDeadlineMs: number }>;
    outputLimits: Readonly<{ maxArtifactBytes: number }>;
    riskEffectClass: "local_non_live_effect";
    evidence: string;
    status: "registered";
    integrityHash: string;
  }
>;

export type CapabilityRequestRecord = Readonly<
  M3BaseMetadata & {
    capabilityRequestId: ImmutableIdentifier;
    capabilityId: M3CapabilityId;
    providerId: M3ProviderId;
    providerVersion: M3ProviderVersion;
    decisionId: ImmutableIdentifier;
    transactionId: ImmutableIdentifier;
    intentId: ImmutableIdentifier;
    planId: ImmutableIdentifier;
    corpusReference: string;
    fixtureManifestHash: string;
    itemLimit: number;
    deadlineMs: number;
    status: "admitted";
    integrityHash: string;
  }
>;

export type ExecutionAttemptStatus =
  "created" | "running" | "succeeded" | "failed" | "cancelled" | "timed_out";

export type ExecutionAttemptRecord = Readonly<
  M3BaseMetadata & {
    executionAttemptId: ImmutableIdentifier;
    capabilityRequestId: ImmutableIdentifier;
    providerId: M3ProviderId;
    providerVersion: M3ProviderVersion;
    status: ExecutionAttemptStatus;
    deadlineMs: number;
    cancellationRequested: boolean;
    statusReason: string;
    artifactId?: ImmutableIdentifier;
    verificationId?: ImmutableIdentifier;
    integrityHash: string;
  }
>;

export type ArtifactRecord = Readonly<
  M3BaseMetadata & {
    artifactId: ImmutableIdentifier;
    capabilityRequestId: ImmutableIdentifier;
    executionAttemptId: ImmutableIdentifier;
    transactionId: ImmutableIdentifier;
    decisionId: ImmutableIdentifier;
    providerId: M3ProviderId;
    providerVersion: M3ProviderVersion;
    artifactPath: string;
    fixtureManifestHash: string;
    itemCount: number;
    artifactContentHash: string;
    integrityHash: string;
    status: "created";
  }
>;

export type VerificationRecord = Readonly<
  M3BaseMetadata & {
    verificationId: ImmutableIdentifier;
    artifactId: ImmutableIdentifier;
    capabilityRequestId: ImmutableIdentifier;
    executionAttemptId: ImmutableIdentifier;
    transactionId: ImmutableIdentifier;
    decisionId: ImmutableIdentifier;
    providerId: M3ProviderId;
    providerVersion: M3ProviderVersion;
    fixtureManifestHash: string;
    artifactContentHash: string;
    verified: boolean;
    verificationReason: string;
    integrityHash: string;
    status: "verified" | "rejected";
  }
>;

export type M3RecordKind =
  | "capability_registration"
  | "capability_request"
  | "execution_attempt"
  | "artifact"
  | "verification";

export type M3DurableRecord =
  | CapabilityRegistrationRecord
  | CapabilityRequestRecord
  | ExecutionAttemptRecord
  | ArtifactRecord
  | VerificationRecord;

export type M3EventType =
  | "CapabilityRegistered"
  | "CapabilityRequestAdmitted"
  | "ExecutionAttemptCreated"
  | "ExecutionAttemptRunning"
  | "ExecutionAttemptSucceeded"
  | "ExecutionAttemptFailed"
  | "ExecutionAttemptCancelled"
  | "ExecutionAttemptTimedOut"
  | "ArtifactCreated"
  | "VerificationCompleted"
  | "CapabilityRequestRejected"
  | "CapabilityRequestConflictDenied";

export type M3CommandName =
  | "RegisterCapability"
  | "SubmitCapabilityRequest"
  | "StartExecutionAttempt"
  | "CreateArtifact"
  | "VerifyArtifact";

export type M3CommandResult = Readonly<{
  accepted: boolean;
  status: "applied" | "denied";
  reason: string;
  eventType: M3EventType;
  recordKind?: M3RecordKind;
  recordId?: ImmutableIdentifier;
}>;

export type M3EventRecord = Readonly<
  M3BaseMetadata & {
    eventRecordId: ImmutableIdentifier;
    eventType: M3EventType;
    owner: string;
    status: "applied" | "denied";
    payloadSummary: string;
    previousIntegrityHash?: string;
    integrityHash: string;
    commandName?: M3CommandName;
    commandFingerprint?: string;
    commandResult?: M3CommandResult;
    recordKind?: M3RecordKind;
    record?: M3DurableRecord;
  }
>;

export type CapabilityRequestInput = Readonly<{
  capabilityRequestId: ImmutableIdentifier;
  capabilityId: M3CapabilityId;
  correlationId: CorrelationId;
  decisionId: ImmutableIdentifier;
  transactionId: ImmutableIdentifier;
  intentId: ImmutableIdentifier;
  planId: ImmutableIdentifier;
  corpusReference: string;
  itemLimit: number;
  deadlineMs: number;
  cancellationRequested?: boolean;
}>;

export type ProviderSummaryResult = Readonly<{
  providerId: M3ProviderId;
  providerVersion: M3ProviderVersion;
  fixtureManifestHash: string;
  consumedFiles: readonly string[];
  itemCount: number;
  summary: Readonly<{
    totalItems: number;
    titles: readonly string[];
    totalParagraphs: number;
    totalParagraphCharacters: number;
  }>;
}>;
