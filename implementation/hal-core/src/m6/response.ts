import { Buffer } from "node:buffer";

import { normalizeForM6 } from "./tokenizer.js";
import {
  M6_CAPABILITY_ID,
  M6_EXCERPT_MAX_UTF8_BYTES,
  M6_MAX_RESPONSE_UTF8_BYTES,
  type M6MatchOutcome
} from "./types.js";

type ResponseField = Readonly<{ key: string; value: string }>;

const MATCHED_UNCERTAINTY =
  "matched: lexical evidence only; synthetic corpus bounded; external data unavailable";
const NO_MATCH_UNCERTAINTY =
  "no_match: no lexical evidence met threshold; synthetic corpus bounded; external data unavailable";

function utf8Bytes(value: string): number {
  return Buffer.byteLength(value, "utf8");
}

function render(fields: readonly ResponseField[]): string {
  return fields.map((field) => `${field.key}=${field.value}`).join("\n");
}

function truncateUtf8(value: string, maxBytes: number): string {
  if (utf8Bytes(value) <= maxBytes) {
    return value;
  }
  let result = "";
  for (const codePoint of value) {
    const next = result + codePoint;
    if (utf8Bytes(next) > maxBytes) {
      break;
    }
    result = next;
  }
  return result;
}

function truncateValueWithSuffix(value: string, maxBytes: number): string {
  const suffix = "... [truncated]";
  if (utf8Bytes(value) <= maxBytes) {
    return value;
  }
  if (utf8Bytes(suffix) > maxBytes) {
    return truncateUtf8(value, maxBytes);
  }
  const clipped = truncateUtf8(value, maxBytes - utf8Bytes(suffix));
  return `${clipped}${suffix}`;
}

function clipExcerpt(value: string): string {
  return truncateUtf8(normalizeForM6(value), M6_EXCERPT_MAX_UTF8_BYTES)
    .replaceAll("\\", "\\\\")
    .replaceAll('"', '\\"');
}

export type RenderedInquiryResponse = Readonly<{
  responseText: string;
  references: readonly string[];
  hasExcerpt: boolean;
}>;

export function renderM6Response(input: {
  match: M6MatchOutcome;
  corpusManifestHashSha256: string;
}): RenderedInquiryResponse {
  const references = input.match.noMatch
    ? Object.freeze([] as string[])
    : Object.freeze(
        input.match.selectedDocuments.flatMap((document) =>
          document.selectedSections.map((section) => `${document.documentId}#${section.sectionId}`)
        )
      );

  const fields: ResponseField[] = input.match.noMatch
    ? [
        { key: "result", value: "no_match" },
        { key: "externalEffect", value: "none" },
        { key: "capabilityId", value: M6_CAPABILITY_ID },
        { key: "corpusManifestHash", value: input.corpusManifestHashSha256 },
        { key: "references", value: "none" },
        {
          key: "limitations",
          value: "synthetic_corpus_only; lexical_match_only; no_external_data"
        },
        { key: "uncertainty", value: NO_MATCH_UNCERTAINTY },
        {
          key: "message",
          value: "no matching synthetic corpus sections found for the normalized question tokens"
        }
      ]
    : [
        { key: "result", value: "matched" },
        { key: "externalEffect", value: "none" },
        { key: "capabilityId", value: M6_CAPABILITY_ID },
        { key: "corpusManifestHash", value: input.corpusManifestHashSha256 },
        { key: "references", value: references.join(",") },
        {
          key: "limitations",
          value: "synthetic_corpus_only; lexical_match_only; no_external_data"
        },
        { key: "uncertainty", value: MATCHED_UNCERTAINTY },
        {
          key: "excerpt",
          value: input.match.selectedDocuments
            .flatMap((document) =>
              document.selectedSections.map(
                (section) =>
                  `${document.documentId}#${section.sectionId}:"${clipExcerpt(section.paragraph)}"`
              )
            )
            .join("|")
        }
      ];

  const budgeted = [...fields];
  let rendered = render(budgeted);
  if (utf8Bytes(rendered) > M6_MAX_RESPONSE_UTF8_BYTES) {
    const excerptIndex = budgeted.findIndex((field) => field.key === "excerpt");
    if (excerptIndex >= 0) {
      budgeted.splice(excerptIndex, 1);
      rendered = render(budgeted);
    }
  }
  while (utf8Bytes(rendered) > M6_MAX_RESPONSE_UTF8_BYTES) {
    const refIndex = budgeted.findIndex((field) => field.key === "references");
    if (refIndex < 0) {
      break;
    }
    const parts = budgeted[refIndex]?.value.split(",").filter(Boolean) ?? [];
    if (parts.length <= 1) {
      budgeted[refIndex] = { key: "references", value: "none" };
      rendered = render(budgeted);
      break;
    }
    budgeted[refIndex] = {
      key: "references",
      value: parts.slice(0, -1).join(",")
    };
    rendered = render(budgeted);
  }
  if (utf8Bytes(rendered) > M6_MAX_RESPONSE_UTF8_BYTES) {
    const targetKey = input.match.noMatch ? "message" : "uncertainty";
    const targetIndex = budgeted.findIndex((field) => field.key === targetKey);
    if (targetIndex >= 0) {
      const current = budgeted[targetIndex];
      const renderedWithout = render(
        budgeted.map((field, index) =>
          index === targetIndex ? { key: field.key, value: "" } : field
        )
      );
      const available = M6_MAX_RESPONSE_UTF8_BYTES - utf8Bytes(renderedWithout);
      budgeted[targetIndex] = {
        key: targetKey,
        value: truncateValueWithSuffix(current?.value ?? "", Math.max(0, available))
      };
      rendered = render(budgeted);
    }
  }

  return Object.freeze({
    responseText: rendered,
    references,
    hasExcerpt: budgeted.some((field) => field.key === "excerpt")
  });
}
