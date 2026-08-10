import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";

export const M9_PACK_MANIFEST_SCHEMA_VERSION = "hal.m9.knowledge-pack.manifest.v1" as const;
export const M9_ACTIVATION_RECORD_SCHEMA_VERSION = "hal.m9.pack-activation-record.v1" as const;

export const M9_PACK_ROOT_RELATIVE = "fixtures/approved-knowledge-packs" as const;
export const M9_STATE_SUBDIRECTORY = "m9" as const;
export const M9_ACTIVATION_JOURNAL_FILE = "m9-pack-activation-journal.jsonl" as const;

export const M9_CONTENT_CLASS = "pack_content_json" as const;
export const M9_PACK_CLASSIFICATION = "synthetic_approved_local_only" as const;
export const M9_PROVENANCE_CLASSIFICATION = "synthetic_non_sensitive" as const;
export type M9PackClassification =
  | typeof M9_PACK_CLASSIFICATION
  | "owner_approved_hal_canon_local_only"
  | "owner_approved_local_document_pilot";
export type M9ProvenanceClassification =
  | typeof M9_PROVENANCE_CLASSIFICATION
  | "owner_approved_repository_canon"
  | "owner_approved_local_document";

export const M9_BOUNDS = Object.freeze({
  maxPacks: 32,
  maxContentFilesPerPack: 64,
  maxTotalPackBytes: 2_097_152,
  maxContentFileBytes: 131_072,
  maxDocuments: 64,
  maxTagsPerDocument: 32,
  maxParagraphsPerDocument: 128,
  maxTitleUtf8Bytes: 256,
  maxTagUtf8Bytes: 64,
  maxParagraphUtf8Bytes: 2_048,
  maxManifestUtf8Bytes: 262_144,
  maxActivationRecordUtf8Bytes: 4_096
});

export type M9DocumentDeclaration = Readonly<{
  documentId: string;
  sectionIds: readonly string[];
}>;

export type M9ManifestFile = Readonly<{
  relativePath: string;
  sha256: string;
  byteSize: number;
  contentClass: typeof M9_CONTENT_CLASS;
}>;

export type M9PackManifest = Readonly<{
  schemaVersion: typeof M9_PACK_MANIFEST_SCHEMA_VERSION;
  packId: string;
  packName: string;
  packVersion: string;
  packClassification: M9PackClassification;
  provenanceClassification: M9ProvenanceClassification;
  m6Compatibility: Readonly<{
    tokenizerVersion: "m6.tokenizer.v1";
    matcherVersion: "m6.matcher.v1";
    corpusIndexVersion: "m6.corpus-index.v1";
    documentShape: "m6.synthetic-document.v1" | "m6.document.v1";
  }>;
  documents: readonly M9DocumentDeclaration[];
  files: readonly M9ManifestFile[];
  contentRoot: "content";
  integrity: Readonly<{
    manifestHashAlgorithm: "sha256";
    manifestHashSha256: string;
  }>;
  sourceRecords?: readonly Readonly<{
    sourcePath: string;
    sha256: string;
    byteSize: number;
  }>[];
}>;

export type M9ResolvedPack = Readonly<{
  packDirectory: string;
  manifestPath: string;
  manifest: M9PackManifest;
  manifestHashSha256: string;
  contentFileAbsolutePaths: readonly string[];
}>;

export type M9RegistrationEntry = Readonly<{
  packId: string;
  packVersion: string;
  manifestHashSha256: string;
  status: "available";
}>;

export type M9OwnerDisposition = "activate" | "deactivate";
export type M9ActivationResult = "succeeded" | "blocked";

export type M9ReasonCode =
  | "owner_local_activation"
  | "owner_local_deactivation"
  | "owner_confirmation_invalid"
  | "m2_admission_blocked"
  | "operation_request_conflict"
  | "pack_not_available"
  | "already_active_same_tuple"
  | "no_active_pack";

export type M9OwnerConfirmationClaimCategory = "local_owner_confirmed" | "owner_claim_invalid";

export type M9ActivationRecord = Readonly<{
  schemaVersion: typeof M9_ACTIVATION_RECORD_SCHEMA_VERSION;
  activationRecordId: ImmutableIdentifier;
  operationRequestId: ImmutableIdentifier;
  recordedAtUtc: string;
  correlationId: CorrelationId;
  causationId?: ImmutableIdentifier;
  ownerDisposition: M9OwnerDisposition;
  operationFingerprintSha256: string;
  reasonCode: M9ReasonCode;
  packId: string;
  packVersion: string;
  manifestHashSha256: string;
  ownerConfirmationClaimCategory: M9OwnerConfirmationClaimCategory;
  m2IntentId: ImmutableIdentifier;
  m2PlanId: ImmutableIdentifier;
  m2DecisionId: ImmutableIdentifier;
  m2TransactionId: ImmutableIdentifier;
  result: M9ActivationResult;
  resultReasonCode: M9ReasonCode;
  previousRecordHash?: string;
  recordHash: string;
}>;

export type M9ActivePackState = Readonly<{
  activationRecordId: ImmutableIdentifier;
  packId: string;
  packVersion: string;
  manifestHashSha256: string;
}>;
