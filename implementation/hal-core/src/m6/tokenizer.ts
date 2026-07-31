import { M6_TOKENIZER_VERSION } from "./types.js";

const TOKEN_REGEX = /[\p{L}\p{N}]+(?:['-][\p{L}\p{N}]+)*/gu;
const STOPWORDS = Object.freeze([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "for",
  "from",
  "how",
  "in",
  "into",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "to",
  "was",
  "were",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "with"
] as const);

const STOPWORD_SET = new Set<string>(STOPWORDS);

export function normalizeForM6(value: string): string {
  return value.normalize("NFKC").trim().toLocaleLowerCase("en-US");
}

export function tokenizeForM6(normalizedValue: string): readonly string[] {
  const tokens: string[] = [];
  const seen = new Set<string>();
  TOKEN_REGEX.lastIndex = 0;
  for (const match of normalizedValue.matchAll(TOKEN_REGEX)) {
    const token = match[0] ?? "";
    if ([...token].length < 2) {
      continue;
    }
    if (seen.has(token)) {
      continue;
    }
    seen.add(token);
    if (STOPWORD_SET.has(token)) {
      continue;
    }
    tokens.push(token);
  }
  return Object.freeze(tokens);
}

export function getTokenizerVersion() {
  return M6_TOKENIZER_VERSION;
}
