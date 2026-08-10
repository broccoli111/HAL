#!/usr/bin/env node
/** Owner-facing selector for the two separately governed local chat scopes. */

import { spawn } from "node:child_process";
import { once } from "node:events";
import { createInterface } from "node:readline/promises";
import path from "node:path";

const requestedScope = process.argv[2]?.trim().toLowerCase();

function fail(message) {
  process.stderr.write(`HAL assistant: ${message}\n`);
  process.exit(2);
}

async function chooseScope() {
  if (requestedScope === "canon" || requestedScope === "documents") return requestedScope;
  if (requestedScope) fail("scope must be canon or documents.");

  const readline = createInterface({ input: process.stdin, output: process.stdout });
  try {
    process.stdout.write(
      "HAL local assistant\n1. HAL Canon and project documentation\n2. Owner-approved local document folder\n"
    );
    const answer = (await readline.question("Choose 1 or 2: ")).trim();
    if (answer === "1") return "canon";
    if (answer === "2") return "documents";
    fail("choose 1 or 2.");
  } finally {
    readline.close();
  }
}

const scope = await chooseScope();
const target = path.join(
  import.meta.dirname,
  scope === "canon" ? "hal-canon-chat.mjs" : "hal-owner-chat.mjs"
);
const child = spawn(process.execPath, [target], { shell: false, stdio: "inherit" });
const [exitCode] = await once(child, "close");
process.exit(exitCode ?? 1);
