#!/usr/bin/env node
/** Ask Hermes about HAL's repository status after HAL runs its allow-listed check. */
import { spawn } from "node:child_process";
import { Buffer } from "node:buffer";
import { once } from "node:events";
import path from "node:path";

const shellPilot = path.join(import.meta.dirname, "hal_readonly_shell_pilot.py");
const probe = spawn("python3", [shellPilot], { shell: false, stdio: ["pipe", "pipe", "inherit"] });
probe.stdin.end('{"argv":["git","status","--short"]}');
const chunks = [];
probe.stdout.on("data", (chunk) => chunks.push(chunk));
const [code] = await once(probe, "close");
if (code !== 0) process.exit(code ?? 1);
const status = Buffer.concat(chunks).toString("utf8").trim();
const ask = path.join(import.meta.dirname, "ask-gx10-hermes.mjs");
const child = spawn(
  process.execPath,
  [ask, `Summarize this HAL-provided, read-only repository status. Do not use tools.\n${status}`],
  { shell: false, stdio: "inherit" }
);
const [exitCode] = await once(child, "close");
process.exit(exitCode ?? 1);
