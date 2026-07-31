import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";

export const M5_MANIFEST_SCHEMA_VERSION = "hal.m5.local-backup-manifest.v1";
export const M5_PROVENANCE = "local_m5_backup_restore";
export const M5_OPERATION_OWNER = "LocalBackupRestoreCoordinator";

export type M5ManifestSchemaVersion = typeof M5_MANIFEST_SCHEMA_VERSION;

export type LogicalContentClass =
  "m2_journal" | "m3_journal" | "m4_journal" | "m6_journal" | "m9_journal" | "m3_artifact";

export type M5ManifestFileEntry = Readonly<{
  relativePath: string;
  byteSize: number;
  sha256: string;
  logicalContentClass: LogicalContentClass;
}>;

export type M5ArtifactMappingEntry = Readonly<{
  artifactReferenceId: ImmutableIdentifier;
  payloadRelativePath: string;
}>;

export type M5LocalBackupManifest = Readonly<{
  schemaVersion: M5ManifestSchemaVersion;
  snapshotId: ImmutableIdentifier;
  capturedAtUtc: string;
  sourceCommitRef: string;
  sourceVersion: string;
  classification: string;
  provenance: Readonly<{
    initiatedBy: string;
    sourceRootId: string;
  }>;
  correlationScope: Readonly<{
    kind: "single_correlation" | "multi_or_unspecified";
    correlationId?: CorrelationId;
  }>;
  files: readonly M5ManifestFileEntry[];
  artifactMappings: readonly M5ArtifactMappingEntry[];
  manifestIntegrityHash: string;
}>;

export type M5OperationType = "backup" | "restore" | "verify";
export type M5OperationDisposition = "succeeded" | "failed";

export type M5OperationEvidenceReferences = Readonly<{
  snapshotReference: string;
  manifestReference?: "manifest.json";
  invalidationMarkerReference?: "SNAPSHOT_INVALID.json" | "RESTORE_INVALID.json";
  restoreTargetReference?: "declared_restore_target";
  verificationSummary?: string;
}>;

export type M5OperationRecord = Readonly<{
  operationRecordId: ImmutableIdentifier;
  operationId: ImmutableIdentifier;
  operationType: M5OperationType;
  owner: typeof M5_OPERATION_OWNER;
  timestampIso8601: string;
  snapshotId?: ImmutableIdentifier;
  correlationId?: CorrelationId;
  causationOperationId?: ImmutableIdentifier;
  sourceRootId?: string;
  targetRootId?: string;
  disposition: M5OperationDisposition;
  reason: string;
  manifestIntegrityHash?: string;
  evidenceReferences: M5OperationEvidenceReferences;
  previousIntegrityHash?: string;
  integrityHash: string;
}>;

export type BackupOperationInput = Readonly<{
  sourceStateDirectory: string;
  backupRoot: string;
  operationStateDirectory: string;
  sourceCommitRef: string;
  sourceVersion: string;
  classification: string;
  initiatedBy: string;
  correlationId?: CorrelationId;
  causationOperationId?: ImmutableIdentifier;
}>;

export type RestoreOperationInput = Readonly<{
  snapshotDirectory: string;
  snapshotRoot: string;
  restoreTargetDirectory: string;
  restoreRoot: string;
  operationStateDirectory: string;
  correlationId?: CorrelationId;
  causationOperationId?: ImmutableIdentifier;
}>;

export type VerifyOperationInput = Readonly<{
  snapshotDirectory: string;
  snapshotRoot: string;
  operationStateDirectory: string;
  correlationId?: CorrelationId;
  causationOperationId?: ImmutableIdentifier;
}>;

export type BackupOperationResult = Readonly<{
  ok: boolean;
  operationRecord: M5OperationRecord;
  snapshotDirectory: string;
  snapshotId?: ImmutableIdentifier;
  manifestPath?: string;
  manifestIntegrityHash?: string;
  reason: string;
}>;

export type RestoreOperationResult = Readonly<{
  ok: boolean;
  operationRecord: M5OperationRecord;
  restoreTargetDirectory: string;
  snapshotId?: ImmutableIdentifier;
  reason: string;
}>;

export type VerifyOperationResult = Readonly<{
  ok: boolean;
  operationRecord: M5OperationRecord;
  snapshotDirectory: string;
  snapshotId?: ImmutableIdentifier;
  reason: string;
}>;
