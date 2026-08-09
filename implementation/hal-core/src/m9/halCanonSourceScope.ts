import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Exact Owner-approved source scope for DR 0028. This list is intentionally
 * explicit: adding a source is a governance change, never runtime selection.
 */
export const HAL_CANON_SOURCE_PATHS = Object.freeze([
  "Documents/_FinalOutput/Markdown/HAL_BOOK_1_CONSTITUTION.md",
  "Documents/_FinalOutput/Markdown/HAL_BOOK_II_ARCHITECTURE_SPECIFICATION_PROVISIONAL_2026-08-09.md",
  "Documents/Book III/deliverables/HAL_BOOK_III_ENGINEERING_STANDARDS.md",
  "Documents/_FinalOutput/Markdown/HAL_BOOK_4_COMPONENT_SPECIFICATIONS.md",
  "Documents/_FinalOutput/Markdown/HAL_BOOK_10_CANONICAL_TERMINOLOGY_AND_INFORMATION_MODEL.md",
  "agents.md",
  "CURRENT_STATE.md",
  ...Array.from(
    { length: 28 },
    (_, index) =>
      `decisions/${String(index + 1).padStart(4, "0")}-${
        [
          "agent-runtime-sovereignty-and-replaceability",
          "runtime-contract-durable-record-model",
          "hermes-evaluation-source-pin",
          "hermes-latest-evaluation-source-pin",
          "disposable-vm-hermes-evaluation-environment",
          "container-runtime-hermes-evaluation-environment",
          "gx10-1-synthetic-runtime-test-phase",
          "test-only-hermes-line-driver",
          "test-only-streaming-cancellation",
          "owner-authorized-independent-review-control-exception",
          "production-runtime-integration-design-phase",
          "proposed-bounded-hermes-implementation-and-activation-phase",
          "local-only-model-provider-policy-and-pilot",
          "ollama-local-model-runtime-selection",
          "qwen3-8b-initial-local-model-catalog-entry",
          "gx10-1-gpu-enabled-local-ollama-service",
          "controlled-local-inference-proxy-selection",
          "hal-owned-local-inference-mediation-contract",
          "contained-mediation-negative-test-phase",
          "bounded-positive-local-inference-mediation-test",
          "book-ii-targeted-review-initiation",
          "owner-direction-to-continue-under-review-exception",
          "solo-owner-assurance-profile",
          "owner-authorized-book-iii-certification-control-exception",
          "hermes-zero-capability-design-and-conformance-phase",
          "real-hermes-local-only-reference-runtime-pilot",
          "proposed-hal-to-gx10-runtime-transport",
          "proposed-controlled-hal-canon-knowledge-pilot"
        ][index]
      }.md`
  )
] as const);

export const M9_HAL_CANON_PACK_ID = "hal_canon_v1" as const;
export const M9_HAL_CANON_PACK_CLASSIFICATION = "owner_approved_hal_canon_local_only" as const;
export const M9_HAL_CANON_PROVENANCE_CLASSIFICATION = "owner_approved_repository_canon" as const;

export function resolveHalRepositoryRoot(): string {
  let probe = path.dirname(fileURLToPath(import.meta.url));
  for (let depth = 0; depth < 10; depth += 1) {
    const packageJson = path.resolve(probe, "package.json");
    if (existsSync(packageJson)) {
      return path.resolve(probe, "..", "..");
    }
    const parent = path.dirname(probe);
    if (parent === probe) break;
    probe = parent;
  }
  throw new Error("Unable to resolve HAL repository root.");
}
