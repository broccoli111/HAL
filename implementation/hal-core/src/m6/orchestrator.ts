import { createHash } from "node:crypto";
import path from "node:path";

import { ArtifactService } from "../m3/artifactService.js";
import { CapabilityRegistry } from "../m3/capabilityRegistry.js";
import { ExecutionCoordinator } from "../m3/executionCoordinator.js";
import { APPROVED_CORPUS_REFERENCE } from "../m3/fixtureCorpus.js";
import { M3TraceService } from "../m3/traceService.js";
import type { CapabilityRequestRecord, ProviderSummaryResult } from "../m3/types.js";
import { M6_M3_CAPABILITY_ID, M6_M3_PROVIDER_ID } from "../m3/types.js";
import { VerificationService } from "../m3/verificationService.js";
import { AuditService } from "../m2/auditService.js";
import type { M6AdmissionMode, M6M2Context } from "./m2Linkage.js";
import { runM2ForM6Inquiry } from "./m2Linkage.js";
import { OutcomeAttestationService } from "../m4/outcomeAttestationService.js";
import { ExplanationService } from "../m4/explanationService.js";
import { RecoveryCoordinator } from "../m4/recoveryCoordinator.js";
import type { FinalOutcomeStatus } from "../m4/types.js";
import { M4TraceService } from "../m4/traceService.js";
import { createImmutableIdentifier } from "../shared/id.js";
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";
import { loadApprovedSyntheticCorpus, resolveApprovedM6CorpusRoot } from "./corpus.js";
import { LocalDeterministicInquiryProvider } from "./deterministicInquiryProvider.js";
import { M6EvidenceJournal, computeM6IntegrityHash } from "./evidenceJournal.js";
import { assessQuestionText } from "./inputPolicy.js";
import { renderM6Response } from "./response.js";
import {
  M6_CAPABILITY_ID,
  M6_CORPUS_INDEX_VERSION,
  M6_MATCHER_VERSION,
  M6_PROVIDER_VERSION,
  M6_SCHEMA_VERSION,
  M6_TOKENIZER_VERSION,
  type M6EvidenceRecord,
  type M6MatchOutcome,
  type M6SelectedDocument,
  type M6SelectedSection
} from "./types.js";

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export type M6InquiryResult = Readonly<{
  requestId: ImmutableIdentifier;
  correlationId: CorrelationId;
  disposition: "completed_without_effect" | "blocked";
  result: "matched" | "no_match" | "denied" | "blocked";
  renderedResponse: string;
  attestationStatus:
    | "achieved_without_effect"
    | "blocked"
    | "failed_no_effect"
    | "cancelled_no_effect"
    | "timed_out_no_effect"
    | "verification_rejected_no_effect"
    | "incomplete_evidence_no_effect";
  attestationClaimedEffect: "none" | "inspection_only";
  selectedSectionIds: readonly string[];
  selectedDocumentIds: readonly string[];
  corpusManifestHashSha256: string;
  questionHashSha256: string;
  inputClassification: string;
  replayed: boolean;
}>;

