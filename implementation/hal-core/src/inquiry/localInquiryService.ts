import { constants as fsConstants } from "node:fs";
import { accessSync, lstatSync, realpathSync } from "node:fs";
import { randomBytes } from "node:crypto";
import path from "node:path";

import { reconstructM4Trace } from "../m4/orchestrator.js";
import { reconstructM6Trace, runM6Inquiry, type M6InquiryResult } from "../m6/orchestrator.js";

export const M7_REQUEST_ID_PREFIX = "m7-session-request-";
export const M8_REQUEST_ID_PREFIX = "m8-desktop-request-";

type TrustAssessment = Readonly<{ trusted: true }> | Readonly<{ trusted: false; reason: string }>;

export type LocalInquiryExecutionFailure = Readonly<{
  ok: false;
  code: "m6_invocation_failed" | "integrity_unavailable";
  reason: string;
  requestId: string;
  correlationId?: string;
}>;

export type LocalInquiryExecutionSuccess = Readonly<{
  ok: true;
  generatedRequestId?: string;
  result: M6InquiryResult;
}>;

export type LocalInquiryExecutionResult =
  LocalInquiryExecutionSuccess | LocalInquiryExecutionFailure;

export type LocalInquiryExecutionInput = Readonly<{
  stateDirectory: string;
  questionText: string;
  replayIntentional: boolean;
  requestId?: string;
  generateRequestId: () => string;
  // eslint-disable-next-line no-unused-vars
  onInquiryResult?: (result: M6InquiryResult) => void;
}>;

function isUrlLikeStateDir(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }
  const windowsDrivePath = /^[A-Za-z]:[\\/]/.test(trimmed);
  if (windowsDrivePath) {
    return false;
  }
  if (trimmed.includes("://")) {
    return true;
  }
  return /^[A-Za-z][A-Za-z0-9+.-]*:/.test(trimmed);
}

export function resolveAndValidateLocalInquiryStateDirectory(rawStateDirectory: string): string {
  const candidate = rawStateDirectory.trim();
  if (!candidate) {
    throw new Error("Missing required --state-dir.");
  }
  if (isUrlLikeStateDir(candidate)) {
    throw new Error("State directory must be a local filesystem path (URL-like value rejected).");
  }
  const resolved = path.resolve(candidate);
  try {
    const directoryStat = lstatSync(resolved);
    if (directoryStat.isSymbolicLink()) {
      throw new Error("State directory root must not be a symlink.");
    }
    if (!directoryStat.isDirectory()) {
      throw new Error("State directory path must resolve to a directory.");
    }
    const canonicalPath = realpathSync(resolved);
    if (canonicalPath !== resolved) {
      throw new Error("State directory must not resolve through symlink boundaries.");
    }
    accessSync(resolved, fsConstants.R_OK | fsConstants.W_OK | fsConstants.X_OK);
    return resolved;
  } catch (error) {
    throw new Error(
      `State directory validation failed (fail closed): ${(error as Error).message}`,
      {
        cause: error
      }
    );
  }
}

export function createLocalInquiryRequestIdGenerator(prefix: string): () => string {
  let lastTimestamp = 0;
  let sequence = 0;
  return () => {
    const nowMs = Date.now();
    if (nowMs === lastTimestamp) {
      sequence += 1;
    } else {
      lastTimestamp = nowMs;
      sequence = 0;
    }
    const timePart = nowMs.toString(36).padStart(10, "0");
    const sequencePart = sequence.toString(36).padStart(3, "0");
    const randomPart = randomBytes(6).toString("hex");
    return `${prefix}${timePart}${sequencePart}${randomPart}`;
  };
}

export function assessM6InquiryTrust(
  stateDirectory: string,
  result: M6InquiryResult
): TrustAssessment {
  try {
    const m6Trace = reconstructM6Trace(stateDirectory, result.correlationId);
    const m4Trace = reconstructM4Trace(stateDirectory, result.correlationId);
    if (m6Trace.evidenceCount < 1) {
      return Object.freeze({ trusted: false, reason: "m6_evidence_missing" });
    }
    if (m6Trace.latestDisposition !== "completed_without_effect") {
      return Object.freeze({ trusted: false, reason: "m6_latest_disposition_untrusted" });
    }
    if (!m4Trace.m2IntegrityValid || !m4Trace.m3IntegrityValid || !m4Trace.m4IntegrityValid) {
      return Object.freeze({ trusted: false, reason: "m4_integrity_untrusted" });
    }
    if (!m4Trace.crossJournalLinkageValid) {
      return Object.freeze({ trusted: false, reason: "cross_journal_linkage_untrusted" });
    }
    if (m4Trace.finalOutcomeStatus === "unavailable" || m4Trace.claimedEffect === "unavailable") {
      return Object.freeze({ trusted: false, reason: "attestation_unavailable" });
    }
    if (m4Trace.finalOutcomeStatus !== result.attestationStatus) {
      return Object.freeze({ trusted: false, reason: "attestation_status_mismatch" });
    }
    if (m4Trace.claimedEffect !== result.attestationClaimedEffect) {
      return Object.freeze({ trusted: false, reason: "attestation_effect_mismatch" });
    }
    return Object.freeze({ trusted: true });
  } catch {
    return Object.freeze({ trusted: false, reason: "reconstruction_failed" });
  }
}

export function executeLocalGovernedInquiry(
  input: LocalInquiryExecutionInput
): LocalInquiryExecutionResult {
  const replayRequestId = input.requestId?.trim();
  if (input.replayIntentional && !replayRequestId) {
    return Object.freeze({
      ok: false,
      code: "m6_invocation_failed",
      reason: "missing_request_id",
      requestId: ""
    });
  }
  const requestId = replayRequestId || input.generateRequestId();

  let m6Result: M6InquiryResult;
  try {
    m6Result = runM6Inquiry({
      stateDirectory: input.stateDirectory,
      questionText: input.questionText,
      requestId
    });
    input.onInquiryResult?.(m6Result);
  } catch (error) {
    return Object.freeze({
      ok: false,
      code: "m6_invocation_failed",
      reason: (error as Error).message,
      requestId
    });
  }

  if (m6Result.disposition === "completed_without_effect") {
    const trust = assessM6InquiryTrust(input.stateDirectory, m6Result);
    if (!trust.trusted) {
      return Object.freeze({
        ok: false,
        code: "integrity_unavailable",
        reason: trust.reason,
        requestId: m6Result.requestId,
        correlationId: m6Result.correlationId
      });
    }
  }

  return Object.freeze({
    ok: true,
    ...(replayRequestId ? {} : { generatedRequestId: requestId }),
    result: m6Result
  });
}
