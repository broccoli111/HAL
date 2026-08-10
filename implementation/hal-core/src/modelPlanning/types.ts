export const MODEL_CATALOG_SCHEMA_VERSION = "hal.model-catalog.v1" as const;

export type ModelModality = "text" | "image";
export type LocalModelRuntime = "ollama";
export type ModelCatalogStatus = "approved_local" | "candidate_owner_approval_required";

export type LocalModelCatalogEntry = Readonly<{
  modelId: string;
  runtime: LocalModelRuntime;
  status: ModelCatalogStatus;
  modalities: readonly ModelModality[];
  estimatedArtifactBytes: number;
  researchEvidence: readonly string[];
  notes: string;
}>;

export type LocalModelCatalog = Readonly<{
  schemaVersion: typeof MODEL_CATALOG_SCHEMA_VERSION;
  entries: readonly LocalModelCatalogEntry[];
}>;

export type ModelTaskRequirement = Readonly<{
  taskLabel: string;
  requiredModalities: readonly ModelModality[];
  maximumArtifactBytes: number;
}>;

export type ModelRecommendation = Readonly<{
  modelId: string;
  runtime: LocalModelRuntime;
  decision: "selected_approved_local" | "owner_acquisition_required";
  rationale: string;
  requiredModalities: readonly ModelModality[];
  researchEvidence: readonly string[];
}>;

/** A minimised, immutable reference to an observed official planning source. */
export type ModelPlanningEvidence = Readonly<{
  sourceUrl: string;
  retrievedAtUtc: string;
  responseSha256: string;
  responseByteSize: number;
  observationKind: "publisher_metadata" | "registry_metadata" | "runtime_documentation";
  subjectModelIds: readonly string[];
}>;

export type ModelEvidenceCoverage = "complete" | "partial" | "absent";

export type ModelCapabilityMatrixRow = Readonly<{
  modelId: string;
  status: ModelCatalogStatus;
  taskSuitable: boolean;
  evidenceCoverage: ModelEvidenceCoverage;
  matchedEvidenceSources: readonly string[];
  score?: number;
  limitations: readonly string[];
}>;

export type ModelCapabilityMatrix = Readonly<{
  policyId: "hal.model-recommendation-policy.v1";
  task: ModelTaskRequirement;
  evidence: readonly ModelPlanningEvidence[];
  rows: readonly ModelCapabilityMatrixRow[];
  rankingLimitations: readonly string[];
}>;
