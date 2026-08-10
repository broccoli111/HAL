import type { ModelPlanningEvidence } from "./types.js";

/**
 * Minimised evidence from the single DR 0036 official-source research probe.
 * These records are observations with provenance, not model performance claims.
 */
export const INITIAL_MODEL_PLANNING_EVIDENCE: readonly ModelPlanningEvidence[] = Object.freeze([
  Object.freeze({
    sourceUrl: "https://ollama.com/library/qwen3-vl",
    retrievedAtUtc: "2026-08-10T11:30:08.433Z",
    responseSha256: "125a75cf752c1477c1efa5e23e1e3e4030f840596f4a39e2260bcb45a1c16c79",
    responseByteSize: 94130,
    observationKind: "registry_metadata" as const,
    subjectModelIds: Object.freeze(["qwen3-vl:8b"])
  }),
  Object.freeze({
    sourceUrl: "https://ollama.com/library/qwen3-vl/tags",
    retrievedAtUtc: "2026-08-10T11:30:08.529Z",
    responseSha256: "190d8135c47c8f151319a61db190546aad1308c3aaf9cf6e5cd1b1f11f9c7b92",
    responseByteSize: 210408,
    observationKind: "registry_metadata" as const,
    subjectModelIds: Object.freeze(["qwen3-vl:8b"])
  }),
  Object.freeze({
    sourceUrl: "https://docs.ollama.com/capabilities/vision",
    retrievedAtUtc: "2026-08-10T11:30:08.710Z",
    responseSha256: "686042fdf88aec06caa9cd38db13680956829d40e8bdd937a3b1ea1ce43f9e3b",
    responseByteSize: 259586,
    observationKind: "runtime_documentation" as const,
    subjectModelIds: Object.freeze(["qwen3-vl:8b"])
  })
]);
