#!/usr/bin/env node
/** Explicit Owner-run refresh for the exact DR 0030 derived folder pack. */

import { existsSync, lstatSync, renameSync, rmSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";

import { PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY } from "../dist/src/m9/personalDocumentFolderPilotScope.js";

const parent = path.dirname(PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY);
const backup = path.join(parent, `.hal-m9-folder-pilot-backup-${randomUUID()}`);
let movedExisting = false;
if (existsSync(PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY)) {
  const stat = lstatSync(PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY);
  if (!stat.isDirectory() || stat.isSymbolicLink()) {
    throw new Error("Existing derived folder pack is not a regular directory.");
  }
  renameSync(PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY, backup);
  movedExisting = true;
}
try {
  const generator = path.join(
    import.meta.dirname,
    "generate-personal-document-folder-pilot-pack.mjs"
  );
  const child = spawn(process.execPath, [generator], { shell: false, stdio: "inherit" });
  const [exitCode] = await once(child, "close");
  if (exitCode !== 0) throw new Error("Folder-pack generation failed.");
  if (movedExisting) rmSync(backup, { recursive: true, force: false });
  process.stdout.write(
    "HAL local-document folder pack refreshed. The next hal:chat run will validate and activate its new tuple.\n"
  );
} catch (error) {
  if (existsSync(PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY)) {
    rmSync(PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY, { recursive: true, force: true });
  }
  if (movedExisting) renameSync(backup, PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_DIRECTORY);
  throw error;
}
