#!/usr/bin/env node
/** Ask the restricted GX10 Hermes runtime and display its HAL-recorded result. */

import { randomUUID } from "node:crypto";
import { Buffer } from "node:buffer";
import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";

const prompt = process.argv.slice(2).join(" ").trim();
if (!prompt) {
  process.stderr.write("Usage: npm run runtime:ask -- '<question>'\n");
  process.exit(2);
}

const transport = path.join(import.meta.dirname, "run-gx10-hermes-stateless-transport.mjs");
const child = spawn(process.execPath, [transport], {
  shell: false,
  stdio: ["pipe", "pipe", "pipe"]
});
const stdout = [];
const stderr = [];
child.stdout.on("data", (chunk) => stdout.push(chunk));
child.stderr.on("data", (chunk) => stderr.push(chunk));
child.stdin.end(`${JSON.stringify({ correlationId: `ask_${randomUUID()}`, prompt })}\n`);
const [exitCode] = await once(child, "close");
if (exitCode !== 0) {
  process.stderr.write(Buffer.concat(stderr).toString("utf8") || "HAL runtime request failed.\n");
  process.exit(exitCode ?? 1);
}
let record;
try {
  record = JSON.parse(Buffer.concat(stdout).toString("utf8"));
} catch {
  process.stderr.write("HAL runtime transport returned invalid evidence.\n");
  process.exit(1);
}
if (
  record?.recordKind !== "result_report" ||
  record?.canonicalStatus !== "unaccepted_runtime_claim"
) {
  process.stderr.write("HAL runtime transport did not return a permitted result claim.\n");
  process.exit(1);
}
process.stdout.write(`${record.summary}\n`);
