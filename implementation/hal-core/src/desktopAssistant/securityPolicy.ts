import path from "node:path";

export const DESKTOP_ASSISTANT_PROTOCOL = "hal-desktop";
export const DESKTOP_ASSISTANT_HOST = "app";
export const DESKTOP_ASSISTANT_ALLOWED_ASSETS = Object.freeze(
  new Set(["/index.html", "/renderer.js", "/styles.css"])
);

export function resolveDesktopAssistantAssetPath(
  rendererRoot: string,
  rawUrl: string
): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return undefined;
  }
  if (
    parsed.protocol !== `${DESKTOP_ASSISTANT_PROTOCOL}:` ||
    parsed.host !== DESKTOP_ASSISTANT_HOST ||
    !DESKTOP_ASSISTANT_ALLOWED_ASSETS.has(parsed.pathname)
  ) {
    return undefined;
  }
  const candidate = path.resolve(rendererRoot, `.${parsed.pathname}`);
  const relative = path.relative(rendererRoot, candidate);
  return relative.startsWith("..") || path.isAbsolute(relative) ? undefined : candidate;
}

export function isAllowedDesktopAssistantNavigation(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    return (
      parsed.protocol === `${DESKTOP_ASSISTANT_PROTOCOL}:` &&
      parsed.host === DESKTOP_ASSISTANT_HOST &&
      parsed.pathname === "/index.html"
    );
  } catch {
    return false;
  }
}
