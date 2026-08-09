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
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

describe("network constraints", () => {
  test("source introduces no network or external-client calls", async () => {
    const srcRoot = path.resolve(import.meta.dirname, "../src");
    const files = await listTypeScriptFiles(srcRoot);
    const forbiddenPatterns = [
      /from\s+["']node:http["']/,
      /from\s+["']node:https["']/,
      /from\s+["']node:net["']/,
      /from\s+["']node:child_process["']/,
      /from\s+["']child_process["']/,
      /\bfetch\s*\(/,
      /\bXMLHttpRequest\b/,
      /from\s+["']axios["']/,
      /from\s+["']openai["']/,
      /from\s+["']@supabase\/supabase-js["']/
    ];

    for (const filePath of files) {
      const content = await readFile(filePath, "utf8");
      for (const pattern of forbiddenPatterns) {
        expect(content).not.toMatch(pattern);
      }
    }
  });
});