export function runM6Inquiry(input: {
  stateDirectory: string;
  questionText: string;
  requestId?: string;
  admissionMode?: M6AdmissionMode;
}): M6InquiryResult {
  const stateDirectory = path.resolve(input.stateDirectory);
  const requestedAdmissionMode = input.admissionMode ?? "allow";
  const requestId = (
    input.requestId?.trim() ? input.requestId.trim() : createImmutableIdentifier("m6_request")
  ) as ImmutableIdentifier;
  const m6Journal = new M6EvidenceJournal(stateDirectory);
  const assessment = assessQuestionText(input.questionText);
  const inputClassification =
    assessment.disposition === "denied"
      ? (assessment.code ?? "REJ_EMPTY_OR_WHITESPACE")
      : "ACCEPTED";

  const existingEvidence = getLatestEvidenceByRequestId(m6Journal, requestId);
  if (existingEvidence) {
    const existingLinkage = extractM2Linkage(existingEvidence);
    const replayFingerprint = computeRequestFingerprint({
      requestId,
      requestedAdmissionMode,
      questionNormalizedHashSha256: assessment.questionNormalizedHashSha256,
      m2Linkage: existingLinkage
    });
    if (replayFingerprint !== existingEvidence.requestFingerprintSha256) {
      const conflictM2 = runM2ForM6Inquiry({
        stateDirectory,
        admissionMode: "deny"
      });
      const conflictFingerprint = computeRequestFingerprint({
        requestId,
        requestedAdmissionMode,
        questionNormalizedHashSha256: assessment.questionNormalizedHashSha256,
        m2Linkage: conflictM2
      });
      const conflictResult = appendEvidenceRecord({
        journal: m6Journal,
        requestId,
        requestFingerprintSha256: conflictFingerprint,
        requestedAdmissionMode,
        m2Linkage: conflictM2,
        correlationId: conflictM2.correlationId,
        assessment,
        inputClassification,
        disposition: "blocked",
        result: "blocked",
        renderedResponse: "result=blocked\nexternalEffect=none\nreason=request_id_conflict",
        corpusManifestHashSha256: sha256("m6-no-corpus"),
        selectedDocumentIds: Object.freeze([]),
        selectedSectionIds: Object.freeze([]),
        noMatch: false
      });
      const attested = attest(stateDirectory, conflictM2.correlationId, requestId);
      return Object.freeze({
        ...conflictResult,
        attestationStatus: normalizeAttestationStatus(attested.attestation.finalOutcomeStatus),
        attestationClaimedEffect: attested.attestation.claimedEffect,
        replayed: false
      });
    }

    if (existingEvidence.disposition === "completed_without_effect") {
      const m3Request = new M3TraceService(stateDirectory).getRecordById<CapabilityRequestRecord>(
        "capability_request",
        requestId
      );
      if (!m3Request) {
        throw new Error("Replay failed: governed M3 request record missing.");
      }
      const replayOutcome = runM6ThroughM3({
        stateDirectory,
        corpusRoot: resolveApprovedM6CorpusRoot(),
        assessment,
        requestedAdmissionMode,
        requestId,
        m2: {
          correlationId: m3Request.correlationId,
          intentId: m3Request.intentId,
          planId: m3Request.planId,
          decisionId: m3Request.decisionId,
          transactionId: m3Request.transactionId,
          decisionDisposition: "allow",
          transactionStatus: "completed_without_effect",
          claimedEffect: "none",
          stateDirectory
        }
      });
      return Object.freeze({
        requestId,
        correlationId: replayOutcome.correlationId,
        disposition: "completed_without_effect",
        result: replayOutcome.result,
        renderedResponse: replayOutcome.renderedResponse,
        attestationStatus: normalizeAttestationStatus(
          replayOutcome.attestationStatus ?? "achieved_without_effect"
        ),
        attestationClaimedEffect: replayOutcome.attestationClaimedEffect ?? "none",
        selectedSectionIds: replayOutcome.selectedSectionIds,
        selectedDocumentIds: replayOutcome.selectedDocumentIds,
        corpusManifestHashSha256: replayOutcome.corpusManifestHashSha256,
        questionHashSha256: replayOutcome.questionHashSha256,
        inputClassification,
        replayed: true
      });
    }
  }

  const deniedByInput = assessment.disposition === "denied";
  const resolvedAdmission = deniedByInput ? "deny" : requestedAdmissionMode;
  const m2 = runM2ForM6Inquiry({ stateDirectory, admissionMode: resolvedAdmission });
  const requestFingerprintSha256 = computeRequestFingerprint({
    requestId,
    requestedAdmissionMode,
    questionNormalizedHashSha256: assessment.questionNormalizedHashSha256,
    m2Linkage: m2
  });
  if (deniedByInput) {
    const deniedResult = appendEvidenceRecord({
      journal: m6Journal,
      requestId,
      requestFingerprintSha256,
      requestedAdmissionMode,
      m2Linkage: m2,
      correlationId: m2.correlationId,
      assessment,
      inputClassification,
      disposition: "blocked",
      result: "denied",
      renderedResponse: `result=denied\nexternalEffect=none\nreasonCode=${assessment.code ?? "REJ_UNKNOWN"}`,
      corpusManifestHashSha256: sha256("m6-no-corpus"),
      selectedDocumentIds: Object.freeze([]),
      selectedSectionIds: Object.freeze([]),
      noMatch: false
    });
    const attested = attest(stateDirectory, m2.correlationId, requestId);
    return Object.freeze({
      ...deniedResult,
      attestationStatus: normalizeAttestationStatus(attested.attestation.finalOutcomeStatus),
      attestationClaimedEffect: attested.attestation.claimedEffect,
      replayed: false
    });
  }
  if (m2.decisionDisposition !== "allow") {
    const blockedResult = appendEvidenceRecord({
      journal: m6Journal,
      requestId,
      requestFingerprintSha256,
      requestedAdmissionMode,
      m2Linkage: m2,
      correlationId: m2.correlationId,
      assessment,
      inputClassification,
      disposition: "blocked",
      result: "blocked",
      renderedResponse: `result=blocked\nexternalEffect=none\nreason=m2_${m2.decisionDisposition}`,
      corpusManifestHashSha256: sha256("m6-no-corpus"),
      selectedDocumentIds: Object.freeze([]),
      selectedSectionIds: Object.freeze([]),
      noMatch: false
    });
    const attested = attest(stateDirectory, m2.correlationId, requestId);
    return Object.freeze({
      ...blockedResult,
      attestationStatus: normalizeAttestationStatus(attested.attestation.finalOutcomeStatus),
      attestationClaimedEffect: attested.attestation.claimedEffect,
      replayed: false
    });
  }
  const executed = runM6ThroughM3({
    stateDirectory,
    corpusRoot: resolveApprovedM6CorpusRoot(),
    assessment,
    requestedAdmissionMode,
    requestId,
    m2
  });
  const completed = appendEvidenceRecord({
    journal: m6Journal,
    requestId,
    requestFingerprintSha256,
    requestedAdmissionMode,
    m2Linkage: m2,
    correlationId: executed.correlationId,
    assessment,
    inputClassification,
    disposition: "completed_without_effect",
    result: executed.result,
    renderedResponse: executed.renderedResponse,
    corpusManifestHashSha256: executed.corpusManifestHashSha256,
    selectedDocumentIds: executed.selectedDocumentIds,
    selectedSectionIds: executed.selectedSectionIds,
    noMatch: executed.result === "no_match"
  });
  const attested = attest(stateDirectory, executed.correlationId, requestId);
  return Object.freeze({
    ...completed,
    attestationStatus: normalizeAttestationStatus(attested.attestation.finalOutcomeStatus),
    attestationClaimedEffect: attested.attestation.claimedEffect,
    replayed: false
  });
}

