import { lstatSync, readFileSync } from "node:fs";
import path from "node:path";

import { reconstructM2Trace } from "../m2/index.js";
import { reconstructM3Trace } from "../m3/index.js";
import { reconstructM4Trace } from "../m4/index.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { parseManifestFromFile, sha256Hex } from "./manifest.js";
import {
  assertContainedPath,
  assertDeclaredRootDirectory,
  assertNoSymlinkAtPath,
  assertNoSymlinkSegmentsUnderRoot
} from "./pathSafety.js";
import type { M5LocalBackupManifest } from "./types.js";

export type SnapshotVerificationResult = Readonly<{
  manifest: M5LocalBackupManifest;
  payloadDirectory: string;
  validatedFileCount: number;
  verifiedArtifactCount: number;
  reconstructionCount: number;
}>;

export function verifySnapshotDirectory(
  snapshotDirectory: string,
  snapshotRoot: string
): SnapshotVerificationResult {
  const resolvedSnapshotRoot = assertDeclaredRootDirectory(snapshotRoot, "snapshotRoot");
  const resolvedSnapshotDirectory = path.resolve(snapshotDirectory);
  assertContainedPath(resolvedSnapshotRoot, resolvedSnapshotDirectory, "snapshotDirectory");
  assertNoSymlinkAtPath(resolvedSnapshotDirectory, "snapshotDirectory");
  assertNoSymlinkSegmentsUnderRoot(
    resolvedSnapshotRoot,
    resolvedSnapshotDirectory,
    "snapshotDirectory"
  );
  const manifestPath = path.resolve(resolvedSnapshotDirectory, "manifest.json");
  const payloadDirectory = path.resolve(resolvedSnapshotDirectory, "payload");
  assertContainedPath(resolvedSnapshotDirectory, manifestPath, "manifest path");
  assertContainedPath(resolvedSnapshotDirectory, payloadDirectory, "payload path");

  const manifest = parseManifestFromFile(manifestPath);
  let validatedFileCount = 0;
  for (const file of manifest.files) {
    const absolute = path.resolve(payloadDirectory, file.relativePath);
    assertContainedPath(payloadDirectory, absolute, "payload file");
    const lstat = lstatSync(absolute, { throwIfNoEntry: false });
    if (!lstat || lstat.isSymbolicLink() || !lstat.isFile()) {
      throw new Error(`Snapshot payload file invalid or missing: ${file.relativePath}`);
    }
    const bytes = readFileSync(absolute);
    if (bytes.byteLength !== file.byteSize) {
      throw new Error(`Snapshot payload byte-size mismatch for ${file.relativePath}`);
    }
    const hash = sha256Hex(bytes);
    if (hash !== file.sha256) {
      throw new Error(`Snapshot payload hash mismatch for ${file.relativePath}`);
    }
    validatedFileCount += 1;
  }

  const verifiedArtifactCount = verifyArtifactsFromMapping(manifest, payloadDirectory);
  const reconstructionCount = verifyReconstructionViews(manifest, payloadDirectory);
  return Object.freeze({
    manifest,
    payloadDirectory,
    validatedFileCount,
    verifiedArtifactCount,
    reconstructionCount
  });
}

export function verifyArtifactsFromMapping(
  manifest: M5LocalBackupManifest,
  payloadDirectory: string
): number {
  let verifiedCount = 0;
  for (const mapping of manifest.artifactMappings) {
    const payloadAbsolutePath = path.resolve(payloadDirectory, mapping.payloadRelativePath);
    assertContainedPath(payloadDirectory, payloadAbsolutePath, "artifact payload path");
    const payloadBytes = readFileSync(payloadAbsolutePath);
    const parsed = JSON.parse(payloadBytes.toString("utf8")) as { artifactId?: string };
    if (parsed.artifactId !== mapping.artifactReferenceId) {
      throw new Error(
        `Artifact mapping mismatch: expected ${mapping.artifactReferenceId}, found ${parsed.artifactId ?? "missing"}`
      );
    }
    const fileEntry = manifest.files.find(
      (entry) => entry.relativePath === mapping.payloadRelativePath
    );
    if (!fileEntry) {
      throw new Error(
        `Artifact mapping references unknown payload path ${mapping.payloadRelativePath}`
      );
    }
    const hash = sha256Hex(payloadBytes);
    if (hash !== fileEntry.sha256) {
      throw new Error(`Artifact mapping hash mismatch for ${mapping.payloadRelativePath}`);
    }
    verifiedCount += 1;
  }
  return verifiedCount;
}

