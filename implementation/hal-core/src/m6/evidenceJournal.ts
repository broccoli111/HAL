import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId } from "../shared/types.js";
import type { M6EvidenceRecord, M6JournalEvent } from "./types.js";

const JOURNAL_FILE = "m6-event-journal.jsonl";

type EventWithoutIntegrity = Omit<M6JournalEvent, "previousIntegrityHash" | "integrityHash">;

function canonicalStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalStringify(entry)).join(",")}]`;
  }
  const entries = Object.entries(value as Record<string, unknown>).sort(([left], [right]) => {
    if (left < right) {
      return -1;
    }
    if (left > right) {
      return 1;
    }
    return 0;
  });
  return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${canonicalStringify(item)}`).join(",")}}`;
}

function hashObject(value: object): string {
  return createHash("sha256").update(canonicalStringify(value)).digest("hex");
}

export class M6EvidenceJournal {
  private readonly stateDirectory: string;
  private readonly journalPath: string;
  private lastIntegrityHash: string | undefined;

  public constructor(stateDirectory: string) {
    const normalized = stateDirectory.trim();
    if (!normalized) {
      throw new Error("stateDirectory is required.");
    }
    this.stateDirectory = path.resolve(normalized);
    mkdirSync(this.stateDirectory, { recursive: true });
    this.journalPath = path.resolve(this.stateDirectory, JOURNAL_FILE);
    const existing = this.listAll();
    this.lastIntegrityHash = existing.at(-1)?.integrityHash;
  }

  public append(record: M6EvidenceRecord): M6JournalEvent {
    const draft: EventWithoutIntegrity = {
      eventRecordId: createImmutableIdentifier("m6_event"),
      timestampIso8601: new Date().toISOString(),
      correlationId: record.correlationId as CorrelationId,
      eventType: "M6InquiryRecorded",
      record
    };
    const withChain = {
      ...draft,
      ...(this.lastIntegrityHash ? { previousIntegrityHash: this.lastIntegrityHash } : {})
    };
    const event = Object.freeze({
      ...withChain,
      integrityHash: hashObject(withChain)
    } satisfies M6JournalEvent);
    appendFileSync(this.journalPath, `${JSON.stringify(event)}\n`, "utf8");
    this.lastIntegrityHash = event.integrityHash;
    return event;
  }

  public listAll(): readonly M6JournalEvent[] {
    if (!existsSync(this.journalPath)) {
      return Object.freeze([]);
    }
    const lines = readFileSync(this.journalPath, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const events: M6JournalEvent[] = [];
    let previous: string | undefined;
    for (const line of lines) {
      const parsed = JSON.parse(line) as M6JournalEvent;
      if (!parsed.integrityHash) {
        throw new Error("M6 journal integrity error: missing integrityHash.");
      }
      if (!previous) {
        if (parsed.previousIntegrityHash) {
          throw new Error(
            "M6 journal integrity error: unexpected previousIntegrityHash on first event."
          );
        }
      } else if (parsed.previousIntegrityHash !== previous) {
        throw new Error("M6 journal integrity error: previous hash mismatch.");
      }
      const { integrityHash, ...withoutIntegrityHash } = parsed;
      const expected = hashObject(withoutIntegrityHash);
      if (integrityHash !== expected) {
        throw new Error("M6 journal integrity error: integrity hash mismatch.");
      }
      previous = integrityHash;
      events.push(Object.freeze(parsed));
    }
    return Object.freeze(events);
  }

  public getJournalPath(): string {
    return this.journalPath;
  }
}

export function computeM6IntegrityHash(recordWithoutIntegrity: object): string {
  return hashObject(recordWithoutIntegrity);
}
