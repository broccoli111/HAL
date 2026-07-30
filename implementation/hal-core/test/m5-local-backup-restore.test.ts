import { mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { lstatSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";

import { runM2DurableIntentDemo } from "../src/m2/index.js";
import { reconstructM4Trace, runM4VerifiedOutcomeDemo } from "../src/m4/index.js";
import { LocalBackupRestoreCoordinator } from "../src/m5/coordinator.js";
import { parseManifestFromFile, sha256Hex } from "../src/m5/manifest.js";
import { M5OperationJournal } from "../src/m5/operationJournal.js";
import { verifySnapshotDirectory } from "../src/m5/verificationService.js";
import type { CorrelationId } from "../src/shared/types.js";

async function createTempDirectory(prefix: string): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), prefix));
}

async function seedStateWithM4Success(
  sourceStateDirectory: string
): Promise<{ correlationId: CorrelationId }> {
  const result = runM4VerifiedOutcomeDemo({
    stateDirectory: sourceStateDirectory,
    scenario: "allowed_verified"
  });
  return { correlationId: result.correlationId };
}

async function latestOperationRecordReason(
  operationStateDirectory: string
): Promise<{ reason: string; disposition: string }> {
  const journalPath = path.resolve(operationStateDirectory, "m5-backup-restore-journal.jsonl");
  const lines = (await readFile(journalPath, "utf8"))
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const latest = JSON.parse(lines.at(-1) ?? "{}") as { reason?: string; disposition?: string };
  return {
    reason: latest.reason ?? "",
    disposition: latest.disposition ?? ""
  };
}

