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
const HAL_CANON_MATCHED_UNCERTAINTY =
  "matched: lexical evidence only; owner-approved HAL Canon retrieval context is non-canonical; external data unavailable";
const HAL_CANON_NO_MATCH_UNCERTAINTY =
  "no_match: no lexical evidence met threshold; owner-approved HAL Canon retrieval context is non-canonical; external data unavailable";
const PERSONAL_DOCUMENT_MATCHED_UNCERTAINTY =
  "matched: lexical evidence only; owner-approved local document retrieval context is non-canonical; external data unavailable";
const PERSONAL_DOCUMENT_NO_MATCH_UNCERTAINTY =
  "no_match: no lexical evidence met threshold; owner-approved local document retrieval context is non-canonical; external data unavailable";

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

function clipExcerptToBytes(value: string, maxBytes: number): string {
  return truncateUtf8(normalizeForM6(value), maxBytes)
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
  corpusContext?: "synthetic" | "owner_approved_hal_canon" | "owner_approved_local_document";
}): RenderedInquiryResponse {
  const isHalCanon = input.corpusContext === "owner_approved_hal_canon";
  const isPersonalDocument = input.corpusContext === "owner_approved_local_document";
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
          value: isHalCanon
            ? "owner_approved_hal_canon_context_only; non_canonical_retrieval; lexical_match_only; no_external_data"
            : isPersonalDocument
              ? "owner_approved_local_document_context_only; non_canonical_retrieval; lexical_match_only; no_external_data"
              : "synthetic_corpus_only; lexical_match_only; no_external_data"
        },
        {
          key: "uncertainty",
          value: isHalCanon
            ? HAL_CANON_NO_MATCH_UNCERTAINTY
            : isPersonalDocument
              ? PERSONAL_DOCUMENT_NO_MATCH_UNCERTAINTY
              : NO_MATCH_UNCERTAINTY
        },
        {
          key: "message",
          value: isHalCanon
            ? "no matching owner-approved HAL Canon sections found for the normalized question tokens"
            : isPersonalDocument
              ? "no matching owner-approved local document sections found for the normalized question tokens"
              : "no matching synthetic corpus sections found for the normalized question tokens"
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
          value: isHalCanon
            ? "owner_approved_hal_canon_context_only; non_canonical_retrieval; lexical_match_only; no_external_data"
            : isPersonalDocument
              ? "owner_approved_local_document_context_only; non_canonical_retrieval; lexical_match_only; no_external_data"
              : "synthetic_corpus_only; lexical_match_only; no_external_data"
        },
        {
          key: "uncertainty",
          value: isHalCanon
            ? HAL_CANON_MATCHED_UNCERTAINTY
            : isPersonalDocument
              ? PERSONAL_DOCUMENT_MATCHED_UNCERTAINTY
              : MATCHED_UNCERTAINTY
        },
        {
          key: "excerpt",
          value: input.match.selectedDocuments
            // References retain the complete bounded match set. Render only
            // the highest-ranked document's excerpts so the fixed response
            // budget preserves a useful, source-derived statement rather
            // than diluting it with lower-ranked lexical matches.
            .slice(0, 1)
            .flatMap((document) =>
              document.selectedSections.map(
                (section) =>
                  `${document.documentId}#${section.sectionId}:"${clipExcerptToBytes(
                    section.paragraph,
                    document.tags?.includes("topic-index") ? 480 : M6_EXCERPT_MAX_UTF8_BYTES
                  )}"`
              )
            )
            .join("|")
        }
      ];

  const budgeted = [...fields];
  let rendered = render(budgeted);
  while (utf8Bytes(rendered) > M6_MAX_RESPONSE_UTF8_BYTES) {
    const refIndex = budgeted.findIndex((field) => field.key === "references");
    const parts = refIndex >= 0 ? (budgeted[refIndex]?.value.split(",").filter(Boolean) ?? []) : [];
    if (parts.length > 1 && refIndex >= 0) {
      budgeted[refIndex] = { key: "references", value: parts.slice(0, -1).join(",") };
      rendered = render(budgeted);
      continue;
    }
    const excerptIndex = budgeted.findIndex((field) => field.key === "excerpt");
    if (excerptIndex >= 0) {
      const current = budgeted[excerptIndex];
      const renderedWithoutExcerpt = render(
        budgeted.map((field, index) =>
          index === excerptIndex ? { key: field.key, value: "" } : field
        )
      );
      const available = M6_MAX_RESPONSE_UTF8_BYTES - utf8Bytes(renderedWithoutExcerpt);
      if (available > 0) {
        budgeted[excerptIndex] = {
          key: "excerpt",
          value: truncateValueWithSuffix(current?.value ?? "", available)
        };
        rendered = render(budgeted);
        break;
      }
      budgeted.splice(excerptIndex, 1);
      rendered = render(budgeted);
      continue;
    }
    break;
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
