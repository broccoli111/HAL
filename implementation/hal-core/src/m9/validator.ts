import { lstatSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  containsSecretLikeContent,
  containsUnredactedCredentialLikeContent
} from "../m6/inputPolicy.js";
import type { M6CorpusDocument } from "../m6/types.js";
import {
  M9_BOUNDS,
  M9_CONTENT_CLASS,
  M9_PACK_CLASSIFICATION,
  M9_PACK_MANIFEST_SCHEMA_VERSION,
  M9_PACK_ROOT_RELATIVE,
  M9_PROVENANCE_CLASSIFICATION,
  type M9ManifestFile,
  type M9PackManifest,
  type M9RegistrationEntry,
  type M9ResolvedPack
} from "./types.js";
import { byteLengthUtf8, canonicalJsonUtf8Bytes, sha256Hex } from "./canonical.js";
import {
  HAL_CANON_SOURCE_PATHS,
  M9_HAL_CANON_PACK_CLASSIFICATION,
  M9_HAL_CANON_PACK_ID,
  M9_HAL_CANON_PROVENANCE_CLASSIFICATION,
  resolveHalRepositoryRoot
} from "./halCanonSourceScope.js";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertInside(root: string, candidate: string, label: string): void {
  if (candidate !== root && !candidate.startsWith(root + path.sep)) {
    throw new Error(`${label} escapes approved root.`);
  }
}

function compareExact(left: string, right: string, label: string): void {
  if (left !== right) {
    throw new Error(`${label} mismatch.`);
  }
}

function sortedUnique(values: readonly string[]): boolean {
  for (let i = 1; i < values.length; i += 1) {
    if (values[i - 1]! >= values[i]!) {
      return false;
    }
  }
  return true;
}

function parseJsonFile<T>(absolutePath: string, label: string): T {
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(absolutePath, "utf8"));
  } catch (error) {
    throw new Error(`${label} malformed JSON: ${(error as Error).message}`, {
      cause: error
    });
  }
  return parsed as T;
}

function ensureNoSymlinkOrSpecial(absolutePath: string, label: string): void {
  const stat = lstatSync(absolutePath, { throwIfNoEntry: false });
  if (!stat) {
    throw new Error(`${label} missing.`);
  }
  if (stat.isSymbolicLink()) {
    throw new Error(`${label} symlink rejected.`);
  }
}

function validateManifestStructure(manifest: unknown): M9PackManifest {
  assert(manifest && typeof manifest === "object", "manifest must be an object");
  const m = manifest as Partial<M9PackManifest>;
  compareExact(m.schemaVersion ?? "", M9_PACK_MANIFEST_SCHEMA_VERSION, "schemaVersion");
  assert(
    typeof m.packId === "string" && /^[a-z0-9][a-z0-9_-]{2,63}$/.test(m.packId),
    "invalid packId"
  );
  assert(
    typeof m.packName === "string" &&
      m.packName.trim().length >= 1 &&
      m.packName.trim().length <= 120 &&
      !m.packName.includes("\n"),
    "invalid packName"
  );
  assert(
    typeof m.packVersion === "string" && /^[0-9]+\.[0-9]+\.[0-9]+$/.test(m.packVersion),
    "invalid packVersion"
  );
  const isHalCanonPack = m.packId === M9_HAL_CANON_PACK_ID;
  compareExact(
    m.packClassification ?? "",
    isHalCanonPack ? M9_HAL_CANON_PACK_CLASSIFICATION : M9_PACK_CLASSIFICATION,
    "packClassification"
  );
  compareExact(
    m.provenanceClassification ?? "",
    isHalCanonPack ? M9_HAL_CANON_PROVENANCE_CLASSIFICATION : M9_PROVENANCE_CLASSIFICATION,
    "provenanceClassification"
  );
  assert(m.m6Compatibility && typeof m.m6Compatibility === "object", "m6Compatibility missing");
  compareExact(m.m6Compatibility?.tokenizerVersion ?? "", "m6.tokenizer.v1", "tokenizerVersion");
  compareExact(m.m6Compatibility?.matcherVersion ?? "", "m6.matcher.v1", "matcherVersion");
  compareExact(
    m.m6Compatibility?.corpusIndexVersion ?? "",
    "m6.corpus-index.v1",
    "corpusIndexVersion"
  );
  compareExact(
    m.m6Compatibility?.documentShape ?? "",
    isHalCanonPack ? "m6.document.v1" : "m6.synthetic-document.v1",
    "documentShape"
  );
  compareExact(m.contentRoot ?? "", "content", "contentRoot");
  assert(Array.isArray(m.documents), "documents must be array");
  assert(Array.isArray(m.files), "files must be array");
  assert(m.integrity && typeof m.integrity === "object", "integrity missing");
  compareExact(m.integrity?.manifestHashAlgorithm ?? "", "sha256", "manifestHashAlgorithm");
  assert(
    typeof m.integrity?.manifestHashSha256 === "string" &&
      /^[a-f0-9]{64}$/.test(m.integrity.manifestHashSha256),
    "invalid manifestHashSha256"
  );
  return m as M9PackManifest;
}

