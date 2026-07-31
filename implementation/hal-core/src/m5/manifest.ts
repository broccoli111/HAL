import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { canonicalJsonBuffer, canonicalStringify } from "./canonicalJson.js";
import {
  M5_MANIFEST_SCHEMA_VERSION,
  type M5ArtifactMappingEntry,
  type M5LocalBackupManifest,
  type M5ManifestFileEntry
} from "./types.js";

type ManifestWithoutIntegrity = Omit<M5LocalBackupManifest, "manifestIntegrityHash">;

export function sha256Hex(data: string | Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

export function buildManifest(input: {
  snapshotId: ImmutableIdentifier;
  sourceCommitRef: string;
  sourceVersion: string;
  classification: string;
  initiatedBy: string;
  sourceRootId: string;
  correlationId?: CorrelationId;
  files: readonly M5ManifestFileEntry[];
  artifactMappings: readonly M5ArtifactMappingEntry[];
}): M5LocalBackupManifest {
  const files = [...input.files].sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  const artifactMappings = [...input.artifactMappings].sort((a, b) =>
    a.artifactReferenceId.localeCompare(b.artifactReferenceId)
  );
  const base: ManifestWithoutIntegrity = Object.freeze({
    schemaVersion: M5_MANIFEST_SCHEMA_VERSION,
    snapshotId: input.snapshotId,
    capturedAtUtc: new Date().toISOString(),
    sourceCommitRef: input.sourceCommitRef,
    sourceVersion: input.sourceVersion,
    classification: input.classification,
    provenance: Object.freeze({
      initiatedBy: input.initiatedBy,
      sourceRootId: input.sourceRootId
    }),
    correlationScope: Object.freeze(
      input.correlationId
        ? { kind: "single_correlation", correlationId: input.correlationId }
        : { kind: "multi_or_unspecified" }
    ),
    files: Object.freeze(files),
    artifactMappings: Object.freeze(artifactMappings)
  });
  const manifestIntegrityHash = computeManifestIntegrityHash(base);
  return Object.freeze({
    ...base,
    manifestIntegrityHash
  });
}

export function computeManifestIntegrityHash(
  manifest: ManifestWithoutIntegrity | M5LocalBackupManifest
): string {
  const candidate = Object.fromEntries(
    Object.entries(manifest as M5LocalBackupManifest & { manifestIntegrityHash?: string }).filter(
      ([key]) => key !== "manifestIntegrityHash"
    )
  );
  return sha256Hex(canonicalJsonBuffer(candidate));
}

export function serializeManifest(manifest: M5LocalBackupManifest): string {
  return `${canonicalStringify(manifest)}\n`;
}

export function parseManifestFromFile(manifestPath: string): M5LocalBackupManifest {
  const raw = readFileSync(manifestPath, "utf8");
  let parsedRaw: unknown;
  try {
    parsedRaw = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Manifest parse failed: ${(error as Error).message}`, { cause: error });
  }
  return validateManifest(parsedRaw, manifestPath);
}

export function validateManifest(value: unknown, contextLabel = "manifest"): M5LocalBackupManifest {
  if (!value || typeof value !== "object") {
    throw new Error(`${contextLabel} must be an object.`);
  }
  const candidate = value as Partial<M5LocalBackupManifest>;
  if (candidate.schemaVersion !== M5_MANIFEST_SCHEMA_VERSION) {
    throw new Error(`${contextLabel} schemaVersion mismatch.`);
  }
  if (typeof candidate.snapshotId !== "string" || !candidate.snapshotId.trim()) {
    throw new Error(`${contextLabel} snapshotId is required.`);
  }
  if (typeof candidate.capturedAtUtc !== "string" || !candidate.capturedAtUtc.trim()) {
    throw new Error(`${contextLabel} capturedAtUtc is required.`);
  }
  if (typeof candidate.sourceCommitRef !== "string" || !candidate.sourceCommitRef.trim()) {
    throw new Error(`${contextLabel} sourceCommitRef is required.`);
  }
  if (typeof candidate.sourceVersion !== "string" || !candidate.sourceVersion.trim()) {
    throw new Error(`${contextLabel} sourceVersion is required.`);
  }
  if (typeof candidate.classification !== "string" || !candidate.classification.trim()) {
    throw new Error(`${contextLabel} classification is required.`);
  }
  if (
    !candidate.provenance ||
    typeof candidate.provenance !== "object" ||
    typeof candidate.provenance.initiatedBy !== "string" ||
    typeof candidate.provenance.sourceRootId !== "string"
  ) {
    throw new Error(`${contextLabel} provenance is required.`);
  }
  if (
    !candidate.correlationScope ||
    typeof candidate.correlationScope !== "object" ||
    (candidate.correlationScope.kind !== "single_correlation" &&
      candidate.correlationScope.kind !== "multi_or_unspecified")
  ) {
    throw new Error(`${contextLabel} correlationScope is invalid.`);
  }
  if (!Array.isArray(candidate.files) || candidate.files.length < 3) {
    throw new Error(`${contextLabel} files must include required journals.`);
  }
  const seenFilePaths = new Set<string>();
  let hasM2Journal = false;
  let hasM3Journal = false;
  let hasM4Journal = false;
  for (const [index, entry] of candidate.files.entries()) {
    if (!entry || typeof entry !== "object") {
      throw new Error(`${contextLabel} files[${index}] must be an object.`);
    }
    const typed = entry as M5ManifestFileEntry;
    if (
      !typed.relativePath ||
      typed.relativePath.startsWith("/") ||
      typed.relativePath.includes("..")
    ) {
      throw new Error(`${contextLabel} files[${index}] has invalid relativePath.`);
    }
    if (seenFilePaths.has(typed.relativePath)) {
      throw new Error(`${contextLabel} contains duplicate file paths.`);
    }
    seenFilePaths.add(typed.relativePath);
    if (!Number.isInteger(typed.byteSize) || typed.byteSize < 0) {
      throw new Error(`${contextLabel} files[${index}] has invalid byteSize.`);
    }
    if (!/^[a-f0-9]{64}$/.test(typed.sha256)) {
      throw new Error(`${contextLabel} files[${index}] has invalid sha256.`);
    }
    if (
      typed.logicalContentClass !== "m2_journal" &&
      typed.logicalContentClass !== "m3_journal" &&
      typed.logicalContentClass !== "m4_journal" &&
      typed.logicalContentClass !== "m6_journal" &&
      typed.logicalContentClass !== "m3_artifact"
    ) {
      throw new Error(`${contextLabel} files[${index}] has invalid logicalContentClass.`);
    }
    if (
      typed.relativePath === "m2-event-journal.jsonl" &&
      typed.logicalContentClass === "m2_journal"
    ) {
      hasM2Journal = true;
    }
    if (
      typed.relativePath === "m3-event-journal.jsonl" &&
      typed.logicalContentClass === "m3_journal"
    ) {
      hasM3Journal = true;
    }
    if (
      typed.relativePath === "m4-event-journal.jsonl" &&
      typed.logicalContentClass === "m4_journal"
    ) {
      hasM4Journal = true;
    }
  }
  if (!hasM2Journal || !hasM3Journal || !hasM4Journal) {
    throw new Error(`${contextLabel} is missing required M2/M3/M4 journal entries.`);
  }
  const sorted = [...candidate.files].sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  for (let index = 0; index < sorted.length; index += 1) {
    if (sorted[index]?.relativePath !== candidate.files[index]?.relativePath) {
      throw new Error(`${contextLabel} files must be sorted lexicographically.`);
    }
  }
  if (!Array.isArray(candidate.artifactMappings)) {
    throw new Error(`${contextLabel} artifactMappings must be an array.`);
  }
  const m3ArtifactFilePaths = new Set(
    candidate.files
      .filter((entry) => entry.logicalContentClass === "m3_artifact")
      .map((entry) => entry.relativePath)
  );
  const seenArtifactReferences = new Set<string>();
  for (const [index, mapping] of candidate.artifactMappings.entries()) {
    if (!mapping || typeof mapping !== "object") {
      throw new Error(`${contextLabel} artifactMappings[${index}] must be an object.`);
    }
    const typed = mapping as M5ArtifactMappingEntry;
    if (!typed.artifactReferenceId || !typed.payloadRelativePath) {
      throw new Error(`${contextLabel} artifactMappings[${index}] is missing fields.`);
    }
    if (seenArtifactReferences.has(typed.artifactReferenceId)) {
      throw new Error(`${contextLabel} contains duplicate artifact reference mappings.`);
    }
    seenArtifactReferences.add(typed.artifactReferenceId);
    if (!m3ArtifactFilePaths.has(typed.payloadRelativePath)) {
      throw new Error(
        `${contextLabel} artifact mapping must reference a declared m3_artifact payload file.`
      );
    }
  }
  if (
    typeof candidate.manifestIntegrityHash !== "string" ||
    !candidate.manifestIntegrityHash.trim()
  ) {
    throw new Error(`${contextLabel} manifestIntegrityHash is required.`);
  }
  const recomputed = computeManifestIntegrityHash(candidate as M5LocalBackupManifest);
  if (candidate.manifestIntegrityHash !== recomputed) {
    throw new Error(`${contextLabel} integrity hash mismatch.`);
  }
  return Object.freeze(candidate as M5LocalBackupManifest);
}

export function computeSourceRootIdentifier(sourceStateDirectory: string): string {
  return sha256Hex(path.resolve(sourceStateDirectory));
}
