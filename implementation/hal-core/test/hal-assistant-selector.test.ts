import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

const scriptDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const selector = path.join(scriptDirectory, "scripts", "hal-assistant.mjs");

describe("HAL assistant selector", () => {
  test("lists each explicitly authorized scope without activation or runtime contact", () => {
    const result = spawnSync(process.execPath, [selector, "--help"], {
      encoding: "utf8",
      env: { PATH: process.env.PATH ?? "" }
    });
    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("canon");
    expect(result.stdout).toContain("documents");
    expect(result.stdout).toContain("combined");
    expect(result.stdout).toContain("hal-ref-2");
    expect(result.stdout).toContain("does not validate, activate, or contact a runtime");
  });
});
