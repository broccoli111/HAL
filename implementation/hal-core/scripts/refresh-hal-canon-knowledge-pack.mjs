#!/usr/bin/env node
/** Explicit Owner-run refresh for the immutable DR 0028 HAL Canon derived pack. */

import { existsSync, lstatSync, renameSync, rmSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";

import { resolveApprovedM9PackRoot } from "../dist/src/m9/validator.js";
import { M9_HAL_CANON_PACK_ID } from "../dist/src/m9/halCanonSourceScope.js";

const packDirectory = path.join(resolveApprovedM9PackRoot(), M9_HAL_CANON_PACK_ID);
const backup = path.join(path.dirname(packDirectory), `.hal-m9-canon-backup-${randomUUID()}`);
let movedExisting = false;
if (existsSync(packDirectory)) {
  const stat = lstatSync(packDirectory);
  if (!stat.isDirectory() || stat.isSymbolicLink()) {
    throw new Error("Existing HAL Canon derived pack is not a regular directory.");
  }
  renameSync(packDirectory, backup);
  movedExisting = true;
}
try {
  const generator = path.join(import.meta.dirname, "generate-hal-canon-knowledge-pack.mjs");
  const child = spawn(process.execPath, [generator], { shell: false, stdio: "inherit" });
  const [exitCode] = await once(child, "close");
  if (exitCode !== 0) throw new Error("HAL Canon-pack generation failed.");
  if (movedExisting) rmSync(backup, { recursive: true, force: false });
  process.stdout.write(
    "HAL Canon knowledge pack refreshed. The next hal:canon-chat run will validate and activate its new tuple.\n"
  );
} catch (error) {
  if (existsSync(packDirectory)) {
    rmSync(packDirectory, { recursive: true, force: true });
  }
  if (movedExisting) renameSync(backup, packDirectory);
  throw error;
}
