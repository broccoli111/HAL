import path from "node:path";

import type { ImmutableIdentifier } from "../shared/types.js";
import { computeSourceRootIdentifier } from "./manifest.js";
import { M5OperationJournal } from "./operationJournal.js";
import {
  assertContainedPath,
  assertDeclaredRootDirectory,
  assertNoSymlinkAtPath,
  assertNoSymlinkSegmentsUnderRoot,
  assertUniqueDeclaredRoots,
  requireNonEmptyPath
} from "./pathSafety.js";
import { createBackupSnapshot } from "./backupService.js";
import { restoreSnapshotToTarget } from "./restoreService.js";
import { verifySnapshotDirectory } from "./verificationService.js";
import {
  M5_OPERATION_OWNER,
  type BackupOperationInput,
  type BackupOperationResult,
  type RestoreOperationInput,
  type RestoreOperationResult,
  type VerifyOperationInput,
  type VerifyOperationResult
} from "./types.js";

export class LocalBackupRestoreCoordinator {
  private readonly journal: M5OperationJournal;
  private readonly journalOperationStateDirectory: string;

  public constructor(operationStateDirectory: string) {
    this.journal = new M5OperationJournal(operationStateDirectory);
    this.journalOperationStateDirectory = this.journal.getOperationStateDirectory();
  }

  public runBackup(input: BackupOperationInput): BackupOperationResult {
    const operationId = this.journal.createOperationId("backup");
    const admission = this.admitBackupInput(input);
    if (!admission.ok) {
      return this.recordFailedBackupResult({
        operationId,
        input,
        sourceStateDirectory: admission.sourceStateDirectory,
        backupRoot: admission.backupRoot,
        reason: admission.reason
      });
    }
    try {
      const backup = createBackupSnapshot(input);
      const operationRecord = this.journal.appendRecord({
        operationId,
        operationType: "backup",
        owner: M5_OPERATION_OWNER,
        ...(backup.snapshotId ? { snapshotId: backup.snapshotId } : {}),
        ...(input.correlationId ? { correlationId: input.correlationId } : {}),
        ...(input.causationOperationId ? { causationOperationId: input.causationOperationId } : {}),
        sourceRootId: computeSourceRootIdentifier(admission.sourceStateDirectory),
        targetRootId: computeSourceRootIdentifier(admission.backupRoot),
        disposition: backup.manifestIntegrityHash ? "succeeded" : "failed",
        reason: backup.reason,
        ...(backup.manifestIntegrityHash
          ? { manifestIntegrityHash: backup.manifestIntegrityHash }
          : {}),
        evidenceReferences: {
          snapshotReference: this.toSnapshotReference(backup.snapshotId),
          ...(backup.manifestPath ? { manifestReference: "manifest.json" as const } : {}),
          ...(backup.invalidationMarkerPath
            ? { invalidationMarkerReference: "SNAPSHOT_INVALID.json" as const }
            : {})
        }
      });
      return Object.freeze({
        ok: backup.manifestIntegrityHash !== undefined,
        operationRecord,
        snapshotDirectory: backup.snapshotDirectory,
        ...(backup.snapshotId ? { snapshotId: backup.snapshotId } : {}),
        ...(backup.manifestPath ? { manifestPath: backup.manifestPath } : {}),
        ...(backup.manifestIntegrityHash
          ? { manifestIntegrityHash: backup.manifestIntegrityHash }
          : {}),
        reason: backup.reason
      });
    } catch (error) {
      return this.recordFailedBackupResult({
        operationId,
        input,
        sourceStateDirectory: admission.sourceStateDirectory,
        backupRoot: admission.backupRoot,
        reason: `Backup failed: ${(error as Error).message}`
      });
    }
  }

