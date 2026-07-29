import path from "node:path";

import { createCommandId, createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { M3TraceService, computeRecordIntegrityHash, createM3Metadata } from "./traceService.js";
import type { CapabilityRegistrationRecord } from "./types.js";
import {
  M3_CAPABILITY_ID,
  M3_PROVIDER_ID,
  M3_PROVIDER_VERSION,
  M3_SCHEMA_VERSION
} from "./types.js";

export class CapabilityRegistry {
  private readonly traceService: M3TraceService;
  private readonly fixtureRoot: string;
  private registrationRecordId: ImmutableIdentifier | undefined;

  public constructor(traceService: M3TraceService, fixtureRoot: string) {
    this.traceService = traceService;
    this.fixtureRoot = path.resolve(fixtureRoot);
  }

  public ensureRegistered(correlationId: CorrelationId): CapabilityRegistrationRecord {
    if (this.registrationRecordId) {
      const existing = this.traceService.getRecordById<CapabilityRegistrationRecord>(
        "capability_registration",
        this.registrationRecordId
      );
      if (existing) {
        return existing;
      }
    }

    const commandId = createCommandId("register_capability");
    const base = createM3Metadata({
      commandId,
      correlationId,
      schemaVersion: M3_SCHEMA_VERSION
    });
    const withoutIntegrity: Omit<CapabilityRegistrationRecord, "integrityHash"> = {
      ...base,
      capabilityRegistrationId: createImmutableIdentifier("m3_capability_registration"),
      capabilityId: M3_CAPABILITY_ID,
      providerId: M3_PROVIDER_ID,
      providerVersion: M3_PROVIDER_VERSION,
      enabled: true,
      inputLimits: Object.freeze({ maxItems: 20, maxDeadlineMs: 10_000 }),
      outputLimits: Object.freeze({ maxArtifactBytes: 64_000 }),
      riskEffectClass: "local_non_live_effect",
      evidence: `fixtureRoot=${this.fixtureRoot}; local-only synthetic corpus inspector`,
      status: "registered"
    };
    const record = Object.freeze({
      ...withoutIntegrity,
      integrityHash: computeRecordIntegrityHash(withoutIntegrity)
    } satisfies CapabilityRegistrationRecord);

    const event = this.traceService.appendDomainEvent({
      eventType: "CapabilityRegistered",
      owner: "CapabilityRegistry",
      status: "applied",
      commandName: "RegisterCapability",
      commandId,
      correlationId,
      payloadSummary: `capabilityId=${record.capabilityId}; provider=${record.providerId}@${record.providerVersion}`,
      commandFingerprint: M3TraceService.fingerprintRequest(record),
      commandResult: {
        accepted: true,
        status: "applied",
        reason: "Capability registered.",
        eventType: "CapabilityRegistered",
        recordKind: "capability_registration",
        recordId: record.capabilityRegistrationId
      },
      recordKind: "capability_registration",
      record
    });

    this.registrationRecordId = record.capabilityRegistrationId;
    return this.traceService.getRecordById<CapabilityRegistrationRecord>(
      "capability_registration",
      event.commandResult?.recordId ?? record.capabilityRegistrationId
    ) as CapabilityRegistrationRecord;
  }
}
