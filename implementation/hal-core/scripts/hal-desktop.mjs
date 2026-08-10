#!/usr/bin/env node
/** Adapter-edge desktop dispatcher for the existing bounded HAL assistant launcher. */

import path from "node:path";
import { Buffer } from "node:buffer";
import { spawn } from "node:child_process";
import * as electron from "electron";

import {
  launchDesktopAssistantApp,
  resolveDesktopAssistantRuntimePaths
} from "../dist/src/desktopAssistant/main.js";
import { renderDesktopAssistantResponse } from "../dist/src/desktopAssistant/terminalOutput.js";

const MAX_RESPONSE_BYTES = 32_768;
const QUERY_TIMEOUT_MILLISECONDS = 120_000;
const projectRoot = path.resolve(import.meta.dirname, "..");
const assistantLauncherPath = path.resolve(projectRoot, "scripts/hal-assistant.mjs");
const electronRuntime = "default" in electron ? electron.default : electron;

function blocked(reasonCode) {
  return Object.freeze({ result: "blocked", response: "", reasonCode });
}

async function dispatchQuestion(request) {
  return await new Promise((resolve) => {
    const child = spawn(process.execPath, [assistantLauncherPath, request.scope], {
      shell: false,
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env, ELECTRON_RUN_AS_NODE: "1" }
    });
    const stdout = [];
    let outputBytes = 0;
    let settled = false;
    const settle = (result) => {
      if (settled) return;
      settled = true;
      globalThis.clearTimeout(timeout);
      resolve(result);
    };
    const timeout = globalThis.setTimeout(() => {
      child.kill();
      settle(blocked("runtime_timeout"));
    }, QUERY_TIMEOUT_MILLISECONDS);
    child.stdout.on("data", (chunk) => {
      outputBytes += chunk.length;
      if (outputBytes > MAX_RESPONSE_BYTES) {
        child.kill();
        settle(blocked("runtime_output_exceeds_bound"));
        return;
      }
      stdout.push(chunk);
    });
    child.on("error", () => settle(blocked("launcher_unavailable")));
    child.on("close", (exitCode) => {
      if (exitCode !== 0) return settle(blocked("runtime_request_failed"));
      const response = renderDesktopAssistantResponse(Buffer.concat(stdout).toString("utf8"));
      if (!response) return settle(blocked("runtime_empty_response"));
      return settle(Object.freeze({ result: "completed", response }));
    });
    child.stdin.write(`${request.questionText}\n/exit\n`);
    child.stdin.end();
  });
}

try {
  await launchDesktopAssistantApp(
    resolveDesktopAssistantRuntimePaths({ projectRoot, dispatchQuestion })
  );
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : "HAL desktop failed"}\n`);
  electronRuntime.app.exit(1);
}
