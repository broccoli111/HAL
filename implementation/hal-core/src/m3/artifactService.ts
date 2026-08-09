import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { createCommandId, createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { M3TraceService, computeRecordIntegrityHash, createM3Metadata } from "./traceService.js";
import type { ArtifactRecord, ProviderSummaryResult } from "./types.js";
import { M3_SCHEMA_VERSION } from "./types.js";

export class ArtifactService {
  private readonly traceService: M3TraceService;
  private readonly stateDirectory: string;

  public constructor(traceService: M3TraceService, stateDirectory: string) {
    this.traceService = traceService;
    this.stateDirectory = path.resolve(stateDirectory);
  }

  public createArtifact(input: {
    correlationId: CorrelationId;
    capabilityRequestId: ImmutableIdentifier;
    executionAttemptId: ImmutableIdentifier;
    transactionId: ImmutableIdentifier;
    decisionId: ImmutableIdentifier;
    providerResult: ProviderSummaryResult;
  }): ArtifactRecord {
    const commandId = createCommandId("create_artifact");
    const base = createM3Metadata({
      commandId,
      correlationId: input.correlationId,
      schemaVersion: M3_SCHEMA_VERSION
    });
    const artifactId = createImmutableIdentifier("m3_artifact");
    const artifactDirectory = path.resolve(this.stateDirectory, "m3-artifacts");
    mkdirSync(artifactDirectory, { recursive: true });
    const artifactPath = path.resolve(artifactDirectory, `${artifactId}.json`);
    if (!artifactPath.startsWith(artifactDirectory + path.sep)) {
      throw new Error("Artifact path boundary violation.");
    }

    const artifactContent = Object.freeze({
      artifactId,
      capabilityRequestId: input.capabilityRequestId,
      executionAttemptId: input.executionAttemptId,
      transactionId: input.transactionId,
      decisionId: input.decisionId,
      correlationId: input.correlationId,
      providerId: input.providerResult.providerId,
      providerVersion: input.providerResult.providerVersion,
      fixtureManifestHash: input.providerResult.fixtureManifestHash,
      itemCount: input.providerResult.itemCount,
      ...(input.providerResult.deterministicInquiry
        ? { deterministicInquiry: input.providerResult.deterministicInquiry }
        : {}),
      consumedFiles: input.providerResult.consumedFiles,
      summary: input.providerResult.summary
    });
    const serialized = `${JSON.stringify(artifactContent, null, 2)}\n`;
    writeFileSync(artifactPath, serialized, "utf8");
    const artifactContentHash = createHash("sha256").update(serialized).digest("hex");

    const withoutIntegrity: Omit<ArtifactRecord, "integrityHash"> = {
      ...base,
      artifactId,
      capabilityRequestId: input.capabilityRequestId,
      executionAttemptId: input.executionAttemptId,
      transactionId: input.transactionId,
      decisionId: input.decisionId,
      providerId: input.providerResult.providerId,
      providerVersion: input.providerResult.providerVersion,
      artifactPath,
      fixtureManifestHash: input.providerResult.fixtureManifestHash,
      itemCount: input.providerResult.itemCount,
      artifactContentHash,
      status: "created"
    };
    const record = Object.freeze({
      ...withoutIntegrity,
      integrityHash: computeRecordIntegrityHash(withoutIntegrity)
    } satisfies ArtifactRecord);

    this.traceService.appendDomainEvent({
      eventType: "ArtifactCreated",
      owner: "ArtifactService",
      status: "applied",
      commandName: "CreateArtifact",
      commandId,
      correlationId: input.correlationId,
      payloadSummary: `artifactId=${record.artifactId}; itemCount=${record.itemCount}`,
      commandFingerprint: M3TraceService.fingerprintRequest(record),
      commandResult: {
        accepted: true,
        status: "applied",
        reason: "Artifact created.",
        eventType: "ArtifactCreated",
        recordKind: "artifact",
        recordId: record.artifactId
      },
      recordKind: "artifact",
      record
    });

    return record;
  }
}
