import path from "node:path";

import { LocalBackupRestoreCoordinator } from "../m5/index.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";

type M5Mode = "backup" | "restore" | "verify";

function parseFlag(argv: readonly string[], flag: string): string | undefined {
  const index = argv.indexOf(flag);
  if (index < 0) {
    return undefined;
  }
  return argv[index + 1];
}

function requireFlag(argv: readonly string[], flag: string): string {
  const value = parseFlag(argv, flag);
  if (!value?.trim()) {
    throw new Error(`Missing required ${flag}.`);
  }
  return value.trim();
}

function parseMode(argv: readonly string[]): M5Mode {
  const mode = argv[0];
  if (mode === "backup" || mode === "restore" || mode === "verify") {
    return mode;
  }
  throw new Error("Mode must be one of: backup, restore, verify.");
}

function printUsage(): void {
  console.log("HAL M5 local backup/restore CLI");
  console.log(
    "backup:  npm run m5:backup-restore -- backup --source-state-dir <dir> --backup-root <dir> --operation-state-dir <dir> --source-commit-ref <ref> --source-version <version> --classification <label> --initiated-by <owner> [--correlation-id <id>] [--causation-operation-id <id>]"
  );
  console.log(
    "restore: npm run m5:backup-restore -- restore --snapshot-dir <dir> --snapshot-root <dir> --restore-target-dir <dir> --restore-root <dir> --operation-state-dir <dir> [--correlation-id <id>] [--causation-operation-id <id>]"
  );
  console.log(
    "verify:  npm run m5:backup-restore -- verify --snapshot-dir <dir> --snapshot-root <dir> --operation-state-dir <dir> [--correlation-id <id>] [--causation-operation-id <id>]"
  );
}

function parseOptionalCorrelation(argv: readonly string[]): CorrelationId | undefined {
  const value = parseFlag(argv, "--correlation-id");
  return value?.trim() ? (value as CorrelationId) : undefined;
}

function parseOptionalCausationOperationId(
  argv: readonly string[]
): ImmutableIdentifier | undefined {
  const value = parseFlag(argv, "--causation-operation-id");
  return value?.trim() ? (value as ImmutableIdentifier) : undefined;
}

function main(): void {
  const argv = process.argv.slice(2);
  if (argv.includes("--help")) {
    printUsage();
    return;
  }

  const mode = parseMode(argv);
  const operationStateDirectory = path.resolve(requireFlag(argv, "--operation-state-dir"));
  const correlationId = parseOptionalCorrelation(argv);
  const causationOperationId = parseOptionalCausationOperationId(argv);
  const coordinator = new LocalBackupRestoreCoordinator(operationStateDirectory);

  if (mode === "backup") {
    const result = coordinator.runBackup({
      sourceStateDirectory: path.resolve(requireFlag(argv, "--source-state-dir")),
      backupRoot: path.resolve(requireFlag(argv, "--backup-root")),
      operationStateDirectory,
      sourceCommitRef: requireFlag(argv, "--source-commit-ref"),
      sourceVersion: requireFlag(argv, "--source-version"),
      classification: requireFlag(argv, "--classification"),
      initiatedBy: requireFlag(argv, "--initiated-by"),
      ...(correlationId ? { correlationId } : {}),
      ...(causationOperationId ? { causationOperationId } : {})
    });
    console.log(`ok: ${result.ok}`);
    console.log(`snapshotDirectory: ${result.snapshotDirectory}`);
    console.log(`snapshotId: ${result.snapshotId ?? "none"}`);
    console.log(`manifestPath: ${result.manifestPath ?? "none"}`);
    console.log(`manifestIntegrityHash: ${result.manifestIntegrityHash ?? "none"}`);
    console.log(`operationRecordId: ${result.operationRecord.operationRecordId}`);
    console.log(`operationJournal: ${coordinator.getOperationJournalPath()}`);
    console.log(`reason: ${result.reason}`);
    return;
  }

  if (mode === "restore") {
    const result = coordinator.runRestore({
      snapshotDirectory: path.resolve(requireFlag(argv, "--snapshot-dir")),
      snapshotRoot: path.resolve(requireFlag(argv, "--snapshot-root")),
      restoreTargetDirectory: path.resolve(requireFlag(argv, "--restore-target-dir")),
      restoreRoot: path.resolve(requireFlag(argv, "--restore-root")),
      operationStateDirectory,
      ...(correlationId ? { correlationId } : {}),
      ...(causationOperationId ? { causationOperationId } : {})
    });
    console.log(`ok: ${result.ok}`);
    console.log(`restoreTargetDirectory: ${result.restoreTargetDirectory}`);
    console.log(`snapshotId: ${result.snapshotId ?? "none"}`);
    console.log(`operationRecordId: ${result.operationRecord.operationRecordId}`);
    console.log(`operationJournal: ${coordinator.getOperationJournalPath()}`);
    console.log(`reason: ${result.reason}`);
    return;
  }

  const verifyResult = coordinator.runVerify({
    snapshotDirectory: path.resolve(requireFlag(argv, "--snapshot-dir")),
    snapshotRoot: path.resolve(requireFlag(argv, "--snapshot-root")),
    operationStateDirectory,
    ...(correlationId ? { correlationId } : {}),
    ...(causationOperationId ? { causationOperationId } : {})
  });
  console.log(`ok: ${verifyResult.ok}`);
  console.log(`snapshotDirectory: ${verifyResult.snapshotDirectory}`);
  console.log(`snapshotId: ${verifyResult.snapshotId ?? "none"}`);
  console.log(`operationRecordId: ${verifyResult.operationRecord.operationRecordId}`);
  console.log(`operationJournal: ${coordinator.getOperationJournalPath()}`);
  console.log(`reason: ${verifyResult.reason}`);
}

main();
