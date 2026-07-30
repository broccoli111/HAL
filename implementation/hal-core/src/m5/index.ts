export { LocalBackupRestoreCoordinator } from "./coordinator.js";
export { M5OperationJournal } from "./operationJournal.js";
export {
  buildManifest,
  computeManifestIntegrityHash,
  computeSourceRootIdentifier,
  parseManifestFromFile,
  serializeManifest,
  sha256Hex,
  validateManifest
} from "./manifest.js";
export { createBackupSnapshot } from "./backupService.js";
export { restoreSnapshotToTarget } from "./restoreService.js";
export {
  collectMappedArtifactReferences,
  verifyArtifactsFromMapping,
  verifyReconstructionViews,
  verifySnapshotDirectory
} from "./verificationService.js";
export {
  M5_MANIFEST_SCHEMA_VERSION,
  M5_OPERATION_OWNER,
  M5_PROVENANCE,
  type BackupOperationInput,
  type BackupOperationResult,
  type LogicalContentClass,
  type M5ArtifactMappingEntry,
  type M5LocalBackupManifest,
  type M5ManifestFileEntry,
  type M5OperationDisposition,
  type M5OperationEvidenceReferences,
  type M5OperationRecord,
  type M5OperationType,
  type RestoreOperationInput,
  type RestoreOperationResult,
  type VerifyOperationInput,
  type VerifyOperationResult
} from "./types.js";
