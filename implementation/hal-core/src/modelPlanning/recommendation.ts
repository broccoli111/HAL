import { findModelsForTask, validateLocalModelCatalog } from "./catalog.js";
import type { LocalModelCatalog, ModelRecommendation, ModelTaskRequirement } from "./types.js";

function assert(value: unknown, message: string): asserts value {
  if (!value) throw new Error(message);
}

function pickSmallest(entries: ReturnType<typeof findModelsForTask>) {
  return [...entries].sort(
    (left, right) =>
      left.estimatedArtifactBytes - right.estimatedArtifactBytes ||
      left.modelId.localeCompare(right.modelId)
  )[0];
}

/**
 * HAL-owned deterministic recommendation: only an already approved local
 * catalog entry can be selected. A candidate is merely an Owner-facing
 * acquisition recommendation and is never executable authority.
 */
export function recommendLocalModel(
  catalog: LocalModelCatalog,
  requirement: ModelTaskRequirement
): ModelRecommendation | undefined {
  assert(requirement.taskLabel.trim().length > 0, "model task label is required");
  assert(
    requirement.requiredModalities.length > 0 &&
      requirement.requiredModalities.every((value) => value === "text" || value === "image"),
    "model task modalities are invalid"
  );
  assert(
    Number.isSafeInteger(requirement.maximumArtifactBytes) && requirement.maximumArtifactBytes > 0,
    "model task artifact bound is invalid"
  );
  validateLocalModelCatalog(catalog);
  const approved = pickSmallest(
    findModelsForTask(
      catalog,
      requirement.requiredModalities,
      requirement.maximumArtifactBytes,
      "approved_local"
    )
  );
  if (approved) {
    return Object.freeze({
      modelId: approved.modelId,
      runtime: approved.runtime,
      decision: "selected_approved_local",
      rationale: `Approved local catalog entry satisfies ${requirement.requiredModalities.join(", ")}.`,
      requiredModalities: Object.freeze([...requirement.requiredModalities]),
      researchEvidence: Object.freeze([...approved.researchEvidence])
    });
  }
  const candidate = pickSmallest(
    findModelsForTask(
      catalog,
      requirement.requiredModalities,
      requirement.maximumArtifactBytes,
      "candidate_owner_approval_required"
    )
  );
  if (!candidate) return undefined;
  return Object.freeze({
    modelId: candidate.modelId,
    runtime: candidate.runtime,
    decision: "owner_acquisition_required",
    rationale: `Candidate supports ${requirement.requiredModalities.join(", ")} but is not an approved local catalog entry.`,
    requiredModalities: Object.freeze([...requirement.requiredModalities]),
    researchEvidence: Object.freeze([...candidate.researchEvidence])
  });
}
