#!/usr/bin/env node
/** Ask Hermes about HAL's bounded repository history after HAL reads it. */

import { Buffer } from "node:buffer";
import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";

const shellPilot = path.join(import.meta.dirname, "hal_readonly_shell_pilot.py");
const probe = spawn("python3", [shellPilot], { shell: false, stdio: ["pipe", "pipe", "inherit"] });
probe.stdin.end('{"argv":["git","log","--oneline","-n","20"]}');
const chunks = [];
probe.stdout.on("data", (chunk) => chunks.push(chunk));
const [code] = await once(probe, "close");
if (code !== 0) process.exit(code ?? 1);
const history = Buffer.concat(chunks).toString("utf8").trim();
const ask = path.join(import.meta.dirname, "ask-gx10-hermes.mjs");
const child = spawn(
  process.execPath,
  [ask, `Summarize this HAL-provided, read-only repository history. Do not use tools.\n${history}`],
  { shell: false, stdio: "inherit" }
);
const [exitCode] = await once(child, "close");
process.exit(exitCode ?? 1);