function validateHalCanonSourceRecords(manifest: M9PackManifest): void {
  const isHalCanonPack = manifest.packId === M9_HAL_CANON_PACK_ID;
  if (!isHalCanonPack) {
    assert(!manifest.sourceRecords, "synthetic pack sourceRecords rejected");
    return;
  }
  assert(Array.isArray(manifest.sourceRecords), "HAL Canon sourceRecords missing");
  const records = manifest.sourceRecords;
  assert(records.length === HAL_CANON_SOURCE_PATHS.length, "HAL Canon source count mismatch");
  const repositoryRoot = resolveHalRepositoryRoot();
  for (let index = 0; index < HAL_CANON_SOURCE_PATHS.length; index += 1) {
    const expectedPath = HAL_CANON_SOURCE_PATHS[index]!;
    const record = records[index];
    assert(record, "HAL Canon source record missing");
    compareExact(record.sourcePath, expectedPath, "HAL Canon source path");
    assert(/^[a-f0-9]{64}$/.test(record.sha256), "HAL Canon source sha256 invalid");
    assert(
      Number.isInteger(record.byteSize) && record.byteSize > 0,
      "HAL Canon source byteSize invalid"
    );
    const absolute = path.resolve(repositoryRoot, record.sourcePath);
    assertInside(repositoryRoot, absolute, "HAL Canon source");
    ensureNoSymlinkOrSpecial(absolute, "HAL Canon source");
    assert(lstatSync(absolute).isFile(), "HAL Canon source must be a regular file");
    const raw = readFileSync(absolute, "utf8");
    compareExact(sha256Hex(raw), record.sha256, "HAL Canon source hash");
    compareExact(String(byteLengthUtf8(raw)), String(record.byteSize), "HAL Canon source byteSize");
  }
}

function enforceManifestDeterminism(manifest: M9PackManifest): void {
  assert(manifest.documents.length <= M9_BOUNDS.maxDocuments, "document count exceeds v1 bound");
  const documentIds = manifest.documents.map((document) => document.documentId);
  assert(sortedUnique(documentIds), "documents must be sorted and unique by documentId");
  for (const document of manifest.documents) {
    assert(/^[a-z0-9][a-z0-9_.-]{1,63}$/.test(document.documentId), "invalid documentId");
    assert(
      document.sectionIds.length <= M9_BOUNDS.maxParagraphsPerDocument,
      "paragraph count exceeds v1 bound"
    );
    const sectionIds = [...document.sectionIds];
    for (let index = 0; index < sectionIds.length; index += 1) {
      compareExact(sectionIds[index]!, `paragraph:${index}`, "sectionId contiguity");
    }
  }

  assert(manifest.files.length <= M9_BOUNDS.maxContentFilesPerPack, "file count exceeds v1 bound");
  const filePaths = manifest.files.map((file) => file.relativePath);
  assert(sortedUnique(filePaths), "files must be sorted and unique by relativePath");
  for (const file of manifest.files) {
    assert(file.contentClass === M9_CONTENT_CLASS, "unsupported contentClass");
    assert(file.relativePath.startsWith("content/"), "relativePath must stay in content/");
    assert(!file.relativePath.includes(".."), "relativePath traversal rejected");
    assert(!path.isAbsolute(file.relativePath), "absolute relativePath rejected");
    assert(!/^[A-Za-z][A-Za-z0-9+.-]*:/.test(file.relativePath), "URL-like relativePath rejected");
    assert(/^[a-f0-9]{64}$/.test(file.sha256), "invalid file sha256");
    assert(
      Number.isInteger(file.byteSize) &&
        file.byteSize > 0 &&
        file.byteSize <= M9_BOUNDS.maxContentFileBytes,
      "invalid file byteSize"
    );
  }
}

function verifyManifestSelfHash(manifest: M9PackManifest): string {
  const withoutSelf = JSON.parse(JSON.stringify(manifest)) as M9PackManifest;
  delete (withoutSelf.integrity as { manifestHashSha256?: string }).manifestHashSha256;
  const computed = sha256Hex(canonicalJsonUtf8Bytes(withoutSelf));
  compareExact(computed, manifest.integrity.manifestHashSha256, "manifest self-hash");
  return computed;
}

