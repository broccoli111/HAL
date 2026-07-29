import { createCommandId, createImmutableIdentifier } from "../shared/id.js";
import type { ImmutableIdentifier } from "../shared/types.js";
import { AuditService } from "../m2/auditService.js";
import type { DecisionRecord, IntentRecord, PlanRecord, TransactionRecord } from "../m2/types.js";
import { ArtifactService } from "./artifactService.js";
import { CapabilityRegistry } from "./capabilityRegistry.js";
import { resolveApprovedSyntheticCorpus } from "./fixtureCorpus.js";
import { LocalSyntheticCorpusInspector } from "./localSyntheticCorpusInspector.js";
import { M3TraceService, computeRecordIntegrityHash, createM3Metadata } from "./traceService.js";
import type {
  CapabilityRequestInput,
  CapabilityRequestRecord,
  ExecutionAttemptRecord,
  ExecutionAttemptStatus,
  VerificationRecord
} from "./types.js";
import {
  M3_CAPABILITY_ID,
  M3_PROVIDER_ID,
  M3_PROVIDER_VERSION,
  M3_SCHEMA_VERSION
} from "./types.js";
import { VerificationService } from "./verificationService.js";

type AttemptOutcome = Readonly<{
  capabilityRequest: CapabilityRequestRecord;
  attempt: ExecutionAttemptRecord;
  verification: VerificationRecord | undefined;
  claimedEffect: "inspection_only" | "none";
}>;

type AdmissionRejectionCategory =
  | "malformed_request_field"
  | "missing_m2_references"
  | "m2_correlation_mismatch"
  | "m2_linkage_mismatch"
  | "m2_decision_not_allow"
  | "m2_transaction_not_eligible"
  | "unknown_capability_or_provider"
  | "invalid_deadline"
  | "invalid_item_limit"
  | "invalid_corpus_input"
  | "missing_corpus_fixture"
  | "secret_like_corpus_content";

export class ExecutionCoordinator {
  private readonly traceService: M3TraceService;
  private readonly m2AuditService: AuditService;
  private readonly registry: CapabilityRegistry;
  private readonly provider: LocalSyntheticCorpusInspector;
  private readonly artifactService: ArtifactService;
  private readonly verificationService: VerificationService;
  private readonly fixtureRoot: string;

  public constructor(input: {
    traceService: M3TraceService;
    m2AuditService: AuditService;
    registry: CapabilityRegistry;
    provider: LocalSyntheticCorpusInspector;
    artifactService: ArtifactService;
    verificationService: VerificationService;
    fixtureRoot: string;
  }) {
    this.traceService = input.traceService;
    this.m2AuditService = input.m2AuditService;
    this.registry = input.registry;
    this.provider = input.provider;
    this.artifactService = input.artifactService;
    this.verificationService = input.verificationService;
    this.fixtureRoot = input.fixtureRoot;
  }

