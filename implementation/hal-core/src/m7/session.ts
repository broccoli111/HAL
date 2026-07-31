import { constants as fsConstants } from "node:fs";
import { accessSync, lstatSync, realpathSync } from "node:fs";
import { randomBytes } from "node:crypto";
import path from "node:path";

import { reconstructM4Trace } from "../m4/orchestrator.js";
import { reconstructM6Trace, runM6Inquiry, type M6InquiryResult } from "../m6/orchestrator.js";

type M7AskCommand = Readonly<{
  kind: "ask";
  question: string;
  requestId: string | undefined;
  replayIntentional: boolean;
}>;

type M7Command =
  | Readonly<{ kind: "help" }>
  | Readonly<{ kind: "status" }>
  | Readonly<{ kind: "exit" }>
  | M7AskCommand
  | Readonly<{ kind: "invalid"; reason: string }>;

type SessionLastOutcome = Readonly<{
  requestId: string;
  correlationId: string;
  result: string;
  disposition: string;
}>;

export type M7SessionIo = Readonly<{
  readLine: () => Promise<string | null>;
  // eslint-disable-next-line no-unused-vars
  writeLine: (line: string) => void;
}>;

export type M7SessionOptions = Readonly<{
  rawStateDirectory: string;
  io: M7SessionIo;
  now?: () => Date;
  generateRequestId?: () => string;
  // eslint-disable-next-line no-unused-vars
  onInquiryResult?: (result: M6InquiryResult) => void;
}>;

export type M7SessionRunSummary = Readonly<{
  stateDirectory: string;
  startedAtIso8601: string;
  inquiryCount: number;
  interrupted: boolean;
  lastOutcome: SessionLastOutcome | undefined;
}>;

type TrustAssessment = Readonly<{ trusted: true }> | Readonly<{ trusted: false; reason: string }>;

const GENERATED_REQUEST_ID_PREFIX = "m7-session-request-";

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

