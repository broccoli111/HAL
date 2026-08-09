import { createHash } from "node:crypto";
import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { containsSecretLikeContent } from "./inputPolicy.js";
import { normalizeForM6, tokenizeForM6 } from "./tokenizer.js";
import type { M6CorpusDocument, M6CorpusSection, M6CorpusSnapshot } from "./types.js";

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function assertInsideRoot(root: string, candidate: string): void {
  if (!candidate.startsWith(root + path.sep)) {
    throw new Error("Corpus path resolves outside approved root.");
  }
}

function compareByCodeUnitAscending(left: string, right: string): number {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}

type ParsedDocument = Readonly<{
  id: string;
  title: string;
  tags: readonly string[];
  paragraphs: readonly string[];
}>;

function parseDocument(candidatePath: string): ParsedDocument {
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(candidatePath, "utf8"));
  } catch (error) {
    throw new Error(
      `Malformed corpus JSON: ${path.basename(candidatePath)} (${(error as Error).message})`,
      { cause: error }
    );
  }
  if (!parsed || typeof parsed !== "object") {
    throw new Error(`Corpus schema mismatch in ${path.basename(candidatePath)}.`);
  }
  const value = parsed as {
    id?: unknown;
    title?: unknown;
    tags?: unknown;
    paragraphs?: unknown;
  };
  if (
    typeof value.id !== "string" ||
    typeof value.title !== "string" ||
    !Array.isArray(value.tags) ||
    !Array.isArray(value.paragraphs) ||
    !value.tags.every((tag) => typeof tag === "string") ||
    !value.paragraphs.every((paragraph) => typeof paragraph === "string")
  ) {
    throw new Error(`Corpus schema mismatch in ${path.basename(candidatePath)}.`);
  }
  return Object.freeze({
    id: value.id,
    title: value.title,
    tags: Object.freeze([...value.tags]),
    paragraphs: Object.freeze([...value.paragraphs])
  });
}

function buildSections(paragraphs: readonly string[]): readonly M6CorpusSection[] {
  return Object.freeze(
    paragraphs.map((paragraph, index) => {
      const normalizedParagraph = normalizeForM6(paragraph);
      return Object.freeze({
        sectionId: `paragraph:${index}`,
        index,
        originalParagraph: paragraph,
        normalizedParagraph,
        tokens: tokenizeForM6(normalizedParagraph)
      });
    })
  );
}

export function resolveApprovedM6CorpusRoot(): string {
  const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
  let probe = moduleDirectory;
  for (let depth = 0; depth < 7; depth += 1) {
    const packageJsonPath = path.resolve(probe, "package.json");
    const corpusRoot = path.resolve(probe, "fixtures/synthetic-corpus");
    if (existsSync(packageJsonPath) && existsSync(corpusRoot)) {
      return corpusRoot;
    }
    const parent = path.dirname(probe);
    if (parent === probe) {
      break;
    }
    probe = parent;
  }
  throw new Error("Unable to resolve approved M6 corpus root from module location.");
}

function loadCorpusFromRoot(resolvedRoot: string): M6CorpusSnapshot {
  const normalizedRoot = path.resolve(resolvedRoot);
  const entries = readdirSync(normalizedRoot).sort(compareByCodeUnitAscending);
  const documents: M6CorpusDocument[] = [];
  const seenIds = new Set<string>();

  for (const entry of entries) {
    const candidatePath = path.resolve(normalizedRoot, entry);
    assertInsideRoot(normalizedRoot, candidatePath);
    const stat = lstatSync(candidatePath);
    if (stat.isSymbolicLink()) {
      throw new Error(`Corpus symlink rejected: ${entry}`);
    }
    if (!entry.endsWith(".json")) {
      throw new Error(`Corpus entry rejected: non-json entry ${entry}`);
    }
    if (!stat.isFile()) {
      throw new Error(`Corpus entry rejected: non-regular file ${entry}`);
    }

    const parsed = parseDocument(candidatePath);
    if (seenIds.has(parsed.id)) {
      throw new Error(`Duplicate corpus document id rejected: ${parsed.id}`);
    }
    seenIds.add(parsed.id);

    const secretHit =
      containsSecretLikeContent(parsed.title) ||
      parsed.tags.some((tag) => containsSecretLikeContent(tag)) ||
      parsed.paragraphs.some((paragraph) => containsSecretLikeContent(paragraph));
    if (secretHit) {
      throw new Error(`Secret-like corpus content rejected: ${parsed.id}`);
    }

    const normalizedTitle = normalizeForM6(parsed.title);
    const normalizedTags = Object.freeze(parsed.tags.map((tag) => normalizeForM6(tag)));
    documents.push(
      Object.freeze({
        id: parsed.id,
        title: parsed.title,
        tags: parsed.tags,
        paragraphs: parsed.paragraphs,
        normalizedTitle,
        normalizedTags,
        titleTokens: tokenizeForM6(normalizedTitle),
        tagTokens: tokenizeForM6(normalizedTags.join(" ")),
        sections: buildSections(parsed.paragraphs)
      })
    );
  }

  const manifestSource = JSON.stringify(
    documents.map((document) => ({
      id: document.id,
      title: document.title,
      tags: document.tags,
      paragraphs: document.paragraphs
    }))
  );
  return Object.freeze({
    manifestHashSha256: sha256(manifestSource),
    documents: Object.freeze(documents)
  });
}

export function loadApprovedSyntheticCorpus(): M6CorpusSnapshot {
  return loadCorpusFromRoot(resolveApprovedM6CorpusRoot());
}

// Test-only seam for corpus safety/determinism coverage.
export function loadSyntheticCorpusFromRootForTest(corpusRoot: string): M6CorpusSnapshot {
  return loadCorpusFromRoot(path.resolve(corpusRoot));
}
