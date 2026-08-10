#!/usr/bin/env node
/** Generate the fixed, Owner-approved DR 0028 HAL Canon retrieval pack. */

import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  HAL_CANON_SOURCE_PATHS,
  M9_HAL_CANON_PACK_CLASSIFICATION,
  M9_HAL_CANON_PACK_ID,
  M9_HAL_CANON_PROVENANCE_CLASSIFICATION,
  resolveHalRepositoryRoot
} from "../dist/src/m9/halCanonSourceScope.js";
import { canonicalJsonUtf8Bytes } from "../dist/src/m9/canonical.js";

const MAX_PARAGRAPH_BYTES = 2_000;
const MAX_PARAGRAPHS_PER_DOCUMENT = 120;
const MAX_DOCUMENT_BYTES = 120_000;
const MAX_TOPIC_ENTRIES_PER_DOCUMENT = 120;
const TOPIC_INDEX_SOURCE_PREFIXES = new Set(["hal.canon.book2", "hal.canon.bookx"]);
const repositoryRoot = resolveHalRepositoryRoot();
const packDirectory = path.join(
  repositoryRoot,
  "implementation/hal-core/fixtures/approved-knowledge-packs",
  M9_HAL_CANON_PACK_ID
);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function utf8Bytes(value) {
  return Buffer.byteLength(value, "utf8");
}

function splitOversizedParagraph(value) {
  const words = value.split(/\s+/).filter(Boolean);
  const parts = [];
  let current = "";
  for (const word of words) {
    if (utf8Bytes(word) > MAX_PARAGRAPH_BYTES) {
      if (current) parts.push(current);
      current = "";
      let remainder = word;
      while (utf8Bytes(remainder) > MAX_PARAGRAPH_BYTES) {
        let cut = Math.min(remainder.length, MAX_PARAGRAPH_BYTES);
        while (utf8Bytes(remainder.slice(0, cut)) > MAX_PARAGRAPH_BYTES) cut -= 1;
        parts.push(remainder.slice(0, cut));
        remainder = remainder.slice(cut);
      }
      if (remainder) current = remainder;
      continue;
    }
    const candidate = current ? `${current} ${word}` : word;
    if (utf8Bytes(candidate) > MAX_PARAGRAPH_BYTES) {
      parts.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) parts.push(current);
  return parts;
}

function paragraphsFromSource(raw) {
  return raw
    .replaceAll("\r\n", "\n")
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .flatMap(splitOversizedParagraph);
}

function chunksForSource(paragraphs) {
  const chunks = [];
  let current = [];
  let bytes = 0;
  for (const paragraph of paragraphs) {
    const paragraphBytes = utf8Bytes(paragraph);
    if (
      current.length >= MAX_PARAGRAPHS_PER_DOCUMENT ||
      (current.length > 0 && bytes + paragraphBytes > MAX_DOCUMENT_BYTES)
    ) {
      chunks.push(current);
      current = [];
      bytes = 0;
    }
    current.push(paragraph);
    bytes += paragraphBytes;
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
}

function topicEntriesFromSource(raw) {
  const lines = raw.replaceAll("\r\n", "\n").split("\n");
  const entries = [];
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{1,6})\s+(.+)$/u);
    if (!match) continue;
    const heading = match[2].trim();
    let summary = "";
    for (let lookahead = index + 1; lookahead < lines.length; lookahead += 1) {
      const candidate = lines[lookahead].trim();
      if (!candidate) continue;
      if (/^#{1,6}\s+/u.test(candidate)) break;
      summary = candidate;
      break;
    }
    entries.push(summary ? `${heading} — ${summary}` : heading);
  }
  return entries;
}

function chunksForTopicEntries(entries) {
  const chunks = [];
  for (let start = 0; start < entries.length; start += MAX_TOPIC_ENTRIES_PER_DOCUMENT) {
    chunks.push(entries.slice(start, start + MAX_TOPIC_ENTRIES_PER_DOCUMENT));
  }
  return chunks;
}

const sourceRecords = HAL_CANON_SOURCE_PATHS.map((sourcePath) => {
  const absolutePath = path.resolve(repositoryRoot, sourcePath);
  const raw = readFileSync(absolutePath, "utf8");
  return Object.freeze({ sourcePath, raw, sha256: sha256(raw), byteSize: utf8Bytes(raw) });
});

// Decision Records are individually hashed in sourceRecords but grouped into
// one labeled retrieval source so the fixed M9 file cap is not widened.
const contentSources = Object.freeze([
  ...sourceRecords.slice(0, 7).map((source, index) =>
    Object.freeze({
      ...source,
      documentPrefix: [
        "hal.canon.book1",
        "hal.canon.book2",
        "hal.canon.book3",
        "hal.canon.book4",
        "hal.canon.bookx",
        "hal.canon.agents",
        "hal.canon.current_state"
      ][index]
    })
  ),
  Object.freeze({
    sourcePath: "accepted Decision Records 0001-0028",
    documentPrefix: "hal.canon.decisions",
    raw: sourceRecords
      .slice(7)
      .map((source) => `Source: ${source.sourcePath}\n\n${source.raw}`)
      .join("\n\n---\n\n")
  })
]);

