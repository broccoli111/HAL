import type { M6InquiryResult } from "../m6/orchestrator.js";
import {
  M7_REQUEST_ID_PREFIX,
  createLocalInquiryRequestIdGenerator,
  executeLocalGovernedInquiry,
  resolveAndValidateLocalInquiryStateDirectory
} from "../inquiry/localInquiryService.js";

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

export function resolveAndValidateM7StateDirectory(rawStateDirectory: string): string {
  return resolveAndValidateLocalInquiryStateDirectory(rawStateDirectory);
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

export async function runM7Session(options: M7SessionOptions): Promise<M7SessionRunSummary> {
  const nowProvider = options.now ?? (() => new Date());
  const requestIdGenerator =
    options.generateRequestId ?? createLocalInquiryRequestIdGenerator(M7_REQUEST_ID_PREFIX);
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

    const outcome = executeLocalGovernedInquiry({
      stateDirectory,
      questionText: command.question,
      replayIntentional: command.replayIntentional,
      ...(command.requestId ? { requestId: command.requestId } : {}),
      generateRequestId: requestIdGenerator,
      ...(options.onInquiryResult ? { onInquiryResult: options.onInquiryResult } : {})
    });

    if (!outcome.ok) {
      if (outcome.code === "integrity_unavailable") {
        printBlocked(options.io, {
          reason: `integrity_unavailable:${outcome.reason}`,
          requestId: outcome.requestId,
          ...(outcome.correlationId ? { correlationId: outcome.correlationId } : {}),
          includeIntegrityResult: true
        });
        continue;
      }
      printBlocked(options.io, {
        reason: `m6_invocation_failed:${outcome.reason}`,
        ...(outcome.requestId ? { requestId: outcome.requestId } : {})
      });
      continue;
    }

    if (!command.replayIntentional && outcome.generatedRequestId) {
      options.io.writeLine(`generatedRequestId: ${outcome.generatedRequestId}`);
    }

    const m6Result = outcome.result;
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
