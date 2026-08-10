import { MODEL_CATALOG_SCHEMA_VERSION, type LocalModelCatalog } from "./types.js";

/**
 * DR 0036's initial planning catalog. The vision entry is a researched
 * candidate only; its presence does not authorize download, installation, or
 * use. Artifact estimates are advisory planning data, not measured capacity.
 */
export const INITIAL_LOCAL_MODEL_CATALOG: LocalModelCatalog = Object.freeze({
  schemaVersion: MODEL_CATALOG_SCHEMA_VERSION,
  entries: Object.freeze([
    Object.freeze({
      modelId: "qwen3:8b",
      runtime: "ollama" as const,
      status: "approved_local" as const,
      modalities: Object.freeze(["text"] as const),
      estimatedArtifactBytes: 5_000_000_000,
      researchEvidence: Object.freeze([
        "https://ollama.com/library/qwen3",
        "https://ollama.com/library/qwen3/tags"
      ]),
      notes: "Existing Owner-approved text-only local model catalog entry."
    }),
    Object.freeze({
      modelId: "qwen3-vl:8b",
      runtime: "ollama" as const,
      status: "candidate_owner_approval_required" as const,
      modalities: Object.freeze(["text", "image"] as const),
      estimatedArtifactBytes: 6_100_000_000,
      researchEvidence: Object.freeze([
        "https://ollama.com/library/qwen3-vl",
        "https://ollama.com/library/qwen3-vl/tags",
        "https://docs.ollama.com/capabilities/vision"
      ]),
      notes: "DR 0036 researched vision candidate; no acquisition or enablement is authorized."
    })
  ])
});
