#!/usr/bin/env node
/** Owner-facing, bounded chat route for the exact DR 0034 persistent source. */

import { lstatSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { once } from "node:events";

import {
  activateApprovedM9Pack,
  createM9OperationRequestId,
  createM9OwnerFolderRegistration,
  getM9ActivePackState,
  validatePersistedM9OwnerFolderPackArtifact
} from "../dist/src/m9/index.js";

const CONFIG_FILE = path.join(import.meta.dirname, "..", ".hal-owner-folder.local.json");
const RUNTIME_CONFIG_FILE = path.join(import.meta.dirname, "..", ".hal-chat.local.json");
const REGISTRATION_ID = "hal_ref_2_persistent_v1";
const SOURCE_DIRECTORY = "/Users/rosslauda/Desktop/hal_ref_2";
const PACK_ID = `owner_folder_${REGISTRATION_ID}_v1`;

function fail(message) {
  process.stderr.write(`HAL owner-folder chat: ${message}\n`);
  process.exit(2);
}
function requireDirectory(value, label) {
  if (typeof value !== "string" || !path.isAbsolute(value)) fail(`${label} must be absolute.`);
  mkdirSync(value, { recursive: true });
  const stat = lstatSync(value, { throwIfNoEntry: false });
  if (!stat?.isDirectory() || stat.isSymbolicLink()) fail(`${label} must be a regular directory.`);
  return value;
}
function requireRegularFile(value, label) {
  if (typeof value !== "string" || !path.isAbsolute(value)) fail(`${label} must be absolute.`);
  const stat = lstatSync(value, { throwIfNoEntry: false });
  if (!stat?.isFile() || stat.isSymbolicLink()) fail(`${label} must be a regular file.`);
  return value;
}
function loadRuntimeConfig() {
  const stat = lstatSync(RUNTIME_CONFIG_FILE, { throwIfNoEntry: false });
  if (!stat?.isFile() || stat.isSymbolicLink()) {
    fail(`runtime configuration is required at ${RUNTIME_CONFIG_FILE}.`);
  }
  let runtime;
  try {
    runtime = JSON.parse(readFileSync(RUNTIME_CONFIG_FILE, "utf8"));
  } catch {
    fail("runtime configuration is not valid JSON.");
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
    !runtime ||
    typeof runtime !== "object" ||
    Object.keys(runtime).some((key) => !allowedKeys.has(key)) ||
    typeof runtime.runtimeTarget !== "string" ||
    !/^[a-z_][a-z0-9_-]{0,31}@[A-Za-z0-9.-]+$/.test(runtime.runtimeTarget)
  ) {
    fail("runtime configuration is invalid.");
  }
  return Object.freeze({
    runtimeTarget: runtime.runtimeTarget,
    runtimeKeyPath: requireRegularFile(runtime.runtimeKeyPath, "runtimeKeyPath"),
    runtimeStateDirectory: requireDirectory(runtime.runtimeStateDirectory, "runtimeStateDirectory")
  });
}
const configStat = lstatSync(CONFIG_FILE, { throwIfNoEntry: false });
if (!configStat?.isFile() || configStat.isSymbolicLink())
  fail(`local configuration is required at ${CONFIG_FILE}.`);
let parsed;
try {
  parsed = JSON.parse(readFileSync(CONFIG_FILE, "utf8"));
} catch {
  fail("local configuration is not valid JSON.");
}
const allowed = new Set(["registryStateDirectory", "knowledgeStateDirectory", "packRootDirectory"]);
if (!parsed || typeof parsed !== "object" || Object.keys(parsed).some((key) => !allowed.has(key)))
  fail("local configuration has unsupported fields.");
const config = Object.freeze({
  knowledgeStateDirectory: requireDirectory(
    parsed.knowledgeStateDirectory,
    "knowledgeStateDirectory"
  ),
  packRootDirectory: requireDirectory(parsed.packRootDirectory, "packRootDirectory")
});
const runtimeConfig = loadRuntimeConfig();
const registration = createM9OwnerFolderRegistration({
  registrationId: REGISTRATION_ID,
  sourceDirectory: SOURCE_DIRECTORY,
  ownerConfirmationClaim: "local_owner_confirmed"
});
const packDirectory = path.join(config.packRootDirectory, PACK_ID);
try {
  validatePersistedM9OwnerFolderPackArtifact(registration, packDirectory);
} catch {
  fail(
    "source or persistent pack is stale/unavailable. Run npm run hal:owner-folder:refresh; no runtime was contacted."
  );
}
process.env.HAL_OWNER_FOLDER_PACK_ROOT = config.packRootDirectory;
let active;
try {
  active = getM9ActivePackState(config.knowledgeStateDirectory);
} catch {
  active = undefined;
}
if (active?.packId !== PACK_ID) {
  const activation = activateApprovedM9Pack({
    operationRequestId: createM9OperationRequestId(),
    stateDirectory: config.knowledgeStateDirectory,
    packId: PACK_ID,
    ownerConfirmationClaim: "local_owner_confirmed",
    reasonCode: "owner_local_activation"
  });
  if (activation.result !== "succeeded")
    fail(`activation failed closed: ${activation.resultReasonCode}.`);
}
const chat = path.join(import.meta.dirname, "chat-gx10-hermes-with-personal-document-pilot.mjs");
const child = spawn(process.execPath, [chat], {
  shell: false,
  stdio: "inherit",
  env: {
    ...process.env,
    HAL_GX10_RUNTIME_TARGET: runtimeConfig.runtimeTarget,
    HAL_GX10_RUNTIME_KEY: runtimeConfig.runtimeKeyPath,
    HAL_RUNTIME_STATE_DIRECTORY: runtimeConfig.runtimeStateDirectory,
    HAL_KNOWLEDGE_STATE_DIRECTORY: config.knowledgeStateDirectory
  }
});
const [exitCode] = await once(child, "close");
process.exit(exitCode ?? 1);
