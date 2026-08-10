#!/usr/bin/env node
/** Bounded terminal UI for the Owner-approved DR 0031 dual-scope profile. */

import { Buffer } from "node:buffer";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createInterface } from "node:readline/promises";
import process from "node:process";
import path from "node:path";

const MAX_TURNS = 20;
const MAX_PROMPT_CHARS = 8_192;
const ask = path.join(import.meta.dirname, "ask-gx10-hermes-with-dual-approved-knowledge.mjs");
const readline = createInterface({ input: process.stdin, output: process.stdout });

readline.on("SIGINT", () => readline.close());
process.stdout.write(
  "HAL dual-scope assistant (bounded, stateless; type /exit to end). Context is non-canonical; no tools or resource capabilities are available.\n"
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
      "Ask a question, /status for limits, or /exit to end. Both approved contexts are non-canonical and this session has no tools.\n"
    );
    continue;
  }
  if (prompt === "/status") {
    process.stdout.write(
      "HAL status: dual approved contexts; separately validated; non-canonical; zero capabilities; no session persistence.\n"
    );
    continue;
  }
  if (prompt.length > MAX_PROMPT_CHARS) {
    process.stderr.write(`Question exceeds the ${MAX_PROMPT_CHARS}-character bound.\n`);
    continue;
  }
  const child = spawn(process.execPath, [ask, prompt], {
    shell: false,
    stdio: ["ignore", "pipe", "pipe"]
  });
  const stdout = [];
  child.stdout.on("data", (chunk) => {
    stdout.push(chunk);
    process.stdout.write(chunk);
  });
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));
  const [exitCode] = await once(child, "close");
  if (exitCode !== 0) {
    process.stderr.write("HAL could not complete that bounded dual-scope request.\n");
    continue;
  }
  // Consume stdout only to ensure bounded child output remains text; no answer
  // is retained beyond the current turn or persisted by this UI.
  Buffer.concat(stdout).toString("utf8");
}

readline.close();
process.stdout.write("HAL dual-scope assistant session ended.\n");