  public submitCapabilityRequest(request: CapabilityRequestInput): AttemptOutcome {
    const commandId = createCommandId("submit_capability_request");
    const requestFingerprint = M3TraceService.fingerprintRequest(request);
    const malformedReason = this.validateRequestShape(request);
    if (malformedReason) {
      this.rejectAdmissionAndThrow({
        request,
        commandId,
        requestFingerprint,
        category: "malformed_request_field",
        reason: malformedReason
      });
    }

    const claim = this.traceService.claimCapabilityRequest({
      capabilityRequestId: request.capabilityRequestId,
      correlationId: request.correlationId,
      commandFingerprint: requestFingerprint,
      payloadSummary: `requestId=${request.capabilityRequestId}; capability=${request.capabilityId}`
    });
    if (claim.kind === "duplicate" && claim.existing.result.recordId) {
      const existingRequest = this.traceService.getRecordById<CapabilityRequestRecord>(
        "capability_request",
        claim.existing.result.recordId
      );
      if (!existingRequest) {
        throw new Error("Duplicate request matched index but record is missing.");
      }
      const existingAttempt = this.findLatestAttemptByRequestId(
        existingRequest.capabilityRequestId
      );
      if (!existingAttempt) {
        throw new Error("Duplicate request matched but no attempt exists.");
      }
      const existingVerification = existingAttempt.verificationId
        ? this.traceService.getRecordById<VerificationRecord>(
            "verification",
            existingAttempt.verificationId
          )
        : undefined;
      return Object.freeze({
        capabilityRequest: existingRequest,
        attempt: existingAttempt,
        verification: existingVerification,
        claimedEffect: existingVerification?.verified ? "inspection_only" : "none"
      });
    }
    if (claim.kind === "conflict") {
      throw new Error("Capability request ID reuse conflict denied.");
    }

    const registration = this.registry.ensureRegistered(request.correlationId);

    if (
      request.capabilityId !== M3_CAPABILITY_ID ||
      registration.providerId !== M3_PROVIDER_ID ||
      registration.providerVersion !== M3_PROVIDER_VERSION
    ) {
      this.rejectAdmissionAndThrow({
        request,
        commandId,
        requestFingerprint,
        category: "unknown_capability_or_provider",
        reason: "Capability request denied due to capability/provider mismatch."
      });
    }

    if (
      !Number.isInteger(request.deadlineMs) ||
      request.deadlineMs <= 0 ||
      request.deadlineMs > registration.inputLimits.maxDeadlineMs
    ) {
      this.rejectAdmissionAndThrow({
        request,
        commandId,
        requestFingerprint,
        category: "invalid_deadline",
        reason: "Request deadline outside allowed bounds."
      });
    }
    if (
      !Number.isInteger(request.itemLimit) ||
      request.itemLimit <= 0 ||
      request.itemLimit > registration.inputLimits.maxItems
    ) {
      this.rejectAdmissionAndThrow({
        request,
        commandId,
        requestFingerprint,
        category: "invalid_item_limit",
        reason: "Request item limit outside allowed bounds."
      });
    }

    const m2Validation = this.validateM2References(request);
    if (!m2Validation.ok) {
      this.rejectAdmissionAndThrow({
        request,
        commandId,
        requestFingerprint,
        category: m2Validation.category,
        reason: m2Validation.reason
      });
    }
    const references = m2Validation.references;

    const corpusResolution = this.resolveCorpusForAdmission(request);
    if (!corpusResolution.ok) {
      this.rejectAdmissionAndThrow({
        request,
        commandId,
        requestFingerprint,
        category: corpusResolution.category,
        reason: corpusResolution.reason
      });
    }
    const resolvedCorpus = corpusResolution.resolvedCorpus;

    const requestBase = createM3Metadata({
      commandId,
      correlationId: request.correlationId,
      schemaVersion: M3_SCHEMA_VERSION
    });
    const requestWithoutIntegrity: Omit<CapabilityRequestRecord, "integrityHash"> = {
      ...requestBase,
      capabilityRequestId: request.capabilityRequestId,
      capabilityId: M3_CAPABILITY_ID,
      providerId: M3_PROVIDER_ID,
      providerVersion: M3_PROVIDER_VERSION,
      decisionId: request.decisionId,
      transactionId: request.transactionId,
      intentId: request.intentId,
      planId: request.planId,
      corpusReference: resolvedCorpus.corpusReference,
      fixtureManifestHash: resolvedCorpus.manifestHash,
      itemLimit: request.itemLimit,
      deadlineMs: request.deadlineMs,
      status: "admitted"
    };
    const requestRecord = Object.freeze({
      ...requestWithoutIntegrity,
      integrityHash: computeRecordIntegrityHash(requestWithoutIntegrity)
    } satisfies CapabilityRequestRecord);
    this.traceService.appendDomainEvent({
      eventType: "CapabilityRequestAdmitted",
      owner: "ExecutionCoordinator",
      status: "applied",
      commandName: "SubmitCapabilityRequest",
      commandId,
      correlationId: request.correlationId,
      payloadSummary: `requestId=${requestRecord.capabilityRequestId}; fixtureHash=${requestRecord.fixtureManifestHash}`,
      commandFingerprint: requestFingerprint,
      commandResult: {
        accepted: true,
        status: "applied",
        reason: "Capability request admitted.",
        eventType: "CapabilityRequestAdmitted",
        recordKind: "capability_request",
        recordId: requestRecord.capabilityRequestId
      },
      recordKind: "capability_request",
      record: requestRecord
    });

    const createdAttempt = this.recordAttempt({
      request: requestRecord,
      status: "created",
      statusReason: "Execution attempt created.",
      cancellationRequested: request.cancellationRequested === true
    });
    if (request.cancellationRequested === true) {
      const cancelled = this.recordAttempt({
        request: requestRecord,
        attemptId: createdAttempt.executionAttemptId,
        status: "cancelled",
        statusReason: "Execution cancelled before provider invocation.",
        cancellationRequested: true
      });
      return Object.freeze({
        capabilityRequest: requestRecord,
        attempt: cancelled,
        verification: undefined,
        claimedEffect: "none"
      });
    }

    const estimatedMs = resolvedCorpus.files.length * 25;
    if (estimatedMs > request.deadlineMs) {
      const timedOut = this.recordAttempt({
        request: requestRecord,
        attemptId: createdAttempt.executionAttemptId,
        status: "timed_out",
        statusReason: "Execution timed out before provider invocation.",
        cancellationRequested: false
      });
      return Object.freeze({
        capabilityRequest: requestRecord,
        attempt: timedOut,
        verification: undefined,
        claimedEffect: "none"
      });
    }

    this.recordAttempt({
      request: requestRecord,
      attemptId: createdAttempt.executionAttemptId,
      status: "running",
      statusReason: "Execution running.",
      cancellationRequested: false
    });
    const providerResult = this.provider.inspect({
      fixtureRoot: resolvedCorpus.fixtureRoot,
      files: resolvedCorpus.files,
      fixtureManifestHash: resolvedCorpus.manifestHash
    });
    const artifact = this.artifactService.createArtifact({
      correlationId: request.correlationId,
      capabilityRequestId: requestRecord.capabilityRequestId,
      executionAttemptId: createdAttempt.executionAttemptId,
      decisionId: references.decision.decisionId,
      transactionId: references.transaction.transactionId,
      providerResult
    });
    const verification = this.verificationService.verifyArtifact({
      correlationId: request.correlationId,
      capabilityRequestId: requestRecord.capabilityRequestId,
      executionAttemptId: createdAttempt.executionAttemptId,
      transactionId: references.transaction.transactionId,
      decisionId: references.decision.decisionId,
      expectedFixtureManifestHash: resolvedCorpus.manifestHash,
      artifact
    });

    const finalAttempt = this.recordAttempt({
      request: requestRecord,
      attemptId: createdAttempt.executionAttemptId,
      status: verification.verified ? "succeeded" : "failed",
      statusReason: verification.verified
        ? "Execution succeeded and verified."
        : verification.verificationReason,
      cancellationRequested: false,
      artifactId: artifact.artifactId,
      verificationId: verification.verificationId
    });

    return Object.freeze({
      capabilityRequest: requestRecord,
      attempt: finalAttempt,
      verification,
      claimedEffect: verification.verified ? "inspection_only" : "none"
    });
  }