export type ReconstructedM6Trace = Readonly<{
  correlationId: CorrelationId;
  evidenceCount: number;
  latestDisposition: "completed_without_effect" | "blocked" | "unavailable";
  latestNoMatch: boolean | "unavailable";
}>;

type M6ThroughM3Outcome = Readonly<{
  correlationId: CorrelationId;
  attestationStatus?: FinalOutcomeStatus;
  attestationClaimedEffect?: "none" | "inspection_only";
  result: "matched" | "no_match";
  renderedResponse: string;
  selectedSectionIds: readonly string[];
  selectedDocumentIds: readonly string[];
  corpusManifestHashSha256: string;
  questionHashSha256: string;
}>;

export function reconstructM6Trace(
  stateDirectory: string,
  correlationId: CorrelationId
): ReconstructedM6Trace {
  const journal = new M6EvidenceJournal(stateDirectory);
  const events = journal
    .listAll()
    .filter((event) => event.correlationId === correlationId)
    .map((event) => event.record);
  const latest = events.at(-1);
  return Object.freeze({
    correlationId,
    evidenceCount: events.length,
    latestDisposition: latest?.disposition ?? "unavailable",
    latestNoMatch: typeof latest?.noMatch === "boolean" ? latest.noMatch : "unavailable"
  });
}

