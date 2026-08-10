import { describe, expect, test } from "vitest";

import { validateLocalModelCatalog } from "../src/modelPlanning/catalog.js";
import { INITIAL_LOCAL_MODEL_CATALOG } from "../src/modelPlanning/initialCatalog.js";
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
});
