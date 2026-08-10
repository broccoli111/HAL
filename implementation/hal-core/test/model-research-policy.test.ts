import { describe, expect, test } from "vitest";

import {
  MODEL_RESEARCH_MAX_RESPONSE_BYTES,
  createModelResearchEvidence,
  isAllowedModelResearchUrl
} from "../src/modelPlanning/researchPolicy.js";

describe("governed model research policy", () => {
  test("allows only the fixed official model-planning pages", () => {
    expect(isAllowedModelResearchUrl("https://ollama.com/library/qwen3-vl")).toBe(true);
    expect(isAllowedModelResearchUrl("https://example.com/model")).toBe(false);
    expect(isAllowedModelResearchUrl("https://ollama.com/library/qwen3-vl?query=private")).toBe(
      false
    );
  });

  test("records only bounded minimised research evidence", () => {
    const evidence = createModelResearchEvidence({
      sourceUrl: "https://ollama.com/library/qwen3-vl",
      retrievedAtUtc: "2026-08-10T00:00:00.000Z",
      responseBytes: new TextEncoder().encode("official public model metadata")
    });
    expect(evidence).toMatchObject({
      sourceUrl: "https://ollama.com/library/qwen3-vl",
      responseByteSize: 30
    });
    expect(evidence.responseSha256).toHaveLength(64);
  });

  test("fails closed on an unallowlisted destination or oversized response", () => {
    expect(() =>
      createModelResearchEvidence({
        sourceUrl: "https://example.com/model",
        retrievedAtUtc: "2026-08-10T00:00:00.000Z",
        responseBytes: new Uint8Array([1])
      })
    ).toThrow("not allowlisted");
    expect(() =>
      createModelResearchEvidence({
        sourceUrl: "https://ollama.com/library/qwen3-vl",
        retrievedAtUtc: "2026-08-10T00:00:00.000Z",
        responseBytes: new Uint8Array(MODEL_RESEARCH_MAX_RESPONSE_BYTES + 1)
      })
    ).toThrow("exceeds bound");
  });
});
