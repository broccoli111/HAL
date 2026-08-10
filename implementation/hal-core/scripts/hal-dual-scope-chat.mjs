#!/usr/bin/env node
/** Owner-facing launcher for the accepted DR 0031 dual-scope inquiry profile. */

import { lstatSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { once } from "node:events";

import {
  activateApprovedM9Pack,
  createM9OperationRequestId,
  getM9ActivePackState
} from "../dist/src/m9/index.js";

const CONFIG_FILE = path.join(import.meta.dirname, "..", ".hal-chat.local.json");
const CANON_PACK_ID = "hal_canon_v1";
const DOCUMENT_PACK_ID = "personal_document_folder_pilot_v1";

function fail(message) {
  process.stderr.write(`HAL dual-scope chat: ${message}\n`);
  process.exit(2);
}

function requireRegularFile(value, label) {
  if (typeof value !== "string" || !path.isAbsolute(value))
    fail(`${label} must be an absolute path.`);
  const stat = lstatSync(value, { throwIfNoEntry: false });
  if (!stat?.isFile() || stat.isSymbolicLink())
    fail(`${label} must be a regular non-symlink file.`);
  return value;
}

function requireDirectory(value, label) {
  if (typeof value !== "string" || !path.isAbsolute(value))
    fail(`${label} must be an absolute path.`);
  mkdirSync(value, { recursive: true });
  const stat = lstatSync(value, { throwIfNoEntry: false });
  if (!stat?.isDirectory() || stat.isSymbolicLink())
    fail(`${label} must be a regular non-symlink directory.`);
  return value;
}

function loadConfig() {
  const stat = lstatSync(CONFIG_FILE, { throwIfNoEntry: false });
  if (!stat?.isFile() || stat.isSymbolicLink())
    fail(`local configuration is required at ${CONFIG_FILE}.`);
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(CONFIG_FILE, "utf8"));
  } catch {
    fail("local configuration is not valid JSON.");
  }
  const allowedKeys = new Set([
    "runtimeTarget",
    "runtimeKeyPath",
    "runtimeStateDirectory",
    "knowledgeStateDirectory",
    "canonKnowledgeStateDirectory",
    "knowledgePackId"
  ]);
  if (
    !parsed ||
    typeof parsed !== "object" ||
    Object.keys(parsed).some((key) => !allowedKeys.has(key))
  ) {
    fail("local configuration has unsupported fields.");
  }
  if (parsed.knowledgePackId !== DOCUMENT_PACK_ID)
    fail(`knowledgePackId must be ${DOCUMENT_PACK_ID}.`);
  if (
    typeof parsed.runtimeTarget !== "string" ||
    !/^[a-z_][a-z0-9_-]{0,31}@[A-Za-z0-9.-]+$/.test(parsed.runtimeTarget)
  ) {
    fail("runtimeTarget is invalid.");
  }
  return Object.freeze({
    runtimeTarget: parsed.runtimeTarget,
    runtimeKeyPath: requireRegularFile(parsed.runtimeKeyPath, "runtimeKeyPath"),
    runtimeStateDirectory: requireDirectory(parsed.runtimeStateDirectory, "runtimeStateDirectory"),
    documentStateDirectory: requireDirectory(
      parsed.knowledgeStateDirectory,
      "knowledgeStateDirectory"
    ),
    canonStateDirectory: requireDirectory(
      parsed.canonKnowledgeStateDirectory,
      "canonKnowledgeStateDirectory"
    )
  });
}

function activateExactPack(stateDirectory, packId) {
  let active;
  try {
    active = getM9ActivePackState(stateDirectory);
  } catch {
    active = undefined;
  }
  if (active?.packId === packId) return;
  const activation = activateApprovedM9Pack({
    operationRequestId: createM9OperationRequestId(),
    stateDirectory,
    packId,
    ownerConfirmationClaim: "local_owner_confirmed",
    reasonCode: "owner_local_activation"
  });
  if (activation.result !== "succeeded")
    fail(`approved pack activation failed closed: ${activation.resultReasonCode}.`);
}

const config = loadConfig();
activateExactPack(config.canonStateDirectory, CANON_PACK_ID);
activateExactPack(config.documentStateDirectory, DOCUMENT_PACK_ID);

const chat = path.join(import.meta.dirname, "chat-gx10-hermes-with-dual-approved-knowledge.mjs");
const child = spawn(process.execPath, [chat], {
  shell: false,
  stdio: "inherit",
  env: {
    ...process.env,
    HAL_GX10_RUNTIME_TARGET: config.runtimeTarget,
    HAL_GX10_RUNTIME_KEY: config.runtimeKeyPath,
    HAL_RUNTIME_STATE_DIRECTORY: config.runtimeStateDirectory,
    HAL_KNOWLEDGE_STATE_DIRECTORY: config.documentStateDirectory,
    HAL_CANON_KNOWLEDGE_STATE_DIRECTORY: config.canonStateDirectory
  }
});
const [exitCode] = await once(child, "close");
process.exit(exitCode ?? 1);
