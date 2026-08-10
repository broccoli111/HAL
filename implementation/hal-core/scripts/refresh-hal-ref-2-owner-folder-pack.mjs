#!/usr/bin/env node
/** HAL-owned refresh for one registered persistent folder; no runtime is contacted. */

import { existsSync, lstatSync, mkdirSync, readFileSync, renameSync } from "node:fs";
import path from "node:path";

import {
  M9OwnerFolderRegistryJournal,
  buildM9OwnerFolderPackArtifact,
  collectM9OwnerFolderSourceSnapshot,
  createM9OwnerFolderRegistration,
  persistM9OwnerFolderPackArtifact,
  validateApprovedPackDirectory,
  validatePersistedM9OwnerFolderPackArtifact
} from "../dist/src/m9/index.js";

const CONFIG_FILE = path.join(import.meta.dirname, "..", ".hal-owner-folder.local.json");
const DEFAULT_REGISTRATION_ID = "hal_ref_2_persistent_v1";
const DEFAULT_SOURCE_DIRECTORY = "/Users/rosslauda/Desktop/hal_ref_2";

function fail(message) {
  process.stderr.write(`HAL owner-folder refresh: ${message}\n`);
  process.exit(2);
}
function parseRegistrationId() {
  const args = process.argv.slice(2);
  if (args.length === 0) return DEFAULT_REGISTRATION_ID;
  if (args.length === 2 && args[0] === "--registration-id" && args[1]?.trim()) {
    return args[1].trim();
  }
  fail("usage: --registration-id <registered-id> (or no arguments for hal_ref_2).");
}
function requireDirectory(value, label) {
  if (typeof value !== "string" || !path.isAbsolute(value)) fail(`${label} must be absolute.`);
  mkdirSync(value, { recursive: true });
  const stat = lstatSync(value, { throwIfNoEntry: false });
  if (!stat?.isDirectory() || stat.isSymbolicLink()) fail(`${label} must be a regular directory.`);
  return value;
}
function loadConfig() {
  const stat = lstatSync(CONFIG_FILE, { throwIfNoEntry: false });
  if (!stat?.isFile() || stat.isSymbolicLink()) {
    fail(
      `local configuration is required at ${CONFIG_FILE}; copy .hal-owner-folder.local.example.json.`
    );
  }
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(CONFIG_FILE, "utf8"));
  } catch {
    fail("local configuration is not valid JSON.");
  }
  const allowed = new Set([
    "registryStateDirectory",
    "knowledgeStateDirectory",
    "packRootDirectory"
  ]);
  if (
    !parsed ||
    typeof parsed !== "object" ||
    Object.keys(parsed).some((key) => !allowed.has(key))
  ) {
    fail("local configuration has unsupported fields.");
  }
  return Object.freeze({
    registryStateDirectory: requireDirectory(
      parsed.registryStateDirectory,
      "registryStateDirectory"
    ),
    knowledgeStateDirectory: requireDirectory(
      parsed.knowledgeStateDirectory,
      "knowledgeStateDirectory"
    ),
    packRootDirectory: requireDirectory(parsed.packRootDirectory, "packRootDirectory")
  });
}

const config = await loadConfig();
const journal = new M9OwnerFolderRegistryJournal(config.registryStateDirectory);
const registrationId = parseRegistrationId();
let registration = journal.latest(registrationId);
if (!registration) {
  if (registrationId !== DEFAULT_REGISTRATION_ID) {
    fail("registration is unavailable; register the exact folder through HAL before refresh.");
  }
  registration = createM9OwnerFolderRegistration({
    registrationId: DEFAULT_REGISTRATION_ID,
    sourceDirectory: DEFAULT_SOURCE_DIRECTORY,
    ownerConfirmationClaim: "local_owner_confirmed"
  });
  journal.append("registered", registration);
}
if (registration.status !== "registered") {
  fail("registration is revoked; a revoked folder cannot be refreshed.");
}

const artifact = buildM9OwnerFolderPackArtifact(
  registration,
  collectM9OwnerFolderSourceSnapshot(registration)
);
const packId = `owner_folder_${registration.registrationId}_v1`;
const destination = path.join(config.packRootDirectory, packId);
if (existsSync(destination)) {
  // A source change must fail querying until refresh, but it must not make the
  // prior immutable artifact unreadable for archival/recovery. Validate its
  // stored structure first; source equality is checked only for the no-op case.
  const current = validateApprovedPackDirectory(destination);
  if (current.manifestHashSha256 === artifact.manifestHashSha256) {
    validatePersistedM9OwnerFolderPackArtifact(registration, destination);
    process.stdout.write(
      `HAL owner-folder pack already current: ${packId}#${artifact.manifestHashSha256}\n`
    );
    process.exit(0);
  }
  const archiveRoot = requireDirectory(
    path.join(path.dirname(config.packRootDirectory), "owner-folder-pack-archive"),
    "archiveDirectory"
  );
  renameSync(destination, path.join(archiveRoot, `${packId}-${current.manifestHashSha256}`));
}
persistM9OwnerFolderPackArtifact(artifact, destination);
validatePersistedM9OwnerFolderPackArtifact(registration, destination);
process.stdout.write(`HAL owner-folder pack refreshed: ${packId}#${artifact.manifestHashSha256}\n`);
