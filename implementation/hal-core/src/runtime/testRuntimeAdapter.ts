import type {
  AgentRuntime,
  RuntimeCapabilityDisposition,
  RuntimeCapabilityRequest,
  RuntimeCapabilityManifest,
  RuntimeContractCallbacks,
  RuntimeContext,
  RuntimeCreateAgentRequest,
  RuntimeEvidenceSubmission,
  RuntimeExecuteTaskRequest,
  RuntimeFailureReport,
  RuntimeProgressReport,
  RuntimeResultReport,
  RuntimeSubagentRequest,
  RuntimeAgentId,
  RuntimeStartRequest
} from "./agentRuntime.js";

/** A deterministic no-effect runtime for adapter-contract tests. */
export class TestRuntimeAdapter implements AgentRuntime {
  public readonly calls: string[] = [];
  private callbacks: RuntimeContractCallbacks | undefined;
  private readonly operationalContexts = new Map<RuntimeAgentId, string>();

  public async start(request: RuntimeStartRequest): Promise<void> {
    this.callbacks = request.callbacks;
    this.calls.push(`start:${request.runtimeId}`);
  }

  public async createAgent(request: RuntimeCreateAgentRequest): Promise<void> {
    this.calls.push(`create:${request.agentId}`);
  }

  public async executeTask(request: RuntimeExecuteTaskRequest): Promise<void> {
    this.calls.push(`execute:${request.taskId}`);
  }

  public async provideContext(context: RuntimeContext): Promise<void> {
    this.operationalContexts.set(context.agentId, context.contextSummary);
    this.calls.push(`context:${context.agentId}`);
  }

  public async provideCapabilityManifest(manifest: RuntimeCapabilityManifest): Promise<void> {
    this.calls.push(`manifest:${manifest.agentId}`);
  }

  public async checkpoint(agentId: RuntimeAgentId): Promise<void> {
    this.calls.push(`checkpoint:${agentId}`);
  }

  public async cancel(agentId: RuntimeAgentId): Promise<void> {
    this.calls.push(`cancel:${agentId}`);
  }

  public async destroy(agentId: RuntimeAgentId): Promise<void> {
    this.operationalContexts.delete(agentId);
    this.calls.push(`destroy:${agentId}`);
  }

  public async requestCapability(
    request: RuntimeCapabilityRequest
  ): Promise<RuntimeCapabilityDisposition> {
    if (!this.callbacks) {
      throw new Error("TestRuntimeAdapter cannot request a capability before HAL starts it.");
    }
    return this.callbacks.requestCapability(request);
  }

  public async submitEvidence(submission: RuntimeEvidenceSubmission): Promise<void> {
    return this.requireCallbacks().submitEvidence(submission);
  }

  public async reportProgress(report: RuntimeProgressReport): Promise<void> {
    return this.requireCallbacks().reportProgress(report);
  }

  public async reportResult(report: RuntimeResultReport): Promise<void> {
    return this.requireCallbacks().reportResult(report);
  }

  public async reportFailure(report: RuntimeFailureReport): Promise<void> {
    return this.requireCallbacks().reportFailure(report);
  }

  public async requestSubagent(request: RuntimeSubagentRequest): Promise<void> {
    return this.requireCallbacks().requestSubagent(request);
  }

  public getOperationalContext(agentId: RuntimeAgentId): string | undefined {
    return this.operationalContexts.get(agentId);
  }

  private requireCallbacks(): RuntimeContractCallbacks {
    if (!this.callbacks) {
      throw new Error("TestRuntimeAdapter cannot report to HAL before HAL starts it.");
    }
    return this.callbacks;
  }
}
