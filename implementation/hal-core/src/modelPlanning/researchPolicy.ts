import { createHash } from "node:crypto";

export const MODEL_RESEARCH_MAX_RESPONSE_BYTES = 262_144 as const;
export const MODEL_RESEARCH_ALLOWED_URLS = Object.freeze([
  "https://ollama.com/library/qwen3-vl",
  "https://ollama.com/library/qwen3-vl/tags",
  "https://docs.ollama.com/capabilities/vision"
]);

export type ModelResearchEvidence = Readonly<{
  sourceUrl: string;
  retrievedAtUtc: string;
  responseSha256: string;
  responseByteSize: number;
}>;

export function isAllowedModelResearchUrl(value: string): boolean {
  return MODEL_RESEARCH_ALLOWED_URLS.includes(value);
}

/**
 * Produces minimised evidence only. The page body is deliberately not retained
 * as HAL knowledge or passed to a runtime by this policy layer.
 */
export function createModelResearchEvidence(input: {
  sourceUrl: string;
  retrievedAtUtc: string;
  responseBytes: Uint8Array;
}): ModelResearchEvidence {
  if (!isAllowedModelResearchUrl(input.sourceUrl)) {
    throw new Error("model research destination is not allowlisted");
  }
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(input.retrievedAtUtc)) {
    throw new Error("model research retrieval time is invalid");
  }
  if (
    input.responseBytes.byteLength === 0 ||
    input.responseBytes.byteLength > MODEL_RESEARCH_MAX_RESPONSE_BYTES
  ) {
    throw new Error("model research response exceeds bound");
  }
  return Object.freeze({
    sourceUrl: input.sourceUrl,
    retrievedAtUtc: input.retrievedAtUtc,
    responseSha256: createHash("sha256").update(input.responseBytes).digest("hex"),
    responseByteSize: input.responseBytes.byteLength
  });
}
