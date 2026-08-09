import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";

import {
  M6_MAX_CODE_POINTS,
  M6_MAX_UTF8_BYTES,
  type M6QuestionAssessment,
  type M6RejectionCode
} from "./types.js";
import { normalizeForM6, tokenizeForM6 } from "./tokenizer.js";

const SECRET_PATTERNS = [
  /\b(api[_-]?key|secret|token|password|passwd|private[_-]?key|bearer\s+[a-z0-9._-]+)\b/iu,
  /\b(aws|ghp|xox[baprs]|sk)_[a-z0-9]{16,}\b/iu,
  /\b[0-9a-f]{32,}\b/iu
] as const;

const PATH_PATTERNS = [
  /(^|\s)(\/[^\s]+)/u,
  /(^|\s)(~\/[^\s]*)/u,
  /\.\./u,
  /\.\\/u,
  /\b[a-z]:\\/iu
] as const;

const URL_PATTERNS = [/\b[a-z][a-z0-9+.-]*:\/\/[^\s]+/iu, /\bwww\.[^\s]+\.[a-z]{2,}\b/iu] as const;

const COMMAND_PATTERNS = [/[;&|\x60]/u, /\$\(/u, /\|\|/u, /&&/u, />/u, /</u] as const;

const INJECTION_PATTERNS = [
  /\b(ignore\s+previous|ignore\s+all\s+instructions|system\s+prompt|developer\s+message|tool\s+call|execute\s+command|run\s+shell|override\s+policy|bypass\s+safety)\b/iu
] as const;

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function firstPatternMatch(value: string, patterns: readonly RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(value));
}

function hasAsciiControlCharacter(value: string): boolean {
  for (const character of value) {
    const code = character.codePointAt(0) ?? 0;
    if ((code >= 0x00 && code <= 0x1f) || code === 0x7f) {
      return true;
    }
  }
  return false;
}

export function assessQuestionText(questionText: string): M6QuestionAssessment {
  const rawCodePoints = [...questionText].length;
  const rawBytes = Buffer.byteLength(questionText, "utf8");
  const normalizedQuestionText = normalizeForM6(questionText);
  const normalizedHash = sha256(normalizedQuestionText);
  const normalizedCodePoints = [...normalizedQuestionText].length;
  const normalizedBytes = Buffer.byteLength(normalizedQuestionText, "utf8");

  const denied = (code: M6RejectionCode): M6QuestionAssessment =>
    Object.freeze({
      disposition: "denied",
      code,
      questionCodePoints: normalizedCodePoints,
      questionUtf8Bytes: normalizedBytes,
      questionNormalizedHashSha256: normalizedHash,
      questionTokens: Object.freeze([])
    });

  // JavaScript strings are already decoded UTF-16; malformed UTF-8 is not representable here.
  if (!normalizedQuestionText) {
    return denied("REJ_EMPTY_OR_WHITESPACE");
  }
  if (questionText.includes("\uFFFD")) {
    return denied("REJ_MALFORMED_UTF8");
  }
  if (/\r|\n/u.test(questionText)) {
    return denied("REJ_NOT_SINGLE_LINE");
  }
  if (hasAsciiControlCharacter(questionText)) {
    return denied("REJ_ASCII_CONTROL_CHAR");
  }
  if (rawCodePoints > M6_MAX_CODE_POINTS) {
    return denied("REJ_TOO_MANY_CODE_POINTS");
  }
  if (rawBytes > M6_MAX_UTF8_BYTES) {
    return denied("REJ_TOO_MANY_UTF8_BYTES");
  }
  if (firstPatternMatch(normalizedQuestionText, SECRET_PATTERNS)) {
    return denied("REJ_SECRET_LIKE");
  }
  if (firstPatternMatch(normalizedQuestionText, PATH_PATTERNS)) {
    return denied("REJ_PATH_LIKE");
  }
  if (firstPatternMatch(normalizedQuestionText, URL_PATTERNS)) {
    return denied("REJ_URL_LIKE");
  }
  if (firstPatternMatch(normalizedQuestionText, COMMAND_PATTERNS)) {
    return denied("REJ_COMMAND_METACHAR");
  }
  if (firstPatternMatch(normalizedQuestionText, INJECTION_PATTERNS)) {
    return denied("REJ_INJECTION_LIKE");
  }

  return Object.freeze({
    disposition: "accepted",
    normalizedQuestionText,
    questionCodePoints: rawCodePoints,
    questionUtf8Bytes: rawBytes,
    questionNormalizedHashSha256: normalizedHash,
    questionTokens: tokenizeForM6(normalizedQuestionText)
  });
}

export function containsSecretLikeContent(value: string): boolean {
  return firstPatternMatch(normalizeForM6(value), SECRET_PATTERNS);
}
