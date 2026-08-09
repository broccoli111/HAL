/* eslint-disable no-unused-vars -- transport parameter names document the adapter edge. */
import type {
  AgentRuntime,
  RuntimeAgentId,
  RuntimeCapabilityManifest,
  RuntimeContext,
  RuntimeCreateAgentRequest,
  RuntimeExecuteTaskRequest,
  RuntimeStartRequest
} from "./agentRuntime.js";

/**
 * Adapter-private execution edge for Hermes's stateless local inference API.
 *
 * The injected transport is responsible for reaching the isolated Hermes
 * runtime. HAL Core has no process, SSH, container, provider, or Hermes import.
 * This driver accepts no capabilities: it turns the HAL-provided context into a
 * non-canonical result claim and keeps HAL callback custody intact.
 */
export type HermesStatelessTransport = Readonly<{
  execute: (input: Readonly<{ contextSummary: string }>) => Promise<string>;
}>;

export class HermesStatelessDriver implements AgentRuntime {
  private callbacks?: RuntimeStartRequest["callbacks"];
  private context?: RuntimeContext;
  private manifest?: RuntimeCapabilityManifest;
  private runtimeId?: RuntimeStartRequest["runtimeId"];
  private active?: RuntimeCreateAgentRequest;

  public constructor(private readonly transport: HermesStatelessTransport) {}

  public async start(request: RuntimeStartRequest): Promise<void> {
    this.runtimeId = request.runtimeId;
    this.callbacks = request.callbacks;
  }

  public async createAgent(request: RuntimeCreateAgentRequest): Promise<void> {
    this.active = request;
  }

  public async provideContext(context: RuntimeContext): Promise<void> {
    this.context = context;
  }

  public async provideCapabilityManifest(manifest: RuntimeCapabilityManifest): Promise<void> {
    if (manifest.capabilities.length > 0)
      throw new Error("Hermes stateless pilot accepts no runtime capability grant.");
    this.manifest = manifest;
  }

  public async executeTask(request: RuntimeExecuteTaskRequest): Promise<void> {
    if (!this.callbacks || !this.runtimeId || !this.active || !this.context || !this.manifest)
      throw new Error("Hermes stateless execution requires HAL lifecycle admission.");
    if (
      this.active.agentId !== request.agentId ||
      this.active.taskId !== request.taskId ||
      this.active.correlationId !== request.correlationId ||
      this.context.agentId !== request.agentId ||
      this.manifest.agentId !== request.agentId
    )
      throw new Error("Hermes stateless execution linkage does not match HAL admission.");
    try {
      const summary = await this.transport.execute({ contextSummary: this.context.contextSummary });
      if (!summary.trim()) throw new Error("Hermes stateless transport returned an empty result.");
      await this.callbacks.reportResult({ ...request, runtimeId: this.runtimeId, summary });
    } catch (error) {
      const summary = error instanceof Error ? error.message : "Hermes stateless execution failed.";
      await this.callbacks.reportFailure({ ...request, runtimeId: this.runtimeId, summary });
    }
  }

  public async checkpoint(agentId: RuntimeAgentId): Promise<void> {
    this.assertActive(agentId);
  }

  public async cancel(agentId: RuntimeAgentId): Promise<void> {
    this.assertActive(agentId);
  }

  public async destroy(agentId: RuntimeAgentId): Promise<void> {
    this.assertActive(agentId);
    delete this.active;
  }

  private assertActive(agentId: RuntimeAgentId): void {
    if (!this.active || this.active.agentId !== agentId)
      throw new Error("Hermes stateless lifecycle operation requires an admitted HAL agent.");
  }
}
