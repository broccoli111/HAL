import type {
  RuntimeCapabilityDisposition,
  RuntimeCapabilityRequest,
  RuntimeContractCallbacks,
  RuntimeEvidenceSubmission,
  RuntimeFailureReport,
  RuntimeProgressReport,
  RuntimeResultReport,
  RuntimeSubagentRequest
} from "./agentRuntime.js";
import { RuntimeJournal, type RuntimeJournalRecordKind } from "./runtimeJournal.js";

/**
 * HAL-side callback implementation that records runtime claims before exposing
 * their disposition. It does not accept a claim as canonical knowledge.
 */
export class RuntimeSubmissionRecorder implements RuntimeContractCallbacks {
  private readonly journal: RuntimeJournal;
  private readonly gateway: Pick<RuntimeContractCallbacks, "requestCapability">;

  public constructor(input: {
    journal: RuntimeJournal;
    gateway: Pick<RuntimeContractCallbacks, "requestCapability">;
  }) {
    this.journal = input.journal;
    this.gateway = input.gateway;
  }

  public async requestCapability(
    request: RuntimeCapabilityRequest
  ): Promise<RuntimeCapabilityDisposition> {
    const disposition = await this.gateway.requestCapability(request);
    this.journal.append({
      recordKind: "capability_request",
      correlationId: request.correlationId,
      runtimeId: request.runtimeId,
      agentId: request.agentId,
      taskId: request.taskId,
      summary: this.requireSummary(`${request.capability}; target=${request.targetSummary}`),
      provenanceSummary: this.requireSummary(request.taskContextSummary),
      canonicalStatus: "unaccepted_runtime_claim",
      disposition: disposition.status
    });
    return disposition;
  }

  public async submitEvidence(submission: RuntimeEvidenceSubmission): Promise<void> {
    this.record("evidence_submission", submission, submission.claim, submission.provenanceSummary);
  }

  public async reportProgress(report: RuntimeProgressReport): Promise<void> {
    this.record("progress_report", report, report.summary, "runtime progress claim");
  }

  public async reportResult(report: RuntimeResultReport): Promise<void> {
    this.record("result_report", report, report.summary, "runtime result claim");
  }

  public async reportFailure(report: RuntimeFailureReport): Promise<void> {
    this.record("failure_report", report, report.summary, "runtime failure claim");
  }

  public async requestSubagent(request: RuntimeSubagentRequest): Promise<void> {
    this.journal.append({
      recordKind: "subagent_request",
      correlationId: request.correlationId,
      runtimeId: request.runtimeId,
      agentId: request.parentAgentId,
      taskId: request.taskId,
      summary: this.requireSummary(request.purpose),
      provenanceSummary: "runtime subagent request",
      canonicalStatus: "unaccepted_runtime_claim"
    });
  }

  private record(
    recordKind: Exclude<RuntimeJournalRecordKind, "capability_request" | "subagent_request">,
    report: RuntimeProgressReport | RuntimeEvidenceSubmission,
    summary: string,
    provenanceSummary: string
  ): void {
    this.journal.append({
      recordKind,
      correlationId: report.correlationId,
      runtimeId: report.runtimeId,
      agentId: report.agentId,
      taskId: report.taskId,
      summary: this.requireSummary(summary),
      provenanceSummary: this.requireSummary(provenanceSummary),
      canonicalStatus: "unaccepted_runtime_claim"
    });
  }

  private requireSummary(value: string): string {
    const normalized = value.trim();
    if (!normalized || normalized.length > 1_024) {
      throw new Error(
        "Runtime submission summary must be non-empty and no more than 1024 characters."
      );
    }
    return normalized;
  }
}
