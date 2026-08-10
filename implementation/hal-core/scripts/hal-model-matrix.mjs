#!/usr/bin/env node
/** Owner-visible, local-only model comparison. It never invokes a model or network. */
import { INITIAL_LOCAL_MODEL_CATALOG } from "../dist/src/modelPlanning/initialCatalog.js";
import { INITIAL_MODEL_PLANNING_EVIDENCE } from "../dist/src/modelPlanning/initialEvidence.js";
import { buildModelCapabilityMatrix } from "../dist/src/modelPlanning/evaluation.js";

const modality = process.argv[2];
if (modality !== "text" && modality !== "image") {
  process.stderr.write("Usage: npm run hal:model:matrix -- <text|image>\n");
  process.exitCode = 2;
} else {
  const task = {
    taskLabel: `Owner-requested ${modality} task`,
    requiredModalities: modality === "text" ? ["text"] : ["text", "image"],
    maximumArtifactBytes: 6_500_000_000
  };
  const matrix = buildModelCapabilityMatrix({
    catalog: INITIAL_LOCAL_MODEL_CATALOG,
    evidence: INITIAL_MODEL_PLANNING_EVIDENCE,
    task
  });
  process.stdout.write(`${JSON.stringify({ result: "completed", matrix })}\n`);
}
