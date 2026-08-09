import { createCommandId, createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { M3TraceService, computeRecordIntegrityHash, createM3Metadata } from "./traceService.js";
import type { CapabilityRegistrationRecord } from "./types.js";
import {
  M3_CAPABILITY_ID,
  M3_PROVIDER_ID,
  M3_PROVIDER_VERSION,
  M3_SCHEMA_VERSION,
  type M3CapabilityId,
  type M3ProviderId,
  type M3ProviderVersion
} from "./types.js";

export class CapabilityRegistry {
  private readonly traceService: M3TraceService;
  private readonly registrationRecordIds = new Map<M3CapabilityId, ImmutableIdentifier>();

  public constructor(traceService: M3TraceService) {
    this.traceService = traceService;
  }

  public ensureRegistered(correlationId: CorrelationId): CapabilityRegistrationRecord {
    return this.ensureRegisteredCapability({
      correlationId,
      capabilityId: M3_CAPABILITY_ID,
      providerId: M3_PROVIDER_ID,
      providerVersion: M3_PROVIDER_VERSION,
      inputLimits: { maxItems: 20, maxDeadlineMs: 10_000 },
      outputLimits: { maxArtifactBytes: 64_000 },
      evidence: "corpusReference=default_synthetic_corpus_v1; local-only synthetic corpus inspector"
    });
  }

  public getRegisteredCapability(
    capabilityId: M3CapabilityId
  ): CapabilityRegistrationRecord | undefined {
    const recordId = this.registrationRecordIds.get(capabilityId);
    if (!recordId) {
      return undefined;
    }
    return this.traceService.getRecordById<CapabilityRegistrationRecord>(
      "capability_registration",
      recordId
    );
  }

  public ensureRegisteredCapability(input: {
    correlationId: CorrelationId;
    capabilityId: M3CapabilityId;
    providerId: M3ProviderId;
    providerVersion: M3ProviderVersion;
    inputLimits: Readonly<{ maxItems: number; maxDeadlineMs: number }>;
    outputLimits: Readonly<{ maxArtifactBytes: number }>;
    evidence: string;
  }): CapabilityRegistrationRecord {
    const existingRecordId = this.registrationRecordIds.get(input.capabilityId);
    if (existingRecordId) {
      const existing = this.traceService.getRecordById<CapabilityRegistrationRecord>(
        "capability_registration",
        existingRecordId
      );
      if (
        existing &&
        existing.capabilityId === input.capabilityId &&
        existing.providerId === input.providerId &&
        existing.providerVersion === input.providerVersion
      ) {
        return existing;
      }
    }

    const commandId = createCommandId("register_capability");
    const base = createM3Metadata({
      commandId,
      correlationId: input.correlationId,
      schemaVersion: M3_SCHEMA_VERSION
    });
    const withoutIntegrity: Omit<CapabilityRegistrationRecord, "integrityHash"> = {
      ...base,
      capabilityRegistrationId: createImmutableIdentifier("m3_capability_registration"),
      capabilityId: input.capabilityId,
      providerId: input.providerId,
      providerVersion: input.providerVersion,
      enabled: true,
      inputLimits: Object.freeze({ ...input.inputLimits }),
      outputLimits: Object.freeze({ ...input.outputLimits }),
      riskEffectClass: "local_non_live_effect",
      evidence: input.evidence,
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
      correlationId: input.correlationId,
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

    this.registrationRecordIds.set(input.capabilityId, record.capabilityRegistrationId);
    return this.traceService.getRecordById<CapabilityRegistrationRecord>(
      "capability_registration",
      event.commandResult?.recordId ?? record.capabilityRegistrationId
    ) as CapabilityRegistrationRecord;
  }
}
