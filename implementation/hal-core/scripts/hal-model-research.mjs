#!/usr/bin/env node
/**
 * DR 0036 adapter-edge research probe. It retrieves only three fixed official
 * public pages, sends no HAL/user content, persists nothing, and emits only
 * minimised evidence. It is not imported by HAL Core or an Agent Runtime.
 */
import {
  MODEL_RESEARCH_ALLOWED_URLS,
  MODEL_RESEARCH_MAX_RESPONSE_BYTES,
  createModelResearchEvidence
} from "../dist/src/modelPlanning/researchPolicy.js";

const REQUEST_TIMEOUT_MILLISECONDS = 10_000;

async function readBoundedBytes(response) {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("model research response body is unavailable");
  const chunks = [];
  let receivedBytes = 0;
  while (true) {
    const next = await reader.read();
    if (next.done) break;
    receivedBytes += next.value.byteLength;
    if (receivedBytes > MODEL_RESEARCH_MAX_RESPONSE_BYTES) {
      await reader.cancel();
      throw new Error("model research response exceeds bound");
    }
    chunks.push(next.value);
  }
  const result = new Uint8Array(receivedBytes);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

async function retrieveEvidence(sourceUrl) {
  const controller = new globalThis.AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MILLISECONDS);
  try {
    const response = await globalThis.fetch(sourceUrl, {
      method: "GET",
      redirect: "error",
      signal: controller.signal,
      headers: { Accept: "text/html, text/plain;q=0.9", "User-Agent": "HAL-model-planning/1" }
    });
    if (!response.ok) throw new Error(`model research HTTP status ${response.status}`);
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.startsWith("text/html") && !contentType.startsWith("text/plain")) {
      throw new Error("model research response content type is not admitted");
    }
    return createModelResearchEvidence({
      sourceUrl,
      retrievedAtUtc: new Date().toISOString(),
      responseBytes: await readBoundedBytes(response)
    });
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

try {
  const evidence = [];
  for (const sourceUrl of MODEL_RESEARCH_ALLOWED_URLS)
    evidence.push(await retrieveEvidence(sourceUrl));
  process.stdout.write(`${JSON.stringify({ result: "completed", evidence })}\n`);
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : "model research blocked"}\n`);
  process.exitCode = 1;
}
