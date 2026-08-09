import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";

import { HermesAdapter } from "../src/runtime/hermesAdapter.js";
import { HermesLineDriver } from "../src/runtime/hermesLineDriver.js";
import { LocalSyntheticCapabilityGateway } from "../src/runtime/localSyntheticCapabilityGateway.js";
import { RuntimeHost } from "../src/runtime/runtimeHost.js";
import { RuntimeJournal } from "../src/runtime/runtimeJournal.js";
import { RuntimeSubmissionRecorder } from "../src/runtime/runtimeSubmissionRecorder.js";
import { TestRuntimeAdapter } from "../src/runtime/testRuntimeAdapter.js";
import type { CorrelationId, ImmutableIdentifier } from "../src/shared/types.js";
import type {
  RuntimeAgentId,
  RuntimeContractCallbacks,
  RuntimeId,
  RuntimeTaskId
} from "../src/runtime/agentRuntime.js";
import { M3_CAPABILITY_ID } from "../src/m3/types.js";

const runtimeId = "test_runtime" as RuntimeId;
const agentId = "agent_1" as RuntimeAgentId;
const taskId = "task_1" as RuntimeTaskId;
const correlationId = "correlation_1" as CorrelationId;

function createCallbacks(): RuntimeContractCallbacks {
  return Object.freeze({
    requestCapability: async () =>
      Object.freeze({
        status: "denied" as const,
        reason: "No delegated authority.",
        capabilityManifest: Object.freeze([])
      }),
    submitEvidence: async () => undefined,
    reportProgress: async () => undefined,
    reportResult: async () => undefined,
    reportFailure: async () => undefined,
    requestSubagent: async () => undefined
  });
}

async function executeHost(host: RuntimeHost): Promise<void> {
  await host.execute({
    createAgent: { agentId, taskId, correlationId },
    context: { agentId, contextSummary: "bounded synthetic context" },
    capabilityManifest: { agentId, capabilities: ["synthetic.inspect"] },
    task: { agentId, taskId, correlationId }
  });
}

async function executeZeroCapabilityHost(host: RuntimeHost): Promise<void> {
  await host.execute({
    createAgent: { agentId, taskId, correlationId },
    context: { agentId, contextSummary: "bounded synthetic context" },
    capabilityManifest: { agentId, capabilities: [] },
    task: { agentId, taskId, correlationId }
  });
}

