import path from "node:path";

import type { CorrelationId } from "../shared/types.js";
import { reconstructM4Trace, runM4VerifiedOutcomeDemo, type M4DemoScenario } from "../m4/index.js";

const SUPPORTED_SCENARIOS: readonly M4DemoScenario[] = [
  "allowed_verified",
  "blocked_approval_required",
  "blocked_denied",
  "cancelled",
  "timed_out",
  "verification_rejected",
  "incomplete_evidence"
];

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

function parseScenario(argv: readonly string[]): M4DemoScenario {
  const value = parseFlag(argv, "--scenario") ?? "allowed_verified";
  if (SUPPORTED_SCENARIOS.includes(value as M4DemoScenario)) {
    return value as M4DemoScenario;
  }
  throw new Error(`Unsupported scenario. Use one of: ${SUPPORTED_SCENARIOS.join(", ")}`);
}

function main(): void {
  const argv = process.argv.slice(2);
  const mode = argv[0];
  if (!mode || (mode !== "run" && mode !== "reconstruct")) {
    throw new Error("Mode must be run or reconstruct.");
  }
  const stateDirectory = path.resolve(requireFlag(argv, "--state-dir"));
  if (mode === "run") {
    const scenario = parseScenario(argv);
    const fixtureRoot = parseFlag(argv, "--fixture-root");
    const result = runM4VerifiedOutcomeDemo({
      stateDirectory,
      scenario,
      ...(fixtureRoot ? { fixtureRoot: path.resolve(fixtureRoot) } : {})
    });
    console.log(`correlationId: ${result.correlationId}`);
    console.log(`scenario: ${result.scenario}`);
    console.log(`attestationId: ${result.attestationId}`);
    console.log(`recoveryCaseId: ${result.recoveryCaseId ?? "none"}`);
    console.log(`explanationId: ${result.explanationId}`);
    console.log(`finalOutcomeStatus: ${result.finalOutcomeStatus}`);
    console.log(`claimedEffect: ${result.claimedEffect}`);
    return;
  }

  const correlationId = requireFlag(argv, "--correlation-id") as CorrelationId;
  const trace = reconstructM4Trace(stateDirectory, correlationId);
  console.log(`correlationId: ${trace.correlationId}`);
  console.log(`m2IntegrityValid: ${trace.m2IntegrityValid}`);
  console.log(`m3IntegrityValid: ${trace.m3IntegrityValid}`);
  console.log(`m4IntegrityValid: ${trace.m4IntegrityValid}`);
  console.log(`attestationId: ${trace.attestationId ?? "none"}`);
  console.log(`recoveryCaseId: ${trace.recoveryCaseId ?? "none"}`);
  console.log(`explanationId: ${trace.explanationId ?? "none"}`);
  console.log(`finalOutcomeStatus: ${trace.finalOutcomeStatus}`);
  console.log(`claimedEffect: ${trace.claimedEffect}`);
  console.log(`m3AttemptRan: ${trace.m3AttemptRan}`);
  console.log(`decisionDisposition: ${trace.decisionDisposition}`);
  console.log(`verificationResult: ${trace.verificationResult}`);
  console.log(`boundedSummary: ${trace.boundedSummary}`);
}

main();
