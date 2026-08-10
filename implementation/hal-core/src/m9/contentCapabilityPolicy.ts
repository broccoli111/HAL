import path from "node:path";

/**
 * Central HAL policy for content classes in an already registered local
 * folder. A folder registration admits a location; this policy decides which
 * content classes HAL may inspect or derive from that admitted location.
 * It conveys no filesystem authority to an Agent Runtime.
 */
export const M9_CENTRAL_CONTENT_CAPABILITY_POLICY_ID = "local_mixed_media_v1" as const;

export type M9CentralContentClass = "text" | "document" | "image";

const EXTENSION_TO_CLASS: Readonly<Record<string, M9CentralContentClass>> = Object.freeze({
  ".md": "text",
  ".txt": "text",
  ".pdf": "document",
  ".png": "image",
  ".jpg": "image",
  ".jpeg": "image"
});

export const M9_CENTRAL_TEXT_EXTENSIONS = Object.freeze([".md", ".txt"]);
export const M9_CENTRAL_RECOGNIZED_EXTENSIONS = Object.freeze(Object.keys(EXTENSION_TO_CLASS));

function assert(value: unknown, message: string): asserts value {
  if (!value) throw new Error(message);
}

/**
 * Classifies one direct source name without opening it. Path-like, hidden, or
 * unsupported names are rejected before HAL performs any source operation.
 */
export function classifyM9CentralContentFileName(fileName: string): M9CentralContentClass {
  assert(typeof fileName === "string" && fileName.length > 0, "content file name is required");
  assert(path.basename(fileName) === fileName, "content file name must be direct");
  assert(!fileName.startsWith("."), "hidden content file is not admitted");
  const contentClass = EXTENSION_TO_CLASS[path.extname(fileName).toLowerCase()];
  assert(contentClass, "content file type is not centrally supported");
  return contentClass;
}

export function isM9CentralTextFileName(fileName: string): boolean {
  return classifyM9CentralContentFileName(fileName) === "text";
}