function validateContentDocument(input: {
  absolutePath: string;
  declared: M9ManifestFile;
  manifestDocumentsById: Map<string, readonly string[]>;
  useCredentialValueOnlyGuard: boolean;
}): M6CorpusDocument {
  const raw = readFileSync(input.absolutePath, "utf8");
  const rawBytes = byteLengthUtf8(raw);
  assert(rawBytes <= M9_BOUNDS.maxContentFileBytes, "content file exceeds v1 bound");
  const hash = sha256Hex(raw);
  compareExact(hash, input.declared.sha256, "content file hash");
  compareExact(String(rawBytes), String(input.declared.byteSize), "content file byteSize");
  const parsed = parseJsonFile<{
    id?: unknown;
    title?: unknown;
    tags?: unknown;
    paragraphs?: unknown;
  }>(input.absolutePath, "content");
  assert(typeof parsed.id === "string", "content id missing");
  assert(typeof parsed.title === "string", "content title missing");
  assert(
    Array.isArray(parsed.tags) && parsed.tags.every((tag) => typeof tag === "string"),
    "content tags invalid"
  );
  assert(
    Array.isArray(parsed.paragraphs) &&
      parsed.paragraphs.every((paragraph) => typeof paragraph === "string"),
    "content paragraphs invalid"
  );
  const expectedSections = input.manifestDocumentsById.get(parsed.id);
  assert(expectedSections, "content id missing from manifest documents");
  assert(parsed.tags.length <= M9_BOUNDS.maxTagsPerDocument, "tag count exceeds v1 bound");
  assert(
    parsed.paragraphs.length <= M9_BOUNDS.maxParagraphsPerDocument,
    "paragraph count exceeds v1 bound"
  );
  compareExact(
    String(parsed.paragraphs.length),
    String(expectedSections.length),
    "paragraph count vs manifest"
  );
  assert(byteLengthUtf8(parsed.title) <= M9_BOUNDS.maxTitleUtf8Bytes, "title exceeds v1 bound");
  for (const tag of parsed.tags) {
    assert(byteLengthUtf8(tag) <= M9_BOUNDS.maxTagUtf8Bytes, "tag exceeds v1 bound");
  }
  for (const paragraph of parsed.paragraphs) {
    assert(
      byteLengthUtf8(paragraph) <= M9_BOUNDS.maxParagraphUtf8Bytes,
      "paragraph exceeds v1 bound"
    );
  }
  const containsForbiddenContent = input.useCredentialValueOnlyGuard
    ? containsUnredactedCredentialLikeContent
    : containsSecretLikeContent;
  assert(!containsForbiddenContent(parsed.title), "secret-like content rejected");
  assert(!parsed.tags.some((tag) => containsForbiddenContent(tag)), "secret-like content rejected");
  assert(
    !parsed.paragraphs.some((paragraph) => containsForbiddenContent(paragraph)),
    "secret-like content rejected"
  );
  return Object.freeze({
    id: parsed.id,
    title: parsed.title,
    tags: Object.freeze([...parsed.tags]),
    paragraphs: Object.freeze([...parsed.paragraphs]),
    normalizedTitle: "",
    normalizedTags: Object.freeze([]),
    titleTokens: Object.freeze([]),
    tagTokens: Object.freeze([]),
    sections: Object.freeze([])
  });
}

export function resolveApprovedM9PackRoot(): string {
  const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
  let probe = moduleDirectory;
  for (let depth = 0; depth < 8; depth += 1) {
    const packageJsonPath = path.resolve(probe, "package.json");
    const candidate = path.resolve(probe, M9_PACK_ROOT_RELATIVE);
    const packageStat = lstatSync(packageJsonPath, { throwIfNoEntry: false });
    const rootStat = lstatSync(candidate, { throwIfNoEntry: false });
    if (packageStat?.isFile() && rootStat?.isDirectory()) {
      return candidate;
    }
    const parent = path.dirname(probe);
    if (parent === probe) {
      break;
    }
    probe = parent;
  }
  throw new Error("Unable to resolve fixed approved M9 pack root.");
}