function runM6ThroughM3(input: {
  stateDirectory: string;
  corpusRoot: string;
  assessment: ReturnType<typeof assessQuestionText>;
  requestedAdmissionMode: M6AdmissionMode;
  requestId: ImmutableIdentifier;
  m2: M6M2Context;
}): M6ThroughM3Outcome {
  const m3Trace = new M3TraceService(input.stateDirectory);
  const registry = new CapabilityRegistry(m3Trace);
  registry.ensureRegisteredCapability({
    correlationId: input.m2.correlationId,
    capabilityId: M6_M3_CAPABILITY_ID,
    providerId: M6_M3_PROVIDER_ID,
    providerVersion: M6_PROVIDER_VERSION,
    inputLimits: { maxItems: 20, maxDeadlineMs: 10_000 },
    outputLimits: { maxArtifactBytes: 64_000 },
    evidence: "corpusReference=default_synthetic_corpus_v1; deterministic synthetic inquiry"
  });
  const coordinator = new ExecutionCoordinator({
    traceService: m3Trace,
    m2AuditService: new AuditService(input.stateDirectory),
    registry,
    provider: new LocalDeterministicInquiryProvider(),
    artifactService: new ArtifactService(m3Trace, input.stateDirectory),
    verificationService: new VerificationService(m3Trace, input.corpusRoot),
    fixtureRoot: input.corpusRoot
  });
  const outcome = coordinator.submitCapabilityRequest({
    capabilityRequestId: input.requestId,
    capabilityId: M6_M3_CAPABILITY_ID,
    correlationId: input.m2.correlationId,
    decisionId: input.m2.decisionId,
    transactionId: input.m2.transactionId,
    intentId: input.m2.intentId,
    planId: input.m2.planId,
    corpusReference: APPROVED_CORPUS_REFERENCE,
    itemLimit: 20,
    deadlineMs: 5_000,
    providerInput: {
      questionNormalizedHashSha256: input.assessment.questionNormalizedHashSha256,
      questionTokens: input.assessment.questionTokens,
      requestedAdmissionMode: input.requestedAdmissionMode,
      m2LinkageIdentity: {
        intentId: input.m2.intentId,
        planId: input.m2.planId,
        decisionId: input.m2.decisionId,
        transactionId: input.m2.transactionId
      }
    }
  });
  if (outcome.verification?.verified !== true || outcome.attempt.status !== "succeeded") {
    throw new Error("M3 execution did not produce a verified succeeded attempt for M6.");
  }
  if (!outcome.providerResult) {
    throw new Error("M6 governed execution did not return provider result metadata.");
  }
  const deterministic = requireDeterministicInquiry(outcome.providerResult);
  if (
    deterministic.questionNormalizedHashSha256 !== input.assessment.questionNormalizedHashSha256
  ) {
    throw new Error("M6 deterministic inquiry question hash mismatch.");
  }
  if (deterministic.selectedSectionIds.length !== outcome.providerResult.itemCount) {
    throw new Error("M6 deterministic inquiry item count mismatch.");
  }
  const corpusSnapshot = loadApprovedSyntheticCorpus();
  if (corpusSnapshot.manifestHashSha256 !== deterministic.fixtureManifestHash) {
    throw new Error("M6 canonical manifest hash mismatch against approved corpus.");
  }
  if (deterministic.noMatch && deterministic.selectedSectionIds.length > 0) {
    throw new Error("M6 deterministic inquiry no-match/selection mismatch.");
  }
  const match = hydrateMatchOutcomeFromDeterministic(corpusSnapshot, deterministic);
  const rendered = renderM6Response({
    match,
    corpusManifestHashSha256: deterministic.fixtureManifestHash
  });
  const renderedHash = sha256(rendered.responseText);
  if (renderedHash !== deterministic.answerHashSha256) {
    throw new Error("M6 deterministic inquiry answer hash mismatch.");
  }
  const m4Trace = new M4TraceService(input.stateDirectory);
  const existingAttestation = m4Trace
    .listEventsByCorrelationId(input.m2.correlationId)
    .filter((event) => event.recordKind === "outcome_attestation" && event.record)
    .map(
      (event) =>
        event.record as {
          finalOutcomeStatus: FinalOutcomeStatus;
          claimedEffect: "none" | "inspection_only";
        }
    )
    .at(-1);
  return Object.freeze({
    correlationId: input.m2.correlationId,
    ...(existingAttestation ? { attestationStatus: existingAttestation.finalOutcomeStatus } : {}),
    ...(existingAttestation ? { attestationClaimedEffect: existingAttestation.claimedEffect } : {}),
    result: deterministic.noMatch ? "no_match" : "matched",
    renderedResponse: rendered.responseText,
    selectedSectionIds: deterministic.selectedSectionIds,
    selectedDocumentIds: deterministic.selectedDocumentIds,
    corpusManifestHashSha256: deterministic.fixtureManifestHash,
    questionHashSha256: deterministic.questionNormalizedHashSha256
  });
}