  public getProviderInvocationCount(): number {
    return this.provider.getInvocationCount();
  }

  private validateM2References(request: CapabilityRequestInput):
    | Readonly<{
        ok: true;
        references: Readonly<{
          intent: IntentRecord;
          plan: PlanRecord;
          decision: DecisionRecord;
          transaction: TransactionRecord;
        }>;
      }>
    | Readonly<{
        ok: false;
        category: AdmissionRejectionCategory;
        reason: string;
      }> {
    const intent = this.m2AuditService.getRecordById<IntentRecord>("intent", request.intentId);
    const plan = this.m2AuditService.getRecordById<PlanRecord>("plan", request.planId);
    const decision = this.m2AuditService.getRecordById<DecisionRecord>(
      "decision",
      request.decisionId
    );
    const transaction = this.m2AuditService.getRecordById<TransactionRecord>(
      "transaction",
      request.transactionId
    );
    if (!intent || !plan || !decision || !transaction) {
      return Object.freeze({
        ok: false,
        category: "missing_m2_references",
        reason: "M3 admission denied: linked M2 references are missing."
      });
    }
    if (
      intent.correlationId !== request.correlationId ||
      plan.correlationId !== request.correlationId ||
      decision.correlationId !== request.correlationId ||
      transaction.correlationId !== request.correlationId
    ) {
      return Object.freeze({
        ok: false,
        category: "m2_correlation_mismatch",
        reason: "M3 admission denied: linked M2 correlation mismatch."
      });
    }
    if (
      plan.intentId !== intent.intentId ||
      decision.intentId !== intent.intentId ||
      decision.planId !== plan.planId ||
      transaction.intentId !== intent.intentId ||
      transaction.planId !== plan.planId ||
      transaction.decisionId !== decision.decisionId
    ) {
      return Object.freeze({
        ok: false,
        category: "m2_linkage_mismatch",
        reason: "M3 admission denied: M2 linkage mismatch."
      });
    }
    if (decision.disposition !== "allow") {
      return Object.freeze({
        ok: false,
        category: "m2_decision_not_allow",
        reason: "M3 admission denied: M2 decision must be allow."
      });
    }
    if (transaction.status !== "completed_without_effect") {
      return Object.freeze({
        ok: false,
        category: "m2_transaction_not_eligible",
        reason: "M3 admission denied: M2 transaction status is not executable."
      });
    }
    return Object.freeze({
      ok: true,
      references: Object.freeze({ intent, plan, decision, transaction })
    });
  }

