import { Buffer } from "node:buffer";

import { M9_HAL_CANON_PACK_ID, resolveM9PackForActiveInquiry } from "../m9/index.js";
import { M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_ID } from "../m9/personalDocumentFolderPilotScope.js";
import { createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import { runM6Inquiry, type M6InquiryResult } from "./orchestrator.js";

export const M6_DUAL_SCOPE_PROFILE_ID = "owner_approved_dual_scope_inquiry_v1" as const;
export const M6_DUAL_SCOPE_MAX_RENDERED_CONTEXT_UTF8_BYTES = 4_096 as const;

type DualScopePackContext = Readonly<{
  scopeLabel: "hal_canon" | "owner_approved_local_document_folder";
  stateDirectory: string;
  expectedPackId: string;
}>;

export type M6DualScopeInquiryResult = Readonly<{
  profileId: typeof M6_DUAL_SCOPE_PROFILE_ID;
  disposition: "completed_without_effect" | "blocked";
  result: "matched" | "no_match" | "denied" | "blocked";
  renderedResponse: string;
  sourceInquiries: readonly Readonly<{
    scopeLabel: DualScopePackContext["scopeLabel"];
    packId: string;
    packVersion: string;
    manifestHashSha256: string;
    inquiry: M6InquiryResult;
  }>[];
}>;

function truncateUtf8(value: string, maxBytes: number): string {
  if (Buffer.byteLength(value, "utf8") <= maxBytes) return value;
  let result = "";
  for (const codePoint of value) {
    const next = result + codePoint;
    if (Buffer.byteLength(next, "utf8") > maxBytes) break;
    result = next;
  }
  return result;
}

function resolveExactActivePack(context: DualScopePackContext) {
  const active = resolveM9PackForActiveInquiry(context.stateDirectory);
  if (active.packId !== context.expectedPackId) {
    throw new Error(`dual_scope_wrong_active_pack:${context.scopeLabel}`);
  }
  return active;
}

function resultKind(inquiries: readonly M6InquiryResult[]): M6DualScopeInquiryResult["result"] {
  if (inquiries.some((inquiry) => inquiry.result === "blocked")) return "blocked";
  if (inquiries.some((inquiry) => inquiry.result === "denied")) return "denied";
  if (inquiries.some((inquiry) => inquiry.result === "matched")) return "matched";
  return "no_match";
}

export function runM6DualScopeInquiry(input: {
  canonStateDirectory: string;
  localDocumentFolderStateDirectory: string;
  questionText: string;
  requestId?: string;
}): M6DualScopeInquiryResult {
  const requestId = (input.requestId?.trim() ||
    createImmutableIdentifier("m6_dual_scope_request")) as ImmutableIdentifier;
  const contexts: readonly DualScopePackContext[] = Object.freeze([
    Object.freeze({
      scopeLabel: "hal_canon",
      stateDirectory: input.canonStateDirectory,
      expectedPackId: M9_HAL_CANON_PACK_ID
    }),
    Object.freeze({
      scopeLabel: "owner_approved_local_document_folder",
      stateDirectory: input.localDocumentFolderStateDirectory,
      expectedPackId: M9_PERSONAL_DOCUMENT_FOLDER_PILOT_PACK_ID
    })
  ]);

  // Validate both immutable active tuples before either source is queried.
  // Failure is intentionally terminal and no runtime-facing context is made.
  const activePacks = contexts.map(resolveExactActivePack);
  const sourceInquiries = contexts.map((context, index) => {
    const active = activePacks[index]!;
    const inquiry = runM6Inquiry({
      stateDirectory: context.stateDirectory,
      questionText: input.questionText,
      requestId: `${requestId}_${context.scopeLabel}`
    });
    return Object.freeze({
      scopeLabel: context.scopeLabel,
      packId: active.packId,
      packVersion: active.packVersion,
      manifestHashSha256: active.manifestHashSha256,
      inquiry
    });
  });
  const inquiries = sourceInquiries.map((source) => source.inquiry);
  const result = resultKind(inquiries);
  if (result === "blocked" || result === "denied") {
    return Object.freeze({
      profileId: M6_DUAL_SCOPE_PROFILE_ID,
      disposition: "blocked",
      result,
      renderedResponse:
        "result=blocked\nexternalEffect=none\nreason=dual_scope_source_inquiry_not_completed",
      sourceInquiries: Object.freeze(sourceInquiries)
    });
  }

  const renderedResponse = truncateUtf8(
    [
      `profile=${M6_DUAL_SCOPE_PROFILE_ID}`,
      "limitations=owner_approved_dual_scope_context_only; non_canonical_retrieval; lexical_match_only; no_external_data; no_runtime_resource_access",
      ...sourceInquiries.map((source) =>
        [
          `scope=${source.scopeLabel}`,
          `packTuple=${source.packId}@${source.packVersion}#${source.manifestHashSha256}`,
          source.inquiry.renderedResponse
        ].join("\n")
      )
    ].join("\n\n"),
    M6_DUAL_SCOPE_MAX_RENDERED_CONTEXT_UTF8_BYTES
  );
  return Object.freeze({
    profileId: M6_DUAL_SCOPE_PROFILE_ID,
    disposition: "completed_without_effect",
    result,
    renderedResponse,
    sourceInquiries: Object.freeze(sourceInquiries)
  });
}
