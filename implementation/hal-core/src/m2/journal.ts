import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

import type { DurableEventRecord } from "./types.js";

const JOURNAL_FILENAME = "m2-event-journal.jsonl";
type EventWithoutIntegrity = Omit<DurableEventRecord, "previousIntegrityHash" | "integrityHash">;

export class LocalFileEventJournal {
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

  public append(event: EventWithoutIntegrity): DurableEventRecord {
    const enriched = this.enrichWithIntegrity(event, this.lastIntegrityHash);
    const serialized = JSON.stringify(enriched);
    appendFileSync(this.journalPath, `${serialized}\n`, "utf8");
    this.lastIntegrityHash = enriched.integrityHash;
    return enriched;
  }

  public listAll(): readonly DurableEventRecord[] {
    if (!existsSync(this.journalPath)) {
      return Object.freeze([]);
    }

    const fileContent = readFileSync(this.journalPath, "utf8");
    const parsed: DurableEventRecord[] = [];
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
  ): DurableEventRecord {
    let parsedRaw: unknown;
    try {
      parsedRaw = JSON.parse(line);
    } catch (error) {
      throw new Error(
        `Journal integrity error: malformed JSON at line ${lineNumber}. ${(error as Error).message}`,
        { cause: error }
      );
    }

    if (!parsedRaw || typeof parsedRaw !== "object") {
      throw new Error(`Journal integrity error: non-object event at line ${lineNumber}.`);
    }

    const parsed = parsedRaw as Partial<DurableEventRecord>;
    if (typeof parsed.integrityHash !== "string" || !parsed.integrityHash.trim()) {
      throw new Error(`Journal integrity error: missing integrityHash at line ${lineNumber}.`);
    }

    if (!expectedPreviousIntegrityHash) {
      if (typeof parsed.previousIntegrityHash === "string") {
        throw new Error(
          `Journal integrity error: first event cannot include previousIntegrityHash at line ${lineNumber}.`
        );
      }
    } else {
      if (
        typeof parsed.previousIntegrityHash !== "string" ||
        parsed.previousIntegrityHash !== expectedPreviousIntegrityHash
      ) {
        throw new Error(
          `Journal integrity error: previousIntegrityHash mismatch at line ${lineNumber}.`
        );
      }
    }

    const candidate = parsed as DurableEventRecord;
    const { integrityHash, ...eventWithoutIntegrityHash } = candidate;
    const expectedHash = computeIntegrityHash(eventWithoutIntegrityHash);
    if (integrityHash !== expectedHash) {
      throw new Error(`Journal integrity error: integrityHash mismatch at line ${lineNumber}.`);
    }

    return Object.freeze(candidate);
  }

  private enrichWithIntegrity(
    event: EventWithoutIntegrity,
    previousIntegrityHash: string | undefined
  ): DurableEventRecord {
    const withChain = {
      ...event,
      ...(previousIntegrityHash ? { previousIntegrityHash } : {})
    };
    const integrityHash = computeIntegrityHash(withChain);
    return Object.freeze({
      ...withChain,
      integrityHash
    });
  }
}

function computeIntegrityHash(eventWithoutIntegrityHash: object): string {
  const canonical = canonicalStringify(eventWithoutIntegrityHash);
  return createHash("sha256").update(canonical).digest("hex");
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
  const serialized = entries
    .map(([key, entryValue]) => `${JSON.stringify(key)}:${canonicalStringify(entryValue)}`)
    .join(",");
  return `{${serialized}}`;
}
