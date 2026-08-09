import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";

import { canonicalStringify } from "../m5/canonicalJson.js";

export function sha256Hex(input: string | Buffer): string {
  return createHash("sha256").update(input).digest("hex");
}

export function canonicalJsonUtf8Bytes(value: unknown): Buffer {
  return Buffer.from(canonicalStringify(value), "utf8");
}

export function byteLengthUtf8(value: string): number {
  return Buffer.byteLength(value, "utf8");
}
