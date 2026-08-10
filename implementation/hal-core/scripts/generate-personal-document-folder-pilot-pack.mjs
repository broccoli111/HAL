#!/usr/bin/env node
/** Generate the exact Owner-approved DR 0030 direct-folder retrieval pack. */

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

import { containsSecretLikeContent } from "../dist/src/m6/inputPolicy.js";
import { canonicalJsonUtf8Bytes } from "../dist/src/m9/canonical.js";
import {
  M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_CLASSIFICATION,
  M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_ID,
  M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PROVENANCE_CLASSIFICATION,
  PERSONAL_DOCUMENT_FOLDER_PILOT_ALLOWED_EXTENSIONS,
  PERSONAL_DOCUMENT_FOLDER_PILOT_MAX_FILE_BYTES,
  PERSONAL_DOCUMENT_FOLDER_PILOT_MAX_FILES,
  PERSONAL_DOCUMENT_FOLDER_PILOT_MAX_TOTAL_BYTES,
  PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY,
  PERSONAL_DOCUMENT_FOLDER_PILOT_SOURCE_DIRECTORY
} from "../dist/src/m9/personalDocumentFolderPilotScope.js";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
function bytes(value) {
  return Buffer.byteLength(value, "utf8");
}
function sourceLabel(name) {
  return `owner-approved desktop HAL_doc_ref/${name}`;
}

const sourceDirectory = lstatSync(PERSONAL_DOCUMENT_FOLDER_PILOT_SOURCE_DIRECTORY, {
  throwIfNoEntry: false
});
if (!sourceDirectory?.isDirectory() || sourceDirectory.isSymbolicLink()) {
  throw new Error("Owner-approved folder source must be a regular non-symlink directory.");
}
if (existsSync(PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY)) {
  throw new Error(
    `Refusing to overwrite immutable folder pack: ${PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY}`
  );
}
const names = readdirSync(PERSONAL_DOCUMENT_FOLDER_PILOT_SOURCE_DIRECTORY)
  .filter((name) =>
    PERSONAL_DOCUMENT_FOLDER_PILOT_ALLOWED_EXTENSIONS.includes(path.extname(name).toLowerCase())
  )
  .sort();
if (names.length === 0 || names.length > PERSONAL_DOCUMENT_FOLDER_PILOT_MAX_FILES) {
  throw new Error("Owner-approved folder source file count violates the pilot bound.");
}
let totalBytes = 0;
const sources = names.map((name) => {
  const absolute = path.resolve(PERSONAL_DOCUMENT_FOLDER_PILOT_SOURCE_DIRECTORY, name);
  if (!absolute.startsWith(PERSONAL_DOCUMENT_FOLDER_PILOT_SOURCE_DIRECTORY + path.sep)) {
    throw new Error("Owner-approved folder source path escapes the approved directory.");
  }
  const stat = lstatSync(absolute);
  if (!stat.isFile() || stat.isSymbolicLink()) {
    throw new Error("Owner-approved folder source must be a regular non-symlink file.");
  }
  const raw = readFileSync(absolute, "utf8");
  const byteSize = bytes(raw);
  if (byteSize === 0 || byteSize > PERSONAL_DOCUMENT_FOLDER_PILOT_MAX_FILE_BYTES) {
    throw new Error("Owner-approved folder source file exceeds the pilot bound.");
  }
  if (containsSecretLikeContent(raw)) {
    throw new Error("Owner-approved folder source contains secret-like content.");
  }
  totalBytes += byteSize;
  return { name, raw, byteSize, sha256: sha256(raw) };
});
if (totalBytes > PERSONAL_DOCUMENT_FOLDER_PILOT_MAX_TOTAL_BYTES) {
  throw new Error("Owner-approved folder source total exceeds the pilot bound.");
}

mkdirSync(path.join(PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY, "content"), { recursive: true });
const documents = [];
const files = [];
for (const [index, source] of sources.entries()) {
  const paragraphs = source.raw
    .replaceAll("\r\n", "\n")
    .split(/\n\s*\n/g)
    .map((value) => value.trim())
    .filter(Boolean);
  if (
    paragraphs.length === 0 ||
    paragraphs.length > 128 ||
    paragraphs.some((value) => bytes(value) > 2_048)
  ) {
    throw new Error("Owner-approved folder source paragraph bounds violated.");
  }
  const documentId = `owner.personal_document_folder.${String(index).padStart(3, "0")}`;
  const content = {
    id: documentId,
    title: `Owner-approved local document: ${source.name}`,
    tags: ["owner-approved", "local-document", "non-canonical", "folder-pilot"],
    paragraphs
  };
  const raw = `${JSON.stringify(content, null, 2)}\n`;
  const filename = `source-${String(index).padStart(2, "0")}.json`;
  writeFileSync(
    path.join(PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY, "content", filename),
    raw,
    "utf8"
  );
  documents.push({
    documentId,
    sectionIds: paragraphs.map((_, paragraphIndex) => `paragraph:${paragraphIndex}`)
  });
  files.push({
    relativePath: `content/${filename}`,
    sha256: sha256(raw),
    byteSize: bytes(raw),
    contentClass: "pack_content_json"
  });
}
const manifest = {
  schemaVersion: "hal.m9.knowledge-pack.manifest.v1",
  packId: M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_ID,
  packName: "Owner-approved local document folder pilot",
  packVersion: "1.0.0",
  packClassification: M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_CLASSIFICATION,
  provenanceClassification: M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PROVENANCE_CLASSIFICATION,
  m6Compatibility: {
    tokenizerVersion: "m6.tokenizer.v1",
    matcherVersion: "m6.matcher.v1",
    corpusIndexVersion: "m6.corpus-index.v1",
    documentShape: "m6.document.v1"
  },
  sourceRecords: sources.map((source) => ({
    sourcePath: sourceLabel(source.name),
    sha256: source.sha256,
    byteSize: source.byteSize
  })),
  documents,
  files,
  contentRoot: "content",
  integrity: { manifestHashAlgorithm: "sha256" }
};
manifest.integrity.manifestHashSha256 = sha256(canonicalJsonUtf8Bytes(manifest));
writeFileSync(
  path.join(PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);
process.stdout.write(
  `${JSON.stringify({ packId: manifest.packId, sourceCount: sources.length, manifestHashSha256: manifest.integrity.manifestHashSha256 })}\n`
);
