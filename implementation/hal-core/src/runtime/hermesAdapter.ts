import type {
  AgentRuntime,
  RuntimeCapabilityManifest,
  RuntimeContext,
  RuntimeCreateAgentRequest,
  RuntimeExecuteTaskRequest,
  RuntimeAgentId,
  RuntimeStartRequest
} from "./agentRuntime.js";

/**
 * This is the Reference Runtime v1 adapter seam, not a Hermes integration.
 *
 * The driver is supplied at the adapter edge. HAL Core therefore has no Hermes
 * package, process, protocol, or implementation-detail dependency. A future
 * driver may translate these calls to Hermes after separately governed review.
 */
export type HermesRuntimeDriver = AgentRuntime;

export class HermesAdapter implements AgentRuntime {
  private readonly driver: HermesRuntimeDriver;

  public constructor(driver: HermesRuntimeDriver) {
    this.driver = driver;
  }

  public start(request: RuntimeStartRequest): Promise<void> {
    return this.driver.start(request);
  }

  public createAgent(request: RuntimeCreateAgentRequest): Promise<void> {
    return this.driver.createAgent(request);
  }

  public executeTask(request: RuntimeExecuteTaskRequest): Promise<void> {
    return this.driver.executeTask(request);
  }

  public provideContext(context: RuntimeContext): Promise<void> {
    return this.driver.provideContext(context);
  }

  public provideCapabilityManifest(manifest: RuntimeCapabilityManifest): Promise<void> {
    return this.driver.provideCapabilityManifest(manifest);
  }

  public checkpoint(agentId: RuntimeAgentId): Promise<void> {
    return this.driver.checkpoint(agentId);
  }

  public cancel(agentId: RuntimeAgentId): Promise<void> {
    return this.driver.cancel(agentId);
  }

  public destroy(agentId: RuntimeAgentId): Promise<void> {
    return this.driver.destroy(agentId);
  }
}
