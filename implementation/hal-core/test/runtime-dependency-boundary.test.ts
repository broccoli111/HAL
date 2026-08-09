import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, test } from "vitest";

async function listTypeScriptFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listTypeScriptFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".ts")) {
      files.push(fullPath);
    }
  }
  return files;
}

describe("runtime dependency boundary", () => {
  test("HAL Core outside the adapter boundary has no Hermes-specific reference", async () => {
    const sourceRoot = path.resolve(import.meta.dirname, "../src");
    const runtimeRoot = path.join(sourceRoot, "runtime");
    const files = await listTypeScriptFiles(sourceRoot);

    for (const filePath of files.filter((filePath) => !filePath.startsWith(runtimeRoot))) {
      const content = await readFile(filePath, "utf8");
      expect(content).not.toMatch(/\bHermes\b/);
    }
  });

  test("the adapter boundary does not import a Hermes implementation", async () => {
    const runtimeRoot = path.resolve(import.meta.dirname, "../src/runtime");
    const files = await listTypeScriptFiles(runtimeRoot);

    for (const filePath of files) {
      const content = await readFile(filePath, "utf8");
      expect(content).not.toMatch(/from\s+["'](?:@?hermes|hermes)[^"']*["']/i);
    }
  });
});
