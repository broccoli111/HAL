import { readFileSync } from "node:fs";
import path from "node:path";

import { loadControlledConfiguration } from "../kernel/config.js";
import { runM1CoreDemo } from "../kernel/m1CoreDemo.js";
import type { LocalRequestFixtureName } from "../request/fixtures.js";

const FIXTURE_NAMES = [
  "allowed_inspection_request",
  "approval_required_request",
  "denied_unknown_request"
] as const satisfies readonly LocalRequestFixtureName[];

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

function printUsage(): void {
  console.log("HAL M1 core demo (local-only)");
  console.log("Usage: npm run m1:demo -- --fixture allowed_inspection_request");
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

  const configuration = loadControlledConfiguration(loadLocalEnvironment());
  const fixtureName = parseFixtureFromArgv(process.argv.slice(2));
  const result = runM1CoreDemo(configuration, fixtureName);

  console.log(`Safe Mode: ${result.safeModeState}`);
  console.log(`Fixture: ${result.fixtureName}`);
  console.log(`Decision: ${result.decision.disposition} (${result.decision.reason})`);
  console.log(`Correlation ID: ${result.decision.correlationId}`);
  console.log(
    `Audit records: receipt=${result.requestReceiptAuditRecord.auditRecordId}, decision=${result.decisionAuditRecord.auditRecordId}`
  );
  console.log(`Claimed effect: ${result.claimedEffect}`);
}

main();
