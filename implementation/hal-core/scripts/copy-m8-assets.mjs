import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const sourceDirectory = path.resolve(projectRoot, "src/m8/renderer");
const outputDirectory = path.resolve(projectRoot, "dist/src/m8/renderer");
const compiledRendererScript = path.resolve(projectRoot, "dist/src/m8/renderer.js");
const preloadSource = path.resolve(projectRoot, "src/m8/preload.cjs");
const preloadTarget = path.resolve(projectRoot, "dist/src/m8/preload.cjs");
const desktopSourceDirectory = path.resolve(projectRoot, "src/desktopAssistant/renderer");
const desktopOutputDirectory = path.resolve(projectRoot, "dist/src/desktopAssistant/renderer");
const desktopCompiledRendererScript = path.resolve(
  projectRoot,
  "dist/src/desktopAssistant/renderer.js"
);
const desktopPreloadSource = path.resolve(projectRoot, "src/desktopAssistant/preload.cjs");
const desktopPreloadTarget = path.resolve(projectRoot, "dist/src/desktopAssistant/preload.cjs");

await mkdir(outputDirectory, { recursive: true });
await cp(sourceDirectory, outputDirectory, { recursive: true, force: true });
await cp(compiledRendererScript, path.resolve(outputDirectory, "renderer.js"), { force: true });
await cp(preloadSource, preloadTarget, { force: true });
await mkdir(desktopOutputDirectory, { recursive: true });
await cp(desktopSourceDirectory, desktopOutputDirectory, { recursive: true, force: true });
await cp(desktopCompiledRendererScript, path.resolve(desktopOutputDirectory, "renderer.js"), {
  force: true
});
await cp(desktopPreloadSource, desktopPreloadTarget, { force: true });
