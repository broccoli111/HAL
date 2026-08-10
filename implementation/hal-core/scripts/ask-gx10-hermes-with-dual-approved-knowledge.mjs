#!/usr/bin/env node
/** HAL-owned DR 0031 dual-scope retrieval before zero-capability dispatch. */

import { randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";

import { runM6DualScopeInquiry } from "../dist/src/m6/index.js";

const question = process.argv.slice(2).join(" ").trim();
if (!question) {
  process.stderr.write("Usage: npm run runtime:ask:dual-scope -- '<question>'\n");
  process.exit(2);
}
const canonStateDirectory = process.env.HAL_CANON_KNOWLEDGE_STATE_DIRECTORY?.trim();
const localDocumentFolderStateDirectory = process.env.HAL_KNOWLEDGE_STATE_DIRECTORY?.trim();
if (!canonStateDirectory || !localDocumentFolderStateDirectory) {
  process.stderr.write("Both HAL knowledge state directories are required.\n");
  process.exit(2);
}

let inquiry;
try {
  inquiry = runM6DualScopeInquiry({
    canonStateDirectory,
    localDocumentFolderStateDirectory,
    questionText: question,
    requestId: `runtime_dual_scope_${randomUUID()}`
  });
} catch {
  process.stderr.write("HAL dual-scope knowledge validation failed closed.\n");
  process.exit(1);
}
if (inquiry.disposition !== "completed_without_effect") {
  process.stderr.write("HAL did not admit the dual-scope knowledge inquiry.\n");
  process.exit(1);
}

const prompt = [
  "Answer the user's question using the HAL-provided dual-scope local knowledge context when relevant.",
  "Do not claim that the context is canonical knowledge or use any tool.",
  "Each scope is independently validated and labeled. Attribute claims only to the scope/reference that supports them. If neither scope supports a requested claim, say so plainly.",
  `User question: ${question}`,
  "HAL-approved dual-scope local knowledge context:",
  inquiry.renderedResponse
].join("\n\n");
const transport = path.join(import.meta.dirname, "ask-gx10-hermes.mjs");
const child = spawn(process.execPath, [transport, prompt], { shell: false, stdio: "inherit" });
const [exitCode] = await once(child, "close");
process.exit(exitCode ?? 1);