describe("M5 local backup and restore", () => {
  test("backup + restore + verify preserve valid M2/M3/M4 reconstruction", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    const restoreRoot = await createTempDirectory("hal-m5-restore-root-");
    const restoreTargetDirectory = path.resolve(restoreRoot, "restored-state");
    try {
      const { correlationId } = await seedStateWithM4Success(sourceStateDirectory);
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "test-commit",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test",
        correlationId
      });
      expect(backup.ok).toBe(true);
      expect(backup.snapshotId).toBeDefined();
      expect(backup.manifestPath).toBeDefined();

      const restore = coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory,
        restoreRoot,
        operationStateDirectory,
        correlationId
      });
      expect(restore.ok).toBe(true);

      const verify = coordinator.runVerify({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        operationStateDirectory,
        correlationId
      });
      expect(verify.ok).toBe(true);

      const reconstructed = reconstructM4Trace(restoreTargetDirectory, correlationId);
      expect(reconstructed.finalOutcomeStatus).toBe("achieved_without_effect");
      expect(reconstructed.claimedEffect).toBe("inspection_only");
      expect(reconstructed.crossJournalLinkageValid).toBe(true);
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
    }
  });

  test("manifest generation is deterministic for files and mappings", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const first = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      const second = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      if (!first.manifestPath || !second.manifestPath) {
        throw new Error("Expected both manifests to exist.");
      }
      const firstManifest = parseManifestFromFile(first.manifestPath);
      const secondManifest = parseManifestFromFile(second.manifestPath);
      expect(firstManifest.files).toEqual(secondManifest.files);
      expect(firstManifest.artifactMappings).toEqual(secondManifest.artifactMappings);
      expect(firstManifest.manifestIntegrityHash).not.toBe(secondManifest.manifestIntegrityHash);
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
    }
  });

  test("restored journals remain immutable while artifact mapping verifies separately", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    const restoreRoot = await createTempDirectory("hal-m5-restore-root-");
    const restoreTargetDirectory = path.resolve(restoreRoot, "restored-state");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      const originalM3Journal = await readFile(
        path.resolve(sourceStateDirectory, "m3-event-journal.jsonl"),
        "utf8"
      );
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory,
        restoreRoot,
        operationStateDirectory
      });

      const restoredM3Journal = await readFile(
        path.resolve(restoreTargetDirectory, "m3-event-journal.jsonl"),
        "utf8"
      );
      expect(restoredM3Journal).toBe(originalM3Journal);

      const verified = verifySnapshotDirectory(backup.snapshotDirectory, backupRoot);
      expect(verified.verifiedArtifactCount).toBeGreaterThanOrEqual(1);
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
    }
  });

  test("tampered snapshot content is rejected by verify and restore", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    const restoreRoot = await createTempDirectory("hal-m5-restore-root-");
    const restoreTargetDirectory = path.resolve(restoreRoot, "restore-target");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });

      const manifest = parseManifestFromFile(
        path.resolve(backup.snapshotDirectory, "manifest.json")
      );
      const artifactPath = manifest.files.find(
        (entry) => entry.logicalContentClass === "m3_artifact"
      );
      if (!artifactPath) {
        throw new Error("Expected at least one captured artifact.");
      }
      await writeFile(
        path.resolve(backup.snapshotDirectory, "payload", artifactPath.relativePath),
        `${JSON.stringify({ tampered: true }, null, 2)}\n`,
        "utf8"
      );

      const verify = coordinator.runVerify({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        operationStateDirectory
      });
      expect(verify.ok).toBe(false);

      const restore = coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory,
        restoreRoot,
        operationStateDirectory
      });
      expect(restore.ok).toBe(false);
      expect(lstatSync(path.resolve(restoreTargetDirectory, "RESTORE_INVALID.json")).isFile()).toBe(
        true
      );
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
    }
  });

  test("backup rejects unexpected top-level files and symlinks", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      await writeFile(
        path.resolve(sourceStateDirectory, "unexpected.txt"),
        "not allowed\n",
        "utf8"
      );

      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const unexpected = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      expect(unexpected.ok).toBe(false);

      await rm(path.resolve(sourceStateDirectory, "unexpected.txt"), { force: true });
      const symlinkTarget = path.resolve(sourceStateDirectory, "m2-event-journal.jsonl");
      const symlinkPath = path.resolve(sourceStateDirectory, "m3-artifacts", "symlink.json");
      await symlink(symlinkTarget, symlinkPath);
      const symlinkResult = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      expect(symlinkResult.ok).toBe(false);
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
    }
  });

  test("restore rejects out-of-root and non-empty target paths", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    const restoreRoot = await createTempDirectory("hal-m5-restore-root-");
    const outsideDirectory = await createTempDirectory("hal-m5-outside-");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      const outsideRestore = coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory: path.resolve(outsideDirectory, "not-allowed"),
        restoreRoot,
        operationStateDirectory
      });
      expect(outsideRestore.ok).toBe(false);

      const nonEmptyTarget = path.resolve(restoreRoot, "non-empty");
      await mkdir(nonEmptyTarget, { recursive: true });
      await writeFile(path.resolve(nonEmptyTarget, "existing.txt"), "already here", "utf8");
      const restoreNonEmpty = coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory: nonEmptyTarget,
        restoreRoot,
        operationStateDirectory
      });
      expect(restoreNonEmpty.ok).toBe(false);
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
      await rm(outsideDirectory, { recursive: true, force: true });
    }
  });

  test("failed verification marks restore target invalid and no success is reported", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    const restoreRoot = await createTempDirectory("hal-m5-restore-root-");
    const restoreTargetDirectory = path.resolve(restoreRoot, "restore-target");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      await writeFile(path.resolve(backup.snapshotDirectory, "manifest.json"), "{bad json", "utf8");
      const restore = coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory,
        restoreRoot,
        operationStateDirectory
      });
      expect(restore.ok).toBe(false);
      expect(lstatSync(path.resolve(restoreTargetDirectory, "RESTORE_INVALID.json")).isFile()).toBe(
        true
      );
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
    }
  });

  test("source state remains unchanged after backup and restore", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    const restoreRoot = await createTempDirectory("hal-m5-restore-root-");
    const restoreTargetDirectory = path.resolve(restoreRoot, "restored-state");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      const preHash = sha256Hex(
        await readFile(path.resolve(sourceStateDirectory, "m3-event-journal.jsonl"))
      );
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory,
        restoreRoot,
        operationStateDirectory
      });
      const postHash = sha256Hex(
        await readFile(path.resolve(sourceStateDirectory, "m3-event-journal.jsonl"))
      );
      expect(preHash).toBe(postHash);
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
    }
  });

  test("M5 operation journal hash-chain tampering fails closed", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      const journalPath = coordinator.getOperationJournalPath();
      const original = await readFile(journalPath, "utf8");
      const lines = original.trim().split("\n");
      const first = JSON.parse(lines[0] ?? "{}") as Record<string, unknown>;
      first.reason = "tampered";
      lines[0] = JSON.stringify(first);
      await writeFile(journalPath, `${lines.join("\n")}\n`, "utf8");

      expect(() => new M5OperationJournal(operationStateDirectory).listAll()).toThrow(
        /integrity mismatch|previous hash mismatch/
      );
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
    }
  });

  test("restore and verify reject snapshot directories outside declared snapshot root", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const outsideSnapshotRoot = await createTempDirectory("hal-m5-outside-snapshot-root-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    const restoreRoot = await createTempDirectory("hal-m5-restore-root-");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      const verify = coordinator.runVerify({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: outsideSnapshotRoot,
        operationStateDirectory
      });
      expect(verify.ok).toBe(false);
      const restore = coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: outsideSnapshotRoot,
        restoreTargetDirectory: path.resolve(restoreRoot, "restored-1"),
        restoreRoot,
        operationStateDirectory
      });
      expect(restore.ok).toBe(false);
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(outsideSnapshotRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
    }
  });

  test("symlinked declared roots are rejected", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    const restoreRoot = await createTempDirectory("hal-m5-restore-root-");
    const targetForSymlink = await createTempDirectory("hal-m5-symlink-target-");
    const symlinkRoot = path.resolve(await createTempDirectory("hal-m5-links-"), "symlink-root");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      await symlink(targetForSymlink, symlinkRoot, "dir");

      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backupWithSymlinkedSource = coordinator.runBackup({
        sourceStateDirectory: symlinkRoot,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      expect(backupWithSymlinkedSource.ok).toBe(false);

      const validBackup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      const verifyWithSymlinkedSnapshotRoot = coordinator.runVerify({
        snapshotDirectory: validBackup.snapshotDirectory,
        snapshotRoot: symlinkRoot,
        operationStateDirectory
      });
      expect(verifyWithSymlinkedSnapshotRoot.ok).toBe(false);

      const restoreWithSymlinkedRestoreRoot = coordinator.runRestore({
        snapshotDirectory: validBackup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory: path.resolve(symlinkRoot, "restored-1"),
        restoreRoot: symlinkRoot,
        operationStateDirectory
      });
      expect(restoreWithSymlinkedRestoreRoot.ok).toBe(false);
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
      await rm(targetForSymlink, { recursive: true, force: true });
      await rm(path.dirname(symlinkRoot), { recursive: true, force: true });
    }
  });

  test("mismatched or malformed operation-state input records durable failed operation", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    const differentOperationStateDirectory = await createTempDirectory("hal-m5-ops-other-");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);

      const mismatch = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory: differentOperationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      expect(mismatch.ok).toBe(false);
      let latest = await latestOperationRecordReason(operationStateDirectory);
      expect(latest.disposition).toBe("failed");
      expect(latest.reason).toContain("operationStateDirectory input must exactly match");

      const malformed = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory: " ",
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      expect(malformed.ok).toBe(false);
      latest = await latestOperationRecordReason(operationStateDirectory);
      expect(latest.disposition).toBe("failed");
      expect(latest.reason).toContain("operationStateDirectory is required");
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
      await rm(differentOperationStateDirectory, { recursive: true, force: true });
    }
  });

  test("mixed success and blocked/no-effect correlations backup and verify successfully", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      runM2DurableIntentDemo({
        configuration: { environment: "test", safeMode: "restrictive", ownerId: "owner-local-dev" },
        fixtureName: "denied_unknown_request",
        stateDirectory: sourceStateDirectory
      });
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      expect(backup.ok).toBe(true);

      const verify = coordinator.runVerify({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        operationStateDirectory
      });
      expect(verify.ok).toBe(true);
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
    }
  });

  test("manifest structural validation rejects duplicates and invalid mappings", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      const manifestPath = path.resolve(backup.snapshotDirectory, "manifest.json");
      const originalManifest = JSON.parse(await readFile(manifestPath, "utf8")) as {
        files: Array<{
          relativePath: string;
          byteSize: number;
          sha256: string;
          logicalContentClass: string;
        }>;
        artifactMappings: Array<{ artifactReferenceId: string; payloadRelativePath: string }>;
      };

      const duplicateFileManifest = deepCloneJson(originalManifest);
      duplicateFileManifest.files.push(duplicateFileManifest.files[0]!);
      await writeFile(manifestPath, `${JSON.stringify(duplicateFileManifest, null, 2)}\n`, "utf8");
      expect(
        coordinator.runVerify({
          snapshotDirectory: backup.snapshotDirectory,
          snapshotRoot: backupRoot,
          operationStateDirectory
        }).ok
      ).toBe(false);

      const duplicateMappingManifest = deepCloneJson(originalManifest);
      if (duplicateMappingManifest.artifactMappings.length === 0) {
        throw new Error("Expected artifact mappings in seeded manifest.");
      }
      duplicateMappingManifest.artifactMappings.push(duplicateMappingManifest.artifactMappings[0]!);
      await writeFile(
        manifestPath,
        `${JSON.stringify(duplicateMappingManifest, null, 2)}\n`,
        "utf8"
      );
      expect(
        coordinator.runVerify({
          snapshotDirectory: backup.snapshotDirectory,
          snapshotRoot: backupRoot,
          operationStateDirectory
        }).ok
      ).toBe(false);

      const invalidMappingManifest = deepCloneJson(originalManifest);
      invalidMappingManifest.artifactMappings[0] = {
        ...invalidMappingManifest.artifactMappings[0]!,
        payloadRelativePath: "m2-event-journal.jsonl"
      };
      await writeFile(manifestPath, `${JSON.stringify(invalidMappingManifest, null, 2)}\n`, "utf8");
      expect(
        coordinator.runVerify({
          snapshotDirectory: backup.snapshotDirectory,
          snapshotRoot: backupRoot,
          operationStateDirectory
        }).ok
      ).toBe(false);

      const missingJournalManifest = deepCloneJson(originalManifest);
      missingJournalManifest.files = missingJournalManifest.files.filter(
        (entry) => entry.relativePath !== "m2-event-journal.jsonl"
      );
      await writeFile(manifestPath, `${JSON.stringify(missingJournalManifest, null, 2)}\n`, "utf8");
      expect(
        coordinator.runVerify({
          snapshotDirectory: backup.snapshotDirectory,
          snapshotRoot: backupRoot,
          operationStateDirectory
        }).ok
      ).toBe(false);
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
    }
  });

  test("constructor rejects symlinked operation-state root before journal writes", async () => {
    const targetDirectory = await createTempDirectory("hal-m5-opstate-target-");
    const linksDirectory = await createTempDirectory("hal-m5-opstate-links-");
    const symlinkedOperationStateDirectory = path.resolve(linksDirectory, "opstate-link");
    try {
      await symlink(targetDirectory, symlinkedOperationStateDirectory, "dir");
      expect(() => new LocalBackupRestoreCoordinator(symlinkedOperationStateDirectory)).toThrow(
        /must not be a symlink/
      );
      const targetEntries = await readdir(targetDirectory);
      expect(targetEntries).toEqual([]);
    } finally {
      await rm(targetDirectory, { recursive: true, force: true });
      await rm(linksDirectory, { recursive: true, force: true });
    }
  });

  test("operation journal records do not persist absolute root paths", async () => {
    const sourceStateDirectory = await createTempDirectory("hal-m5-source-");
    const backupRoot = await createTempDirectory("hal-m5-backups-");
    const operationStateDirectory = await createTempDirectory("hal-m5-ops-");
    const restoreRoot = await createTempDirectory("hal-m5-restore-root-");
    const restoreTargetDirectory = path.resolve(restoreRoot, "restored-state");
    try {
      await seedStateWithM4Success(sourceStateDirectory);
      const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);
      const backup = coordinator.runBackup({
        sourceStateDirectory,
        backupRoot,
        operationStateDirectory,
        sourceCommitRef: "commit-a",
        sourceVersion: "0.1.0-test",
        classification: "synthetic_non_sensitive",
        initiatedBy: "owner_local_test"
      });
      coordinator.runVerify({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        operationStateDirectory
      });
      coordinator.runRestore({
        snapshotDirectory: backup.snapshotDirectory,
        snapshotRoot: backupRoot,
        restoreTargetDirectory,
        restoreRoot,
        operationStateDirectory
      });

      const journalContents = await readFile(coordinator.getOperationJournalPath(), "utf8");
      expect(journalContents).not.toContain(sourceStateDirectory);
      expect(journalContents).not.toContain(backupRoot);
      expect(journalContents).not.toContain(backup.snapshotDirectory);
      expect(journalContents).not.toContain(restoreRoot);
      expect(journalContents).not.toContain(restoreTargetDirectory);
      expect(journalContents).toContain("snapshot_id:");
      expect(journalContents).toContain("manifest.json");
    } finally {
      await rm(sourceStateDirectory, { recursive: true, force: true });
      await rm(backupRoot, { recursive: true, force: true });
      await rm(operationStateDirectory, { recursive: true, force: true });
      await rm(restoreRoot, { recursive: true, force: true });
    }
  });
});

function deepCloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