describe("Agent Runtime adapter boundary", () => {
  test("HermesAdapter delegates only Contract operations to an injected driver", async () => {
    const driver = new TestRuntimeAdapter();
    const adapter = new HermesAdapter(driver);

    await adapter.start({ runtimeId, callbacks: createCallbacks() });
    await adapter.createAgent({ agentId, taskId, correlationId });
    await adapter.provideContext({ agentId, contextSummary: "bounded synthetic context" });
    await adapter.provideCapabilityManifest({ agentId, capabilities: ["synthetic.inspect"] });
    await adapter.executeTask({ agentId, taskId, correlationId });
    await adapter.checkpoint(agentId);
    await adapter.cancel(agentId);
    await adapter.destroy(agentId);

    expect(driver.calls).toEqual([
      "start:test_runtime",
      "create:agent_1",
      "context:agent_1",
      "manifest:agent_1",
      "execute:task_1",
      "checkpoint:agent_1",
      "cancel:agent_1",
      "destroy:agent_1"
    ]);
  });

  test("runtime callback types keep capability disposition HAL-owned", async () => {
    const runtime = new TestRuntimeAdapter();
    const host = new RuntimeHost({ runtimeId, runtime, callbacks: createCallbacks() });
    await executeHost(host);
    const decision = await runtime.requestCapability({
      requestId: "request_1" as ImmutableIdentifier,
      correlationId,
      runtimeId,
      agentId,
      taskId,
      capability: "hal.files.read",
      targetSummary: "synthetic target",
      taskContextSummary: "test"
    });

    expect(decision.status).toBe("denied");
    expect(decision.capabilityManifest).toEqual([]);
    expect(runtime.calls).toEqual([
      "start:test_runtime",
      "create:agent_1",
      "context:agent_1",
      "manifest:agent_1",
      "execute:task_1"
    ]);
  });

  test("HAL-owned callback custody rejects a mislinked runtime claim", async () => {
    const received: string[] = [];
    const runtime = new TestRuntimeAdapter();
    const host = new RuntimeHost({
      runtimeId,
      runtime,
      callbacks: Object.freeze({
        ...createCallbacks(),
        reportResult: async (report) => void received.push(report.summary)
      })
    });
    await executeHost(host);

    await expect(
      runtime.reportResult({
        correlationId: "other_correlation" as CorrelationId,
        runtimeId,
        agentId,
        taskId,
        summary: "mislinked"
      })
    ).rejects.toThrow(/does not match an admitted HAL execution/);
    expect(received).toEqual([]);
  });

  test("HAL-owned callback custody rejects every mislinked Runtime-to-HAL operation", async () => {
    const received: string[] = [];
    const runtime = new TestRuntimeAdapter();
    const host = new RuntimeHost({
      runtimeId,
      runtime,
      callbacks: Object.freeze({
        ...createCallbacks(),
        requestCapability: async () => {
          received.push("capability");
          return { status: "denied" as const, reason: "test", capabilityManifest: [] };
        },
        submitEvidence: async () => void received.push("evidence"),
        reportProgress: async () => void received.push("progress"),
        reportResult: async () => void received.push("result"),
        reportFailure: async () => void received.push("failure"),
        requestSubagent: async () => void received.push("subagent")
      })
    });
    await executeHost(host);
    const otherCorrelationId = "other_correlation" as CorrelationId;

    await expect(
      runtime.requestCapability({
        requestId: "request_mislinked" as ImmutableIdentifier,
        correlationId: otherCorrelationId,
        runtimeId,
        agentId,
        taskId,
        capability: "synthetic.inspect",
        targetSummary: "synthetic target",
        taskContextSummary: "test"
      })
    ).rejects.toThrow(/does not match an admitted HAL execution/);
    await expect(
      runtime.submitEvidence({
        correlationId: otherCorrelationId,
        runtimeId,
        agentId,
        taskId,
        claim: "mislinked",
        provenanceSummary: "test"
      })
    ).rejects.toThrow(/does not match an admitted HAL execution/);
    await expect(
      runtime.reportProgress({
        correlationId: otherCorrelationId,
        runtimeId,
        agentId,
        taskId,
        summary: "mislinked"
      })
    ).rejects.toThrow(/does not match an admitted HAL execution/);
    await expect(
      runtime.reportResult({
        correlationId: otherCorrelationId,
        runtimeId,
        agentId,
        taskId,
        summary: "mislinked"
      })
    ).rejects.toThrow(/does not match an admitted HAL execution/);
    await expect(
      runtime.reportFailure({
        correlationId: otherCorrelationId,
        runtimeId,
        agentId,
        taskId,
        summary: "mislinked"
      })
    ).rejects.toThrow(/does not match an admitted HAL execution/);
    await expect(
      runtime.requestSubagent({
        correlationId: otherCorrelationId,
        runtimeId,
        parentAgentId: agentId,
        taskId,
        purpose: "mislinked"
      })
    ).rejects.toThrow(/does not match an admitted HAL execution/);
    expect(received).toEqual([]);
  });

  test("test-only Hermes line driver retains HAL callback custody", async () => {
    const received: string[] = [];
    const driver = new HermesLineDriver({
      send: async (line) => {
        const command = JSON.parse(line) as { type: string };
        if (command.type !== "execute_task") return [];
        return [
          JSON.stringify({
            type: "progress",
            correlationId,
            runtimeId,
            agentId,
            taskId,
            summary: "bounded"
          }),
          JSON.stringify({
            type: "result",
            correlationId,
            runtimeId,
            agentId,
            taskId,
            summary: "complete"
          })
        ];
      }
    });
    const callbacks: RuntimeContractCallbacks = Object.freeze({
      ...createCallbacks(),
      reportProgress: async (report) => void received.push(`progress:${report.summary}`),
      reportResult: async (report) => void received.push(`result:${report.summary}`)
    });
    await executeHost(
      new RuntimeHost({ runtimeId, runtime: new HermesAdapter(driver), callbacks })
    );
    expect(received).toEqual(["progress:bounded", "result:complete"]);
  });

  test("zero-capability Hermes design path sends no capability grant", async () => {
    const frames: Array<{ type: string; capabilities?: unknown }> = [];
    const driver = new HermesLineDriver({
      send: async (line) => {
        const frame = JSON.parse(line) as { type: string; capabilities?: unknown };
        frames.push(frame);
        return [];
      }
    });
    await executeZeroCapabilityHost(
      new RuntimeHost({
        runtimeId,
        runtime: new HermesAdapter(driver),
        callbacks: createCallbacks()
      })
    );
    expect(frames.find((frame) => frame.type === "execute_task")?.capabilities).toEqual([]);
  });

  test("test-only Hermes line driver rejects malformed remote frames", async () => {
    let calls = 0;
    const driver = new HermesLineDriver({ send: async () => (calls++ === 0 ? [] : ["not-json"]) });
    await driver.start({ runtimeId, callbacks: createCallbacks() });
    await expect(driver.checkpoint(agentId)).rejects.toThrow();
  });

  test("test-only Hermes line driver rejects capability-like remote frames", async () => {
    const driver = new HermesLineDriver({
      send: async (line) =>
        JSON.parse(line).type === "checkpoint"
          ? [
              JSON.stringify({
                type: "capability_request",
                correlationId,
                runtimeId,
                agentId,
                taskId,
                summary: "hal.files.read"
              })
            ]
          : []
    });
    await driver.start({ runtimeId, callbacks: createCallbacks() });
    await executeHost(
      new RuntimeHost({ runtimeId, runtime: driver, callbacks: createCallbacks() })
    );
    await expect(driver.checkpoint(agentId)).rejects.toThrow(/only during task dispatch/);
  });

  test("test-only Hermes line driver rejects remote claims on a control operation", async () => {
    const driver = new HermesLineDriver({
      send: async (line) =>
        JSON.parse(line).type === "checkpoint"
          ? [
              JSON.stringify({
                type: "result",
                correlationId,
                runtimeId,
                agentId,
                taskId,
                summary: "control-plane injection"
              })
            ]
          : []
    });
    await driver.start({ runtimeId, callbacks: createCallbacks() });
    await executeHost(
      new RuntimeHost({ runtimeId, runtime: driver, callbacks: createCallbacks() })
    );
    await expect(driver.checkpoint(agentId)).rejects.toThrow(/only during task dispatch/);
  });

  test("test-only Hermes line driver rejects a claim after a terminal result", async () => {
    const terminalResult = {
      type: "result",
      correlationId,
      runtimeId,
      agentId,
      taskId,
      summary: "complete"
    };
    const driver = new HermesLineDriver({
      send: async (line) =>
        JSON.parse(line).type === "execute_task"
          ? [
              JSON.stringify(terminalResult),
              JSON.stringify({ ...terminalResult, type: "progress" })
            ]
          : []
    });
    await expect(
      executeHost(new RuntimeHost({ runtimeId, runtime: driver, callbacks: createCallbacks() }))
    ).rejects.toThrow(/does not match the active HAL task/);
  });

  test("test-only Hermes line driver rejects remote claims for another HAL task", async () => {
    const driver = new HermesLineDriver({
      send: async (line) =>
        JSON.parse(line).type === "execute_task"
          ? [
              JSON.stringify({
                type: "result",
                correlationId: "other_correlation",
                runtimeId,
                agentId,
                taskId,
                summary: "mislinked"
              })
            ]
          : []
    });
    await expect(
      executeHost(new RuntimeHost({ runtimeId, runtime: driver, callbacks: createCallbacks() }))
    ).rejects.toThrow(/does not match the active HAL task/);
  });

  test("line-driver claims enter the HAL journal as non-canonical evidence", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "hal-line-journal-"));
    try {
      const recorder = new RuntimeSubmissionRecorder({
        journal: new RuntimeJournal(directory),
        gateway: new LocalSyntheticCapabilityGateway()
      });
      const driver = new HermesLineDriver({
        send: async (line) =>
          JSON.parse(line).type === "execute_task"
            ? [
                JSON.stringify({
                  type: "progress",
                  correlationId,
                  runtimeId,
                  agentId,
                  taskId,
                  summary: "bounded"
                }),
                JSON.stringify({
                  type: "result",
                  correlationId,
                  runtimeId,
                  agentId,
                  taskId,
                  summary: "complete"
                })
              ]
            : []
      });
      await executeHost(new RuntimeHost({ runtimeId, runtime: driver, callbacks: recorder }));
      const records = new RuntimeJournal(directory).listByCorrelationId(correlationId);
      expect(records.map((record) => record.recordKind)).toEqual([
        "progress_report",
        "result_report"
      ]);
      expect(records.every((record) => record.canonicalStatus === "unaccepted_runtime_claim")).toBe(
        true
      );
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  test("HAL-owned host rejects mismatched agent or task linkage before runtime execution", async () => {
    const runtime = new TestRuntimeAdapter();
    const host = new RuntimeHost({ runtimeId, runtime, callbacks: createCallbacks() });

    await expect(
      host.execute({
        createAgent: { agentId, taskId, correlationId },
        context: { agentId, contextSummary: "bounded synthetic context" },
        capabilityManifest: { agentId, capabilities: [] },
        task: { agentId, taskId: "other_task" as RuntimeTaskId, correlationId }
      })
    ).rejects.toThrow(/task and correlation linkage/);
    expect(runtime.calls).toEqual([]);
  });

  test("HAL-owned host restricts lifecycle controls to admitted agents", async () => {
    const runtime = new TestRuntimeAdapter();
    const host = new RuntimeHost({ runtimeId, runtime, callbacks: createCallbacks() });
    const otherAgentId = "other_agent" as RuntimeAgentId;

    await expect(host.checkpoint(otherAgentId)).rejects.toThrow(/admitted HAL agent/);
    await executeHost(host);
    await host.checkpoint(agentId);
    await host.cancel(agentId);
    await host.destroy(agentId);
    await expect(host.destroy(agentId)).rejects.toThrow(/admitted HAL agent/);
    expect(runtime.calls).toEqual([
      "start:test_runtime",
      "create:agent_1",
      "context:agent_1",
      "manifest:agent_1",
      "execute:task_1",
      "checkpoint:agent_1",
      "cancel:agent_1",
      "destroy:agent_1"
    ]);
  });

  test("HAL-owned Gateway permits only the existing bounded synthetic capability", async () => {
    const gateway = new LocalSyntheticCapabilityGateway();
    const permitted = await gateway.requestCapability({
      requestId: "request_2" as ImmutableIdentifier,
      correlationId,
      runtimeId,
      agentId,
      taskId,
      capability: M3_CAPABILITY_ID,
      targetSummary: "local_synthetic_corpus",
      taskContextSummary: "bounded synthetic test"
    });
    const denied = await gateway.requestCapability({
      requestId: "request_3" as ImmutableIdentifier,
      correlationId,
      runtimeId,
      agentId,
      taskId,
      capability: "hal.files.read",
      targetSummary: "local_synthetic_corpus",
      taskContextSummary: "bounded synthetic test"
    });

    expect(permitted.status).toBe("permitted");
    expect(permitted.capabilityManifest).toEqual([M3_CAPABILITY_ID]);
    expect(denied.status).toBe("denied");
    expect(denied.capabilityManifest).toEqual([]);
  });

  test("runtime reports remain HAL submissions and runtime memory is disposable", async () => {
    const received: string[] = [];
    const callbacks: RuntimeContractCallbacks = Object.freeze({
      ...createCallbacks(),
      submitEvidence: async (submission) => {
        received.push(`evidence:${submission.claim}`);
      },
      reportProgress: async (report) => {
        received.push(`progress:${report.summary}`);
      },
      reportResult: async (report) => {
        received.push(`result:${report.summary}`);
      },
      reportFailure: async (report) => {
        received.push(`failure:${report.summary}`);
      }
    });
    const firstRuntime = new TestRuntimeAdapter();
    await executeHost(new RuntimeHost({ runtimeId, runtime: firstRuntime, callbacks }));
    expect(firstRuntime.getOperationalContext(agentId)).toBe("bounded synthetic context");

    await firstRuntime.submitEvidence({
      correlationId,
      runtimeId,
      agentId,
      taskId,
      claim: "synthetic evidence candidate",
      provenanceSummary: "test runtime"
    });
    await firstRuntime.reportProgress({
      correlationId,
      runtimeId,
      agentId,
      taskId,
      summary: "50%"
    });
    await firstRuntime.reportResult({
      correlationId,
      runtimeId,
      agentId,
      taskId,
      summary: "complete"
    });
    await firstRuntime.reportFailure({
      correlationId,
      runtimeId,
      agentId,
      taskId,
      summary: "none"
    });
    expect(received).toEqual([
      "evidence:synthetic evidence candidate",
      "progress:50%",
      "result:complete",
      "failure:none"
    ]);

    const replacementRuntime = new TestRuntimeAdapter();
    expect(replacementRuntime.getOperationalContext(agentId)).toBeUndefined();
    await executeHost(new RuntimeHost({ runtimeId, runtime: replacementRuntime, callbacks }));
    expect(replacementRuntime.getOperationalContext(agentId)).toBe("bounded synthetic context");
  });

  test("HAL durably retains Gateway dispositions and runtime claims without canonical acceptance", async () => {
    const stateDirectory = await mkdtemp(path.join(os.tmpdir(), "hal-runtime-journal-"));
    try {
      const journal = new RuntimeJournal(stateDirectory);
      const recorder = new RuntimeSubmissionRecorder({
        journal,
        gateway: new LocalSyntheticCapabilityGateway()
      });
      const runtime = new TestRuntimeAdapter();
      await executeHost(new RuntimeHost({ runtimeId, runtime, callbacks: recorder }));
      const permitted = await runtime.requestCapability({
        requestId: "request_4" as ImmutableIdentifier,
        correlationId,
        runtimeId,
        agentId,
        taskId,
        capability: M3_CAPABILITY_ID,
        targetSummary: "local_synthetic_corpus",
        taskContextSummary: "bounded synthetic test"
      });
      await runtime.submitEvidence({
        correlationId,
        runtimeId,
        agentId,
        taskId,
        claim: "candidate only",
        provenanceSummary: "test runtime"
      });
      await runtime.requestSubagent({
        correlationId,
        runtimeId,
        parentAgentId: agentId,
        taskId,
        purpose: "bounded synthetic child request"
      });
      await runtime.reportFailure({
        correlationId,
        runtimeId,
        agentId,
        taskId,
        summary: "contained synthetic failure"
      });

      expect(permitted.status).toBe("permitted");
      const recovered = new RuntimeJournal(stateDirectory).listByCorrelationId(correlationId);
      expect(recovered.map((record) => record.recordKind)).toEqual([
        "capability_request",
        "evidence_submission",
        "subagent_request",
        "failure_report"
      ]);
      expect(
        recovered.every((record) => record.canonicalStatus === "unaccepted_runtime_claim")
      ).toBe(true);
      expect(recovered[0]?.disposition).toBe("permitted");
    } finally {
      await rm(stateDirectory, { recursive: true, force: true });
    }
  });
});
