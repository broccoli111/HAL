import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, test } from "vitest";

describe("M8 preload and renderer boundaries", () => {
  test("preload exposes named methods only and does not expose raw ipcRenderer", async () => {
    const preloadPath = path.resolve(import.meta.dirname, "../src/m8/preload.ts");
    const source = await readFile(preloadPath, "utf8");
    expect(source).toContain('contextBridge.exposeInMainWorld("halM8", api)');
    expect(source).not.toContain('exposeInMainWorld("ipcRenderer"');
    expect(source).not.toMatch(/halM8[^]*ipcRenderer:/m);
  });

  test("renderer HTML is local-only with accessibility structure", async () => {
    const htmlPath = path.resolve(import.meta.dirname, "../src/m8/renderer/index.html");
    const source = await readFile(htmlPath, "utf8");
    expect(source).toContain("Boundary indicator");
    expect(source).toContain("local_only");
    expect(source).toContain("Content-Security-Policy");
    expect(source).toContain("connect-src 'none'");
    expect(source).not.toContain("<webview");
    expect(source).not.toContain("http://");
    expect(source).not.toContain("https://");
  });
});
