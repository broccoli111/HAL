import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { canonicalStringify } from "../m5/canonicalJson.js";
import {
  M9_ACTIVATION_JOURNAL_FILE,
  M9_BOUNDS,
  M9_STATE_SUBDIRECTORY,
  type M9ActivationRecord
} from "./types.js";
import { byteLengthUtf8, sha256Hex } from "./canonical.js";

export class M9ActivationJournal {
  private readonly journalPath: string;
  private lastRecordHash: string | undefined;

  public constructor(stateDirectory: string) {
    const root = path.resolve(stateDirectory, M9_STATE_SUBDIRECTORY);
    mkdirSync(root, { recursive: true });
    this.journalPath = path.resolve(root, M9_ACTIVATION_JOURNAL_FILE);
    this.lastRecordHash = this.listAll().at(-1)?.recordHash;
  }

  public append(
    input: Omit<
      M9ActivationRecord,
      "schemaVersion" | "activationRecordId" | "recordedAtUtc" | "previousRecordHash" | "recordHash"
    >
  ): M9ActivationRecord {
    const withoutHash = Object.freeze({
      schemaVersion: "hal.m9.pack-activation-record.v1" as const,
      activationRecordId: createImmutableIdentifier("m9_activation_record"),
      recordedAtUtc: new Date().toISOString(),
      ...input,
      ...(this.lastRecordHash ? { previousRecordHash: this.lastRecordHash } : {})
    });
    const recordHash = sha256Hex(canonicalStringify(withoutHash));
    const record = Object.freeze({
      ...withoutHash,
      recordHash
    } satisfies M9ActivationRecord);
    const serialized = JSON.stringify(record);
    if (byteLengthUtf8(serialized) > M9_BOUNDS.maxActivationRecordUtf8Bytes) {
      throw new Error("activation record exceeds v1 byte bound");
    }
    appendFileSync(this.journalPath, `${serialized}\n`, "utf8");
    this.lastRecordHash = record.recordHash;
    return record;
  }

  public listAll(): readonly M9ActivationRecord[] {
    if (!existsSync(this.journalPath)) {
      return Object.freeze([]);
    }
    const lines = readFileSync(this.journalPath, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const records: M9ActivationRecord[] = [];
    let previousHash: string | undefined;
    for (const line of lines) {
      const record = JSON.parse(line) as M9ActivationRecord;
      if (record.previousRecordHash !== previousHash) {
        throw new Error("M9 activation journal chain mismatch.");
      }
      const { recordHash, ...withoutHash } = record;
      const computed = sha256Hex(canonicalStringify(withoutHash));
      if (computed !== recordHash) {
        throw new Error("M9 activation journal integrity mismatch.");
      }
      previousHash = recordHash;
      records.push(Object.freeze(record));
    }
    return Object.freeze(records);
  }

  public findByOperationRequestId(requestId: ImmutableIdentifier): M9ActivationRecord | undefined {
    return this.listAll().find((record) => record.operationRequestId === requestId);
  }

  public findLatestByCorrelation(correlationId: CorrelationId): M9ActivationRecord | undefined {
    return this.listAll()
      .filter((record) => record.correlationId === correlationId)
      .at(-1);
  }
}
