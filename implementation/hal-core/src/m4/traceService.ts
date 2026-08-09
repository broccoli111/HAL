import { createHash } from "node:crypto";

import { createCommandId, createImmutableIdentifier } from "../shared/id.js";
import type { CommandId, CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { LocalM4EventJournal } from "./journal.js";
import type {
  M4CommandName,
  M4CommandResult,
  M4DurableRecord,
  M4EventRecord,
  M4EventType,
  M4RecordKind,
  M4SchemaVersion
} from "./types.js";
import { M4_PROVENANCE, M4_SCHEMA_VERSION } from "./types.js";

type EventDraft = Omit<M4EventRecord, "previousIntegrityHash" | "integrityHash">;
type AttestationRequestEntry = Readonly<{
  attestationRequestId: ImmutableIdentifier;
  commandFingerprint: string;
  result: M4CommandResult;
  eventRecordId: ImmutableIdentifier;
}>;
type ClaimAttestationRequestResult =
  | Readonly<{ kind: "proceed" }>
  | Readonly<{ kind: "duplicate"; existing: AttestationRequestEntry }>
  | Readonly<{ kind: "conflict"; existing: AttestationRequestEntry }>;

export class M4TraceService {
  private readonly journal: LocalM4EventJournal;
  private readonly events: M4EventRecord[] = [];
  private readonly attestationRequestIndex = new Map<
    ImmutableIdentifier,
    AttestationRequestEntry
  >();
  private readonly recordsByKind = new Map<
    M4RecordKind,
    Map<ImmutableIdentifier, M4DurableRecord>
  >();

  public constructor(stateDirectory: string) {
    this.journal = new LocalM4EventJournal(stateDirectory);
    this.hydrate(this.journal.listAll());
  }

  public static fingerprint(value: object): string {
    return createHash("sha256").update(JSON.stringify(value)).digest("hex");
  }

  public claimAttestationRequest(input: {
    attestationRequestId: ImmutableIdentifier;
    correlationId: CorrelationId;
    commandFingerprint: string;
    payloadSummary: string;
    causationEventId?: ImmutableIdentifier;
  }): ClaimAttestationRequestResult {
    const existing = this.attestationRequestIndex.get(input.attestationRequestId);
    if (!existing) {
      return Object.freeze({ kind: "proceed" });
    }
    if (existing.commandFingerprint === input.commandFingerprint) {
      return Object.freeze({ kind: "duplicate", existing });
    }
    const conflictEvent = this.createEvent({
      eventType: "AttestationRequestConflictDenied",
      owner: "OutcomeAttestationService",
      status: "denied",
      commandName: "FinalizeOutcomeAttestation",
      commandId: createCommandId("m4_attestation_conflict_denied"),
      correlationId: input.correlationId,
      ...(input.causationEventId ? { causationEventId: input.causationEventId } : {}),
      payloadSummary: `${input.payloadSummary}; conflictWith=${existing.eventRecordId}`,
      commandFingerprint: input.commandFingerprint,
      commandResult: {
        accepted: false,
        status: "denied",
        reason: "Attestation request ID already used with a different payload.",
        eventType: "AttestationRequestConflictDenied"
      }
    });
    this.appendEvent(conflictEvent);
    return Object.freeze({ kind: "conflict", existing });
  }

  public appendDomainEvent(input: {
    eventType: M4EventType;
    owner: string;
    status: "applied" | "denied";
    commandName: M4CommandName;
    commandId: CommandId;
    correlationId: CorrelationId;
    causationEventId?: ImmutableIdentifier;
    payloadSummary: string;
    commandFingerprint: string;
    commandResult: M4CommandResult;
    recordKind?: M4RecordKind;
    record?: M4DurableRecord;
  }): M4EventRecord {
    const event = this.createEvent(input);
    return this.appendEvent(event);
  }

  public listEventsByCorrelationId(correlationId: CorrelationId): readonly M4EventRecord[] {
    return Object.freeze(
      this.events
        .filter((event) => event.correlationId === correlationId)
        .map((event) => Object.freeze({ ...event }))
    );
  }

  public listAllEvents(): readonly M4EventRecord[] {
    return Object.freeze(this.events.map((event) => Object.freeze({ ...event })));
  }

  public getRecordById<TRecord extends M4DurableRecord>(
    kind: M4RecordKind,
    recordId: ImmutableIdentifier
  ): TRecord | undefined {
    const value = this.recordsByKind.get(kind)?.get(recordId);
    if (!value) {
      return undefined;
    }
    return Object.freeze({ ...value }) as TRecord;
  }

  public getStateDirectory(): string {
    return this.journal.getStateDirectory();
  }

  public getJournalPath(): string {
    return this.journal.getJournalPath();
  }

  private createEvent(input: {
    eventType: M4EventType;
    owner: string;
    status: "applied" | "denied";
    commandName: M4CommandName;
    commandId: CommandId;
    correlationId: CorrelationId;
    causationEventId?: ImmutableIdentifier;
    payloadSummary: string;
    commandFingerprint: string;
    commandResult: M4CommandResult;
    recordKind?: M4RecordKind;
    record?: M4DurableRecord;
  }): EventDraft {
    return Object.freeze({
      eventRecordId: createImmutableIdentifier("m4_event"),
      eventType: input.eventType,
      owner: input.owner,
      status: input.status,
      payloadSummary: input.payloadSummary,
      commandName: input.commandName,
      commandId: input.commandId,
      correlationId: input.correlationId,
      schemaVersion: M4_SCHEMA_VERSION,
      dataClassification: "synthetic_non_sensitive",
      provenance: M4_PROVENANCE,
      timestampIso8601: new Date().toISOString(),
      commandFingerprint: input.commandFingerprint,
      commandResult: input.commandResult,
      ...(input.causationEventId ? { causationEventId: input.causationEventId } : {}),
      ...(input.recordKind ? { recordKind: input.recordKind } : {}),
      ...(input.record ? { record: input.record } : {})
    });
  }

  private appendEvent(eventDraft: EventDraft): M4EventRecord {
    const event = this.journal.append(eventDraft);
    this.events.push(event);
    this.indexEvent(event);
    return event;
  }

  private hydrate(events: readonly M4EventRecord[]): void {
    for (const event of events) {
      this.events.push(event);
      this.indexEvent(event);
    }
  }

  private indexEvent(event: M4EventRecord): void {
    if (event.recordKind && event.record) {
      const recordId = this.resolveRecordId(event.recordKind, event.record);
      const byKind =
        this.recordsByKind.get(event.recordKind) ?? new Map<ImmutableIdentifier, M4DurableRecord>();
      byKind.set(recordId, Object.freeze({ ...event.record }));
      this.recordsByKind.set(event.recordKind, byKind);
    }
    if (
      event.commandName === "FinalizeOutcomeAttestation" &&
      event.commandFingerprint &&
      event.commandResult &&
      event.commandResult.recordKind === "outcome_attestation" &&
      event.commandResult.recordId
    ) {
      const requestId = (event.record as { attestationRequestId?: ImmutableIdentifier } | undefined)
        ?.attestationRequestId;
      if (!requestId) {
        return;
      }
      const existing = this.attestationRequestIndex.get(requestId);
      if (existing && existing.commandFingerprint !== event.commandFingerprint) {
        return;
      }
      this.attestationRequestIndex.set(requestId, {
        attestationRequestId: requestId,
        commandFingerprint: event.commandFingerprint,
        result: event.commandResult,
        eventRecordId: event.eventRecordId
      });
    }
  }

  private resolveRecordId(kind: M4RecordKind, record: M4DurableRecord): ImmutableIdentifier {
    if (kind === "outcome_attestation") {
      return (record as { attestationId: ImmutableIdentifier }).attestationId;
    }
    if (kind === "recovery_case") {
      return (record as { recoveryCaseId: ImmutableIdentifier }).recoveryCaseId;
    }
    return (record as { explanationId: ImmutableIdentifier }).explanationId;
  }
}

export function createM4Metadata(input: {
  commandId: CommandId;
  correlationId: CorrelationId;
  causationEventId?: ImmutableIdentifier;
  schemaVersion: M4SchemaVersion;
}) {
  return Object.freeze({
    commandId: input.commandId,
    correlationId: input.correlationId,
    schemaVersion: input.schemaVersion,
    dataClassification: "synthetic_non_sensitive" as const,
    provenance: M4_PROVENANCE,
    timestampIso8601: new Date().toISOString(),
    ...(input.causationEventId ? { causationEventId: input.causationEventId } : {})
  });
}

export function computeM4IntegrityHash(recordWithoutIntegrity: object): string {
  return createHash("sha256").update(JSON.stringify(recordWithoutIntegrity)).digest("hex");
}