export function verifyReconstructionViews(
  manifest: M5LocalBackupManifest,
  payloadDirectory: string
): number {
  const correlationSets = collectCorrelationSets(manifest, payloadDirectory);
  for (const correlationId of correlationSets.all) {
    if (correlationSets.m2.has(correlationId)) {
      reconstructM2Trace(payloadDirectory, correlationId);
    }
    if (correlationSets.m3.has(correlationId)) {
      reconstructM3Trace(payloadDirectory, correlationId);
    }
    if (correlationSets.m4.has(correlationId)) {
      const m4 = reconstructM4Trace(payloadDirectory, correlationId);
      if (
        m4.finalOutcomeStatus === "unavailable" &&
        correlationSets.successfulM4.has(correlationId)
      ) {
        throw new Error(
          `Restored successful M4 reconstruction failed closed for correlation ${correlationId}`
        );
      }
    }
  }
  return correlationSets.all.size;
}

function collectCorrelationSets(
  manifest: M5LocalBackupManifest,
  payloadDirectory: string
): Readonly<{
  all: Set<CorrelationId>;
  m2: Set<CorrelationId>;
  m3: Set<CorrelationId>;
  m4: Set<CorrelationId>;
  successfulM4: Set<CorrelationId>;
}> {
  const m2 = collectCorrelationIdsFromJournal(payloadDirectory, "m2-event-journal.jsonl");
  const m3 = collectCorrelationIdsFromJournal(payloadDirectory, "m3-event-journal.jsonl");
  const m4 = collectCorrelationIdsFromJournal(payloadDirectory, "m4-event-journal.jsonl");
  ensureManifestHasRequiredJournals(manifest);
  const successfulM4 = collectSuccessfulM4OutcomeCorrelations(payloadDirectory);
  const all = new Set<CorrelationId>([...m2, ...m3, ...m4]);
  if (all.size === 0) {
    throw new Error("No correlation IDs discovered in restored journals.");
  }
  return Object.freeze({
    all,
    m2,
    m3,
    m4,
    successfulM4
  });
}

function collectCorrelationIdsFromJournal(
  payloadDirectory: string,
  journalRelativePath:
    "m2-event-journal.jsonl" | "m3-event-journal.jsonl" | "m4-event-journal.jsonl"
): Set<CorrelationId> {
  const correlations = new Set<CorrelationId>();
  const absolute = path.resolve(payloadDirectory, journalRelativePath);
  const lines = readFileSync(absolute, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  for (const line of lines) {
    const parsed = JSON.parse(line) as { correlationId?: string };
    if (parsed.correlationId?.trim()) {
      correlations.add(parsed.correlationId as CorrelationId);
    }
  }
  return correlations;
}

function collectSuccessfulM4OutcomeCorrelations(payloadDirectory: string): Set<CorrelationId> {
  const successful = new Set<CorrelationId>();
  const lines = readFileSync(path.resolve(payloadDirectory, "m4-event-journal.jsonl"), "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  for (const line of lines) {
    const parsed = JSON.parse(line) as {
      correlationId?: string;
      recordKind?: string;
      record?: { finalOutcomeStatus?: string };
    };
    if (
      parsed.correlationId?.trim() &&
      parsed.recordKind === "outcome_attestation" &&
      parsed.record?.finalOutcomeStatus === "achieved_without_effect"
    ) {
      successful.add(parsed.correlationId as CorrelationId);
    }
  }
  return successful;
}

function ensureManifestHasRequiredJournals(manifest: M5LocalBackupManifest): void {
  const required = new Set([
    "m2-event-journal.jsonl",
    "m3-event-journal.jsonl",
    "m4-event-journal.jsonl"
  ]);
  for (const entry of manifest.files) {
    if (required.has(entry.relativePath)) {
      required.delete(entry.relativePath);
    }
  }
  if (required.size > 0) {
    throw new Error(`Missing required journal entry in manifest: ${[...required].join(", ")}`);
  }
}

export function collectMappedArtifactReferences(
  manifest: M5LocalBackupManifest
): readonly ImmutableIdentifier[] {
  return Object.freeze(
    manifest.artifactMappings
      .map((mapping) => mapping.artifactReferenceId)
      .sort((a, b) => a.localeCompare(b))
  );
}