  public runRestore(input: RestoreOperationInput): RestoreOperationResult {
    const operationId = this.journal.createOperationId("restore");
    const admission = this.admitRestoreInput(input);
    if (!admission.ok) {
      return this.recordFailedRestoreResult({
        operationId,
        input,
        snapshotDirectory: admission.snapshotDirectory,
        restoreRoot: admission.restoreRoot,
        reason: admission.reason
      });
    }
    try {
      const restore = restoreSnapshotToTarget(input);
      const operationRecord = this.journal.appendRecord({
        operationId,
        operationType: "restore",
        owner: M5_OPERATION_OWNER,
        ...(restore.snapshotId ? { snapshotId: restore.snapshotId as ImmutableIdentifier } : {}),
        ...(input.correlationId ? { correlationId: input.correlationId } : {}),
        ...(input.causationOperationId ? { causationOperationId: input.causationOperationId } : {}),
        sourceRootId: computeSourceRootIdentifier(admission.snapshotDirectory),
        targetRootId: computeSourceRootIdentifier(admission.restoreRoot),
        disposition: restore.manifestIntegrityHash ? "succeeded" : "failed",
        reason: restore.reason,
        ...(restore.manifestIntegrityHash
          ? { manifestIntegrityHash: restore.manifestIntegrityHash }
          : {}),
        evidenceReferences: {
          snapshotReference: this.toSnapshotReference(
            restore.snapshotId as ImmutableIdentifier | undefined
          ),
          restoreTargetReference: "declared_restore_target",
          ...(restore.invalidationMarkerPath
            ? { invalidationMarkerReference: "RESTORE_INVALID.json" as const }
            : {})
        }
      });
      return Object.freeze({
        ok: restore.manifestIntegrityHash !== undefined,
        operationRecord,
        restoreTargetDirectory: restore.restoreTargetDirectory,
        ...(restore.snapshotId ? { snapshotId: restore.snapshotId as ImmutableIdentifier } : {}),
        reason: restore.reason
      });
    } catch (error) {
      return this.recordFailedRestoreResult({
        operationId,
        input,
        snapshotDirectory: admission.snapshotDirectory,
        restoreRoot: admission.restoreRoot,
        reason: `Restore failed: ${(error as Error).message}`
      });
    }
  }

  public runVerify(input: VerifyOperationInput): VerifyOperationResult {
    const operationId = this.journal.createOperationId("verify");
    const admission = this.admitVerifyInput(input);
    if (!admission.ok) {
      return this.recordFailedVerifyResult({
        operationId,
        input,
        snapshotDirectory: admission.snapshotDirectory,
        reason: admission.reason
      });
    }
    try {
      const verified = verifySnapshotDirectory(admission.snapshotDirectory, admission.snapshotRoot);
      const operationRecord = this.journal.appendRecord({
        operationId,
        operationType: "verify",
        owner: M5_OPERATION_OWNER,
        snapshotId: verified.manifest.snapshotId,
        ...(input.correlationId ? { correlationId: input.correlationId } : {}),
        ...(input.causationOperationId ? { causationOperationId: input.causationOperationId } : {}),
        sourceRootId: computeSourceRootIdentifier(admission.snapshotDirectory),
        disposition: "succeeded",
        reason: "Snapshot verification succeeded.",
        manifestIntegrityHash: verified.manifest.manifestIntegrityHash,
        evidenceReferences: {
          snapshotReference: this.toSnapshotReference(verified.manifest.snapshotId),
          manifestReference: "manifest.json",
          verificationSummary: `validatedFiles=${verified.validatedFileCount}; verifiedArtifacts=${verified.verifiedArtifactCount}; reconstructions=${verified.reconstructionCount}`
        }
      });
      return Object.freeze({
        ok: true,
        operationRecord,
        snapshotDirectory: admission.snapshotDirectory,
        snapshotId: verified.manifest.snapshotId,
        reason: "Snapshot verification succeeded."
      });
    } catch (error) {
      return this.recordFailedVerifyResult({
        operationId,
        input,
        snapshotDirectory: admission.snapshotDirectory,
        reason: `Snapshot verification failed: ${(error as Error).message}`
      });
    }
  }

  public getOperationJournalPath(): string {
    return this.journal.getJournalPath();
  }

  public listOperationRecords() {
    return this.journal.listAll();
  }

