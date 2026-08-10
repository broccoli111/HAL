#!/usr/bin/env node
/** Checks the packaged local Electron assets without launching a GUI. */
import { lstatSync } from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const required = [
  "dist/src/desktopAssistant/main.js",
  "dist/src/desktopAssistant/renderer/index.html",
  "dist/src/desktopAssistant/renderer/renderer.js",
  "dist/src/desktopAssistant/renderer/styles.css",
  "dist/src/desktopAssistant/preload.cjs"
];
for (const relative of required) {
  const stat = lstatSync(path.resolve(projectRoot, relative), { throwIfNoEntry: false });
  if (!stat?.isFile() || stat.isSymbolicLink()) {
    process.stderr.write(`HAL desktop preflight failed: required asset unavailable: ${relative}\n`);
    process.exit(2);
  }
}
process.stdout.write("HAL desktop preflight passed: packaged UI assets are present.\n");
