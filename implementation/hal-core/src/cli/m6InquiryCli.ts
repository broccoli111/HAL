import path from "node:path";

import { runM6Inquiry } from "../m6/orchestrator.js";
import type { M6AdmissionMode } from "../m6/m2Linkage.js";

function parseFlag(argv: readonly string[], flag: string): string | undefined {
  const index = argv.indexOf(flag);
  if (index < 0) {
    return undefined;
  }
  return argv[index + 1];
}

function requireFlag(argv: readonly string[], flag: string): string {
  const value = parseFlag(argv, flag);
  if (!value?.trim()) {
    throw new Error(`Missing required ${flag}.`);
  }
  return value;
}

function parseAdmissionMode(value: string | undefined): M6AdmissionMode {
  if (!value) {
    return "allow";
  }
  if (value === "allow" || value === "approval_required" || value === "deny") {
    return value;
  }
  throw new Error("Unsupported --admission value. Use allow|approval_required|deny.");
}

function main(): void {
  const argv = process.argv.slice(2);
  if (argv.includes("--corpus-root")) {
    throw new Error("Unsupported --corpus-root flag for M6 inquiry.");
  }
  const stateDirectory = path.resolve(requireFlag(argv, "--state-dir"));
  const questionText = requireFlag(argv, "--question");
  const requestId = parseFlag(argv, "--request-id");
  const admissionMode = parseAdmissionMode(parseFlag(argv, "--admission"));
  const result = runM6Inquiry({
    stateDirectory,
    questionText,
    ...(requestId ? { requestId } : {}),
    admissionMode
  });
  console.log(`requestId: ${result.requestId}`);
  console.log(`correlationId: ${result.correlationId}`);
  console.log(`result: ${result.result}`);
  console.log(`disposition: ${result.disposition}`);
  console.log(`replayed: ${result.replayed}`);
  console.log(`attestationStatus: ${result.attestationStatus}`);
  console.log(`attestationClaimedEffect: ${result.attestationClaimedEffect}`);
  console.log(`inputClassification: ${result.inputClassification}`);
  console.log(`selectedDocumentIds: ${result.selectedDocumentIds.join(",") || "none"}`);
  console.log(`selectedSectionIds: ${result.selectedSectionIds.join(",") || "none"}`);
  console.log(`corpusManifestHash: ${result.corpusManifestHashSha256}`);
  console.log(`questionHash: ${result.questionHashSha256}`);
  console.log("response:");
  console.log(result.renderedResponse);
}

main();
