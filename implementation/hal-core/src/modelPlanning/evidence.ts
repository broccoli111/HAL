import type { ModelPlanningEvidence } from "./types.js";

function assert(value: unknown, message: string): asserts value {
  if (!value) throw new Error(message);
}

/**
 * Validates a minimised planning-evidence reference. It stores no page body,
 * benchmark result, prompt, user data, or provider claim as HAL truth.
 */
export function validateModelPlanningEvidence(
  evidence: ModelPlanningEvidence
): ModelPlanningEvidence {
  assert(evidence.sourceUrl.startsWith("https://"), "model evidence source URL is invalid");
  assert(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(evidence.retrievedAtUtc),
    "model evidence retrieval time is invalid"
  );
  assert(/^[a-f0-9]{64}$/.test(evidence.responseSha256), "model evidence digest is invalid");
  assert(
    Number.isSafeInteger(evidence.responseByteSize) && evidence.responseByteSize > 0,
    "model evidence size is invalid"
  );
  assert(
    evidence.observationKind === "publisher_metadata" ||
      evidence.observationKind === "registry_metadata" ||
      evidence.observationKind === "runtime_documentation",
    "model evidence observation kind is invalid"
  );
  assert(
    evidence.subjectModelIds.length > 0 &&
      evidence.subjectModelIds.every((modelId) => /^[a-z0-9][a-z0-9:._-]{1,127}$/.test(modelId)),
    "model evidence subject is invalid"
  );
  return Object.freeze({
    ...evidence,
    subjectModelIds: Object.freeze([...evidence.subjectModelIds])
  });
}

export function validateModelPlanningEvidenceSet(
  evidence: readonly ModelPlanningEvidence[]
): readonly ModelPlanningEvidence[] {
  const validated = evidence.map(validateModelPlanningEvidence);
  assert(
    new Set(validated.map((item) => `${item.sourceUrl}#${item.responseSha256}`)).size ===
      validated.length,
    "model evidence records duplicate"
  );
  return Object.freeze(validated);
}
