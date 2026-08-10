#!/usr/bin/env node
/** Owner-facing selector for the two separately governed local chat scopes. */

import { spawn } from "node:child_process";
import { once } from "node:events";
import { createInterface } from "node:readline/promises";
import path from "node:path";

const requestedScope = process.argv[2]?.trim().toLowerCase();

function printUsage() {
  process.stdout.write(
    [
      "HAL local assistant — approved local-only scopes",
      "Usage: npm run hal:assistant [canon|documents|combined]",
      "",
      "  canon      HAL Canon and project documentation only",
      "  documents  Owner-approved direct local document folder only",
      "  combined   Both independently validated approved contexts",
      "",
      "Run npm run hal:assistant:status for a read-only readiness check.",
      "This help command does not validate, activate, or contact a runtime.",
      "The assistant has no tools or governed-resource capabilities."
    ].join("\n") + "\n"
  );
}

function fail(message) {
  process.stderr.write(`HAL assistant: ${message}\n`);
  process.exit(2);
}

async function chooseScope() {
  if (requestedScope === "--help" || requestedScope === "-h" || requestedScope === "help") {
    printUsage();
    process.exit(0);
  }
  if (requestedScope === "canon" || requestedScope === "documents" || requestedScope === "combined")
    return requestedScope;
  if (requestedScope) fail("scope must be canon, documents, or combined.");

  const readline = createInterface({ input: process.stdin, output: process.stdout });
  try {
    process.stdout.write(
      "HAL local assistant\n1. HAL Canon and project documentation\n2. Owner-approved local document folder\n3. Both approved contexts\n"
    );
    const answer = (await readline.question("Choose 1, 2, or 3: ")).trim();
    if (answer === "1") return "canon";
    if (answer === "2") return "documents";
    if (answer === "3") return "combined";
    fail("choose 1, 2, or 3.");
  } finally {
    readline.close();
  }
}

const scope = await chooseScope();
const target = path.join(
  import.meta.dirname,
  scope === "canon"
    ? "hal-canon-chat.mjs"
    : scope === "combined"
      ? "hal-dual-scope-chat.mjs"
      : "hal-owner-chat.mjs"
);
const child = spawn(process.execPath, [target], { shell: false, stdio: "inherit" });
const [exitCode] = await once(child, "close");
process.exit(exitCode ?? 1);
