import { Buffer } from "node:buffer";

export function canonicalStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalStringify(entry)).join(",")}]`;
  }

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record).sort((a, b) => a.localeCompare(b));
  const serialized = keys
    .map((key) => `${JSON.stringify(key)}:${canonicalStringify(record[key])}`)
    .join(",");
  return `{${serialized}}`;
}

export function canonicalJsonBuffer(value: unknown): Buffer {
  return Buffer.from(canonicalStringify(value), "utf8");
}