  private admitBackupInput(input: BackupOperationInput):
    | {
        ok: true;
        sourceStateDirectory: string;
        backupRoot: string;
      }
    | {
        ok: false;
        sourceStateDirectory: string | undefined;
        backupRoot: string | undefined;
        reason: string;
      } {
    try {
      const sourceStateDirectory = assertDeclaredRootDirectory(
        input.sourceStateDirectory,
        "sourceStateDirectory"
      );
      const backupRoot = assertDeclaredRootDirectory(input.backupRoot, "backupRoot");
      this.assertOperationStateDirectoryMatch(input.operationStateDirectory);
      assertUniqueDeclaredRoots({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory: this.journalOperationStateDirectory
      });
      return { ok: true, sourceStateDirectory, backupRoot };
    } catch (error) {
      return {
        ok: false,
        sourceStateDirectory: tryResolvePath(input.sourceStateDirectory),
        backupRoot: tryResolvePath(input.backupRoot),
        reason: `Backup admission denied: ${(error as Error).message}`
      };
    }
  }

  private admitRestoreInput(input: RestoreOperationInput):
    | {
        ok: true;
        snapshotDirectory: string;
        snapshotRoot: string;
        restoreRoot: string;
      }
    | {
        ok: false;
        snapshotDirectory: string | undefined;
        restoreRoot: string | undefined;
        reason: string;
      } {
    try {
      const snapshotRoot = assertDeclaredRootDirectory(input.snapshotRoot, "snapshotRoot");
      const snapshotDirectory = requireNonEmptyPath(input.snapshotDirectory, "snapshotDirectory");
      assertNoSymlinkAtPath(snapshotDirectory, "snapshotDirectory");
      assertNoSymlinkSegmentsUnderRoot(snapshotRoot, snapshotDirectory, "snapshotDirectory");
      const restoreRoot = assertDeclaredRootDirectory(input.restoreRoot, "restoreRoot");
      const restoreTargetDirectory = requireNonEmptyPath(
        input.restoreTargetDirectory,
        "restoreTargetDirectory"
      );
      this.assertOperationStateDirectoryMatch(input.operationStateDirectory);
      assertUniqueDeclaredRoots({
        snapshotRoot,
        restoreRoot,
        operationStateDirectory: this.journalOperationStateDirectory
      });
      assertContainedPath(snapshotRoot, snapshotDirectory, "snapshotDirectory");
      assertContainedPath(restoreRoot, restoreTargetDirectory, "restoreTargetDirectory");
      assertNoSymlinkAtPath(restoreTargetDirectory, "restoreTargetDirectory");
      assertNoSymlinkSegmentsUnderRoot(
        restoreRoot,
        restoreTargetDirectory,
        "restoreTargetDirectory"
      );
      return { ok: true, snapshotDirectory, snapshotRoot, restoreRoot };
    } catch (error) {
      return {
        ok: false,
        snapshotDirectory: tryResolvePath(input.snapshotDirectory),
        restoreRoot: tryResolvePath(input.restoreRoot),
        reason: `Restore admission denied: ${(error as Error).message}`
      };
    }
  }

  private admitVerifyInput(input: VerifyOperationInput):
    | {
        ok: true;
        snapshotDirectory: string;
        snapshotRoot: string;
      }
    | {
        ok: false;
        snapshotDirectory: string | undefined;
        reason: string;
      } {
    try {
      const snapshotRoot = assertDeclaredRootDirectory(input.snapshotRoot, "snapshotRoot");
      const snapshotDirectory = requireNonEmptyPath(input.snapshotDirectory, "snapshotDirectory");
      this.assertOperationStateDirectoryMatch(input.operationStateDirectory);
      assertUniqueDeclaredRoots({
        snapshotRoot,
        operationStateDirectory: this.journalOperationStateDirectory
      });
      assertContainedPath(snapshotRoot, snapshotDirectory, "snapshotDirectory");
      assertNoSymlinkAtPath(snapshotDirectory, "snapshotDirectory");
      assertNoSymlinkSegmentsUnderRoot(snapshotRoot, snapshotDirectory, "snapshotDirectory");
      return { ok: true, snapshotDirectory, snapshotRoot };
    } catch (error) {
      return {
        ok: false,
        snapshotDirectory: tryResolvePath(input.snapshotDirectory),
        reason: `Verify admission denied: ${(error as Error).message}`
      };
    }
  }

  private assertOperationStateDirectoryMatch(inputOperationStateDirectory: string): void {
    const resolvedInput = requireNonEmptyPath(
      inputOperationStateDirectory,
      "operationStateDirectory"
    );
    assertNoSymlinkAtPath(resolvedInput, "operationStateDirectory");
    if (resolvedInput !== this.journalOperationStateDirectory) {
      throw new Error(
        "operationStateDirectory input must exactly match coordinator operation-state directory."
      );
    }
  }

