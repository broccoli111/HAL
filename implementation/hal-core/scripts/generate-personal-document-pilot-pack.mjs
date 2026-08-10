#!/usr/bin/env node
/** Generate the exact Owner-approved DR 0029 personal-document retrieval pack. */

import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";
import { existsSync, lstatSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  M9_PERSONAL_DOCUMENT_PILOT_PACK_CLASSIFICATION,
  M9_PERSONAL_DOCUMENT_PILOT_PACK_ID,
  M9_PERSONAL_DOCUMENT_PILOT_PROVENANCE_CLASSIFICATION,
  PERSONAL_DOCUMENT_PILOT_SOURCE_DIRECTORY,
  PERSONAL_DOCUMENT_PILOT_SOURCE_FILE,
  PERSONAL_DOCUMENT_PILOT_SOURCE_PATH,
  PERSONAL_DOCUMENT_PILOT_PACK_DIRECTORY
} from "../dist/src/m9/personalDocumentPilotScope.js";
import { canonicalJsonUtf8Bytes } from "../dist/src/m9/canonical.js";
import { containsSecretLikeContent } from "../dist/src/m6/inputPolicy.js";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function bytes(value) {
  return Buffer.byteLength(value, "utf8");
}

const sourceDirectoryStat = lstatSync(PERSONAL_DOCUMENT_PILOT_SOURCE_DIRECTORY, {
  throwIfNoEntry: false
});
const sourceStat = lstatSync(PERSONAL_DOCUMENT_PILOT_SOURCE_PATH, { throwIfNoEntry: false });
if (!sourceDirectoryStat?.isDirectory() || sourceDirectoryStat.isSymbolicLink()) {
  throw new Error("Owner-approved personal-document source directory must be a regular directory.");
}
if (!sourceStat?.isFile() || sourceStat.isSymbolicLink()) {
  throw new Error("Owner-approved personal-document source must be one regular non-symlink file.");
}
if (existsSync(PERSONAL_DOCUMENT_PILOT_PACK_DIRECTORY)) {
  throw new Error(
    `Refusing to overwrite immutable personal-document pack: ${PERSONAL_DOCUMENT_PILOT_PACK_DIRECTORY}`
  );
}

const sourceRaw = readFileSync(PERSONAL_DOCUMENT_PILOT_SOURCE_PATH, "utf8");
if (bytes(sourceRaw) === 0 || bytes(sourceRaw) > 8_192) {
  throw new Error("Owner-approved personal-document source exceeds the 8 KiB pilot bound.");
}
const paragraphs = sourceRaw
  .replaceAll("\r\n", "\n")
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);
if (
  paragraphs.length === 0 ||
  paragraphs.length > 32 ||
  paragraphs.some((line) => bytes(line) > 2_048)
) {
  throw new Error("Owner-approved personal-document source violates the bounded line format.");
}
if (paragraphs.some((line) => containsSecretLikeContent(line))) {
  throw new Error("Owner-approved personal-document source contains secret-like content.");
}

mkdirSync(path.join(PERSONAL_DOCUMENT_PILOT_PACK_DIRECTORY, "content"), { recursive: true });
const document = {
  id: "owner.personal_document_pilot.000",
  title: "Owner-approved local document pilot: HAL_reference.txt",
  tags: ["owner-approved", "local-document", "non-canonical", "pilot"],
  paragraphs
};
const contentRaw = `${JSON.stringify(document, null, 2)}\n`;
const contentPath = path.join(
  PERSONAL_DOCUMENT_PILOT_PACK_DIRECTORY,
  "content",
  "source-00-chunk-000.json"
);
writeFileSync(contentPath, contentRaw, "utf8");
const manifest = {
  schemaVersion: "hal.m9.knowledge-pack.manifest.v1",
  packId: M9_PERSONAL_DOCUMENT_PILOT_PACK_ID,
  packName: "Owner-approved local document pilot",
  packVersion: "1.0.0",
  packClassification: M9_PERSONAL_DOCUMENT_PILOT_PACK_CLASSIFICATION,
  provenanceClassification: M9_PERSONAL_DOCUMENT_PILOT_PROVENANCE_CLASSIFICATION,
  m6Compatibility: {
    tokenizerVersion: "m6.tokenizer.v1",
    matcherVersion: "m6.matcher.v1",
    corpusIndexVersion: "m6.corpus-index.v1",
    documentShape: "m6.document.v1"
  },
  sourceRecords: [
    {
      sourcePath: "owner-approved desktop HAL_doc_ref/HAL_reference.txt",
      sha256: sha256(sourceRaw),
      byteSize: bytes(sourceRaw)
    }
  ],
  documents: [
    {
      documentId: document.id,
      sectionIds: paragraphs.map((_, index) => `paragraph:${index}`)
    }
  ],
  files: [
    {
      relativePath: "content/source-00-chunk-000.json",
      sha256: sha256(contentRaw),
      byteSize: bytes(contentRaw),
      contentClass: "pack_content_json"
    }
  ],
  contentRoot: "content",
  integrity: { manifestHashAlgorithm: "sha256" }
};
manifest.integrity.manifestHashSha256 = sha256(canonicalJsonUtf8Bytes(manifest));
writeFileSync(
  path.join(PERSONAL_DOCUMENT_PILOT_PACK_DIRECTORY, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);
process.stdout.write(
  `${JSON.stringify({ packId: manifest.packId, sourceFile: PERSONAL_DOCUMENT_PILOT_SOURCE_FILE, manifestHashSha256: manifest.integrity.manifestHashSha256 })}\n`
);
