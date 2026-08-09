/* eslint-disable no-unused-vars -- transport and callback parameter names document the contract. */
import type {
  AgentRuntime,
  RuntimeAgentId,
  RuntimeCapabilityManifest,
  RuntimeContext,
  RuntimeCreateAgentRequest,
  RuntimeExecuteTaskRequest,
  RuntimeStartRequest
} from "./agentRuntime.js";

/** Test-only transport edge. Its implementation may use SSH, but HAL Core does not. */
export type HermesLineTransport = Readonly<{
  send: (line: string) => Promise<readonly string[]>;
}>;

export class HermesLineDriver implements AgentRuntime {
  private callbacks?: RuntimeStartRequest["callbacks"];
  private context?: RuntimeContext;
  private manifest?: RuntimeCapabilityManifest;
  private runtimeId?: RuntimeStartRequest["runtimeId"];
  private activeTask: RuntimeExecuteTaskRequest | undefined;

  public constructor(private readonly transport: HermesLineTransport) {}

  public async start(request: RuntimeStartRequest): Promise<void> {
    this.callbacks = request.callbacks;
    this.runtimeId = request.runtimeId;
    await this.send({ type: "start", runtimeId: request.runtimeId });
  }
  public async createAgent(request: RuntimeCreateAgentRequest): Promise<void> {
    await this.send({ type: "create_agent", ...request });
  }
  public async executeTask(request: RuntimeExecuteTaskRequest): Promise<void> {
    this.activeTask = request;
    await this.send({
      type: "execute_task",
      ...request,
      context: this.context?.contextSummary ?? "",
      capabilities: this.manifest?.capabilities ?? []
    });
  }
  public async provideContext(context: RuntimeContext): Promise<void> {
    this.context = context;
  }
  public async provideCapabilityManifest(manifest: RuntimeCapabilityManifest): Promise<void> {
    this.manifest = manifest;
  }
  public async checkpoint(agentId: RuntimeAgentId): Promise<void> {
    await this.send({ type: "checkpoint", agentId });
  }
  public async cancel(agentId: RuntimeAgentId): Promise<void> {
    await this.send({ type: "cancel", agentId });
  }
  public async destroy(agentId: RuntimeAgentId): Promise<void> {
    await this.send({ type: "destroy", agentId });
  }

  private async send(message: Record<string, unknown>): Promise<void> {
    const replies = await this.transport.send(JSON.stringify(message));
    if (message.type !== "execute_task" && replies.length > 0) {
      throw new Error("Hermes runtime claims are permitted only during task dispatch.");
    }
    for (const reply of replies) {
      const parsed: unknown = JSON.parse(reply);
      if (!parsed || typeof parsed !== "object")
        throw new Error("Hermes line reply must be an object.");
      const frame = parsed as {
        type?: unknown;
        summary?: unknown;
        correlationId?: unknown;
        runtimeId?: unknown;
        agentId?: unknown;
        taskId?: unknown;
      };
      if (typeof frame.type !== "string" || typeof frame.summary !== "string")
        throw new Error("Hermes line reply is malformed.");
      if (
        !this.callbacks ||
        typeof frame.correlationId !== "string" ||
        typeof frame.runtimeId !== "string" ||
        typeof frame.agentId !== "string" ||
        typeof frame.taskId !== "string"
      )
        throw new Error("Hermes reply lacks HAL correlation linkage.");
      if (
        !this.activeTask ||
        frame.correlationId !== this.activeTask.correlationId ||
        frame.runtimeId !== this.runtimeId ||
        frame.agentId !== this.activeTask.agentId ||
        frame.taskId !== this.activeTask.taskId
      )
        throw new Error("Hermes reply linkage does not match the active HAL task.");
      const report = {
        correlationId: frame.correlationId as RuntimeExecuteTaskRequest["correlationId"],
        runtimeId: frame.runtimeId as RuntimeStartRequest["runtimeId"],
        agentId: frame.agentId as RuntimeAgentId,
        taskId: frame.taskId as RuntimeExecuteTaskRequest["taskId"],
        summary: frame.summary
      };
      if (frame.type === "progress") await this.callbacks.reportProgress(report);
      else if (frame.type === "result") {
        await this.callbacks.reportResult(report);
        this.activeTask = undefined;
      } else if (frame.type === "failure") {
        await this.callbacks.reportFailure(report);
        this.activeTask = undefined;
      } else throw new Error("Hermes line reply type is not permitted.");
    }
  }
}