  private recordFailedBackupResult(input: {
    operationId: ImmutableIdentifier;
    reason: string;
    sourceStateDirectory: string | undefined;
    backupRoot: string | undefined;
    input: BackupOperationInput;
  }): BackupOperationResult {
    const operationRecord = this.journal.appendRecord({
      operationId: input.operationId,
      operationType: "backup",
      owner: M5_OPERATION_OWNER,
      ...(input.input.correlationId ? { correlationId: input.input.correlationId } : {}),
      ...(input.input.causationOperationId
        ? { causationOperationId: input.input.causationOperationId }
        : {}),
      ...(input.sourceStateDirectory
        ? { sourceRootId: computeSourceRootIdentifier(input.sourceStateDirectory) }
        : {}),
      ...(input.backupRoot ? { targetRootId: computeSourceRootIdentifier(input.backupRoot) } : {}),
      disposition: "failed",
      reason: input.reason,
      evidenceReferences: {
        snapshotReference: input.backupRoot ? "snapshot_root_declared" : "snapshot_root_unavailable"
      }
    });
    return Object.freeze({
      ok: false,
      operationRecord,
      snapshotDirectory: input.backupRoot ?? this.journalOperationStateDirectory,
      reason: input.reason
    });
  }

  private recordFailedRestoreResult(input: {
    operationId: ImmutableIdentifier;
    reason: string;
    snapshotDirectory: string | undefined;
    restoreRoot: string | undefined;
    input: RestoreOperationInput;
  }): RestoreOperationResult {
    const operationRecord = this.journal.appendRecord({
      operationId: input.operationId,
      operationType: "restore",
      owner: M5_OPERATION_OWNER,
      ...(input.input.correlationId ? { correlationId: input.input.correlationId } : {}),
      ...(input.input.causationOperationId
        ? { causationOperationId: input.input.causationOperationId }
        : {}),
      ...(input.snapshotDirectory
        ? { sourceRootId: computeSourceRootIdentifier(input.snapshotDirectory) }
        : {}),
      ...(input.restoreRoot
        ? { targetRootId: computeSourceRootIdentifier(input.restoreRoot) }
        : {}),
      disposition: "failed",
      reason: input.reason,
      evidenceReferences: {
        snapshotReference: input.snapshotDirectory
          ? "snapshot_directory_declared"
          : "snapshot_directory_unavailable",
        restoreTargetReference: "declared_restore_target"
      }
    });
    return Object.freeze({
      ok: false,
      operationRecord,
      restoreTargetDirectory: input.restoreRoot ?? this.journalOperationStateDirectory,
      reason: input.reason
    });
  }

  private recordFailedVerifyResult(input: {
    operationId: ImmutableIdentifier;
    reason: string;
    snapshotDirectory: string | undefined;
    input: VerifyOperationInput;
  }): VerifyOperationResult {
    const operationRecord = this.journal.appendRecord({
      operationId: input.operationId,
      operationType: "verify",
      owner: M5_OPERATION_OWNER,
      ...(input.input.correlationId ? { correlationId: input.input.correlationId } : {}),
      ...(input.input.causationOperationId
        ? { causationOperationId: input.input.causationOperationId }
        : {}),
      ...(input.snapshotDirectory
        ? { sourceRootId: computeSourceRootIdentifier(input.snapshotDirectory) }
        : {}),
      disposition: "failed",
      reason: input.reason,
      evidenceReferences: {
        snapshotReference: input.snapshotDirectory
          ? "snapshot_directory_declared"
          : "snapshot_directory_unavailable"
      }
    });
    return Object.freeze({
      ok: false,
      operationRecord,
      snapshotDirectory: input.snapshotDirectory ?? this.journalOperationStateDirectory,
      reason: input.reason
    });
  }

  private toSnapshotReference(snapshotId: ImmutableIdentifier | undefined): string {
    if (!snapshotId) {
      return "snapshot_id_unavailable";
    }
    return `snapshot_id:${snapshotId}`;
  }
}

function tryResolvePath(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  return path.resolve(trimmed);
}
