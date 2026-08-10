#!/usr/bin/env node
/** Owner-facing selector for explicitly separate governed local chat scopes. */

import { spawn } from "node:child_process";
import { once } from "node:events";
import { createInterface } from "node:readline/promises";
import path from "node:path";

const requestedScope = process.argv[2]?.trim().toLowerCase();

function printUsage() {
  process.stdout.write(
    [
      "HAL local assistant — approved local-only scopes",
      "Usage: npm run hal:assistant [canon|documents|combined|hal-ref-2]",
      "",
      "  canon      HAL Canon and project documentation only",
      "  documents  Owner-approved direct local document folder only",
      "  combined   Both independently validated approved contexts",
      "  hal-ref-2  Exact DR 0034 persistent owner-folder source only",
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
  if (
    requestedScope === "canon" ||
    requestedScope === "documents" ||
    requestedScope === "combined" ||
    requestedScope === "hal-ref-2"
  )
    return requestedScope;
  if (requestedScope) fail("scope must be canon, documents, combined, or hal-ref-2.");

  const readline = createInterface({ input: process.stdin, output: process.stdout });
  try {
    process.stdout.write(
      "HAL local assistant\n1. HAL Canon and project documentation\n2. Owner-approved local document folder\n3. Both approved contexts\n4. Persistent owner folder (hal_ref_2)\n"
    );
    const answer = (await readline.question("Choose 1, 2, 3, or 4: ")).trim();
    if (answer === "1") return "canon";
    if (answer === "2") return "documents";
    if (answer === "3") return "combined";
    if (answer === "4") return "hal-ref-2";
    fail("choose 1, 2, 3, or 4.");
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
      : scope === "hal-ref-2"
        ? "hal-ref-2-owner-folder-chat.mjs"
        : "hal-owner-chat.mjs"
);
const child = spawn(process.execPath, [target], { shell: false, stdio: "inherit" });
const [exitCode] = await once(child, "close");
process.exit(exitCode ?? 1);
