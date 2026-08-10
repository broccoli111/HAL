#!/usr/bin/env node
/** Read-only readiness status for the Owner-facing bounded local assistant. */

import { lstatSync, readFileSync } from "node:fs";
import path from "node:path";

import { getM9ActivePackState, listApprovedM9PackRegistrations } from "../dist/src/m9/index.js";

const CONFIG_FILE = path.join(import.meta.dirname, "..", ".hal-chat.local.json");
const CANON_PACK_ID = "hal_canon_v1";
const DOCUMENT_PACK_ID = "personal_document_folder_pilot_v1";

function fail(message) {
  process.stderr.write(`HAL assistant status: ${message}\n`);
  process.exit(2);
}

function requireDirectory(value, label) {
  if (typeof value !== "string" || !path.isAbsolute(value))
    fail(`${label} must be an absolute path.`);
  const stat = lstatSync(value, { throwIfNoEntry: false });
  if (!stat?.isDirectory() || stat.isSymbolicLink())
    fail(`${label} must be a regular non-symlink directory.`);
  return value;
}

function requireRegularFile(value, label) {
  if (typeof value !== "string" || !path.isAbsolute(value))
    fail(`${label} must be an absolute path.`);
  const stat = lstatSync(value, { throwIfNoEntry: false });
  if (!stat?.isFile() || stat.isSymbolicLink())
    fail(`${label} must be a regular non-symlink file.`);
  return value;
}

const configStat = lstatSync(CONFIG_FILE, { throwIfNoEntry: false });
if (!configStat?.isFile() || configStat.isSymbolicLink())
  fail(`local configuration is required at ${CONFIG_FILE}.`);
let config;
try {
  config = JSON.parse(readFileSync(CONFIG_FILE, "utf8"));
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
  !config ||
  typeof config !== "object" ||
  Object.keys(config).some((key) => !allowedKeys.has(key))
) {
  fail("local configuration has unsupported fields.");
}
if (config.knowledgePackId !== DOCUMENT_PACK_ID)
  fail(`knowledgePackId must be ${DOCUMENT_PACK_ID}.`);
if (
  typeof config.runtimeTarget !== "string" ||
  !/^[a-z_][a-z0-9_-]{0,31}@[A-Za-z0-9.-]+$/.test(config.runtimeTarget)
) {
  fail("runtimeTarget is invalid.");
}
requireRegularFile(config.runtimeKeyPath, "runtimeKeyPath");
requireDirectory(config.runtimeStateDirectory, "runtimeStateDirectory");
const documentStateDirectory = requireDirectory(
  config.knowledgeStateDirectory,
  "knowledgeStateDirectory"
);
const canonStateDirectory = requireDirectory(
  config.canonKnowledgeStateDirectory,
  "canonKnowledgeStateDirectory"
);

let registrations;
try {
  registrations = listApprovedM9PackRegistrations();
} catch {
  fail("approved pack registration is unavailable or fails integrity validation.");
}
const canonRegistration = registrations.find((entry) => entry.packId === CANON_PACK_ID);
const documentRegistration = registrations.find((entry) => entry.packId === DOCUMENT_PACK_ID);
if (!canonRegistration) fail(`approved Canon pack ${CANON_PACK_ID} is unavailable.`);
if (!documentRegistration) fail(`approved document pack ${DOCUMENT_PACK_ID} is unavailable.`);
let canonActive;
let documentActive;
try {
  canonActive = getM9ActivePackState(canonStateDirectory);
} catch {
  canonActive = undefined;
}
try {
  documentActive = getM9ActivePackState(documentStateDirectory);
} catch {
  documentActive = undefined;
}
const canonActivation =
  canonActive?.packId === CANON_PACK_ID ? "active" : "inactive_or_stale_launcher_will_revalidate";
const documentActivation =
  documentActive?.packId === DOCUMENT_PACK_ID
    ? "active"
    : "inactive_or_stale_launcher_will_revalidate";

process.stdout.write(
  [
    "HAL assistant readiness: approved_local_only",
    `canonPack=${canonRegistration.packId}@${canonRegistration.packVersion}#${canonRegistration.manifestHashSha256}`,
    `canonActivation=${canonActivation}`,
    `documentPack=${documentRegistration.packId}@${documentRegistration.packVersion}#${documentRegistration.manifestHashSha256}`,
    `documentActivation=${documentActivation}`,
    "runtimeRoute=restricted_ssh_zero_capability_not_contacted",
    "sources=owner_approved_non_canonical_context_only"
  ].join("\n") + "\n"
);
