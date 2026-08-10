#!/usr/bin/env node
/** Adapter-edge desktop dispatcher for the existing bounded HAL assistant launcher. */

import path from "node:path";
import { Buffer } from "node:buffer";
import { spawn } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import * as electron from "electron";

import {
  launchDesktopAssistantApp,
  resolveDesktopAssistantRuntimePaths
} from "../dist/src/desktopAssistant/main.js";
import { renderDesktopAssistantResponse } from "../dist/src/desktopAssistant/terminalOutput.js";
import {
  desktopAssistantTerminationTarget,
  shouldDetachDesktopAssistantLauncher
} from "../dist/src/desktopAssistant/processControl.js";
import { createDesktopControlChat } from "../dist/src/desktopAssistant/controlChat.js";

const MAX_RESPONSE_BYTES = 32_768;
const QUERY_TIMEOUT_MILLISECONDS = 120_000;
const projectRoot = path.resolve(import.meta.dirname, "..");
const assistantLauncherPath = path.resolve(projectRoot, "scripts/hal-assistant.mjs");
const controlJournalPath = path.resolve(
  projectRoot,
  "local-state/desktop-control/control-journal.jsonl"
);
const electronRuntime = "default" in electron ? electron.default : electron;

function blocked(reasonCode) {
  return Object.freeze({ result: "blocked", response: "", reasonCode });
}

async function dispatchQuestion(request) {
  return await new Promise((resolve) => {
    const child = spawn(process.execPath, [assistantLauncherPath, request.scope], {
      shell: false,
      detached: shouldDetachDesktopAssistantLauncher(process.platform),
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
      terminateLauncher(child);
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

function terminateLauncher(child) {
  const target = desktopAssistantTerminationTarget({ pid: child.pid, platform: process.platform });
  if (!target) return;
  try {
    process.kill(target, "SIGTERM");
  } catch {
    child.kill("SIGTERM");
  }
}

function recordControl(event) {
  mkdirSync(path.dirname(controlJournalPath), { recursive: true });
  const previous = recordControl.previousHash;
  const unsigned = {
    ...event,
    timestampUtc: new Date().toISOString(),
    ...(previous ? { previousRecordHash: previous } : {})
  };
  const recordHash = createHash("sha256").update(JSON.stringify(unsigned)).digest("hex");
  appendFileSync(controlJournalPath, `${JSON.stringify({ ...unsigned, recordHash })}\n`, "utf8");
  recordControl.previousHash = recordHash;
}
function loadControlJournalTailHash() {
  if (!existsSync(controlJournalPath)) return undefined;
  try {
    const last = readFileSync(controlJournalPath, "utf8").trim().split("\n").at(-1);
    const parsed = last ? JSON.parse(last) : undefined;
    return typeof parsed?.recordHash === "string" && /^[a-f0-9]{64}$/.test(parsed.recordHash)
      ? parsed.recordHash
      : undefined;
  } catch {
    return undefined;
  }
}
recordControl.previousHash = loadControlJournalTailHash();

function runControlCommand(proposal) {
  const commands = {
    status: ["hal-assistant-status.mjs"],
    recommend_text: ["hal-model-recommend.mjs", "text"],
    recommend_image: ["hal-model-recommend.mjs", "image"],
    matrix_text: ["hal-model-matrix.mjs", "text"],
    matrix_image: ["hal-model-matrix.mjs", "image"],
    research: ["hal-model-research.mjs"],
    refresh_folder: [
      "refresh-hal-ref-2-owner-folder-pack.mjs",
      "--registration-id",
      proposal.args[0]
    ],
    deactivate_folder: [
      "deactivate-owner-folder.mjs",
      "--registration-id",
      proposal.args[0],
      "--owner-confirm",
      "local_owner_confirmed"
    ],
    revoke_folder: [
      "revoke-owner-folder.mjs",
      "--registration-id",
      proposal.args[0],
      "--owner-confirm",
      "local_owner_confirmed"
    ]
  };
  const command = commands[proposal.operation];
  if (!command) throw new Error("unsupported operation");
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [path.resolve(projectRoot, "scripts", command[0]), ...command.slice(1)],
      {
        shell: false,
        stdio: ["ignore", "pipe", "pipe"],
        env: { ...process.env, ELECTRON_RUN_AS_NODE: "1" }
      }
    );
    const chunks = [];
    let size = 0;
    child.stdout.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_RESPONSE_BYTES) child.kill();
      else chunks.push(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0
        ? resolve(Buffer.concat(chunks).toString("utf8").trim())
        : reject(new Error("command failed"))
    );
  });
}

try {
  await launchDesktopAssistantApp(
    resolveDesktopAssistantRuntimePaths({
      projectRoot,
      dispatchQuestion,
      dispatchControl: createDesktopControlChat({
        dispatch: runControlCommand,
        record: recordControl
      })
    })
  );
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : "HAL desktop failed"}\n`);
  electronRuntime.app.exit(1);
}
