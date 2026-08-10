import { describe, expect, test } from "vitest";

import { validateLocalModelCatalog } from "../src/modelPlanning/catalog.js";
import { INITIAL_LOCAL_MODEL_CATALOG } from "../src/modelPlanning/initialCatalog.js";
import { INITIAL_MODEL_PLANNING_EVIDENCE } from "../src/modelPlanning/initialEvidence.js";
import { buildModelCapabilityMatrix } from "../src/modelPlanning/evaluation.js";
import { recommendLocalModel } from "../src/modelPlanning/recommendation.js";

describe("governed local model recommendation", () => {
  test("selects only an already approved local model for a text task", () => {
    expect(
      recommendLocalModel(INITIAL_LOCAL_MODEL_CATALOG, {
        taskLabel: "bounded local text answer",
        requiredModalities: ["text"],
        maximumArtifactBytes: 6_500_000_000
      })
    ).toMatchObject({ modelId: "qwen3:8b", decision: "selected_approved_local" });
  });

  test("recommends but never selects an unapproved vision candidate", () => {
    expect(
      recommendLocalModel(INITIAL_LOCAL_MODEL_CATALOG, {
        taskLabel: "read an approved image",
        requiredModalities: ["text", "image"],
        maximumArtifactBytes: 6_500_000_000
      })
    ).toMatchObject({ modelId: "qwen3-vl:8b", decision: "owner_acquisition_required" });
  });

  test("fails closed when no catalog entry fits the task bound", () => {
    expect(
      recommendLocalModel(INITIAL_LOCAL_MODEL_CATALOG, {
        taskLabel: "small visual task",
        requiredModalities: ["image"],
        maximumArtifactBytes: 1_000_000_000
      })
    ).toBeUndefined();
  });

  test("rejects a catalog candidate without official evidence", () => {
    expect(() =>
      validateLocalModelCatalog({
        ...INITIAL_LOCAL_MODEL_CATALOG,
        entries: [{ ...INITIAL_LOCAL_MODEL_CATALOG.entries[0]!, researchEvidence: [] }]
      })
    ).toThrow("research evidence");
  });

  test("builds an explainable matrix without treating a candidate as available", () => {
    const matrix = buildModelCapabilityMatrix({
      catalog: INITIAL_LOCAL_MODEL_CATALOG,
      evidence: INITIAL_MODEL_PLANNING_EVIDENCE,
      task: {
        taskLabel: "read an approved image",
        requiredModalities: ["text", "image"],
        maximumArtifactBytes: 6_500_000_000
      }
    });
    expect(matrix.policyId).toBe("hal.model-recommendation-policy.v1");
    expect(matrix.evidence[0]).toMatchObject({
      retrievedAtUtc: "2026-08-10T11:30:08.433Z",
      responseSha256: "125a75cf752c1477c1efa5e23e1e3e4030f840596f4a39e2260bcb45a1c16c79"
    });
    expect(matrix.rows[0]).toMatchObject({
      modelId: "qwen3-vl:8b",
      taskSuitable: true,
      evidenceCoverage: "complete",
      score: 65
    });
    expect(matrix.rows[0]?.limitations).toContain(
      "Candidate is not approved or acquired for local use."
    );
    expect(matrix.rankingLimitations.join(" ")).toContain("not performance benchmarks");
  });

  test("keeps missing evidence visible rather than inventing a ranking fact", () => {
    const matrix = buildModelCapabilityMatrix({
      catalog: INITIAL_LOCAL_MODEL_CATALOG,
      evidence: INITIAL_MODEL_PLANNING_EVIDENCE,
      task: {
        taskLabel: "local text answer",
        requiredModalities: ["text"],
        maximumArtifactBytes: 6_500_000_000
      }
    });
    expect(matrix.rows.find((row) => row.modelId === "qwen3:8b")).toMatchObject({
      evidenceCoverage: "absent",
      taskSuitable: true,
      score: 50
    });
  });
});