  private resolveCorpusForAdmission(request: CapabilityRequestInput):
    | Readonly<{
        ok: true;
        resolvedCorpus: ReturnType<typeof resolveApprovedSyntheticCorpus>;
      }>
    | Readonly<{
        ok: false;
        category: AdmissionRejectionCategory;
        reason: string;
      }> {
    try {
      const resolvedCorpus = resolveApprovedSyntheticCorpus({
        fixtureRoot: this.fixtureRoot,
        corpusReference: request.corpusReference,
        itemLimit: request.itemLimit
      });
      return Object.freeze({ ok: true, resolvedCorpus });
    } catch (error) {
      const message = (error as Error).message;
      if (message.includes("No approved fixture files found")) {
        return Object.freeze({
          ok: false,
          category: "missing_corpus_fixture",
          reason: message
        });
      }
      if (message.includes("secret-like pattern")) {
        return Object.freeze({
          ok: false,
          category: "secret_like_corpus_content",
          reason: message
        });
      }
      return Object.freeze({
        ok: false,
        category: "invalid_corpus_input",
        reason: message
      });
    }
  }

  private validateRequestShape(request: CapabilityRequestInput): string | undefined {
    if (typeof request !== "object" || !request) {
      return "Capability request payload is not an object.";
    }
    if (typeof request.capabilityRequestId !== "string" || !request.capabilityRequestId.trim()) {
      return "capabilityRequestId is required.";
    }
    if (typeof request.correlationId !== "string" || !request.correlationId.trim()) {
      return "correlationId is required.";
    }
    if (typeof request.capabilityId !== "string" || !request.capabilityId.trim()) {
      return "capabilityId is required.";
    }
    if (typeof request.corpusReference !== "string" || !request.corpusReference.trim()) {
      return "corpusReference is required.";
    }
    if (
      typeof request.decisionId !== "string" ||
      typeof request.transactionId !== "string" ||
      typeof request.intentId !== "string" ||
      typeof request.planId !== "string"
    ) {
      return "Linked M2 IDs must be present as strings.";
    }
    return undefined;
  }

  private rejectAdmissionAndThrow(input: {
    request: CapabilityRequestInput;
    commandId: ReturnType<typeof createCommandId>;
    requestFingerprint: string;
    category: AdmissionRejectionCategory;
    reason: string;
  }): never {
    this.traceService.appendDomainEvent({
      eventType: "CapabilityRequestRejected",
      owner: "ExecutionCoordinator",
      status: "denied",
      commandName: "SubmitCapabilityRequest",
      commandId: input.commandId,
      correlationId: input.request.correlationId,
      payloadSummary: this.buildRejectedPayloadSummary(input.request, input.category),
      commandFingerprint: input.requestFingerprint,
      commandResult: {
        accepted: false,
        status: "denied",
        reason: `${input.category}: ${input.reason}`,
        eventType: "CapabilityRequestRejected"
      }
    });
    throw new Error(input.reason);
  }

