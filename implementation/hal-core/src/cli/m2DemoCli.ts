import { readFileSync } from "node:fs";
import path from "node:path";

import { loadControlledConfiguration } from "../kernel/config.js";
import { reconstructM2Trace, runM2DurableIntentDemo } from "../m2/orchestrator.js";
import type { LocalRequestFixtureName } from "../request/fixtures.js";
import type { CorrelationId } from "../shared/types.js";

const FIXTURE_NAMES = [
  "allowed_inspection_request",
  "approval_required_request",
  "denied_unknown_request"
] as const satisfies readonly LocalRequestFixtureName[];

type M2CliMode = "run" | "reconstruct";

function parseFixtureFromArgv(argv: string[]): LocalRequestFixtureName {
  const fixtureIndex = argv.findIndex((arg) => arg === "--fixture");
  if (fixtureIndex < 0) {
    return "allowed_inspection_request";
  }

  const candidate = argv[fixtureIndex + 1];
  if (candidate && FIXTURE_NAMES.includes(candidate as LocalRequestFixtureName)) {
    return candidate as LocalRequestFixtureName;
  }

  throw new Error(
    `Unsupported fixture. Use one of: ${FIXTURE_NAMES.map((name) => `"${name}"`).join(", ")}`
  );
}

function parseStateDirectory(argv: string[]): string {
  const index = argv.findIndex((arg) => arg === "--state-dir");
  const stateDirectory = index >= 0 ? argv[index + 1] : "";
  if (!stateDirectory?.trim()) {
    throw new Error("Missing --state-dir. Explicit state directory is required for M2 local demo.");
  }
  return stateDirectory;
}

function parseCorrelationId(argv: string[]): CorrelationId {
  const index = argv.findIndex((arg) => arg === "--correlation-id");
  const value = index >= 0 ? argv[index + 1] : "";
  if (!value?.trim()) {
    throw new Error("Missing --correlation-id for reconstruct mode.");
  }
  return value as CorrelationId;
}

function parseMode(argv: string[]): M2CliMode {
  if (argv.includes("reconstruct")) {
    return "reconstruct";
  }
  return "run";
}

function printUsage(): void {
  console.log("HAL M2 durable intent demo (local-only)");
  console.log(
    "Run path: npm run m2:demo -- --state-dir ./local-state/hal-m2 --fixture allowed_inspection_request"
  );
  console.log(
    "Reconstruct path: npm run m2:demo -- reconstruct --state-dir ./local-state/hal-m2 --correlation-id <id>"
  );
}

function loadLocalEnvironment(): Record<string, string | undefined> {
  const fromProcess: Record<string, string | undefined> = { ...process.env };
  const envPath = path.resolve(process.cwd(), ".env");
  try {
    const fileContent = readFileSync(envPath, "utf8");
    for (const rawLine of fileContent.split("\n")) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) {
        continue;
      }
      const splitIndex = line.indexOf("=");
      if (splitIndex <= 0) {
        continue;
      }
      const key = line.slice(0, splitIndex).trim();
      const value = line.slice(splitIndex + 1).trim();
      if (key && !(key in fromProcess)) {
        fromProcess[key] = value;
      }
    }
  } catch {
    // Optional .env file; controlled loader still fails closed when required keys are absent.
  }

  return fromProcess;
}

function main(): void {
  if (process.argv.includes("--help")) {
    printUsage();
    return;
  }

  const argv = process.argv.slice(2);
  const mode = parseMode(argv);
  const stateDirectory = parseStateDirectory(argv);

  if (mode === "run") {
    const configuration = loadControlledConfiguration(loadLocalEnvironment());
    const fixtureName = parseFixtureFromArgv(argv);
    const result = runM2DurableIntentDemo({ configuration, fixtureName, stateDirectory });

    console.log(`Fixture: ${result.fixtureName}`);
    console.log(`Correlation ID: ${result.correlationId}`);
    console.log(`Intent ID: ${result.intentId}`);
    console.log(`Plan ID: ${result.planId}`);
    console.log(`Decision ID: ${result.decisionId}`);
    console.log(`Transaction ID: ${result.transactionId}`);
    console.log(`Outcome ID: ${result.outcomeId}`);
    console.log(`Disposition: ${result.disposition}`);
    console.log(`Transaction status: ${result.transactionStatus}`);
    console.log(`Claimed effect: ${result.claimedEffect}`);
    console.log(`Event count: ${result.eventCount}`);
    console.log(`State directory: ${result.stateDirectory}`);
    console.log(`Journal path: ${result.journalPath}`);
    return;
  }

  const correlationId = parseCorrelationId(argv);
  const trace = reconstructM2Trace(stateDirectory, correlationId);
  console.log(`Correlation ID: ${trace.correlationId}`);
  console.log(`Intent ID: ${trace.summary.intentId ?? "n/a"}`);
  console.log(`Plan ID: ${trace.summary.planId ?? "n/a"}`);
  console.log(`Decision ID: ${trace.summary.decisionId ?? "n/a"}`);
  console.log(`Transaction ID: ${trace.summary.transactionId ?? "n/a"}`);
  console.log(`Outcome ID: ${trace.summary.outcomeId ?? "n/a"}`);
  console.log(`Disposition: ${trace.summary.disposition ?? "n/a"}`);
  console.log(`Transaction status: ${trace.summary.transactionStatus ?? "n/a"}`);
  console.log(`Claimed effect: ${trace.summary.claimedEffect ?? "n/a"}`);
  console.log(`Event count: ${trace.events.length}`);
  for (const event of trace.events) {
    console.log(
      `${event.timestampIso8601} ${event.eventType} owner=${event.owner} status=${event.status} summary=${event.payloadSummary}`
    );
  }
}

main();