export function resolveAndValidateM7StateDirectory(rawStateDirectory: string): string {
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

function parseAskCommand(trimmed: string): M7Command {
  const rest = trimmed.slice("ask ".length);
  const replayMatch = /^--request-id\s+(\S+)\s+--replay-intent\s+(.+)$/.exec(rest);
  if (replayMatch) {
    const requestId = replayMatch[1]?.trim();
    const question = replayMatch[2]?.trim();
    if (!requestId) {
      return Object.freeze({ kind: "invalid", reason: "missing_request_id" });
    }
    if (!question) {
      return Object.freeze({ kind: "invalid", reason: "missing_question_text" });
    }
    return Object.freeze({
      kind: "ask",
      requestId,
      question,
      replayIntentional: true
    });
  }

  if (rest.startsWith("--")) {
    return Object.freeze({ kind: "invalid", reason: "unsupported_ask_flags" });
  }

  const question = rest.trim();
  if (!question) {
    return Object.freeze({ kind: "invalid", reason: "missing_question_text" });
  }
  return Object.freeze({
    kind: "ask",
    question,
    requestId: undefined,
    replayIntentional: false
  });
}

function parseCommand(inputLine: string): M7Command {
  const trimmed = inputLine.trim();
  if (!trimmed) {
    return Object.freeze({ kind: "invalid", reason: "empty_command" });
  }
  if (trimmed === "help") {
    return Object.freeze({ kind: "help" });
  }
  if (trimmed === "status") {
    return Object.freeze({ kind: "status" });
  }
  if (trimmed === "exit") {
    return Object.freeze({ kind: "exit" });
  }
  if (trimmed.startsWith("ask ")) {
    return parseAskCommand(trimmed);
  }
  return Object.freeze({ kind: "invalid", reason: "unknown_command" });
}

function printHelp(io: M7SessionIo): void {
  io.writeLine("commands:");
  io.writeLine("  help");
  io.writeLine("  status");
  io.writeLine("  ask <question>");
  io.writeLine("  ask --request-id <id> --replay-intent <question>");
  io.writeLine("  exit");
  io.writeLine("boundaries:");
  io.writeLine("  local-only; synthetic-only; deterministic; non-live-effect");
  io.writeLine("  every ask delegates to M6 governed path");
}

function printStatus(
  io: M7SessionIo,
  input: {
    stateDirectory: string;
    startedAtIso8601: string;
    inquiryCount: number;
    lastOutcome: SessionLastOutcome | undefined;
  }
): void {
  io.writeLine(`stateDir: ${input.stateDirectory}`);
  io.writeLine(`startedAt: ${input.startedAtIso8601}`);
  io.writeLine(`inquiryCount: ${input.inquiryCount}`);
  io.writeLine(`lastRequestId: ${input.lastOutcome?.requestId ?? "none"}`);
  io.writeLine(`lastCorrelationId: ${input.lastOutcome?.correlationId ?? "none"}`);
  io.writeLine(`lastResult: ${input.lastOutcome?.result ?? "none"}`);
  io.writeLine(`lastDisposition: ${input.lastOutcome?.disposition ?? "none"}`);
}

function printBlocked(
  io: M7SessionIo,
  input: {
    reason: string;
    requestId?: string;
    correlationId?: string;
    includeIntegrityResult?: boolean;
  }
): void {
  if (input.requestId) {
    io.writeLine(`requestId: ${input.requestId}`);
  }
  if (input.correlationId) {
    io.writeLine(`correlationId: ${input.correlationId}`);
  }
  if (input.includeIntegrityResult) {
    io.writeLine("result: integrity_unavailable");
    io.writeLine("disposition: blocked");
    io.writeLine("replayed: false");
  } else {
    io.writeLine("result: blocked");
    io.writeLine("disposition: blocked");
  }
  io.writeLine(`reason: ${input.reason}`);
}

function printM6Result(io: M7SessionIo, result: M6InquiryResult): void {
  io.writeLine(`requestId: ${result.requestId}`);
  io.writeLine(`correlationId: ${result.correlationId}`);
  io.writeLine(`result: ${result.result}`);
  io.writeLine(`disposition: ${result.disposition}`);
  io.writeLine(`replayed: ${result.replayed}`);
  io.writeLine(`attestationStatus: ${result.attestationStatus}`);
  io.writeLine(`attestationClaimedEffect: ${result.attestationClaimedEffect}`);
  io.writeLine(`inputClassification: ${result.inputClassification}`);
  io.writeLine("response:");
  io.writeLine(result.renderedResponse);
}

function assessSuccessTrust(stateDirectory: string, result: M6InquiryResult): TrustAssessment {
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

function createRequestIdGenerator(): () => string {
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
    return `${GENERATED_REQUEST_ID_PREFIX}${timePart}${sequencePart}${randomPart}`;
  };
}

export async function runM7Session(options: M7SessionOptions): Promise<M7SessionRunSummary> {
  const nowProvider = options.now ?? (() => new Date());
  const requestIdGenerator = options.generateRequestId ?? createRequestIdGenerator();
  const stateDirectory = resolveAndValidateM7StateDirectory(options.rawStateDirectory);
  const startedAtIso8601 = nowProvider().toISOString();
  let inquiryCount = 0;
  let interrupted = false;
  let lastOutcome: SessionLastOutcome | undefined;

  options.io.writeLine("HAL M7 local inquiry session");
  options.io.writeLine("mode=local_only synthetic_only deterministic non_live_effect");
  options.io.writeLine("m6_delegate=required");
  options.io.writeLine(`stateDir=${stateDirectory}`);
  options.io.writeLine("commands=help,status,ask,exit");

  while (true) {
    const line = await options.io.readLine();
    if (line === null) {
      interrupted = true;
      printBlocked(options.io, { reason: "interrupted_input" });
      break;
    }
    const command = parseCommand(line);
    if (command.kind === "help") {
      printHelp(options.io);
      continue;
    }
    if (command.kind === "status") {
      printStatus(options.io, { stateDirectory, startedAtIso8601, inquiryCount, lastOutcome });
      continue;
    }
    if (command.kind === "exit") {
      options.io.writeLine("session=closed");
      break;
    }
    if (command.kind === "invalid") {
      printBlocked(options.io, { reason: `malformed_command:${command.reason}` });
      options.io.writeLine(
        "usage=help | status | ask <question> | ask --request-id <id> --replay-intent <question> | exit"
      );
      continue;
    }

    const requestId = command.requestId ?? requestIdGenerator();
    if (!command.replayIntentional) {
      options.io.writeLine(`generatedRequestId: ${requestId}`);
    }

    let m6Result: M6InquiryResult;
    try {
      m6Result = runM6Inquiry({
        stateDirectory,
        questionText: command.question,
        requestId
      });
      options.onInquiryResult?.(m6Result);
    } catch (error) {
      printBlocked(options.io, {
        reason: `m6_invocation_failed:${(error as Error).message}`,
        requestId
      });
      continue;
    }

    if (m6Result.disposition === "completed_without_effect") {
      const trust = assessSuccessTrust(stateDirectory, m6Result);
      if (!trust.trusted) {
        printBlocked(options.io, {
          reason: `integrity_unavailable:${trust.reason}`,
          requestId: m6Result.requestId,
          correlationId: m6Result.correlationId,
          includeIntegrityResult: true
        });
        continue;
      }
    }

    printM6Result(options.io, m6Result);
    inquiryCount += 1;
    lastOutcome = Object.freeze({
      requestId: m6Result.requestId,
      correlationId: m6Result.correlationId,
      result: m6Result.result,
      disposition: m6Result.disposition
    });
  }

  return Object.freeze({
    stateDirectory,
    startedAtIso8601,
    inquiryCount,
    interrupted,
    lastOutcome
  });
}
