import path from "node:path";

import type { CorrelationId } from "../shared/types.js";
import { reconstructM3Trace, runM3BoundedCapabilityDemo } from "../m3/orchestrator.js";

function printUsage(): void {
  console.log(
    [
      "Usage:",
      "  npm run m3:demo -- run --state-dir <path> [--fixture-root <path>] [--deadline-ms <ms>] [--item-limit <n>]",
      "  npm run m3:demo -- reconstruct --state-dir <path> --correlation-id <id>"
    ].join("\n")
  );
}

function parseFlag(argv: readonly string[], flag: string): string | undefined {
  const index = argv.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  return argv[index + 1];
}

function requireFlag(argv: readonly string[], flag: string): string {
  const value = parseFlag(argv, flag);
  if (!value) {
    throw new Error(`Missing required flag ${flag}.`);
  }
  return value;
}

function main(): void {
  const argv = process.argv.slice(2);
  const mode = argv[0];
  if (!mode || (mode !== "run" && mode !== "reconstruct")) {
    printUsage();
    throw new Error("Mode must be run or reconstruct.");
  }
  const stateDirectory = path.resolve(requireFlag(argv, "--state-dir"));
  if (mode === "run") {
    const fixtureRoot = parseFlag(argv, "--fixture-root");
    const deadlineMs = parseFlag(argv, "--deadline-ms");
    const itemLimit = parseFlag(argv, "--item-limit");
    const result = runM3BoundedCapabilityDemo({
      stateDirectory,
      ...(fixtureRoot ? { fixtureRoot: path.resolve(fixtureRoot) } : {}),
      ...(deadlineMs ? { deadlineMs: Number(deadlineMs) } : {}),
      ...(itemLimit ? { itemLimit: Number(itemLimit) } : {})
    });
    console.log(`correlationId: ${result.correlationId}`);
    console.log(`capabilityRequestId: ${result.capabilityRequestId}`);
    console.log(`executionAttemptId: ${result.executionAttemptId}`);
    console.log(`artifactId: ${result.artifactId ?? "none"}`);
    console.log(`verificationId: ${result.verificationId ?? "none"}`);
    console.log(`providerVersion: ${result.providerVersion}`);
    console.log(`fixtureManifestHash: ${result.fixtureManifestHash}`);
    console.log(`verificationPassed: ${result.verificationPassed}`);
    console.log(`claimedEffect: ${result.claimedEffect}`);
    return;
  }

  const correlationId = requireFlag(argv, "--correlation-id") as CorrelationId;
  const trace = reconstructM3Trace(stateDirectory, correlationId);
  console.log(`correlationId: ${trace.correlationId}`);
  console.log(`capabilityRequestId: ${trace.capabilityRequestId ?? "none"}`);
  console.log(`executionAttemptId: ${trace.executionAttemptId ?? "none"}`);
  console.log(`artifactId: ${trace.artifactId ?? "none"}`);
  console.log(`verificationId: ${trace.verificationId ?? "none"}`);
  console.log(`finalAttemptStatus: ${trace.finalAttemptStatus ?? "none"}`);
  console.log(`verificationPassed: ${trace.verificationPassed ?? false}`);
  console.log(`claimedEffect: ${trace.claimedEffect}`);
}

main();
