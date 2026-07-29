import { createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";

export type AuditRecord = Readonly<{
  auditRecordId: ImmutableIdentifier;
  timestampIso8601: string;
  correlationId: CorrelationId;
  eventType: string;
  details: string;
}>;

export type NewAuditRecordInput = Readonly<{
  correlationId: CorrelationId;
  eventType: string;
  details: string;
}>;

export class InMemoryAppendOnlyAuditStore {
  private readonly records: AuditRecord[] = [];
  private readonly mode: "development" | "test";

  public constructor(mode: "development" | "test") {
    this.mode = mode;
  }

  public append(input: NewAuditRecordInput): AuditRecord {
    if (this.mode !== "development" && this.mode !== "test") {
      throw new Error("InMemoryAppendOnlyAuditStore is only admitted for development/test.");
    }
    if (!input.eventType.trim()) {
      throw new Error("Audit eventType must be non-empty.");
    }
    if (!input.details.trim()) {
      throw new Error("Audit details must be non-empty.");
    }

    const record: AuditRecord = Object.freeze({
      auditRecordId: createImmutableIdentifier("audit"),
      timestampIso8601: new Date().toISOString(),
      correlationId: input.correlationId,
      eventType: input.eventType,
      details: input.details
    });

    this.records.push(record);
    return record;
  }

  public list(): readonly AuditRecord[] {
    return Object.freeze([...this.records]);
  }
}
