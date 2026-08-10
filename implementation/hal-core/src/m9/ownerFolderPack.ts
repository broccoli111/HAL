import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync
} from "node:fs";
import path from "node:path";

import { containsSecretLikeContent } from "../m6/inputPolicy.js";
import { type M9OwnerFolderRegistration } from "./ownerFolderRegistry.js";
import { classifyM9CentralContentFileName } from "./contentCapabilityPolicy.js";
import { canonicalJsonUtf8Bytes, sha256Hex } from "./canonical.js";

export type M9OwnerFolderSourceSnapshot = Readonly<{
  sourceLabel: string;
  sha256: string;
  byteSize: number;
  paragraphs: readonly string[];
}>;

export type M9OwnerFolderPackArtifact = Readonly<{
  packId: string;
  manifestHashSha256: string;
  manifest: Readonly<Record<string, unknown>>;
  content: readonly Readonly<{ relativePath: string; utf8: string }>[];
}>;

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function byteLength(value: string): number {
  return Buffer.byteLength(value, "utf8");
}

function assert(value: unknown, message: string): asserts value {
  if (!value) throw new Error(message);
}

function assertInside(directory: string, candidate: string): void {
  assert(
    candidate.startsWith(`${directory}${path.sep}`),
    "owner-folder source path escapes registration"
  );
}

/**
 * HAL-only source collection for a previously Owner-confirmed registration.
 * The caller receives derived, bounded snapshot data only; this function does
 * not create a pack, activate a source, dispatch a runtime, or retain a handle.
 */
export function collectM9OwnerFolderSourceSnapshot(
  registration: M9OwnerFolderRegistration
): readonly M9OwnerFolderSourceSnapshot[] {
  assert(registration.status === "registered", "owner-folder registration is revoked");
  const directoryStat = lstatSync(registration.sourceDirectory, { throwIfNoEntry: false });
  assert(
    directoryStat?.isDirectory() && !directoryStat.isSymbolicLink(),
    "owner-folder source directory is invalid"
  );
  const names = readdirSync(registration.sourceDirectory).sort();
  assert(
    names.length > 0 && names.length <= registration.maxFiles,
    "owner-folder source file count violates bound"
  );
  let totalBytes = 0;
  const sources: M9OwnerFolderSourceSnapshot[] = [];
  for (const name of names) {
    const contentClass = classifyM9CentralContentFileName(name);
    const absolute = path.resolve(registration.sourceDirectory, name);
    assertInside(registration.sourceDirectory, absolute);
    const stat = lstatSync(absolute, { throwIfNoEntry: false });
    assert(
      stat?.isFile() && !stat.isSymbolicLink(),
      "owner-folder source must be regular non-symlink file"
    );
    // Central policy recognizes mixed media, but only its text class has an
    // approved pack extractor. Media is deliberately neither opened nor made
    // available to a runtime here.
    if (contentClass !== "text") continue;
    const raw = readFileSync(absolute, "utf8");
    const byteSize = byteLength(raw);
    assert(
      byteSize > 0 && byteSize <= registration.maxFileBytes,
      "owner-folder source byteSize invalid"
    );
    assert(!containsSecretLikeContent(raw), "owner-folder source contains secret-like content");
    const paragraphs = raw
      .replaceAll("\r\n", "\n")
      .split(/\n\s*\n/g)
      .map((value) => value.trim())
      .filter(Boolean);
    assert(
      paragraphs.length > 0 &&
        paragraphs.length <= 128 &&
        paragraphs.every((paragraph) => byteLength(paragraph) <= 2_048),
      "owner-folder source paragraph bounds violated"
    );
    totalBytes += byteSize;
    assert(totalBytes <= registration.maxTotalBytes, "owner-folder source total exceeds bound");
    sources.push(
      Object.freeze({
        sourceLabel: `owner-approved local folder ${registration.registrationId}/${name}`,
        sha256: sha256(raw),
        byteSize,
        paragraphs: Object.freeze(paragraphs)
      })
    );
  }
  return Object.freeze(sources);
}

/**
 * Builds an immutable, M9-compatible artifact from a HAL-collected snapshot.
 * It does not write, register, activate, or dispatch the artifact.
 */
