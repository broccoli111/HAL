import { validateLocalModelCatalog } from "./catalog.js";
import { validateModelPlanningEvidenceSet } from "./evidence.js";
import type {
  LocalModelCatalog,
  ModelCapabilityMatrix,
  ModelCapabilityMatrixRow,
  ModelPlanningEvidence,
  ModelTaskRequirement
} from "./types.js";

export const MODEL_RECOMMENDATION_POLICY_ID = "hal.model-recommendation-policy.v1" as const;

function assertTask(requirement: ModelTaskRequirement): void {
  if (!requirement.taskLabel.trim()) throw new Error("model task label is required");
  if (
    requirement.requiredModalities.length === 0 ||
    requirement.requiredModalities.some((value) => value !== "text" && value !== "image")
  ) {
    throw new Error("model task modalities are invalid");
  }
  if (
    !Number.isSafeInteger(requirement.maximumArtifactBytes) ||
    requirement.maximumArtifactBytes <= 0
  ) {
    throw new Error("model task artifact bound is invalid");
  }
}

/**
 * Produces an explainable comparison, not a benchmark or authority grant.
 * Score is deterministic policy arithmetic over declared catalog facts and
 * retained official evidence coverage; it never invokes a model or provider.
 */
export function buildModelCapabilityMatrix(input: {
  catalog: LocalModelCatalog;
  evidence: readonly ModelPlanningEvidence[];
  task: ModelTaskRequirement;
}): ModelCapabilityMatrix {
  const catalog = validateLocalModelCatalog(input.catalog);
  const evidence = validateModelPlanningEvidenceSet(input.evidence);
  assertTask(input.task);
  const rows = catalog.entries.map((entry) => {
    const matchedEvidence = evidence.filter(
      (item) =>
        item.subjectModelIds.includes(entry.modelId) &&
        entry.researchEvidence.includes(item.sourceUrl)
    );
    const evidenceCoverage =
      matchedEvidence.length === 0
        ? "absent"
        : matchedEvidence.length === entry.researchEvidence.length
          ? "complete"
          : "partial";
    const taskSuitable =
      entry.estimatedArtifactBytes <= input.task.maximumArtifactBytes &&
      input.task.requiredModalities.every((modality) => entry.modalities.includes(modality));
    const limitations: string[] = [];
    if (!taskSuitable)
      limitations.push("Does not satisfy the requested modality or artifact bound.");
    if (evidenceCoverage !== "complete") {
      limitations.push("Retained official evidence is incomplete for comparative ranking.");
    }
    if (entry.status !== "approved_local") {
      limitations.push("Candidate is not approved or acquired for local use.");
    }
    const evidenceScore =
      evidenceCoverage === "complete" ? 50 : evidenceCoverage === "partial" ? 25 : 0;
    const availabilityScore = entry.status === "approved_local" ? 35 : 0;
    const resourceScore = taskSuitable ? 15 : 0;
    const row: ModelCapabilityMatrixRow = {
      modelId: entry.modelId,
      status: entry.status,
      taskSuitable,
      evidenceCoverage,
      matchedEvidenceSources: Object.freeze(matchedEvidence.map((item) => item.sourceUrl).sort()),
      ...(taskSuitable ? { score: evidenceScore + availabilityScore + resourceScore } : {}),
      limitations: Object.freeze(limitations)
    };
    return Object.freeze(row);
  });
  return Object.freeze({
    policyId: MODEL_RECOMMENDATION_POLICY_ID,
    task: Object.freeze({
      ...input.task,
      requiredModalities: Object.freeze([...input.task.requiredModalities])
    }),
    evidence,
    rows: Object.freeze(
      [...rows].sort(
        (left, right) =>
          (right.score ?? -1) - (left.score ?? -1) || left.modelId.localeCompare(right.modelId)
      )
    ),
    rankingLimitations: Object.freeze([
      "Scores are policy-explainability aids, not performance benchmarks or truth claims.",
      "Only retained official evidence references are counted; missing evidence remains explicit.",
      "A score never authorizes acquisition, activation, dispatch, or external inference."
    ])
  });
}
