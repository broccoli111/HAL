import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

import type { M3EventRecord } from "./types.js";

const JOURNAL_FILENAME = "m3-event-journal.jsonl";
type EventWithoutIntegrity = Omit<M3EventRecord, "previousIntegrityHash" | "integrityHash">;

export class LocalM3EventJournal {
  private readonly stateDirectory: string;
  private readonly journalPath: string;
  private lastIntegrityHash: string | undefined;

  public constructor(stateDirectory: string) {
    const normalized = stateDirectory.trim();
    if (!normalized) {
      throw new Error("stateDirectory is required; refusing to use an implicit default path.");
    }

    this.stateDirectory = path.resolve(normalized);
    this.journalPath = path.join(this.stateDirectory, JOURNAL_FILENAME);
    mkdirSync(this.stateDirectory, { recursive: true });
    const existing = this.listAll();
    this.lastIntegrityHash = existing.at(-1)?.integrityHash;
  }

  public append(event: EventWithoutIntegrity): M3EventRecord {
    const enriched = this.enrichWithIntegrity(event, this.lastIntegrityHash);
    appendFileSync(this.journalPath, `${JSON.stringify(enriched)}\n`, "utf8");
    this.lastIntegrityHash = enriched.integrityHash;
    return enriched;
  }

  public listAll(): readonly M3EventRecord[] {
    if (!existsSync(this.journalPath)) {
      return Object.freeze([]);
    }

    const fileContent = readFileSync(this.journalPath, "utf8");
    const parsed: M3EventRecord[] = [];
    let previousIntegrityHash: string | undefined;
    for (const [lineIndex, line] of fileContent.split("\n").entries()) {
      const trimmed = line.trim();
      if (!trimmed) {
        continue;
      }
      const event = this.parseAndValidateLine(trimmed, lineIndex + 1, previousIntegrityHash);
      previousIntegrityHash = event.integrityHash;
      parsed.push(event);
    }

    return Object.freeze(parsed);
  }

  public getJournalPath(): string {
    return this.journalPath;
  }

  public getStateDirectory(): string {
    return this.stateDirectory;
  }

  private parseAndValidateLine(
    line: string,
    lineNumber: number,
    expectedPreviousIntegrityHash: string | undefined
  ): M3EventRecord {
    let parsedRaw: unknown;
    try {
      parsedRaw = JSON.parse(line);
    } catch (error) {
      throw new Error(
        `M3 journal integrity error: malformed JSON at line ${lineNumber}. ${(error as Error).message}`,
        { cause: error }
      );
    }

    if (!parsedRaw || typeof parsedRaw !== "object") {
      throw new Error(`M3 journal integrity error: non-object event at line ${lineNumber}.`);
    }

    const parsed = parsedRaw as Partial<M3EventRecord>;
    if (typeof parsed.integrityHash !== "string" || !parsed.integrityHash.trim()) {
      throw new Error(`M3 journal integrity error: missing integrityHash at line ${lineNumber}.`);
    }

    if (!expectedPreviousIntegrityHash) {
      if (typeof parsed.previousIntegrityHash === "string") {
        throw new Error(
          `M3 journal integrity error: first event cannot include previousIntegrityHash at line ${lineNumber}.`
        );
      }
    } else if (parsed.previousIntegrityHash !== expectedPreviousIntegrityHash) {
      throw new Error(
        `M3 journal integrity error: previousIntegrityHash mismatch at line ${lineNumber}.`
      );
    }

    const candidate = parsed as M3EventRecord;
    const { integrityHash, ...withoutIntegrityHash } = candidate;
    const expected = computeIntegrityHash(withoutIntegrityHash);
    if (integrityHash !== expected) {
      throw new Error(`M3 journal integrity error: integrityHash mismatch at line ${lineNumber}.`);
    }

    return Object.freeze(candidate);
  }

  private enrichWithIntegrity(
    event: EventWithoutIntegrity,
    previousIntegrityHash: string | undefined
  ): M3EventRecord {
    const withChain = {
      ...event,
      ...(previousIntegrityHash ? { previousIntegrityHash } : {})
    };
    return Object.freeze({
      ...withChain,
      integrityHash: computeIntegrityHash(withChain)
    });
  }
}

function computeIntegrityHash(eventWithoutIntegrityHash: object): string {
  return createHash("sha256").update(canonicalStringify(eventWithoutIntegrityHash)).digest("hex");
}

function canonicalStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalStringify(entry)).join(",")}]`;
  }
  const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) =>
    a.localeCompare(b)
  );
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalStringify(v)}`).join(",")}}`;
}
