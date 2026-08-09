/* eslint-disable no-unused-vars -- function-property names describe contract parameters. */
import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";

/**
 * A deliberately small, semantic projection of Book II's Agent Runtime Contract.
 *
 * This is an internal local-test boundary, not a transport protocol, credential
 * model, or a grant of resource access. HAL owns the callback implementations.
 */
export type RuntimeId = string & { readonly __brand: "RuntimeId" };
export type RuntimeAgentId = string & { readonly __brand: "RuntimeAgentId" };
export type RuntimeTaskId = string & { readonly __brand: "RuntimeTaskId" };

export type RuntimeCapabilityRequest = Readonly<{
  requestId: ImmutableIdentifier;
  correlationId: CorrelationId;
  runtimeId: RuntimeId;
  agentId: RuntimeAgentId;
  taskId: RuntimeTaskId;
  capability: string;
  targetSummary: string;
  taskContextSummary: string;
}>;

export type RuntimeCapabilityDisposition = Readonly<{
  status: "permitted" | "denied" | "approval_required";
  reason: string;
  capabilityManifest: readonly string[];
}>;

export type RuntimeEvidenceSubmission = Readonly<{
  correlationId: CorrelationId;
  runtimeId: RuntimeId;
  agentId: RuntimeAgentId;
  taskId: RuntimeTaskId;
  claim: string;
  provenanceSummary: string;
}>;

export type RuntimeProgressReport = Readonly<{
  correlationId: CorrelationId;
  runtimeId: RuntimeId;
  agentId: RuntimeAgentId;
  taskId: RuntimeTaskId;
  summary: string;
}>;

export type RuntimeResultReport = RuntimeProgressReport;
export type RuntimeFailureReport = RuntimeProgressReport;

export type RuntimeSubagentRequest = Readonly<{
  correlationId: CorrelationId;
  runtimeId: RuntimeId;
  parentAgentId: RuntimeAgentId;
  taskId: RuntimeTaskId;
  purpose: string;
}>;

export type RuntimeContractCallbacks = Readonly<{
  requestCapability: (_request: RuntimeCapabilityRequest) => Promise<RuntimeCapabilityDisposition>;
  submitEvidence: (_submission: RuntimeEvidenceSubmission) => Promise<void>;
  reportProgress: (_report: RuntimeProgressReport) => Promise<void>;
  reportResult: (_report: RuntimeResultReport) => Promise<void>;
  reportFailure: (_report: RuntimeFailureReport) => Promise<void>;
  requestSubagent: (_request: RuntimeSubagentRequest) => Promise<void>;
}>;

export type RuntimeStartRequest = Readonly<{
  runtimeId: RuntimeId;
  callbacks: RuntimeContractCallbacks;
}>;

export type RuntimeCreateAgentRequest = Readonly<{
  agentId: RuntimeAgentId;
  taskId: RuntimeTaskId;
  correlationId: CorrelationId;
}>;

export type RuntimeExecuteTaskRequest = Readonly<{
  agentId: RuntimeAgentId;
  taskId: RuntimeTaskId;
  correlationId: CorrelationId;
}>;

export type RuntimeContext = Readonly<{
  agentId: RuntimeAgentId;
  contextSummary: string;
}>;

export type RuntimeCapabilityManifest = Readonly<{
  agentId: RuntimeAgentId;
  capabilities: readonly string[];
}>;

export type AgentRuntime = Readonly<{
  start: (_request: RuntimeStartRequest) => Promise<void>;
  createAgent: (_request: RuntimeCreateAgentRequest) => Promise<void>;
  executeTask: (_request: RuntimeExecuteTaskRequest) => Promise<void>;
  provideContext: (_context: RuntimeContext) => Promise<void>;
  provideCapabilityManifest: (_manifest: RuntimeCapabilityManifest) => Promise<void>;
  checkpoint: (_agentId: RuntimeAgentId) => Promise<void>;
  cancel: (_agentId: RuntimeAgentId) => Promise<void>;
  destroy: (_agentId: RuntimeAgentId) => Promise<void>;
}>;
