import path from "node:path";

import { createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { AuditService } from "../m2/auditService.js";
import { runM2DurableIntentDemo } from "../m2/orchestrator.js";
import { ArtifactService } from "./artifactService.js";
import { CapabilityRegistry } from "./capabilityRegistry.js";
import { ExecutionCoordinator } from "./executionCoordinator.js";
import { APPROVED_CORPUS_REFERENCE } from "./fixtureCorpus.js";
import { LocalSyntheticCorpusInspector } from "./localSyntheticCorpusInspector.js";
import { M3TraceService } from "./traceService.js";
import type {
  CapabilityRequestInput,
  ExecutionAttemptRecord,
  VerificationRecord
} from "./types.js";
import { M3_CAPABILITY_ID } from "./types.js";
import { VerificationService } from "./verificationService.js";

export type M3DemoResult = Readonly<{
  correlationId: CorrelationId;
  capabilityRequestId: ImmutableIdentifier;
  executionAttemptId: ImmutableIdentifier;
  artifactId: ImmutableIdentifier | undefined;
  verificationId: ImmutableIdentifier | undefined;
  verificationPassed: boolean;
  providerVersion: string;
  fixtureManifestHash: string;
  claimedEffect: "inspection_only" | "none";
}>;

export function runM3BoundedCapabilityDemo(input: {
  stateDirectory: string;
  fixtureRoot?: string;
  itemLimit?: number;
  deadlineMs?: number;
  capabilityRequestId?: ImmutableIdentifier;
  correlationId?: CorrelationId;
  cancellationRequested?: boolean;
}): M3DemoResult {
  const fixtureRoot = path.resolve(
    input.fixtureRoot ?? path.resolve(process.cwd(), "fixtures/synthetic-corpus")
  );
  const m2Result = runM2DurableIntentDemo({
    configuration: {
      environment: "development",
      safeMode: "restrictive",
      ownerId: "owner_hal_local_dev"
    },
    fixtureName: "allowed_inspection_request",
    stateDirectory: input.stateDirectory
  });
  const m2Audit = new AuditService(input.stateDirectory);
  const traceService = new M3TraceService(input.stateDirectory);
  const registry = new CapabilityRegistry(traceService);
  const provider = new LocalSyntheticCorpusInspector();
  const artifactService = new ArtifactService(traceService, input.stateDirectory);
  const verificationService = new VerificationService(traceService, fixtureRoot);
  const coordinator = new ExecutionCoordinator({
    traceService,
    m2AuditService: m2Audit,
    registry,
    provider,
    artifactService,
    verificationService,
    fixtureRoot
  });

  const request = Object.freeze({
    capabilityRequestId:
      input.capabilityRequestId ?? createImmutableIdentifier("m3_capability_request"),
    capabilityId: M3_CAPABILITY_ID,
    correlationId: m2Result.correlationId,
    decisionId: m2Result.decisionId as unknown as ImmutableIdentifier,
    transactionId: m2Result.transactionId as unknown as ImmutableIdentifier,
    intentId: m2Result.intentId as unknown as ImmutableIdentifier,
    planId: m2Result.planId as unknown as ImmutableIdentifier,
    corpusReference: APPROVED_CORPUS_REFERENCE,
    itemLimit: input.itemLimit ?? 3,
    deadlineMs: input.deadlineMs ?? 2_000,
    ...(typeof input.cancellationRequested === "boolean"
      ? { cancellationRequested: input.cancellationRequested }
      : {})
  } satisfies CapabilityRequestInput);
  const outcome = coordinator.submitCapabilityRequest(request);

  return Object.freeze({
    correlationId: request.correlationId,
    capabilityRequestId: request.capabilityRequestId,
    executionAttemptId: outcome.attempt.executionAttemptId,
    artifactId: outcome.attempt.artifactId,
    verificationId: outcome.attempt.verificationId,
    verificationPassed: outcome.verification?.verified === true,
    providerVersion: outcome.attempt.providerVersion,
    fixtureManifestHash: outcome.capabilityRequest.fixtureManifestHash,
    claimedEffect: outcome.claimedEffect
  });
}

export type ReconstructedM3Trace = Readonly<{
  correlationId: CorrelationId;
  capabilityRequestId: ImmutableIdentifier | undefined;
  executionAttemptId: ImmutableIdentifier | undefined;
  artifactId: ImmutableIdentifier | undefined;
  verificationId: ImmutableIdentifier | undefined;
  finalAttemptStatus: ExecutionAttemptRecord["status"] | undefined;
  verificationPassed: boolean | undefined;
  claimedEffect: "inspection_only" | "none";
}>;

export function reconstructM3Trace(
  stateDirectory: string,
  correlationId: CorrelationId
): ReconstructedM3Trace {
  const traceService = new M3TraceService(stateDirectory);
  const events = traceService.listEventsByCorrelationId(correlationId);
  let capabilityRequestId: ImmutableIdentifier | undefined;
  let executionAttemptId: ImmutableIdentifier | undefined;
  let artifactId: ImmutableIdentifier | undefined;
  let verificationId: ImmutableIdentifier | undefined;
  let finalAttemptStatus: ExecutionAttemptRecord["status"] | undefined;
  let verificationPassed: boolean | undefined;

  for (const event of events) {
    if (event.recordKind === "capability_request" && event.record) {
      capabilityRequestId = (event.record as { capabilityRequestId: ImmutableIdentifier })
        .capabilityRequestId;
    } else if (event.recordKind === "execution_attempt" && event.record) {
      const attempt = event.record as ExecutionAttemptRecord;
      executionAttemptId = attempt.executionAttemptId;
      finalAttemptStatus = attempt.status;
      artifactId = attempt.artifactId ?? artifactId;
      verificationId = attempt.verificationId ?? verificationId;
    } else if (event.recordKind === "verification" && event.record) {
      const verification = event.record as VerificationRecord;
      verificationId = verification.verificationId;
      verificationPassed = verification.verified;
    }
  }

  return Object.freeze({
    correlationId,
    capabilityRequestId,
    executionAttemptId,
    artifactId,
    verificationId,
    finalAttemptStatus,
    verificationPassed,
    claimedEffect: verificationPassed ? "inspection_only" : "none"
  });
}
