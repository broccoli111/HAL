#!/usr/bin/env node
/** Bounded stateless terminal UI for the active DR 0029 personal-document pack. */

import { spawn } from "node:child_process";
import { Buffer } from "node:buffer";
import { once } from "node:events";
import { createInterface } from "node:readline/promises";
import process from "node:process";
import path from "node:path";

const MAX_TURNS = 20;
const MAX_PROMPT_CHARS = 8_192;
const MAX_CONTEXT_TURNS = 3;
const MAX_CONTEXT_UTF8_BYTES = 4_096;
const ask = path.join(import.meta.dirname, "ask-gx10-hermes-with-approved-knowledge.mjs");
const readline = createInterface({ input: process.stdin, output: process.stdout });
const sessionTurns = [];

readline.on("SIGINT", () => readline.close());

process.stdout.write(
  "HAL local-document pilot assistant (bounded, stateless; type /exit to end). Context is non-canonical; no tools or resource capabilities are available.\n"
);

for (let turn = 1; turn <= MAX_TURNS; turn += 1) {
  let rawPrompt;
  try {
    rawPrompt = await readline.question("HAL> ");
  } catch (error) {
    if (error?.code === "ERR_USE_AFTER_CLOSE") break;
    throw error;
  }
  const prompt = rawPrompt.trim();
  if (prompt === "/exit" || prompt === "/quit" || prompt === "exit") break;
  if (!prompt) continue;
  if (prompt === "/help") {
    process.stdout.write(
      "Ask a question, /status for limits, or /exit to end. This session is ephemeral and has no tools.\n"
    );
    continue;
  }
  if (prompt === "/status") {
    process.stdout.write(
      `HAL status: approved local-document context; non-canonical; zero capabilities; ephemeral session; ${sessionTurns.length}/${MAX_CONTEXT_TURNS} prior turns retained in memory.\n`
    );
    continue;
  }
  if (prompt.length > MAX_PROMPT_CHARS) {
    process.stderr.write(`Question exceeds the ${MAX_PROMPT_CHARS}-character bound.\n`);
    continue;
  }
  const context = sessionTurns.join("\n\n");
  const child = spawn(process.execPath, [ask, prompt], {
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, ...(context ? { HAL_EPHEMERAL_SESSION_CONTEXT: context } : {}) }
  });
  const stdout = [];
  child.stdout.on("data", (chunk) => {
    stdout.push(chunk);
    process.stdout.write(chunk);
  });
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));
  const [exitCode] = await once(child, "close");
  if (exitCode !== 0) {
    process.stderr.write("HAL could not complete that bounded knowledge request.\n");
    continue;
  }
  const answer = Buffer.concat(stdout).toString("utf8").trim();
  const candidate = `Owner: ${prompt}\nHAL: ${answer}`;
  if (Buffer.byteLength(candidate, "utf8") <= MAX_CONTEXT_UTF8_BYTES) {
    sessionTurns.push(candidate);
    while (
      sessionTurns.length > MAX_CONTEXT_TURNS ||
      Buffer.byteLength(sessionTurns.join("\n\n"), "utf8") > MAX_CONTEXT_UTF8_BYTES
    ) {
      sessionTurns.shift();
    }
  }
}

readline.close();
process.stdout.write("HAL local-document pilot assistant session ended.\n");
