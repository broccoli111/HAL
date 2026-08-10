import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { lstatSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { containsSecretLikeContent } from "../m6/inputPolicy.js";
import {
  type M9OwnerFolderRegistration,
  M9_OWNER_FOLDER_REGISTRY_ALLOWED_EXTENSIONS
} from "./ownerFolderRegistry.js";

export type M9OwnerFolderSourceSnapshot = Readonly<{
  sourceLabel: string;
  sha256: string;
  byteSize: number;
  paragraphs: readonly string[];
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
    assert(
      M9_OWNER_FOLDER_REGISTRY_ALLOWED_EXTENSIONS.includes(path.extname(name).toLowerCase()),
      "owner-folder source file type is not approved"
    );
    const absolute = path.resolve(registration.sourceDirectory, name);
    assertInside(registration.sourceDirectory, absolute);
    const stat = lstatSync(absolute, { throwIfNoEntry: false });
    assert(
      stat?.isFile() && !stat.isSymbolicLink(),
      "owner-folder source must be regular non-symlink file"
    );
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
