import { appendFileSync, existsSync, lstatSync, mkdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import { canonicalJsonBuffer } from "./canonicalJson.js";
import { sha256Hex } from "./manifest.js";
import { M5_OPERATION_OWNER, type M5OperationRecord } from "./types.js";

const JOURNAL_FILENAME = "m5-backup-restore-journal.jsonl";
type OperationWithoutIntegrity = Omit<M5OperationRecord, "previousIntegrityHash" | "integrityHash">;

export class M5OperationJournal {
  private readonly operationStateDirectory: string;
  private readonly journalPath: string;
  private lastIntegrityHash: string | undefined;

  public constructor(operationStateDirectory: string) {
    const normalized = operationStateDirectory.trim();
    if (!normalized) {
      throw new Error("operationStateDirectory is required.");
    }
    this.operationStateDirectory = path.resolve(normalized);
    const existing = lstatSync(this.operationStateDirectory, { throwIfNoEntry: false });
    if (existing) {
      if (existing.isSymbolicLink()) {
        throw new Error("operationStateDirectory must not be a symlink.");
      }
      if (!existing.isDirectory()) {
        throw new Error("operationStateDirectory must be a directory.");
      }
    } else {
      mkdirSync(this.operationStateDirectory, { recursive: true });
      const afterCreate = lstatSync(this.operationStateDirectory, { throwIfNoEntry: false });
      if (!afterCreate || afterCreate.isSymbolicLink()) {
        throw new Error("operationStateDirectory must not be a symlink.");
      }
      if (!afterCreate.isDirectory()) {
        throw new Error("operationStateDirectory must be a directory.");
      }
    }
    this.journalPath = path.join(this.operationStateDirectory, JOURNAL_FILENAME);
    if (!statSync(this.operationStateDirectory).isDirectory()) {
      throw new Error("operationStateDirectory must be a directory.");
    }
    const existingRecords = this.listAll();
    this.lastIntegrityHash = existingRecords.at(-1)?.integrityHash;
  }

  public append(record: OperationWithoutIntegrity): M5OperationRecord {
    if (record.owner !== M5_OPERATION_OWNER) {
      throw new Error("M5 operation journal owner mismatch.");
    }
    const withChain = {
      ...record,
      ...(this.lastIntegrityHash ? { previousIntegrityHash: this.lastIntegrityHash } : {})
    };
    const integrityHash = sha256Hex(canonicalJsonBuffer(withChain));
    const complete = Object.freeze({
      ...withChain,
      integrityHash
    } satisfies M5OperationRecord);
    appendFileSync(this.journalPath, `${JSON.stringify(complete)}\n`, "utf8");
    this.lastIntegrityHash = complete.integrityHash;
    return complete;
  }

  public appendRecord(
    input: Omit<OperationWithoutIntegrity, "operationRecordId" | "timestampIso8601">
  ): M5OperationRecord {
    const record: OperationWithoutIntegrity = Object.freeze({
      ...input,
      operationRecordId: createImmutableIdentifier("m5_operation_record"),
      timestampIso8601: new Date().toISOString()
    });
    return this.append(record);
  }

  public listAll(): readonly M5OperationRecord[] {
    if (!existsSync(this.journalPath)) {
      return Object.freeze([]);
    }
    const parsed: M5OperationRecord[] = [];
    let expectedPreviousIntegrityHash: string | undefined;
    const content = readFileSync(this.journalPath, "utf8");
    for (const [index, line] of content.split("\n").entries()) {
      const trimmed = line.trim();
      if (!trimmed) {
        continue;
      }
      let candidateRaw: unknown;
      try {
        candidateRaw = JSON.parse(trimmed);
      } catch (error) {
        throw new Error(`M5 operation journal malformed JSON at line ${index + 1}.`, {
          cause: error
        });
      }
      if (!candidateRaw || typeof candidateRaw !== "object") {
        throw new Error(`M5 operation journal invalid object at line ${index + 1}.`);
      }
      const candidate = candidateRaw as M5OperationRecord;
      if (candidate.owner !== M5_OPERATION_OWNER) {
        throw new Error(`M5 operation journal owner mismatch at line ${index + 1}.`);
      }
      if (!expectedPreviousIntegrityHash) {
        if (candidate.previousIntegrityHash) {
          throw new Error(`M5 operation journal first record cannot include previous hash.`);
        }
      } else if (candidate.previousIntegrityHash !== expectedPreviousIntegrityHash) {
        throw new Error(`M5 operation journal previous hash mismatch at line ${index + 1}.`);
      }
      const withoutIntegrity = Object.fromEntries(
        Object.entries(candidate).filter(([key]) => key !== "integrityHash")
      );
      const expectedIntegrityHash = sha256Hex(canonicalJsonBuffer(withoutIntegrity));
      if (candidate.integrityHash !== expectedIntegrityHash) {
        throw new Error(`M5 operation journal integrity mismatch at line ${index + 1}.`);
      }
      expectedPreviousIntegrityHash = candidate.integrityHash;
      parsed.push(Object.freeze(candidate));
    }
    return Object.freeze(parsed);
  }

  public getJournalPath(): string {
    return this.journalPath;
  }

  public getOperationStateDirectory(): string {
    return this.operationStateDirectory;
  }

  public createOperationId(prefix: "backup" | "restore" | "verify"): ImmutableIdentifier {
    return createImmutableIdentifier(`m5_${prefix}_operation`);
  }
}
