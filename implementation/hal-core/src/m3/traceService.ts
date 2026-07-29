import { createHash } from "node:crypto";

import { createCommandId, createImmutableIdentifier } from "../shared/id.js";
import type { CommandId, CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { LocalM3EventJournal } from "./journal.js";
import type {
  M3CommandName,
  M3CommandResult,
  M3DurableRecord,
  M3EventRecord,
  M3EventType,
  M3RecordKind,
  M3SchemaVersion
} from "./types.js";
import { M3_PROVENANCE, M3_SCHEMA_VERSION } from "./types.js";

type EventDraft = Omit<M3EventRecord, "previousIntegrityHash" | "integrityHash">;
type RequestLedgerEntry = Readonly<{
  capabilityRequestId: ImmutableIdentifier;
  commandFingerprint: string;
  result: M3CommandResult;
  eventRecordId: ImmutableIdentifier;
}>;

type ClaimRequestResult =
  | Readonly<{ kind: "proceed" }>
  | Readonly<{ kind: "duplicate"; existing: RequestLedgerEntry }>
  | Readonly<{ kind: "conflict"; existing: RequestLedgerEntry }>;

export class M3TraceService {
  private readonly journal: LocalM3EventJournal;
  private readonly events: M3EventRecord[] = [];
  private readonly requestIndex = new Map<ImmutableIdentifier, RequestLedgerEntry>();
  private readonly recordsByKind = new Map<
    M3RecordKind,
    Map<ImmutableIdentifier, M3DurableRecord>
  >();

  public constructor(stateDirectory: string) {
    this.journal = new LocalM3EventJournal(stateDirectory);
    this.hydrate(this.journal.listAll());
  }

  public static fingerprintRequest(value: object): string {
    return createHash("sha256").update(JSON.stringify(value)).digest("hex");
  }

  public claimCapabilityRequest(input: {
    capabilityRequestId: ImmutableIdentifier;
    correlationId: CorrelationId;
    commandFingerprint: string;
    payloadSummary: string;
    causationEventId?: ImmutableIdentifier;
  }): ClaimRequestResult {
    const existing = this.requestIndex.get(input.capabilityRequestId);
    if (!existing) {
      return Object.freeze({ kind: "proceed" });
    }
    if (existing.commandFingerprint === input.commandFingerprint) {
      return Object.freeze({ kind: "duplicate", existing });
    }

    const conflictEvent = this.createEvent({
      eventType: "CapabilityRequestConflictDenied",
      owner: "ExecutionCoordinator",
      status: "denied",
      commandName: "SubmitCapabilityRequest",
      commandId: createCommandId("m3_request_conflict_denied"),
      correlationId: input.correlationId,
      ...(input.causationEventId ? { causationEventId: input.causationEventId } : {}),
      payloadSummary: `${input.payloadSummary}; conflictWith=${existing.eventRecordId}`,
      commandFingerprint: input.commandFingerprint,
      commandResult: {
        accepted: false,
        status: "denied",
        reason: "Capability request ID already used with a different payload.",
        eventType: "CapabilityRequestConflictDenied"
      }
    });
    this.appendEvent(conflictEvent);
    return Object.freeze({ kind: "conflict", existing });
  }

  public appendDomainEvent(input: {
    eventType: M3EventType;
    owner: string;
    status: "applied" | "denied";
    commandName: M3CommandName;
    commandId: CommandId;
    correlationId: CorrelationId;
    causationEventId?: ImmutableIdentifier;
    payloadSummary: string;
    commandFingerprint: string;
    commandResult: M3CommandResult;
    recordKind?: M3RecordKind;
    record?: M3DurableRecord;
  }): M3EventRecord {
    const event = this.createEvent(input);
    return this.appendEvent(event);
  }

  public getRecordById<TRecord extends M3DurableRecord>(
    kind: M3RecordKind,
    recordId: ImmutableIdentifier
  ): TRecord | undefined {
    const value = this.recordsByKind.get(kind)?.get(recordId);
    if (!value) {
      return undefined;
    }
    return Object.freeze({ ...value }) as TRecord;
  }

  public listEventsByCorrelationId(correlationId: CorrelationId): readonly M3EventRecord[] {
    return Object.freeze(
      this.events
        .filter((event) => event.correlationId === correlationId)
        .map((event) => Object.freeze({ ...event }))
    );
  }

  public listAllEvents(): readonly M3EventRecord[] {
    return Object.freeze(this.events.map((event) => Object.freeze({ ...event })));
  }

  public getStateDirectory(): string {
    return this.journal.getStateDirectory();
  }

  public getJournalPath(): string {
    return this.journal.getJournalPath();
  }

  private createEvent(input: {
    eventType: M3EventType;
    owner: string;
    status: "applied" | "denied";
    commandName: M3CommandName;
    commandId: CommandId;
    correlationId: CorrelationId;
    causationEventId?: ImmutableIdentifier;
    payloadSummary: string;
    commandFingerprint: string;
    commandResult: M3CommandResult;
    recordKind?: M3RecordKind;
    record?: M3DurableRecord;
  }): EventDraft {
    return Object.freeze({
      eventRecordId: createImmutableIdentifier("m3_event"),
      eventType: input.eventType,
      owner: input.owner,
      status: input.status,
      payloadSummary: input.payloadSummary,
      commandName: input.commandName,
      commandId: input.commandId,
      correlationId: input.correlationId,
      schemaVersion: M3_SCHEMA_VERSION,
      dataClassification: "synthetic_non_sensitive",
      provenance: M3_PROVENANCE,
      timestampIso8601: new Date().toISOString(),
      commandFingerprint: input.commandFingerprint,
      commandResult: input.commandResult,
      ...(input.causationEventId ? { causationEventId: input.causationEventId } : {}),
      ...(input.recordKind ? { recordKind: input.recordKind } : {}),
      ...(input.record ? { record: input.record } : {})
    });
  }

  private appendEvent(eventDraft: EventDraft): M3EventRecord {
    const event = this.journal.append(eventDraft);
    this.events.push(event);
    this.indexEvent(event);
    return event;
  }

  private hydrate(events: readonly M3EventRecord[]): void {
    for (const event of events) {
      this.events.push(event);
      this.indexEvent(event);
    }
  }

  private indexEvent(event: M3EventRecord): void {
    if (event.recordKind && event.record) {
      const recordId = this.resolveRecordId(event.recordKind, event.record);
      const byKind =
        this.recordsByKind.get(event.recordKind) ?? new Map<ImmutableIdentifier, M3DurableRecord>();
      byKind.set(recordId, Object.freeze({ ...event.record }));
      this.recordsByKind.set(event.recordKind, byKind);
    }

    if (
      event.commandName === "SubmitCapabilityRequest" &&
      event.commandFingerprint &&
      event.commandResult
    ) {
      const requestId =
        event.commandResult.recordKind === "capability_request" && event.commandResult.recordId
          ? event.commandResult.recordId
          : undefined;
      if (!requestId) {
        return;
      }
      const existing = this.requestIndex.get(requestId);
      if (existing && existing.commandFingerprint !== event.commandFingerprint) {
        return;
      }
      this.requestIndex.set(requestId, {
        capabilityRequestId: requestId,
        commandFingerprint: event.commandFingerprint,
        result: event.commandResult,
        eventRecordId: event.eventRecordId
      });
    }
  }

  private resolveRecordId(kind: M3RecordKind, record: M3DurableRecord): ImmutableIdentifier {
    if (kind === "capability_registration") {
      return (record as { capabilityRegistrationId: ImmutableIdentifier }).capabilityRegistrationId;
    }
    if (kind === "capability_request") {
      return (record as { capabilityRequestId: ImmutableIdentifier }).capabilityRequestId;
    }
    if (kind === "execution_attempt") {
      return (record as { executionAttemptId: ImmutableIdentifier }).executionAttemptId;
    }
    if (kind === "artifact") {
      return (record as { artifactId: ImmutableIdentifier }).artifactId;
    }
    return (record as { verificationId: ImmutableIdentifier }).verificationId;
  }
}

export function createM3Metadata(input: {
  commandId: CommandId;
  correlationId: CorrelationId;
  causationEventId?: ImmutableIdentifier;
  schemaVersion: M3SchemaVersion;
}) {
  return Object.freeze({
    commandId: input.commandId,
    correlationId: input.correlationId,
    schemaVersion: input.schemaVersion,
    dataClassification: "synthetic_non_sensitive" as const,
    provenance: M3_PROVENANCE,
    timestampIso8601: new Date().toISOString(),
    ...(input.causationEventId ? { causationEventId: input.causationEventId } : {})
  });
}

export function computeRecordIntegrityHash(recordWithoutIntegrity: object): string {
  return createHash("sha256").update(JSON.stringify(recordWithoutIntegrity)).digest("hex");
}
