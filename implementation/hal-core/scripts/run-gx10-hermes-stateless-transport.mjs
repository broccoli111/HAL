#!/usr/bin/env node
/**
 * External composition harness for the Owner-authorized GX10 stateless runtime.
 *
 * It is deliberately outside HAL Core: it invokes the restricted SSH command
 * and composes the returned result with HAL's runtime adapter and journal.
 */

import { spawn } from "node:child_process";
import { Buffer } from "node:buffer";
import { once } from "node:events";

import { HermesAdapter } from "../dist/src/runtime/hermesAdapter.js";
import { HermesStatelessDriver } from "../dist/src/runtime/hermesStatelessDriver.js";
import { RuntimeHost } from "../dist/src/runtime/runtimeHost.js";
import { RuntimeJournal } from "../dist/src/runtime/runtimeJournal.js";
import { RuntimeSubmissionRecorder } from "../dist/src/runtime/runtimeSubmissionRecorder.js";

const MAX_INPUT_BYTES = 16_384;
const MAX_OUTPUT_BYTES = 16_384;

function requireEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

async function readRequest() {
  const chunks = [];
  let total = 0;
  for await (const chunk of process.stdin) {
    total += chunk.length;
    if (total > MAX_INPUT_BYTES) throw new Error("Runtime request exceeds bound.");
    chunks.push(chunk);
  }
  let request;
  try {
    request = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("Runtime request is not valid JSON.");
  }
  if (
    !request ||
    typeof request !== "object" ||
    Object.keys(request).length !== 2 ||
    typeof request.correlationId !== "string" ||
    typeof request.prompt !== "string" ||
    !request.correlationId ||
    !request.prompt.trim()
  ) {
    throw new Error("Runtime request must contain only correlationId and prompt.");
  }
  return request;
}

async function invokeRestrictedRuntime(request) {
  const target = requireEnvironment("HAL_GX10_RUNTIME_TARGET");
  const key = requireEnvironment("HAL_GX10_RUNTIME_KEY");
  const child = spawn(
    "ssh",
    [
      "-T",
      "-i",
      key,
      "-o",
      "BatchMode=yes",
      "-o",
      "ClearAllForwardings=yes",
      "-o",
      "PermitLocalCommand=no",
      target
    ],
    { shell: false, stdio: ["pipe", "pipe", "pipe"] }
  );
  const stdout = [];
  const stderr = [];
  let outputBytes = 0;
  const collect = (targetChunks) => (chunk) => {
    outputBytes += chunk.length;
    if (outputBytes > MAX_OUTPUT_BYTES) child.kill("SIGKILL");
    else targetChunks.push(chunk);
  };
  child.stdout.on("data", collect(stdout));
  child.stderr.on("data", collect(stderr));
  child.stdin.end(`${JSON.stringify(request)}\n`);
  const [exitCode] = await once(child, "close");
  if (outputBytes > MAX_OUTPUT_BYTES) throw new Error("Runtime transport output exceeds bound.");
  const raw = Buffer.concat(stdout).toString("utf8").trim();
  let response;
  try {
    response = JSON.parse(raw);
  } catch {
    throw new Error(`Runtime transport returned invalid JSON (exit ${exitCode}).`);
  }
  if (!response || response.correlationId !== request.correlationId) {
    throw new Error("Runtime transport correlation does not match HAL request.");
  }
  if (response.ok !== true || typeof response.result !== "string" || !response.result.trim()) {
    const detail = typeof response.failure === "string" ? response.failure : "runtime failure";
    throw new Error(`Runtime transport refused execution: ${detail}`);
  }
  return response.result;
}

const request = await readRequest();
const stateDirectory = requireEnvironment("HAL_RUNTIME_STATE_DIRECTORY");
const runtimeId = "gx10_hermes_stateless_v1";
const agentId = `agent_${request.correlationId}`;
const taskId = `task_${request.correlationId}`;
const journal = new RuntimeJournal(stateDirectory);
const recorder = new RuntimeSubmissionRecorder({
  journal,
  gateway: {
    requestCapability: async () => ({
      status: "denied",
      reason: "The GX10 Hermes stateless path has no capability grant.",
      capabilityManifest: []
    })
  }
});
const driver = new HermesStatelessDriver({
  execute: async () => invokeRestrictedRuntime(request)
});
const host = new RuntimeHost({
  runtimeId,
  runtime: new HermesAdapter(driver),
  callbacks: recorder
});
await host.execute({
  createAgent: { agentId, taskId, correlationId: request.correlationId },
  context: { agentId, contextSummary: request.prompt },
  capabilityManifest: { agentId, capabilities: [] },
  task: { agentId, taskId, correlationId: request.correlationId }
});
const record = journal.listByCorrelationId(request.correlationId).at(-1);
if (!record) throw new Error("HAL did not record the runtime result.");
process.stdout.write(`${JSON.stringify(record)}\n`);
