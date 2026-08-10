#!/usr/bin/env node
/** Bounded stateless terminal UI for the active DR 0029 personal-document pack. */

import { spawn } from "node:child_process";
import { once } from "node:events";
import { createInterface } from "node:readline/promises";
import process from "node:process";
import path from "node:path";

const MAX_TURNS = 20;
const MAX_PROMPT_CHARS = 8_192;
const ask = path.join(import.meta.dirname, "ask-gx10-hermes-with-approved-knowledge.mjs");
const readline = createInterface({ input: process.stdin, output: process.stdout });

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
      "HAL status: approved local-document context; non-canonical; zero capabilities; ephemeral session.\n"
    );
    continue;
  }
  if (prompt.length > MAX_PROMPT_CHARS) {
    process.stderr.write(`Question exceeds the ${MAX_PROMPT_CHARS}-character bound.\n`);
    continue;
  }
  const child = spawn(process.execPath, [ask, prompt], { shell: false, stdio: "inherit" });
  const [exitCode] = await once(child, "close");
  if (exitCode !== 0)
    process.stderr.write("HAL could not complete that bounded knowledge request.\n");
}

readline.close();
process.stdout.write("HAL local-document pilot assistant session ended.\n");
