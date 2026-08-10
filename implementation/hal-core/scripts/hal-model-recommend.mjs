#!/usr/bin/env node
/** Owner-visible, deterministic DR 0036 model recommendation; no model is invoked. */
import { INITIAL_LOCAL_MODEL_CATALOG } from "../dist/src/modelPlanning/initialCatalog.js";
import { recommendLocalModel } from "../dist/src/modelPlanning/recommendation.js";

const modality = process.argv[2];
if (modality !== "text" && modality !== "image") {
  process.stderr.write("Usage: npm run hal:model:recommend -- <text|image>\n");
  process.exitCode = 2;
} else {
  const recommendation = recommendLocalModel(INITIAL_LOCAL_MODEL_CATALOG, {
    taskLabel: `Owner-requested ${modality} task`,
    requiredModalities: modality === "text" ? ["text"] : ["text", "image"],
    maximumArtifactBytes: 6_500_000_000
  });
  process.stdout.write(`${JSON.stringify({ result: "completed", recommendation })}\n`);
}
