import {
  MODEL_CATALOG_SCHEMA_VERSION,
  type LocalModelCatalog,
  type LocalModelCatalogEntry,
  type ModelModality
} from "./types.js";

function assert(value: unknown, message: string): asserts value {
  if (!value) throw new Error(message);
}

function hasUniqueValues(values: readonly string[]): boolean {
  return new Set(values).size === values.length;
}

function supportsAll(entry: LocalModelCatalogEntry, modalities: readonly ModelModality[]): boolean {
  return modalities.every((modality) => entry.modalities.includes(modality));
}

export function validateLocalModelCatalog(catalog: LocalModelCatalog): LocalModelCatalog {
  assert(catalog.schemaVersion === MODEL_CATALOG_SCHEMA_VERSION, "model catalog schema is invalid");
  assert(
    catalog.entries.length > 0 && catalog.entries.length <= 32,
    "model catalog size is invalid"
  );
  assert(
    hasUniqueValues(catalog.entries.map((entry) => entry.modelId)),
    "model catalog IDs duplicate"
  );
  for (const entry of catalog.entries) {
    assert(/^[a-z0-9][a-z0-9:._-]{1,127}$/.test(entry.modelId), "model catalog ID is invalid");
    assert(entry.runtime === "ollama", "model runtime is not admitted");
    assert(
      entry.status === "approved_local" || entry.status === "candidate_owner_approval_required",
      "model catalog status is invalid"
    );
    assert(
      entry.modalities.length > 0 && hasUniqueValues(entry.modalities),
      "model modalities are invalid"
    );
    assert(
      entry.modalities.every((modality) => modality === "text" || modality === "image"),
      "model modality is invalid"
    );
    assert(
      Number.isSafeInteger(entry.estimatedArtifactBytes) && entry.estimatedArtifactBytes > 0,
      "model artifact estimate is invalid"
    );
    assert(
      entry.researchEvidence.length > 0 &&
        entry.researchEvidence.every((value) => value.startsWith("https://")),
      "model research evidence is invalid"
    );
  }
  return Object.freeze({ ...catalog, entries: Object.freeze([...catalog.entries]) });
}

export function findModelsForTask(
  catalog: LocalModelCatalog,
  modalities: readonly ModelModality[],
  maximumArtifactBytes: number,
  status?: LocalModelCatalogEntry["status"]
): readonly LocalModelCatalogEntry[] {
  return Object.freeze(
    validateLocalModelCatalog(catalog).entries.filter(
      (entry) =>
        (!status || entry.status === status) &&
        entry.estimatedArtifactBytes <= maximumArtifactBytes &&
        supportsAll(entry, modalities)
    )
  );
}
