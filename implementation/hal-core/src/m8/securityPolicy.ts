import path from "node:path";

export const M8_APP_PROTOCOL = "hal-m8";
export const M8_APP_HOST = "app";
export const M8_ALLOWED_RENDERER_ASSETS = Object.freeze(
  new Set(["/index.html", "/renderer.js", "/styles.css"])
);

export type M8WindowSecurityOptions = Readonly<{
  nodeIntegration: boolean;
  contextIsolation: boolean;
  sandbox: boolean;
  webSecurity: boolean;
  webviewTag: boolean;
  allowRunningInsecureContent: boolean;
}>;

export const M8_WINDOW_SECURITY_OPTIONS: M8WindowSecurityOptions = Object.freeze({
  nodeIntegration: false,
  contextIsolation: true,
  sandbox: true,
  webSecurity: true,
  webviewTag: false,
  allowRunningInsecureContent: false
});

export function createM8WebPreferences(preloadPath: string): Readonly<{
  preload: string;
  nodeIntegration: boolean;
  contextIsolation: boolean;
  sandbox: boolean;
  webSecurity: boolean;
  webviewTag: boolean;
  allowRunningInsecureContent: boolean;
}> {
  return Object.freeze({
    preload: preloadPath,
    ...M8_WINDOW_SECURITY_OPTIONS
  });
}

export function toM8AppUrl(assetPath = "/index.html"): string {
  const normalized = normalizeRendererPath(assetPath);
  return `${M8_APP_PROTOCOL}://${M8_APP_HOST}${normalized}`;
}

export function normalizeRendererPath(inputPath: string): string {
  if (!inputPath || inputPath === "/") {
    return "/index.html";
  }
  return inputPath.startsWith("/") ? inputPath : `/${inputPath}`;
}

export function resolveRendererAssetPath(
  rendererRoot: string,
  requestPath: string
): string | undefined {
  const normalizedPath = normalizeRendererPath(requestPath);
  if (!M8_ALLOWED_RENDERER_ASSETS.has(normalizedPath)) {
    return undefined;
  }
  const candidate = path.resolve(rendererRoot, `.${normalizedPath}`);
  const relative = path.relative(rendererRoot, candidate);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return undefined;
  }
  return candidate;
}

export function isAllowedM8Navigation(targetUrl: string): boolean {
  return parseM8ProtocolRequestUrl(targetUrl).ok;
}

export function parseM8ProtocolRequestUrl(
  rawUrl: string
): Readonly<{ ok: true; pathname: string }> | Readonly<{ ok: false; reason: string }> {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return Object.freeze({ ok: false, reason: "malformed_url" });
  }
  if (parsed.protocol !== `${M8_APP_PROTOCOL}:`) {
    return Object.freeze({ ok: false, reason: "unexpected_protocol" });
  }
  if (parsed.host !== M8_APP_HOST) {
    return Object.freeze({ ok: false, reason: "unexpected_host" });
  }
  const normalizedPath = normalizeRendererPath(parsed.pathname);
  if (!M8_ALLOWED_RENDERER_ASSETS.has(normalizedPath)) {
    return Object.freeze({ ok: false, reason: "asset_not_allowlisted" });
  }
  return Object.freeze({ ok: true, pathname: normalizedPath });
}

export function getMimeTypeForAsset(assetPath: string): string {
  if (assetPath.endsWith(".html")) {
    return "text/html; charset=utf-8";
  }
  if (assetPath.endsWith(".css")) {
    return "text/css; charset=utf-8";
  }
  if (assetPath.endsWith(".js")) {
    return "text/javascript; charset=utf-8";
  }
  return "application/octet-stream";
}
