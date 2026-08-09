import type {
  AgentRuntime,
  RuntimeCapabilityRequest,
  RuntimeCapabilityManifest,
  RuntimeContext,
  RuntimeContractCallbacks,
  RuntimeCreateAgentRequest,
  RuntimeEvidenceSubmission,
  RuntimeExecuteTaskRequest,
  RuntimeFailureReport,
  RuntimeProgressReport,
  RuntimeId
} from "./agentRuntime.js";

/**
 * HAL-owned lifecycle host for a runtime contract implementation.
 *
 * It owns runtime admission sequencing and retains the only callback reference
 * through which a runtime can ask HAL to evaluate a consequential capability.
 * It intentionally has no resource-provider, credential, or Hermes dependency.
 */
export class RuntimeHost {
  private readonly runtimeId: RuntimeId;
  private readonly runtime: AgentRuntime;
  private readonly callbacks: RuntimeContractCallbacks;
  private readonly callbackCustody: RuntimeContractCallbacks;
  private readonly admittedExecutions = new Map<
    RuntimeCreateAgentRequest["agentId"],
    RuntimeCreateAgentRequest
  >();

  public constructor(input: {
    runtimeId: RuntimeId;
    runtime: AgentRuntime;
    callbacks: RuntimeContractCallbacks;
  }) {
    this.runtimeId = input.runtimeId;
    this.runtime = input.runtime;
    this.callbacks = input.callbacks;
    this.callbackCustody = Object.freeze({
      requestCapability: async (request) => {
        this.assertCallbackLinked(request);
        return this.callbacks.requestCapability(request);
      },
      submitEvidence: async (submission) => {
        this.assertCallbackLinked(submission);
        await this.callbacks.submitEvidence(submission);
      },
      reportProgress: async (report) => {
        this.assertCallbackLinked(report);
        await this.callbacks.reportProgress(report);
      },
      reportResult: async (report) => {
        this.assertCallbackLinked(report);
        await this.callbacks.reportResult(report);
      },
      reportFailure: async (report) => {
        this.assertCallbackLinked(report);
        await this.callbacks.reportFailure(report);
      },
      requestSubagent: async (request) => {
        this.assertCallbackLinked({ ...request, agentId: request.parentAgentId });
        await this.callbacks.requestSubagent(request);
      }
    });
  }

  public async execute(input: {
    createAgent: RuntimeCreateAgentRequest;
    context: RuntimeContext;
    capabilityManifest: RuntimeCapabilityManifest;
    task: RuntimeExecuteTaskRequest;
  }): Promise<void> {
    this.assertAligned(input);
    await this.runtime.start({ runtimeId: this.runtimeId, callbacks: this.callbackCustody });
    await this.runtime.createAgent(input.createAgent);
    await this.runtime.provideContext(input.context);
    await this.runtime.provideCapabilityManifest(input.capabilityManifest);
    this.admittedExecutions.set(input.createAgent.agentId, input.createAgent);
    try {
      await this.runtime.executeTask(input.task);
    } catch (error) {
      this.admittedExecutions.delete(input.createAgent.agentId);
      throw error;
    }
  }

  public async checkpoint(agentId: RuntimeCreateAgentRequest["agentId"]): Promise<void> {
    this.assertAdmitted(agentId);
    await this.runtime.checkpoint(agentId);
  }

  public async cancel(agentId: RuntimeCreateAgentRequest["agentId"]): Promise<void> {
    this.assertAdmitted(agentId);
    await this.runtime.cancel(agentId);
  }

  public async destroy(agentId: RuntimeCreateAgentRequest["agentId"]): Promise<void> {
    this.assertAdmitted(agentId);
    await this.runtime.destroy(agentId);
    this.admittedExecutions.delete(agentId);
  }

  private assertAligned(input: {
    createAgent: RuntimeCreateAgentRequest;
    context: RuntimeContext;
    capabilityManifest: RuntimeCapabilityManifest;
    task: RuntimeExecuteTaskRequest;
  }): void {
    if (
      input.createAgent.agentId !== input.context.agentId ||
      input.createAgent.agentId !== input.capabilityManifest.agentId ||
      input.createAgent.agentId !== input.task.agentId
    ) {
      throw new Error("RuntimeHost requires one consistent agent identity per execution.");
    }
    if (
      input.createAgent.taskId !== input.task.taskId ||
      input.createAgent.correlationId !== input.task.correlationId
    ) {
      throw new Error("RuntimeHost requires task and correlation linkage to remain consistent.");
    }
  }

  private assertAdmitted(agentId: RuntimeCreateAgentRequest["agentId"]): void {
    if (!this.admittedExecutions.has(agentId)) {
      throw new Error("RuntimeHost lifecycle operations require an admitted HAL agent.");
    }
  }

  private assertCallbackLinked(
    callback:
      | RuntimeCapabilityRequest
      | RuntimeEvidenceSubmission
      | RuntimeProgressReport
      | RuntimeFailureReport
      | {
          runtimeId: RuntimeId;
          agentId: RuntimeCreateAgentRequest["agentId"];
          taskId: string;
          correlationId: string;
        }
  ): void {
    const admitted = this.admittedExecutions.get(callback.agentId);
    if (
      !admitted ||
      callback.runtimeId !== this.runtimeId ||
      callback.taskId !== admitted.taskId ||
      callback.correlationId !== admitted.correlationId
    ) {
      throw new Error("RuntimeHost callback linkage does not match an admitted HAL execution.");
    }
  }
}