function attest(
  stateDirectory: string,
  correlationId: CorrelationId,
  requestId: ImmutableIdentifier
) {
  const m4Trace = new M4TraceService(stateDirectory);
  const outcomeService = new OutcomeAttestationService({
    stateDirectory,
    traceService: m4Trace,
    recoveryCoordinator: new RecoveryCoordinator(m4Trace),
    explanationService: new ExplanationService(m4Trace)
  });
  return outcomeService.finalizeOutcomeAttestation({
    attestationRequestId: createImmutableIdentifier("m4_attestation_request"),
    correlationId,
    requestedCapabilityId: M6_CAPABILITY_ID,
    expectedM3CapabilityRequestId: requestId
  });
}

function appendEvidenceRecord(input: {
  journal: M6EvidenceJournal;
  requestId: ImmutableIdentifier;
  requestFingerprintSha256: string;
  requestedAdmissionMode: M6AdmissionMode;
  m2Linkage: M6M2Context;
  correlationId: CorrelationId;
  disposition: "completed_without_effect" | "blocked";
  result: "matched" | "no_match" | "denied" | "blocked";
  renderedResponse: string;
  assessment: ReturnType<typeof assessQuestionText>;
  inputClassification: string;
  corpusManifestHashSha256: string;
  selectedDocumentIds: readonly string[];
  selectedSectionIds: readonly string[];
  noMatch: boolean;
}): Omit<M6InquiryResult, "attestationStatus" | "attestationClaimedEffect" | "replayed"> {
  const answerHashSha256 = sha256(input.renderedResponse);
  const evidenceWithoutIntegrity: Omit<M6EvidenceRecord, "integrityHash"> = {
    inquiryRecordId: createImmutableIdentifier("m6_inquiry"),
    requestId: input.requestId,
    requestFingerprintSha256: input.requestFingerprintSha256,
    requestedAdmissionMode: input.requestedAdmissionMode,
    m2IntentId: input.m2Linkage.intentId,
    m2PlanId: input.m2Linkage.planId,
    m2DecisionId: input.m2Linkage.decisionId,
    m2TransactionId: input.m2Linkage.transactionId,
    schemaVersion: M6_SCHEMA_VERSION,
    timestampIso8601: new Date().toISOString(),
    correlationId: input.correlationId,
    causationEventId: input.requestId,
    questionNormalizedHashSha256: input.assessment.questionNormalizedHashSha256,
    questionCodePoints: input.assessment.questionCodePoints,
    questionUtf8Bytes: input.assessment.questionUtf8Bytes,
    tokenizerVersion: M6_TOKENIZER_VERSION,
    matcherVersion: M6_MATCHER_VERSION,
    corpusIndexVersion: M6_CORPUS_INDEX_VERSION,
    corpusManifestHashSha256: input.corpusManifestHashSha256,
    selectedDocumentIds: input.selectedDocumentIds,
    selectedSectionIds: input.selectedSectionIds,
    noMatch: input.noMatch,
    disposition: input.disposition,
    answerHashSha256,
    externalEffect: "none",
    inputClassification: input.inputClassification as M6EvidenceRecord["inputClassification"],
    inputDisposition: input.assessment.disposition
  };
  input.journal.append(
    Object.freeze({
      ...evidenceWithoutIntegrity,
      integrityHash: computeM6IntegrityHash(evidenceWithoutIntegrity)
    })
  );
  return Object.freeze({
    requestId: input.requestId,
    correlationId: input.correlationId,
    disposition: input.disposition,
    result: input.result,
    renderedResponse: input.renderedResponse,
    selectedSectionIds: input.selectedSectionIds,
    selectedDocumentIds: input.selectedDocumentIds,
    corpusManifestHashSha256: input.corpusManifestHashSha256,
    questionHashSha256: input.assessment.questionNormalizedHashSha256,
    inputClassification: input.inputClassification
  });
}

function normalizeAttestationStatus(
  status: FinalOutcomeStatus
): M6InquiryResult["attestationStatus"] {
  return status;
}

