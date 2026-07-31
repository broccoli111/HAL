import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const sourceDirectory = path.resolve(projectRoot, "src/m8/renderer");
const outputDirectory = path.resolve(projectRoot, "dist/src/m8/renderer");

await mkdir(outputDirectory, { recursive: true });
await cp(sourceDirectory, outputDirectory, { recursive: true, force: true });
