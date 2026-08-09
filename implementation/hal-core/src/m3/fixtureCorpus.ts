import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const SECRET_LIKE_PATTERN =
  /\b(password|token|secret_key|api[_-]?key|private[_-]?key|credential)\b/i;
const CREDENTIAL_VALUE_PATTERN = /\b(aws|ghp|xox[baprs]|sk)_[a-z0-9]{16,}\b/i;
const URL_LIKE_PATTERN = /(https?:\/\/|file:\/\/|ftp:\/\/)/i;

export const APPROVED_CORPUS_REFERENCE = "default_synthetic_corpus_v1" as const;

export type ResolvedCorpus = Readonly<{
  fixtureRoot: string;
  corpusReference: typeof APPROVED_CORPUS_REFERENCE;
  files: readonly string[];
  manifestHash: string;
}>;

export function resolveApprovedSyntheticCorpus(input: {
  fixtureRoot: string;
  corpusReference: string;
  itemLimit: number;
}): ResolvedCorpus {
  const isApprovedReference =
    input.corpusReference === APPROVED_CORPUS_REFERENCE || input.corpusReference.startsWith("m9:");
  if (!isApprovedReference) {
    throw new Error("Unsupported corpus reference; only approved synthetic corpus is admitted.");
  }
  if (URL_LIKE_PATTERN.test(input.corpusReference) || input.corpusReference.includes("..")) {
    throw new Error("Corpus reference must not include traversal or URL-like values.");
  }
  if (!Number.isInteger(input.itemLimit) || input.itemLimit <= 0 || input.itemLimit > 64) {
    throw new Error("itemLimit must be an integer between 1 and 64.");
  }

  const fixtureRoot = path.resolve(input.fixtureRoot);
  const entries = readdirSync(fixtureRoot).sort();
  const files: string[] = [];
  for (const entry of entries) {
    const candidate = path.resolve(fixtureRoot, entry);
    if (!candidate.startsWith(fixtureRoot + path.sep)) {
      throw new Error("Fixture path boundary violation detected.");
    }
    if (URL_LIKE_PATTERN.test(candidate)) {
      throw new Error("Fixture path must not be URL-like.");
    }
    if (!entry.endsWith(".json")) {
      continue;
    }
    const stat = statSync(candidate);
    if (!stat.isFile()) {
      continue;
    }
    files.push(candidate);
  }

  if (files.length === 0) {
    throw new Error("No approved fixture files found.");
  }

  const boundedFiles = files.slice(0, input.itemLimit);
  const isHalCanonReference = input.corpusReference.startsWith("m9:hal_canon_v1@");
  for (const filePath of boundedFiles) {
    const content = readFileSync(filePath, "utf8");
    if ((isHalCanonReference ? CREDENTIAL_VALUE_PATTERN : SECRET_LIKE_PATTERN).test(content)) {
      throw new Error("Fixture content rejected: secret-like pattern detected.");
    }
  }

  const manifestSource = boundedFiles
    .map((filePath) => `${path.relative(fixtureRoot, filePath)}:${readFileSync(filePath, "utf8")}`)
    .join("\n");
  const manifestHash = createHash("sha256").update(manifestSource).digest("hex");

  return Object.freeze({
    fixtureRoot,
    corpusReference: APPROVED_CORPUS_REFERENCE,
    files: Object.freeze(boundedFiles),
    manifestHash
  });
}