export function validateApprovedPackDirectory(packDirectory: string): M9ResolvedPack {
  const resolvedPackDirectory = path.resolve(packDirectory);
  ensureNoSymlinkOrSpecial(resolvedPackDirectory, "pack directory");
  const stat = lstatSync(resolvedPackDirectory);
  assert(stat.isDirectory(), "pack directory must be directory");

  const manifestPath = path.resolve(resolvedPackDirectory, "manifest.json");
  const contentDirectory = path.resolve(resolvedPackDirectory, "content");
  ensureNoSymlinkOrSpecial(manifestPath, "manifest.json");
  ensureNoSymlinkOrSpecial(contentDirectory, "content directory");
  assert(lstatSync(manifestPath).isFile(), "manifest.json must be regular file");
  assert(lstatSync(contentDirectory).isDirectory(), "content must be directory");

  const manifestRaw = readFileSync(manifestPath, "utf8");
  assert(
    byteLengthUtf8(manifestRaw) <= M9_BOUNDS.maxManifestUtf8Bytes,
    "manifest exceeds v1 bound"
  );
  const manifest = validateManifestStructure(parseJsonFile<unknown>(manifestPath, "manifest"));
  enforceManifestDeterminism(manifest);
  validateHalCanonSourceRecords(manifest);
  const manifestHash = verifyManifestSelfHash(manifest);

  const manifestDocumentsById = new Map<string, readonly string[]>(
    manifest.documents.map((document) => [document.documentId, document.sectionIds] as const)
  );

  const rootEntries = readdirSync(resolvedPackDirectory).sort();
  const allowedRootEntries = new Set(["manifest.json", "content"]);
  for (const rootEntry of rootEntries) {
    if (!allowedRootEntries.has(rootEntry)) {
      const absolute = path.resolve(resolvedPackDirectory, rootEntry);
      const entryStat = lstatSync(absolute);
      if (entryStat.isFile()) {
        throw new Error("extra regular file rejected");
      }
      throw new Error("pack layout includes unsupported entry");
    }
  }

  const declaredByPath = new Map(manifest.files.map((file) => [file.relativePath, file] as const));
  const contentEntries = readdirSync(contentDirectory).sort();
  const resolvedContentFiles: string[] = [];
  let totalBytes = byteLengthUtf8(manifestRaw);
  for (const entry of contentEntries) {
    const absolute = path.resolve(contentDirectory, entry);
    assertInside(contentDirectory, absolute, "content entry");
    const entryStat = lstatSync(absolute);
    if (entryStat.isSymbolicLink() || !entryStat.isFile()) {
      throw new Error("non-regular or symlink content entry rejected");
    }
    const relativePath = `content/${entry}`;
    const declared = declaredByPath.get(relativePath);
    assert(declared, "undeclared file rejected");
    const parsed = validateContentDocument({
      absolutePath: absolute,
      declared,
      manifestDocumentsById,
      useCredentialValueOnlyGuard: manifest.packId === M9_HAL_CANON_PACK_ID
    });
    if (containsSecretLikeContent(parsed.id)) {
      throw new Error("secret-like content rejected");
    }
    totalBytes += entryStat.size;
    resolvedContentFiles.push(absolute);
  }

  assert(
    resolvedContentFiles.length === manifest.files.length,
    "missing declared file or extra file under content"
  );
  for (const declared of manifest.files) {
    if (
      !resolvedContentFiles.some((absolute) =>
        absolute.endsWith(declared.relativePath.replace("content/", path.sep))
      )
    ) {
      throw new Error("declared file missing");
    }
  }
  assert(totalBytes <= M9_BOUNDS.maxTotalPackBytes, "pack total bytes exceeds v1 bound");

  return Object.freeze({
    packDirectory: resolvedPackDirectory,
    manifestPath,
    manifest,
    manifestHashSha256: manifestHash,
    contentFileAbsolutePaths: Object.freeze([...resolvedContentFiles].sort())
  });
}

export function listApprovedPacks(): readonly M9ResolvedPack[] {
  const root = resolveApprovedM9PackRoot();
  ensureNoSymlinkOrSpecial(root, "approved pack root");
  const rootEntries = readdirSync(root).sort();
  assert(rootEntries.length <= M9_BOUNDS.maxPacks, "pack count exceeds v1 bound");
  const packs: M9ResolvedPack[] = [];
  for (const entry of rootEntries) {
    const absolute = path.resolve(root, entry);
    assertInside(root, absolute, "pack root child");
    const stat = lstatSync(absolute);
    if (stat.isSymbolicLink()) {
      throw new Error("pack root symlink rejected");
    }
    if (!stat.isDirectory()) {
      throw new Error("pack root non-directory entry rejected");
    }
    const validated = validateApprovedPackDirectory(absolute);
    packs.push(validated);
  }
  return Object.freeze(
    packs.sort((left, right) =>
      `${left.manifest.packId}@${left.manifest.packVersion}`.localeCompare(
        `${right.manifest.packId}@${right.manifest.packVersion}`
      )
    )
  );
}

export function buildM9Registry(): readonly M9RegistrationEntry[] {
  const seenTuple = new Set<string>();
  const registrations = listApprovedPacks().map((pack) => {
    const key = `${pack.manifest.packId}|${pack.manifest.packVersion}|${pack.manifestHashSha256}`;
    assert(!seenTuple.has(key), "duplicate pack tuple rejected");
    seenTuple.add(key);
    return Object.freeze({
      packId: pack.manifest.packId,
      packVersion: pack.manifest.packVersion,
      manifestHashSha256: pack.manifestHashSha256,
      status: "available" as const
    });
  });
  return Object.freeze(registrations);
}
