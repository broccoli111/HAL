import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

const scriptPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../scripts/hal-local-web.mjs"
);
const source = readFileSync(scriptPath, "utf8");

describe("loopback local web presence", () => {
  test("binds only a random IPv4 loopback listener with a fresh session token", () => {
    expect(source).toContain('server.listen(0, "127.0.0.1"');
    expect(source).toContain("randomBytes(32)");
    expect(source).not.toContain("0.0.0.0");
    expect(source).not.toContain("process.env.HAL_WEB_PORT");
  });

  test("requires the session token and exposes only bounded HAL routes", () => {
    expect(source).toContain('req.headers["x-hal-session-token"] !== token');
    expect(source).toContain('req.url === "/api/control"');
    expect(source).toContain('req.url === "/api/question"');
    expect(source).toContain('reasonCode: "unknown_route"');
    expect(source).toContain("const maxBody = 8_192");
  });

  test("uses fixed script dispatch with no shell and records control events", () => {
    expect(source).toContain("shell: false");
    expect(source).toContain("record: recordControl");
    expect(source).toContain("control-journal.jsonl");
    expect(source).not.toContain("exec(");
  });
});
