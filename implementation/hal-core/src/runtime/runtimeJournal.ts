import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import type {
  RuntimeAgentId,
  RuntimeCapabilityDisposition,
  RuntimeId,
  RuntimeTaskId
} from "./agentRuntime.js";

const JOURNAL_FILENAME = "runtime-contract-journal.jsonl";

export type RuntimeJournalRecordKind =
  | "capability_request"
  | "evidence_submission"
  | "progress_report"
  | "result_report"
  | "failure_report"
  | "subagent_request";

export type RuntimeJournalRecord = Readonly<{
  recordId: ImmutableIdentifier;
  recordKind: RuntimeJournalRecordKind;
  correlationId: CorrelationId;
  runtimeId: RuntimeId;
  agentId: RuntimeAgentId;
  taskId: RuntimeTaskId;
  summary: string;
  provenanceSummary: string;
  canonicalStatus: "unaccepted_runtime_claim";
  disposition?: RuntimeCapabilityDisposition["status"];
  timestampIso8601: string;
  previousIntegrityHash?: string;
  integrityHash: string;
}>;

type JournalDraft = Omit<RuntimeJournalRecord, "recordId" | "timestampIso8601" | "integrityHash">;

/** HAL-side durable custody for runtime claims; never a runtime-owned store. */
export class RuntimeJournal {
  private readonly journalPath: string;
  private lastIntegrityHash: string | undefined;

  public constructor(stateDirectory: string) {
    const normalized = stateDirectory.trim();
    if (!normalized) {
      throw new Error("RuntimeJournal requires an explicit state directory.");
    }
    const resolved = path.resolve(normalized);
    mkdirSync(resolved, { recursive: true });
    this.journalPath = path.join(resolved, JOURNAL_FILENAME);
    this.lastIntegrityHash = this.listAll().at(-1)?.integrityHash;
  }

  public append(draft: JournalDraft): RuntimeJournalRecord {
    const base = {
      ...draft,
      recordId: createImmutableIdentifier("runtime_record"),
      timestampIso8601: new Date().toISOString(),
      ...(this.lastIntegrityHash ? { previousIntegrityHash: this.lastIntegrityHash } : {})
    };
    const record = Object.freeze({
      ...base,
      integrityHash: computeIntegrityHash(base)
    } satisfies RuntimeJournalRecord);
    appendFileSync(this.journalPath, `${JSON.stringify(record)}\n`, "utf8");
    this.lastIntegrityHash = record.integrityHash;
    return record;
  }

  public listAll(): readonly RuntimeJournalRecord[] {
    if (!existsSync(this.journalPath)) {
      return Object.freeze([]);
    }
    let previousIntegrityHash: string | undefined;
    const records: RuntimeJournalRecord[] = [];
    for (const [index, line] of readFileSync(this.journalPath, "utf8").split("\n").entries()) {
      if (!line.trim()) {
        continue;
      }
      const parsed = this.parseAndVerify(line, index + 1, previousIntegrityHash);
      previousIntegrityHash = parsed.integrityHash;
      records.push(parsed);
    }
    return Object.freeze(records);
  }

  public listByCorrelationId(correlationId: CorrelationId): readonly RuntimeJournalRecord[] {
    return Object.freeze(this.listAll().filter((record) => record.correlationId === correlationId));
  }

  private parseAndVerify(
    line: string,
    lineNumber: number,
    expectedPreviousIntegrityHash: string | undefined
  ): RuntimeJournalRecord {
    let parsed: RuntimeJournalRecord;
    try {
      parsed = JSON.parse(line) as RuntimeJournalRecord;
    } catch (error) {
      throw new Error(`RuntimeJournal malformed JSON at line ${lineNumber}.`, { cause: error });
    }
    const { integrityHash, ...withoutIntegrity } = parsed;
    if (!integrityHash || integrityHash !== computeIntegrityHash(withoutIntegrity)) {
      throw new Error(`RuntimeJournal integrity mismatch at line ${lineNumber}.`);
    }
    if (parsed.previousIntegrityHash !== expectedPreviousIntegrityHash) {
      throw new Error(`RuntimeJournal chain mismatch at line ${lineNumber}.`);
    }
    return Object.freeze(parsed);
  }
}

function computeIntegrityHash(value: object): string {
  return createHash("sha256").update(canonicalStringify(value)).digest("hex");
}

function canonicalStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalStringify(entry)).join(",")}]`;
  }
  return `{${Object.entries(value as Record<string, unknown>)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, entry]) => `${JSON.stringify(key)}:${canonicalStringify(entry)}`)
    .join(",")}}`;
}
