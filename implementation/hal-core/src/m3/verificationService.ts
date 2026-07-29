import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

import { createCommandId, createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { M3TraceService, computeRecordIntegrityHash, createM3Metadata } from "./traceService.js";
import type { ArtifactRecord, VerificationRecord } from "./types.js";
import { M3_PROVIDER_ID, M3_PROVIDER_VERSION, M3_SCHEMA_VERSION } from "./types.js";

type VerificationOutcome = Readonly<{ verified: boolean; reason: string; contentHash?: string }>;

export class VerificationService {
  private readonly traceService: M3TraceService;
  private readonly fixtureRoot: string;

  public constructor(traceService: M3TraceService, fixtureRoot: string) {
    this.traceService = traceService;
    this.fixtureRoot = path.resolve(fixtureRoot);
  }

  public verifyArtifact(input: {
    correlationId: CorrelationId;
    capabilityRequestId: ImmutableIdentifier;
    executionAttemptId: ImmutableIdentifier;
    transactionId: ImmutableIdentifier;
    decisionId: ImmutableIdentifier;
    expectedFixtureManifestHash: string;
    artifact: ArtifactRecord;
  }): VerificationRecord {
    const commandId = createCommandId("verify_artifact");
    const base = createM3Metadata({
      commandId,
      correlationId: input.correlationId,
      schemaVersion: M3_SCHEMA_VERSION
    });
    const verificationId = createImmutableIdentifier("m3_verification");
    const outcome = this.evaluateArtifact({
      artifact: input.artifact,
      expectedFixtureManifestHash: input.expectedFixtureManifestHash,
      correlationId: input.correlationId,
      capabilityRequestId: input.capabilityRequestId,
      executionAttemptId: input.executionAttemptId,
      transactionId: input.transactionId,
      decisionId: input.decisionId
    });
    const withoutIntegrity: Omit<VerificationRecord, "integrityHash"> = {
      ...base,
      verificationId,
      artifactId: input.artifact.artifactId,
      capabilityRequestId: input.capabilityRequestId,
      executionAttemptId: input.executionAttemptId,
      transactionId: input.transactionId,
      decisionId: input.decisionId,
      providerId: input.artifact.providerId,
      providerVersion: input.artifact.providerVersion,
      fixtureManifestHash: input.expectedFixtureManifestHash,
      artifactContentHash: outcome.contentHash ?? "",
      verified: outcome.verified,
      verificationReason: outcome.reason,
      status: outcome.verified ? "verified" : "rejected"
    };
    const record = Object.freeze({
      ...withoutIntegrity,
      integrityHash: computeRecordIntegrityHash(withoutIntegrity)
    } satisfies VerificationRecord);

    this.traceService.appendDomainEvent({
      eventType: "VerificationCompleted",
      owner: "VerificationService",
      status: outcome.verified ? "applied" : "denied",
      commandName: "VerifyArtifact",
      commandId,
      correlationId: input.correlationId,
      payloadSummary: `verificationId=${verificationId}; verified=${outcome.verified}`,
      commandFingerprint: M3TraceService.fingerprintRequest(record),
      commandResult: {
        accepted: outcome.verified,
        status: outcome.verified ? "applied" : "denied",
        reason: outcome.reason,
        eventType: "VerificationCompleted",
        recordKind: "verification",
        recordId: verificationId
      },
      recordKind: "verification",
      record
    });

    return record;
  }

  private evaluateArtifact(input: {
    artifact: ArtifactRecord;
    expectedFixtureManifestHash: string;
    correlationId: CorrelationId;
    capabilityRequestId: ImmutableIdentifier;
    executionAttemptId: ImmutableIdentifier;
    transactionId: ImmutableIdentifier;
    decisionId: ImmutableIdentifier;
  }): VerificationOutcome {
    const artifactPath = path.resolve(input.artifact.artifactPath);
    const expectedRoot = path.resolve(this.traceService.getStateDirectory(), "m3-artifacts");
    if (!artifactPath.startsWith(expectedRoot + path.sep)) {
      return Object.freeze({
        verified: false,
        reason: "Artifact path is outside state artifact directory."
      });
    }
    if (
      input.artifact.providerId !== M3_PROVIDER_ID ||
      input.artifact.providerVersion !== M3_PROVIDER_VERSION
    ) {
      return Object.freeze({ verified: false, reason: "Provider identity/version mismatch." });
    }
    if (!artifactPath.includes(path.resolve(this.traceService.getStateDirectory()))) {
      return Object.freeze({
        verified: false,
        reason: "Artifact path is not under explicit state directory."
      });
    }
    if (
      !this.fixtureRoot ||
      input.expectedFixtureManifestHash !== input.artifact.fixtureManifestHash
    ) {
      return Object.freeze({
        verified: false,
        reason: "Fixture manifest hash mismatch in artifact metadata."
      });
    }
    if (
      input.artifact.capabilityRequestId !== input.capabilityRequestId ||
      input.artifact.executionAttemptId !== input.executionAttemptId ||
      input.artifact.transactionId !== input.transactionId ||
      input.artifact.decisionId !== input.decisionId ||
      input.artifact.correlationId !== input.correlationId
    ) {
      return Object.freeze({ verified: false, reason: "Artifact linkage metadata mismatch." });
    }

    let parsed: unknown;
    let serialized: string;
    try {
      serialized = readFileSync(artifactPath, "utf8");
      parsed = JSON.parse(serialized);
    } catch (error) {
      return Object.freeze({
        verified: false,
        reason: `Artifact unreadable or invalid JSON: ${(error as Error).message}`
      });
    }

    const contentHash = createHash("sha256").update(serialized).digest("hex");
    if (contentHash !== input.artifact.artifactContentHash) {
      return Object.freeze({
        verified: false,
        reason: "Artifact content hash mismatch.",
        contentHash
      });
    }

    const candidate = parsed as Partial<{
      fixtureManifestHash: string;
      itemCount: number;
      providerId: string;
      providerVersion: string;
      summary: { totalItems: number };
    }>;
    if (candidate.fixtureManifestHash !== input.expectedFixtureManifestHash) {
      return Object.freeze({
        verified: false,
        reason: "Artifact payload fixture manifest hash mismatch.",
        contentHash
      });
    }
    if (
      candidate.providerId !== M3_PROVIDER_ID ||
      candidate.providerVersion !== M3_PROVIDER_VERSION
    ) {
      return Object.freeze({
        verified: false,
        reason: "Artifact payload provider mismatch.",
        contentHash
      });
    }
    if (
      typeof candidate.itemCount !== "number" ||
      !candidate.summary ||
      typeof candidate.summary.totalItems !== "number" ||
      candidate.summary.totalItems !== candidate.itemCount
    ) {
      return Object.freeze({
        verified: false,
        reason: "Artifact payload schema or item count mismatch.",
        contentHash
      });
    }

    return Object.freeze({ verified: true, reason: "Artifact verified.", contentHash });
  }
}