export function buildM9OwnerFolderPackArtifact(
  registration: M9OwnerFolderRegistration,
  sources: readonly M9OwnerFolderSourceSnapshot[]
): M9OwnerFolderPackArtifact {
  assert(registration.status === "registered", "owner-folder registration is revoked");
  assert(
    sources.length > 0 && sources.length <= registration.maxFiles,
    "owner-folder pack source count invalid"
  );
  const packId = `owner_folder_${registration.registrationId}_v1`;
  const content = sources.map((source, index) => {
    const relativePath = `content/source-${String(index).padStart(2, "0")}.json`;
    const document = {
      id: `owner.local_folder.${registration.registrationId}.${String(index).padStart(3, "0")}`,
      title: source.sourceLabel,
      tags: ["owner-approved", "local-document", "non-canonical", "folder-registry"],
      paragraphs: source.paragraphs
    };
    return Object.freeze({ relativePath, utf8: `${JSON.stringify(document, null, 2)}\n` });
  });
  const manifestBase = {
    schemaVersion: "hal.m9.knowledge-pack.manifest.v1",
    packId,
    packName: `Owner-approved local folder: ${registration.registrationId}`,
    packVersion: "1.0.0",
    packClassification: "owner_approved_local_document_folder_registry",
    provenanceClassification: "owner_approved_local_document",
    m6Compatibility: {
      tokenizerVersion: "m6.tokenizer.v1",
      matcherVersion: "m6.matcher.v1",
      corpusIndexVersion: "m6.corpus-index.v1",
      documentShape: "m6.document.v1"
    },
    sourceRecords: sources.map((source) => ({
      sourcePath: source.sourceLabel,
      sha256: source.sha256,
      byteSize: source.byteSize
    })),
    documents: content.map((entry, index) => ({
      documentId: `owner.local_folder.${registration.registrationId}.${String(index).padStart(3, "0")}`,
      sectionIds: sources[index]!.paragraphs.map(
        (_, paragraphIndex) => `paragraph:${paragraphIndex}`
      )
    })),
    files: content.map((entry) => ({
      relativePath: entry.relativePath,
      sha256: sha256Hex(entry.utf8),
      byteSize: Buffer.byteLength(entry.utf8, "utf8"),
      contentClass: "pack_content_json"
    })),
    contentRoot: "content",
    integrity: { manifestHashAlgorithm: "sha256" }
  };
  const manifestHashSha256 = sha256Hex(canonicalJsonUtf8Bytes(manifestBase));
  return Object.freeze({
    packId,
    manifestHashSha256,
    manifest: Object.freeze({
      ...manifestBase,
      integrity: { ...manifestBase.integrity, manifestHashSha256 }
    }),
    content: Object.freeze(content)
  });
}

/** Writes a newly derived artifact once; overwrite and symlink destinations are rejected. */
export function persistM9OwnerFolderPackArtifact(
  artifact: M9OwnerFolderPackArtifact,
  destinationDirectory: string
): void {
  assert(path.isAbsolute(destinationDirectory), "owner-folder pack destination must be absolute");
  assert(!existsSync(destinationDirectory), "owner-folder pack destination already exists");
  mkdirSync(path.join(destinationDirectory, "content"), { recursive: true });
  const destinationStat = lstatSync(destinationDirectory);
  assert(
    destinationStat.isDirectory() && !destinationStat.isSymbolicLink(),
    "owner-folder pack destination is invalid"
  );
  for (const entry of artifact.content) {
    const target = path.resolve(destinationDirectory, entry.relativePath);
    assertInside(destinationDirectory, target);
    writeFileSync(target, entry.utf8, { encoding: "utf8", flag: "wx" });
  }
  writeFileSync(
    path.join(destinationDirectory, "manifest.json"),
    `${JSON.stringify(artifact.manifest, null, 2)}\n`,
    { encoding: "utf8", flag: "wx" }
  );
}

/** Reconstructs the expected artifact and fails closed on source or persisted-byte drift. */
export function validatePersistedM9OwnerFolderPackArtifact(
  registration: M9OwnerFolderRegistration,
  destinationDirectory: string
): M9OwnerFolderPackArtifact {
  assert(path.isAbsolute(destinationDirectory), "owner-folder pack destination must be absolute");
  const expected = buildM9OwnerFolderPackArtifact(
    registration,
    collectM9OwnerFolderSourceSnapshot(registration)
  );
  const destinationStat = lstatSync(destinationDirectory, { throwIfNoEntry: false });
  assert(
    destinationStat?.isDirectory() && !destinationStat.isSymbolicLink(),
    "owner-folder pack destination is invalid"
  );
  assert(
    readFileSync(path.join(destinationDirectory, "manifest.json"), "utf8") ===
      `${JSON.stringify(expected.manifest, null, 2)}\n`,
    "owner-folder pack manifest mismatch"
  );
  for (const entry of expected.content) {
    const target = path.resolve(destinationDirectory, entry.relativePath);
    assertInside(destinationDirectory, target);
    const targetStat = lstatSync(target, { throwIfNoEntry: false });
    assert(
      targetStat?.isFile() && !targetStat.isSymbolicLink(),
      "owner-folder pack content is invalid"
    );
    assert(readFileSync(target, "utf8") === entry.utf8, "owner-folder pack content mismatch");
  }
  return expected;
}