if (existsSync(packDirectory)) {
  throw new Error(`Refusing to overwrite existing immutable pack: ${packDirectory}`);
}
mkdirSync(path.join(packDirectory, "content"), { recursive: true });

const documents = [];
const files = [];
let fileIndex = 0;
for (const [sourceIndex, source] of contentSources.entries()) {
  const chunks = chunksForSource(paragraphsFromSource(source.raw));
  for (const [chunkIndex, paragraphs] of chunks.entries()) {
    const documentId = `${source.documentPrefix}.${String(chunkIndex).padStart(3, "0")}`;
    const filename = `source-${String(sourceIndex).padStart(2, "0")}-chunk-${String(chunkIndex).padStart(3, "0")}.json`;
    const content = {
      id: documentId,
      title: `HAL Canon source: ${source.sourcePath} (chunk ${chunkIndex + 1}/${chunks.length})`,
      tags: ["hal-canon", "owner-approved", `source-${String(sourceIndex).padStart(2, "0")}`],
      paragraphs
    };
    const raw = `${JSON.stringify(content, null, 2)}\n`;
    if (utf8Bytes(raw) > 131_072)
      throw new Error(`Generated content file exceeds M9 bound: ${filename}`);
    writeFileSync(path.join(packDirectory, "content", filename), raw, "utf8");
    documents.push({ documentId, sectionIds: paragraphs.map((_, index) => `paragraph:${index}`) });
    files.push({
      relativePath: `content/${filename}`,
      sha256: sha256(raw),
      byteSize: utf8Bytes(raw),
      contentClass: "pack_content_json"
    });
    fileIndex += 1;
  }
  if (!TOPIC_INDEX_SOURCE_PREFIXES.has(source.documentPrefix)) continue;
  const topicEntries = topicEntriesFromSource(source.raw);
  const topicChunks = chunksForTopicEntries(topicEntries);
  for (const [topicIndex, paragraphs] of topicChunks.entries()) {
    const documentId = `${source.documentPrefix}.topics.${String(topicIndex).padStart(3, "0")}`;
    const filename = `source-${String(sourceIndex).padStart(2, "0")}-topics-${String(topicIndex).padStart(3, "0")}.json`;
    const content = {
      id: documentId,
      title: `HAL Canon topic index: ${source.sourcePath} (part ${topicIndex + 1}/${topicChunks.length})`,
      tags: [
        "hal-canon",
        "owner-approved",
        "topic-index",
        `source-${String(sourceIndex).padStart(2, "0")}`
      ],
      paragraphs
    };
    const raw = `${JSON.stringify(content, null, 2)}\n`;
    if (utf8Bytes(raw) > 131_072)
      throw new Error(`Generated topic-index file exceeds M9 bound: ${filename}`);
    writeFileSync(path.join(packDirectory, "content", filename), raw, "utf8");
    documents.push({ documentId, sectionIds: paragraphs.map((_, index) => `paragraph:${index}`) });
    files.push({
      relativePath: `content/${filename}`,
      sha256: sha256(raw),
      byteSize: utf8Bytes(raw),
      contentClass: "pack_content_json"
    });
    fileIndex += 1;
  }
}

if (fileIndex > 64) throw new Error("Generated pack exceeds M9 file bound.");
documents.sort((left, right) => left.documentId.localeCompare(right.documentId));
files.sort((left, right) => left.relativePath.localeCompare(right.relativePath));

const manifest = {
  schemaVersion: "hal.m9.knowledge-pack.manifest.v1",
  packId: M9_HAL_CANON_PACK_ID,
  packName: "HAL Canon Documentation Pilot",
  packVersion: "1.0.0",
  packClassification: M9_HAL_CANON_PACK_CLASSIFICATION,
  provenanceClassification: M9_HAL_CANON_PROVENANCE_CLASSIFICATION,
  m6Compatibility: {
    tokenizerVersion: "m6.tokenizer.v1",
    matcherVersion: "m6.matcher.v1",
    corpusIndexVersion: "m6.corpus-index.v1",
    documentShape: "m6.document.v1"
  },
  sourceRecords: sourceRecords.map(({ sourcePath, sha256: sourceSha256, byteSize }) => ({
    sourcePath,
    sha256: sourceSha256,
    byteSize
  })),
  documents,
  files,
  contentRoot: "content",
  integrity: { manifestHashAlgorithm: "sha256" }
};
manifest.integrity.manifestHashSha256 = sha256(canonicalJsonUtf8Bytes(manifest));
writeFileSync(
  path.join(packDirectory, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);
process.stdout.write(
  `${JSON.stringify({ packId: manifest.packId, documents: documents.length, files: files.length, manifestHashSha256: manifest.integrity.manifestHashSha256 })}\n`
);