  private buildRejectedPayloadSummary(
    request: CapabilityRequestInput,
    category: AdmissionRejectionCategory
  ): string {
    const safe = (value: unknown): string => {
      if (typeof value === "string") {
        return value.replace(/\s+/g, " ").trim().slice(0, 64);
      }
      if (typeof value === "number" && Number.isFinite(value)) {
        return String(value);
      }
      return "invalid";
    };
    return [
      `category=${category}`,
      `requestId=${safe(request.capabilityRequestId)}`,
      `capability=${safe(request.capabilityId)}`,
      `correlationId=${safe(request.correlationId)}`,
      `corpusRef=${safe(request.corpusReference)}`,
      `itemLimit=${safe(request.itemLimit)}`,
      `deadlineMs=${safe(request.deadlineMs)}`
    ].join("; ");
  }

  private recordAttempt(input: {
    request: CapabilityRequestRecord;
    status: ExecutionAttemptStatus;
    statusReason: string;
    cancellationRequested: boolean;
    attemptId?: ImmutableIdentifier;
    artifactId?: ImmutableIdentifier;
    verificationId?: ImmutableIdentifier;
  }): ExecutionAttemptRecord {
    const commandId = createCommandId("start_execution_attempt");
    const base = createM3Metadata({
      commandId,
      correlationId: input.request.correlationId,
      schemaVersion: M3_SCHEMA_VERSION
    });
    const executionAttemptId = input.attemptId ?? createImmutableIdentifier("m3_execution_attempt");
    const withoutIntegrity: Omit<ExecutionAttemptRecord, "integrityHash"> = {
      ...base,
      executionAttemptId,
      capabilityRequestId: input.request.capabilityRequestId,
      providerId: M3_PROVIDER_ID,
      providerVersion: M3_PROVIDER_VERSION,
      status: input.status,
      deadlineMs: input.request.deadlineMs,
      cancellationRequested: input.cancellationRequested,
      statusReason: input.statusReason,
      ...(input.artifactId ? { artifactId: input.artifactId } : {}),
      ...(input.verificationId ? { verificationId: input.verificationId } : {})
    };
    const record = Object.freeze({
      ...withoutIntegrity,
      integrityHash: computeRecordIntegrityHash(withoutIntegrity)
    } satisfies ExecutionAttemptRecord);

    const eventType = toEventType(input.status);
    this.traceService.appendDomainEvent({
      eventType,
      owner: "ExecutionCoordinator",
      status:
        input.status === "failed" || input.status === "cancelled" || input.status === "timed_out"
          ? "denied"
          : "applied",
      commandName: "StartExecutionAttempt",
      commandId,
      correlationId: input.request.correlationId,
      payloadSummary: `attemptId=${record.executionAttemptId}; status=${record.status}`,
      commandFingerprint: M3TraceService.fingerprintRequest(record),
      commandResult: {
        accepted: input.status === "succeeded",
        status:
          input.status === "failed" || input.status === "cancelled" || input.status === "timed_out"
            ? "denied"
            : "applied",
        reason: input.statusReason,
        eventType,
        recordKind: "execution_attempt",
        recordId: record.executionAttemptId
      },
      recordKind: "execution_attempt",
      record
    });
    return record;
  }

  private findLatestAttemptByRequestId(
    capabilityRequestId: ImmutableIdentifier
  ): ExecutionAttemptRecord | undefined {
    const attempts = this.traceService
      .listAllEvents()
      .filter((event) => event.recordKind === "execution_attempt" && event.record)
      .map((event) => event.record as ExecutionAttemptRecord)
      .filter((attempt) => attempt.capabilityRequestId === capabilityRequestId);
    return attempts.at(-1);
  }
}

function toEventType(status: ExecutionAttemptStatus) {
  if (status === "created") {
    return "ExecutionAttemptCreated" as const;
  }
  if (status === "running") {
    return "ExecutionAttemptRunning" as const;
  }
  if (status === "succeeded") {
    return "ExecutionAttemptSucceeded" as const;
  }
  if (status === "failed") {
    return "ExecutionAttemptFailed" as const;
  }
  if (status === "cancelled") {
    return "ExecutionAttemptCancelled" as const;
  }
  return "ExecutionAttemptTimedOut" as const;
}