function computeRequestFingerprint(input: {
  requestId: ImmutableIdentifier;
  requestedAdmissionMode: M6AdmissionMode;
  questionNormalizedHashSha256: string;
  m2Linkage: Pick<M6M2Context, "intentId" | "planId" | "decisionId" | "transactionId">;
}): string {
  return sha256(
    JSON.stringify({
      requestId: input.requestId,
      requestedAdmissionMode: input.requestedAdmissionMode,
      questionNormalizedHashSha256: input.questionNormalizedHashSha256,
      m2Linkage: {
        intentId: input.m2Linkage.intentId,
        planId: input.m2Linkage.planId,
        decisionId: input.m2Linkage.decisionId,
        transactionId: input.m2Linkage.transactionId
      }
    })
  );
}

function getLatestEvidenceByRequestId(
  journal: M6EvidenceJournal,
  requestId: ImmutableIdentifier
): M6EvidenceRecord | undefined {
  const records = journal
    .listAll()
    .map((event) => event.record)
    .filter((record) => record.requestId === requestId);
  return records.at(-1);
}

function extractM2Linkage(
  record: M6EvidenceRecord
): Pick<M6M2Context, "intentId" | "planId" | "decisionId" | "transactionId"> {
  if (!record.m2IntentId || !record.m2PlanId || !record.m2DecisionId || !record.m2TransactionId) {
    throw new Error("Existing M6 evidence missing M2 linkage identity.");
  }
  return Object.freeze({
    intentId: record.m2IntentId,
    planId: record.m2PlanId,
    decisionId: record.m2DecisionId,
    transactionId: record.m2TransactionId
  });
}

function requireDeterministicInquiry(providerResult: ProviderSummaryResult | undefined): Readonly<{
  questionNormalizedHashSha256: string;
  selectedDocumentIds: readonly string[];
  selectedSectionIds: readonly string[];
  noMatch: boolean;
  answerHashSha256: string;
  fixtureManifestHash: string;
}> {
  if (!providerResult?.deterministicInquiry) {
    throw new Error("M6 deterministic inquiry metadata is missing from verified provider result.");
  }
  return Object.freeze({
    ...providerResult.deterministicInquiry,
    fixtureManifestHash: providerResult.fixtureManifestHash
  });
}

function hydrateMatchOutcomeFromDeterministic(
  corpus: ReturnType<typeof loadApprovedSyntheticCorpus>,
  deterministic: Readonly<{
    selectedDocumentIds: readonly string[];
    selectedSectionIds: readonly string[];
    noMatch: boolean;
  }>
): M6MatchOutcome {
  if (deterministic.noMatch) {
    return Object.freeze({
      noMatch: true,
      selectedDocuments: Object.freeze([]),
      selectedDocumentIds: Object.freeze([]),
      selectedSectionIds: Object.freeze([])
    });
  }
  const documentsById = new Map(corpus.documents.map((document) => [document.id, document]));
  const selectedDocuments: M6SelectedDocument[] = [];
  for (const documentId of deterministic.selectedDocumentIds) {
    const document = documentsById.get(documentId);
    if (!document) {
      throw new Error(`Deterministic inquiry selected unknown document ID: ${documentId}`);
    }
    const documentSections = deterministic.selectedSectionIds.filter((id) =>
      id.startsWith(`${documentId}#`)
    );
    const selectedSections: M6SelectedSection[] = documentSections.map((reference, rank) => {
      const sectionId = reference.split("#")[1];
      const section = document.sections.find((candidate) => candidate.sectionId === sectionId);
      if (!section) {
        throw new Error(`Deterministic inquiry selected unknown section ID: ${reference}`);
      }
      return Object.freeze({
        documentId,
        sectionId: section.sectionId,
        sectionIndex: section.index,
        sectionScore: Math.max(1, documentSections.length - rank),
        paragraph: section.originalParagraph
      });
    });
    selectedDocuments.push(
      Object.freeze({
        documentId,
        documentScore: Math.max(2, selectedSections.length),
        titleMatches: 1,
        selectedSections: Object.freeze(selectedSections)
      })
    );
  }
  return Object.freeze({
    noMatch: false,
    selectedDocuments: Object.freeze(selectedDocuments),
    selectedDocumentIds: Object.freeze([...deterministic.selectedDocumentIds]),
    selectedSectionIds: Object.freeze([...deterministic.selectedSectionIds])
  });
}
