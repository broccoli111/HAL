import { cpSync, lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { sha256Hex } from "./manifest.js";
import type { RestoreOperationInput } from "./types.js";
import { verifySnapshotDirectory } from "./verificationService.js";
import {
  assertDeclaredRootDirectory,
  assertContainedPath,
  assertNoSymlinkAtPath,
  assertNoSymlinkSegmentsUnderRoot,
  assertUniqueDeclaredRoots,
  requireNonEmptyPath
} from "./pathSafety.js";

export type RestoreSnapshotResult = Readonly<{
  snapshotId?: string;
  restoreTargetDirectory: string;
  invalidationMarkerPath?: string;
  manifestIntegrityHash?: string;
  reason: string;
}>;

export function restoreSnapshotToTarget(input: RestoreOperationInput): RestoreSnapshotResult {
  const snapshotRoot = assertDeclaredRootDirectory(input.snapshotRoot, "snapshotRoot");
  const snapshotDirectory = requireNonEmptyPath(input.snapshotDirectory, "snapshotDirectory");
  const restoreTargetDirectory = requireNonEmptyPath(
    input.restoreTargetDirectory,
    "restoreTargetDirectory"
  );
  const restoreRoot = assertDeclaredRootDirectory(input.restoreRoot, "restoreRoot");
  const operationStateDirectory = assertDeclaredRootDirectory(
    input.operationStateDirectory,
    "operationStateDirectory"
  );
  assertUniqueDeclaredRoots({ snapshotRoot, restoreRoot, operationStateDirectory });
  assertContainedPath(snapshotRoot, snapshotDirectory, "snapshotDirectory");
  assertNoSymlinkAtPath(snapshotDirectory, "snapshotDirectory");
  assertNoSymlinkSegmentsUnderRoot(snapshotRoot, snapshotDirectory, "snapshotDirectory");
  assertContainedPath(restoreRoot, restoreTargetDirectory, "restore target");
  assertNoSymlinkSegmentsUnderRoot(restoreRoot, restoreTargetDirectory, "restore target");
  assertNoSymlinkAtPath(restoreTargetDirectory, "restoreTargetDirectory");

  if (path.resolve(snapshotDirectory) === path.resolve(restoreTargetDirectory)) {
    throw new Error("restore target cannot equal snapshot directory.");
  }

  if (exists(restoreTargetDirectory)) {
    const entries = readdirSync(restoreTargetDirectory);
    if (entries.length > 0) {
      throw new Error("restore target must be newly created or empty.");
    }
  } else {
    mkdirSync(restoreTargetDirectory, { recursive: true });
  }

  const invalidationMarkerPath = path.resolve(restoreTargetDirectory, "RESTORE_INVALID.json");
  try {
    const verification = verifySnapshotDirectory(snapshotDirectory, snapshotRoot);
    const payloadDirectory = verification.payloadDirectory;
    for (const file of verification.manifest.files) {
      const sourceAbsolutePath = path.resolve(payloadDirectory, file.relativePath);
      assertContainedPath(payloadDirectory, sourceAbsolutePath, "snapshot payload copy source");
      const destinationAbsolutePath = path.resolve(restoreTargetDirectory, file.relativePath);
      assertContainedPath(restoreTargetDirectory, destinationAbsolutePath, "restore destination");
      mkdirSync(path.dirname(destinationAbsolutePath), { recursive: true });
      cpSync(sourceAbsolutePath, destinationAbsolutePath, { dereference: false, force: false });
      const copiedHash = verifyRestoredRegularFileHash(destinationAbsolutePath);
      if (copiedHash !== file.sha256) {
        throw new Error(`restored file hash mismatch for ${file.relativePath}`);
      }
    }
    validateRestoredTarget(restoreTargetDirectory, verification.manifest.files);
    return Object.freeze({
      snapshotId: verification.manifest.snapshotId,
      restoreTargetDirectory,
      manifestIntegrityHash: verification.manifest.manifestIntegrityHash,
      reason: "Restore completed with validated manifest, journal chains, and artifacts."
    });
  } catch (error) {
    writeFileSync(
      invalidationMarkerPath,
      `${JSON.stringify(
        {
          reason: (error as Error).message,
          markedAtUtc: new Date().toISOString()
        },
        null,
        2
      )}\n`,
      "utf8"
    );
    return Object.freeze({
      restoreTargetDirectory,
      invalidationMarkerPath,
      reason: `Restore failed and target marked invalid: ${(error as Error).message}`
    });
  }
}

function validateRestoredTarget(
  restoreTargetDirectory: string,
  files: readonly { relativePath: string; sha256: string; byteSize: number }[]
): void {
  for (const file of files) {
    const absolutePath = path.resolve(restoreTargetDirectory, file.relativePath);
    assertContainedPath(restoreTargetDirectory, absolutePath, "restored file path");
    const lstat = lstatSync(absolutePath, { throwIfNoEntry: false });
    if (!lstat || lstat.isSymbolicLink() || !lstat.isFile()) {
      throw new Error(`Restored output is invalid or missing: ${file.relativePath}`);
    }
    const bytes = readFileSync(absolutePath);
    if (bytes.byteLength !== file.byteSize) {
      throw new Error(`Restored output size mismatch for ${file.relativePath}`);
    }
    const hash = sha256Hex(bytes);
    if (hash !== file.sha256) {
      throw new Error(`Restored output hash mismatch for ${file.relativePath}`);
    }
  }
}

function verifyRestoredRegularFileHash(filePath: string): string {
  const lstat = lstatSync(filePath, { throwIfNoEntry: false });
  if (!lstat || lstat.isSymbolicLink() || !lstat.isFile()) {
    throw new Error(`Restore output file invalid: ${filePath}`);
  }
  return sha256Hex(readFileSync(filePath));
}

function exists(absolutePath: string): boolean {
  return lstatSync(absolutePath, { throwIfNoEntry: false }) !== undefined;
}
