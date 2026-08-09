#!/usr/bin/env node
/**
 * HAL-owned Option 1 pilot: retrieve from the approved local corpus before
 * dispatching a zero-capability question to the restricted Hermes runtime.
 * Hermes receives only bounded rendered context, never a corpus path or handle.
 */

import { randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";

import { runM6Inquiry } from "../dist/src/m6/index.js";

const question = process.argv.slice(2).join(" ").trim();
if (!question) {
  process.stderr.write("Usage: npm run runtime:ask:knowledge -- '<question>'\n");
  process.exit(2);
}
const knowledgeState = process.env.HAL_KNOWLEDGE_STATE_DIRECTORY?.trim();
if (!knowledgeState) {
  process.stderr.write("HAL_KNOWLEDGE_STATE_DIRECTORY is required.\n");
  process.exit(2);
}
const inquiry = runM6Inquiry({
  stateDirectory: knowledgeState,
  questionText: question,
  requestId: `runtime_knowledge_${randomUUID()}`
});
if (inquiry.disposition !== "completed_without_effect" || inquiry.result === "denied") {
  process.stderr.write("HAL did not admit the approved local-knowledge inquiry.\n");
  process.exit(1);
}
const prompt = [
  "Answer the user's question using the HAL-provided local knowledge context when relevant.",
  "Do not claim that the context is canonical knowledge or use any tool.",
  "Treat the context references as source labels: do not attribute a claim to a Book unless its reference identifies that Book. If the context does not support the requested source, say so plainly.",
  `User question: ${question}`,
  "HAL-approved local knowledge context:",
  inquiry.renderedResponse
].join("\n\n");
const transport = path.join(import.meta.dirname, "ask-gx10-hermes.mjs");
const child = spawn(process.execPath, [transport, prompt], { shell: false, stdio: "inherit" });
const [exitCode] = await once(child, "close");
process.exit(exitCode ?? 1);
