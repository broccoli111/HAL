import { describe, expect, test } from "vitest";

import {
  M8_ALLOWED_RENDERER_ASSETS,
  M8_WINDOW_SECURITY_OPTIONS,
  createM8WebPreferences,
  isAllowedM8Navigation,
  parseM8ProtocolRequestUrl,
  resolveRendererAssetPath,
  toM8AppUrl
} from "../src/m8/securityPolicy.js";

describe("M8 security policy", () => {
  test("enforces hardened browser window settings", () => {
    const webPreferences = createM8WebPreferences("/tmp/preload.js");
    expect(webPreferences.nodeIntegration).toBe(false);
    expect(webPreferences.contextIsolation).toBe(true);
    expect(webPreferences.sandbox).toBe(true);
    expect(webPreferences.webSecurity).toBe(true);
    expect(webPreferences.webviewTag).toBe(false);
    expect(M8_WINDOW_SECURITY_OPTIONS.allowRunningInsecureContent).toBe(false);
  });

  test("allows only packaged protocol URLs and allowlisted assets", () => {
    expect(isAllowedM8Navigation(toM8AppUrl("/index.html"))).toBe(true);
    expect(isAllowedM8Navigation(toM8AppUrl("/renderer.js"))).toBe(true);
    expect(isAllowedM8Navigation("hal-m8://app.evil/index.html")).toBe(false);
    expect(isAllowedM8Navigation("hal-m8://other/index.html")).toBe(false);
    expect(isAllowedM8Navigation("https://example.com")).toBe(false);
    expect(isAllowedM8Navigation("not-a-url")).toBe(false);
    expect(isAllowedM8Navigation("hal-m8://app/../../etc/passwd")).toBe(false);
    expect(M8_ALLOWED_RENDERER_ASSETS.has("/index.html")).toBe(true);
  });

  test("parses and validates protocol host and allowlisted path strictly", () => {
    expect(parseM8ProtocolRequestUrl("hal-m8://app/index.html")).toEqual({
      ok: true,
      pathname: "/index.html"
    });
    expect(parseM8ProtocolRequestUrl("hal-m8://app.evil/index.html")).toEqual({
      ok: false,
      reason: "unexpected_host"
    });
    expect(parseM8ProtocolRequestUrl("hal-m8://other/index.html")).toEqual({
      ok: false,
      reason: "unexpected_host"
    });
    expect(parseM8ProtocolRequestUrl("hal-m8://app/unknown.js")).toEqual({
      ok: false,
      reason: "asset_not_allowlisted"
    });
    expect(parseM8ProtocolRequestUrl("https://app/index.html")).toEqual({
      ok: false,
      reason: "unexpected_protocol"
    });
    expect(parseM8ProtocolRequestUrl("not-a-url")).toEqual({
      ok: false,
      reason: "malformed_url"
    });
  });

  test("resolves only strict allowlisted renderer assets", () => {
    const rendererRoot = "/tmp/renderer";
    expect(resolveRendererAssetPath(rendererRoot, "/index.html")).toBe("/tmp/renderer/index.html");
    expect(resolveRendererAssetPath(rendererRoot, "/renderer.js")).toBe(
      "/tmp/renderer/renderer.js"
    );
    expect(resolveRendererAssetPath(rendererRoot, "/styles.css")).toBe("/tmp/renderer/styles.css");
    expect(resolveRendererAssetPath(rendererRoot, "/unknown.js")).toBeUndefined();
    expect(resolveRendererAssetPath(rendererRoot, "/../../etc/passwd")).toBeUndefined();
  });
});
