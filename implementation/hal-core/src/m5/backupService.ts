import { cpSync, lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import {
  parseManifestFromFile,
  serializeManifest,
  sha256Hex,
  buildManifest,
  computeSourceRootIdentifier
} from "./manifest.js";
import {
  assertDeclaredRootDirectory,
  assertContainedPath,
  assertNoSymlinkAtPath,
  assertUniqueDeclaredRoots,
  toPosixRelativePath
} from "./pathSafety.js";
import type {
  BackupOperationInput,
  LogicalContentClass,
  M5ArtifactMappingEntry,
  M5ManifestFileEntry
} from "./types.js";

const REQUIRED_JOURNALS = [
  "m2-event-journal.jsonl",
  "m3-event-journal.jsonl",
  "m4-event-journal.jsonl"
] as const;
const OPTIONAL_JOURNALS = ["m6-event-journal.jsonl"] as const;
const OPTIONAL_M9_JOURNAL_RELATIVE = "m9/m9-pack-activation-journal.jsonl" as const;

type CapturedSourceFile = Readonly<{
  sourceAbsolutePath: string;
  relativePath: string;
  logicalContentClass: LogicalContentClass;
  artifactReferenceId?: ImmutableIdentifier;
}>;

export type BackupSnapshotResult = Readonly<{
  snapshotId: ImmutableIdentifier;
  snapshotDirectory: string;
  manifestPath: string;
  invalidationMarkerPath?: string;
  manifestIntegrityHash?: string;
  reason: string;
}>;

export function createBackupSnapshot(input: BackupOperationInput): BackupSnapshotResult {
  const sourceStateDirectory = assertDeclaredRootDirectory(
    input.sourceStateDirectory,
    "sourceStateDirectory"
  );
  const backupRoot = assertDeclaredRootDirectory(input.backupRoot, "backupRoot");
  const operationStateDirectory = assertDeclaredRootDirectory(
    input.operationStateDirectory,
    "operationStateDirectory"
  );
  assertUniqueDeclaredRoots({ sourceStateDirectory, backupRoot, operationStateDirectory });
  if (!input.sourceCommitRef.trim()) {
    throw new Error("sourceCommitRef is required.");
  }
  if (!input.sourceVersion.trim()) {
    throw new Error("sourceVersion is required.");
  }
  if (!input.classification.trim()) {
    throw new Error("classification is required.");
  }
  if (!input.initiatedBy.trim()) {
    throw new Error("initiatedBy is required.");
  }

  const snapshotId = createImmutableIdentifier("m5_snapshot");
  const snapshotDirectory = path.resolve(backupRoot, snapshotId);
  const payloadDirectory = path.resolve(snapshotDirectory, "payload");
  const manifestPath = path.resolve(snapshotDirectory, "manifest.json");
  assertContainedPath(backupRoot, snapshotDirectory, "snapshotDirectory");
  assertNoSymlinkAtPath(snapshotDirectory, "snapshotDirectory");
  if (path.resolve(snapshotDirectory) === path.resolve(backupRoot)) {
    throw new Error("snapshot directory cannot equal backup root.");
  }
  if (exists(snapshotDirectory)) {
    throw new Error("snapshot collision detected.");
  }

  const capturedFiles = collectAllowlistedSourceFiles(sourceStateDirectory);
  mkdirSync(payloadDirectory, { recursive: true });

  try {
    for (const file of capturedFiles) {
      const destination = path.resolve(payloadDirectory, file.relativePath);
      assertContainedPath(payloadDirectory, destination, "snapshot payload");
      mkdirSync(path.dirname(destination), { recursive: true });
      cpSync(file.sourceAbsolutePath, destination, { dereference: false, force: false });
      const sourceHash = sha256Hex(readFileSync(file.sourceAbsolutePath));
      const destinationHash = sha256Hex(readFileSync(destination));
      if (sourceHash !== destinationHash) {
        throw new Error(`Copied file hash mismatch for ${file.relativePath}.`);
      }
    }

    const manifestFiles = capturedFiles
      .map((file): M5ManifestFileEntry => {
        const copiedAbsolutePath = path.resolve(payloadDirectory, file.relativePath);
        const content = readFileSync(copiedAbsolutePath);
        return Object.freeze({
          relativePath: file.relativePath,
          byteSize: content.byteLength,
          sha256: sha256Hex(content),
          logicalContentClass: file.logicalContentClass
        });
      })
      .sort((a, b) => a.relativePath.localeCompare(b.relativePath));

    const artifactMappings = capturedFiles
      .filter((entry) => entry.logicalContentClass === "m3_artifact" && entry.artifactReferenceId)
      .map((entry): M5ArtifactMappingEntry =>
        Object.freeze({
          artifactReferenceId: entry.artifactReferenceId as ImmutableIdentifier,
          payloadRelativePath: entry.relativePath
        })
      )
      .sort((a, b) => a.artifactReferenceId.localeCompare(b.artifactReferenceId));

    const manifest = buildManifest({
      snapshotId,
      sourceCommitRef: input.sourceCommitRef,
      sourceVersion: input.sourceVersion,
      classification: input.classification,
      initiatedBy: input.initiatedBy,
      sourceRootId: computeSourceRootIdentifier(sourceStateDirectory),
      ...(input.correlationId ? { correlationId: input.correlationId } : {}),
      files: manifestFiles,
      artifactMappings
    });
    writeFileSync(manifestPath, serializeManifest(manifest), "utf8");
    const validated = parseManifestFromFile(manifestPath);

    return Object.freeze({
      snapshotId,
      snapshotDirectory,
      manifestPath,
      manifestIntegrityHash: validated.manifestIntegrityHash,
      reason: "Backup snapshot completed and verified."
    });
  } catch (error) {
    const invalidationMarkerPath = path.resolve(snapshotDirectory, "SNAPSHOT_INVALID.json");
    writeFileSync(
      invalidationMarkerPath,
      `${JSON.stringify(
        {
          snapshotId,
          reason: (error as Error).message,
          markedAtUtc: new Date().toISOString()
        },
        null,
        2
      )}\n`,
      "utf8"
    );
    return Object.freeze({
      snapshotId,
      snapshotDirectory,
      manifestPath,
      invalidationMarkerPath,
      reason: `Backup snapshot failed and marked invalid: ${(error as Error).message}`
    });
  }
}

function collectAllowlistedSourceFiles(
  sourceStateDirectory: string
): readonly CapturedSourceFile[] {
  assertDeclaredRootDirectory(sourceStateDirectory, "sourceStateDirectory");
  const discoveredTopLevel = readdirSync(sourceStateDirectory);
  for (const name of discoveredTopLevel) {
    if (REQUIRED_JOURNALS.includes(name as (typeof REQUIRED_JOURNALS)[number])) {
      continue;
    }
    if (OPTIONAL_JOURNALS.includes(name as (typeof OPTIONAL_JOURNALS)[number])) {
      continue;
    }
    if (name === "m9") {
      const m9Directory = path.resolve(sourceStateDirectory, "m9");
      const m9Stat = lstatSync(m9Directory);
      if (m9Stat.isSymbolicLink() || !m9Stat.isDirectory()) {
        throw new Error("m9 activation directory is invalid.");
      }
      const m9Entries = readdirSync(m9Directory);
      for (const m9Entry of m9Entries) {
        if (m9Entry !== "m9-pack-activation-journal.jsonl") {
          throw new Error(`Unexpected m9 entry detected: ${m9Entry}`);
        }
      }
      continue;
    }
    if (name === "m3-artifacts") {
      continue;
    }
    throw new Error(`Unexpected source entry detected: ${name}`);
  }

  const files: CapturedSourceFile[] = [];
  for (const journalName of REQUIRED_JOURNALS) {
    const journalPath = path.resolve(sourceStateDirectory, journalName);
    assertRegularFileNoSymlink(journalPath, journalName);
    files.push(
      Object.freeze({
        sourceAbsolutePath: journalPath,
        relativePath: journalName,
        logicalContentClass: toLogicalClass(journalName)
      })
    );
  }
  for (const journalName of OPTIONAL_JOURNALS) {
    const journalPath = path.resolve(sourceStateDirectory, journalName);
    const exists = lstatSync(journalPath, { throwIfNoEntry: false });
    if (!exists) {
      continue;
    }
    assertRegularFileNoSymlink(journalPath, journalName);
    files.push(
      Object.freeze({
        sourceAbsolutePath: journalPath,
        relativePath: journalName,
        logicalContentClass: toLogicalClass(journalName)
      })
    );
  }
  const optionalM9Path = path.resolve(sourceStateDirectory, OPTIONAL_M9_JOURNAL_RELATIVE);
  const optionalM9Stat = lstatSync(optionalM9Path, { throwIfNoEntry: false });
  if (optionalM9Stat) {
    assertRegularFileNoSymlink(optionalM9Path, OPTIONAL_M9_JOURNAL_RELATIVE);
    files.push(
      Object.freeze({
        sourceAbsolutePath: optionalM9Path,
        relativePath: OPTIONAL_M9_JOURNAL_RELATIVE,
        logicalContentClass: "m9_journal"
      })
    );
  }

  const artifactRoot = path.resolve(sourceStateDirectory, "m3-artifacts");
  if (exists(artifactRoot)) {
    assertDeclaredRootDirectory(artifactRoot, "m3-artifacts");
    files.push(...collectArtifactFiles(artifactRoot));
  }

  return Object.freeze(files.sort((a, b) => a.relativePath.localeCompare(b.relativePath)));
}

function collectArtifactFiles(artifactRoot: string): readonly CapturedSourceFile[] {
  const items = readdirSync(artifactRoot, { withFileTypes: true });
  const files: CapturedSourceFile[] = [];
  for (const item of items) {
    const absolute = path.resolve(artifactRoot, item.name);
    const stat = lstatSync(absolute);
    if (stat.isSymbolicLink()) {
      throw new Error(`Symlink rejected in m3-artifacts: ${item.name}`);
    }
    if (!item.isFile()) {
      throw new Error(`Only regular files are allowed in m3-artifacts. Found: ${item.name}`);
    }
    const relativeFromState = toPosixRelativePath(path.dirname(artifactRoot), absolute);
    const artifactReferenceId = parseArtifactReferenceIdFromFile(absolute);
    files.push(
      Object.freeze({
        sourceAbsolutePath: absolute,
        relativePath: relativeFromState,
        logicalContentClass: "m3_artifact",
        artifactReferenceId
      })
    );
  }
  return Object.freeze(files.sort((a, b) => a.relativePath.localeCompare(b.relativePath)));
}

function parseArtifactReferenceIdFromFile(filePath: string): ImmutableIdentifier {
  const parsed = JSON.parse(readFileSync(filePath, "utf8")) as { artifactId?: string };
  if (!parsed.artifactId || !parsed.artifactId.trim()) {
    throw new Error(`Artifact file missing artifactId field: ${path.basename(filePath)}`);
  }
  return parsed.artifactId as ImmutableIdentifier;
}

function assertRegularFileNoSymlink(filePath: string, label: string): void {
  const lstat = lstatSync(filePath, { throwIfNoEntry: false });
  if (!lstat) {
    throw new Error(`Required file missing: ${label}`);
  }
  if (lstat.isSymbolicLink()) {
    throw new Error(`Symlink rejected: ${label}`);
  }
  if (!lstat.isFile()) {
    throw new Error(`Required file is not a regular file: ${label}`);
  }
}

function toLogicalClass(
  fileName: (typeof REQUIRED_JOURNALS)[number] | (typeof OPTIONAL_JOURNALS)[number]
): LogicalContentClass {
  if (fileName === "m2-event-journal.jsonl") {
    return "m2_journal";
  }
  if (fileName === "m3-event-journal.jsonl") {
    return "m3_journal";
  }
  if (fileName === "m6-event-journal.jsonl") {
    return "m6_journal";
  }
  return "m4_journal";
}

function exists(absolutePath: string): boolean {
  return lstatSync(absolutePath, { throwIfNoEntry: false }) !== undefined;
}
