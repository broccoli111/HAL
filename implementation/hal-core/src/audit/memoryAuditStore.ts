import { createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";

export type AuditRecord = Readonly<{
  auditRecordId: ImmutableIdentifier;
  timestampIso8601: string;
  correlationId: CorrelationId;
  causationAuditRecordId?: ImmutableIdentifier;
  eventType: string;
  details: string;
}>;

export type NewAuditRecordInput = Readonly<{
  correlationId: CorrelationId;
  causationAuditRecordId?: ImmutableIdentifier;
  eventType: string;
  details: string;
}>;

function containsSensitiveMaterial(value: string): boolean {
  return /(password|secret|token|api[_-]?key|private[_-]?key|credential)/i.test(value);
}

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
    if (containsSensitiveMaterial(input.details)) {
      throw new Error("Audit details rejected: sensitive-looking content is not admitted.");
    }

    const record: AuditRecord = Object.freeze({
      auditRecordId: createImmutableIdentifier("audit"),
      timestampIso8601: new Date().toISOString(),
      correlationId: input.correlationId,
      ...(input.causationAuditRecordId
        ? { causationAuditRecordId: input.causationAuditRecordId }
        : {}),
      eventType: input.eventType,
      details: input.details
    });

    this.records.push(record);
    return record;
  }

  public list(): readonly AuditRecord[] {
    return Object.freeze([...this.records]);
  }

  public findByCorrelationId(correlationId: CorrelationId): readonly AuditRecord[] {
    return Object.freeze(this.records.filter((record) => record.correlationId === correlationId));
  }
}
