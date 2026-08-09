import { createHash } from "node:crypto";

import { createImmutableIdentifier } from "../shared/id.js";
import type { CommandId, CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { LocalFileEventJournal } from "./journal.js";
import type {
  CommandName,
  CommandResult,
  DurableEventRecord,
  DurableRecord,
  DurableRecordKind,
  M2SchemaVersion
} from "./types.js";
import { M2_PROVENANCE, M2_SCHEMA_VERSION } from "./types.js";

type CommandLedgerEntry = Readonly<{
  commandName: CommandName;
  commandId: CommandId;
  correlationId: CorrelationId;
  commandFingerprint: string;
  result: CommandResult;
  eventRecordId: ImmutableIdentifier;
}>;

type ClaimCommandResult =
  | Readonly<{ kind: "proceed" }>
  | Readonly<{ kind: "duplicate"; existing: CommandLedgerEntry }>
  | Readonly<{ kind: "conflict"; existing: CommandLedgerEntry }>;
type DurableEventDraft = Omit<DurableEventRecord, "previousIntegrityHash" | "integrityHash">;

export class AuditService {
  private readonly journal: LocalFileEventJournal;
  private readonly commandIndex = new Map<CommandId, CommandLedgerEntry>();
  private readonly recordsByKind = new Map<
    DurableRecordKind,
    Map<ImmutableIdentifier, DurableRecord>
  >();
  private readonly events: DurableEventRecord[] = [];

  public constructor(stateDirectory: string) {
    this.journal = new LocalFileEventJournal(stateDirectory);
    this.hydrate(this.journal.listAll());
  }

  public static fingerprintCommand(commandName: CommandName, command: object): string {
    const canonical = JSON.stringify({ commandName, command });
    return createHash("sha256").update(canonical).digest("hex");
  }

  public claimCommand(input: {
    commandName: CommandName;
    commandId: CommandId;
    correlationId: CorrelationId;
    commandFingerprint: string;
    causationEventId?: ImmutableIdentifier;
    payloadSummary: string;
  }): ClaimCommandResult {
    const existing = this.commandIndex.get(input.commandId);
    if (!existing) {
      return Object.freeze({ kind: "proceed" });
    }

    if (existing.commandFingerprint === input.commandFingerprint) {
      return Object.freeze({ kind: "duplicate", existing });
    }

    const conflictEvent = this.createEvent({
      eventType: "CommandConflictDenied",
      owner: "AuditService",
      status: "denied",
      commandName: input.commandName,
      commandId: input.commandId,
      correlationId: input.correlationId,
      ...(input.causationEventId ? { causationEventId: input.causationEventId } : {}),
      payloadSummary: `${input.payloadSummary}; conflictWith=${existing.eventRecordId}`,
      commandFingerprint: input.commandFingerprint,
      commandResult: {
        accepted: false,
        status: "denied",
        reason: "Command ID already used with a different payload.",
        eventType: "CommandConflictDenied"
      }
    });
    this.appendEvent(conflictEvent);
    return Object.freeze({ kind: "conflict", existing });
  }

  public recordCommandEvent(input: {
    eventType:
      | "IntentRecorded"
      | "PlanProposed"
      | "DecisionRecorded"
      | "TransactionOpened"
      | "EvidenceAttached"
      | "OutcomeFinalized"
      | "CommandRejected";
    owner: string;
    status: "applied" | "denied";
    commandName: CommandName;
    commandId: CommandId;
    correlationId: CorrelationId;
    causationEventId?: ImmutableIdentifier;
    payloadSummary: string;
    commandFingerprint: string;
    commandResult: CommandResult;
    recordKind?: DurableRecordKind;
    record?: DurableRecord;
  }): DurableEventRecord {
    const event = this.createEvent(input);
    return this.appendEvent(event);
  }

  public getRecordById<TRecord extends DurableRecord>(
    kind: DurableRecordKind,
    recordId: ImmutableIdentifier
  ): TRecord | undefined {
    const byId = this.recordsByKind.get(kind);
    const value = byId?.get(recordId);
    if (!value) {
      return undefined;
    }
    return Object.freeze({ ...value }) as TRecord;
  }

  public listEventsByCorrelationId(correlationId: CorrelationId): readonly DurableEventRecord[] {
    const filtered = this.events.filter((event) => event.correlationId === correlationId);
    return Object.freeze(filtered.map((event) => Object.freeze({ ...event })));
  }

  public getEventCountByCorrelationId(correlationId: CorrelationId): number {
    return this.events.filter((event) => event.correlationId === correlationId).length;
  }

  public getStateDirectory(): string {
    return this.journal.getStateDirectory();
  }

  public getJournalPath(): string {
    return this.journal.getJournalPath();
  }

  private createEvent(input: {
    eventType: DurableEventRecord["eventType"];
    owner: string;
    status: "applied" | "denied";
    commandName?: CommandName;
    commandId: CommandId;
    correlationId: CorrelationId;
    causationEventId?: ImmutableIdentifier;
    payloadSummary: string;
    commandFingerprint?: string;
    commandResult?: CommandResult;
    recordKind?: DurableRecordKind;
    record?: DurableRecord;
  }): DurableEventDraft {
    return Object.freeze({
      eventRecordId: createImmutableIdentifier("event"),
      eventType: input.eventType,
      owner: input.owner,
      status: input.status,
      payloadSummary: input.payloadSummary,
      commandId: input.commandId,
      correlationId: input.correlationId,
      schemaVersion: M2_SCHEMA_VERSION,
      dataClassification: "synthetic_non_sensitive",
      provenance: M2_PROVENANCE,
      timestampIso8601: new Date().toISOString(),
      ...(input.commandName ? { commandName: input.commandName } : {}),
      ...(input.causationEventId ? { causationEventId: input.causationEventId } : {}),
      ...(input.commandFingerprint ? { commandFingerprint: input.commandFingerprint } : {}),
      ...(input.commandResult ? { commandResult: input.commandResult } : {}),
      ...(input.recordKind ? { recordKind: input.recordKind } : {}),
      ...(input.record ? { record: input.record } : {})
    });
  }

  private appendEvent(eventDraft: DurableEventDraft): DurableEventRecord {
    const enrichedEvent = this.journal.append(eventDraft);
    this.events.push(enrichedEvent);
    this.indexEvent(enrichedEvent);
    return enrichedEvent;
  }

  private hydrate(events: readonly DurableEventRecord[]): void {
    for (const event of events) {
      this.events.push(event);
      this.indexEvent(event);
    }
  }

  private indexEvent(event: DurableEventRecord): void {
    if (event.commandName && event.commandFingerprint && event.commandResult) {
      const existing = this.commandIndex.get(event.commandId);
      if (existing && existing.commandFingerprint !== event.commandFingerprint) {
        return;
      }
      this.commandIndex.set(event.commandId, {
        commandName: event.commandName,
        commandId: event.commandId,
        correlationId: event.correlationId,
        commandFingerprint: event.commandFingerprint,
        result: event.commandResult,
        eventRecordId: event.eventRecordId
      });
    }

    if (event.recordKind && event.record) {
      const recordId = this.readRecordId(event.recordKind, event.record);
      const byId =
        this.recordsByKind.get(event.recordKind) ?? new Map<ImmutableIdentifier, DurableRecord>();
      byId.set(recordId, Object.freeze({ ...event.record }));
      this.recordsByKind.set(event.recordKind, byId);
    }
  }

  private readRecordId(kind: DurableRecordKind, record: DurableRecord): ImmutableIdentifier {
    if (kind === "intent") {
      return (record as DurableRecord & { intentId: ImmutableIdentifier }).intentId;
    }
    if (kind === "plan") {
      return (record as DurableRecord & { planId: ImmutableIdentifier }).planId;
    }
    if (kind === "decision") {
      return (record as DurableRecord & { decisionId: ImmutableIdentifier }).decisionId;
    }
    if (kind === "transaction") {
      return (record as DurableRecord & { transactionId: ImmutableIdentifier }).transactionId;
    }
    if (kind === "evidence") {
      return (record as DurableRecord & { evidenceId: ImmutableIdentifier }).evidenceId;
    }
    return (record as DurableRecord & { outcomeId: ImmutableIdentifier }).outcomeId;
  }
}

export function createM2Metadata(input: {
  commandId: CommandId;
  correlationId: CorrelationId;
  causationEventId?: ImmutableIdentifier;
  schemaVersion: M2SchemaVersion;
}): Readonly<{
  commandId: CommandId;
  correlationId: CorrelationId;
  causationEventId?: ImmutableIdentifier;
  schemaVersion: M2SchemaVersion;
  dataClassification: "synthetic_non_sensitive";
  provenance: "local_fixture_demo";
  timestampIso8601: string;
}> {
  return Object.freeze({
    commandId: input.commandId,
    correlationId: input.correlationId,
    schemaVersion: input.schemaVersion,
    dataClassification: "synthetic_non_sensitive",
    provenance: M2_PROVENANCE,
    timestampIso8601: new Date().toISOString(),
    ...(input.causationEventId ? { causationEventId: input.causationEventId } : {})
  });
}
