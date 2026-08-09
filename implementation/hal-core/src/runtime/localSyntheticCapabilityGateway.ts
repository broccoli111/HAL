import { evaluateLocalPolicy } from "../authority/localPolicy.js";
import { SafeMode } from "../kernel/safeMode.js";
import { createLocalRequest } from "../request/model.js";
import type { RequestId } from "../shared/types.js";
import { M3_CAPABILITY_ID } from "../m3/types.js";
import type { RuntimeCapabilityDisposition, RuntimeCapabilityRequest } from "./agentRuntime.js";

const SYNTHETIC_TARGET = "local_synthetic_corpus";

/**
 * HAL-owned, local-only bridge to the already admitted synthetic inspection
 * policy. It makes a permit/deny decision only; it never returns a resource,
 * credential, or execution handle to the runtime.
 */
export class LocalSyntheticCapabilityGateway {
  public async requestCapability(
    request: RuntimeCapabilityRequest
  ): Promise<RuntimeCapabilityDisposition> {
    if (request.capability !== M3_CAPABILITY_ID || request.targetSummary !== SYNTHETIC_TARGET) {
      return Object.freeze({
        status: "denied",
        reason: "Requested capability or target is not admitted by the local synthetic Gateway.",
        capabilityManifest: Object.freeze([])
      });
    }

    const decision = evaluateLocalPolicy(
      createLocalRequest({
        requestId: request.requestId as unknown as RequestId,
        correlationId: request.correlationId,
        declaredAction: request.capability,
        declaredTarget: request.targetSummary,
        declaredPurpose: request.taskContextSummary,
        requestedAtIso8601: new Date().toISOString(),
        dataClassification: "synthetic_non_sensitive"
      }),
      new SafeMode("restrictive")
    );
    if (decision.disposition !== "allow") {
      return Object.freeze({
        status: decision.disposition === "approval_required" ? "approval_required" : "denied",
        reason: decision.reason,
        capabilityManifest: Object.freeze([])
      });
    }

    return Object.freeze({
      status: "permitted",
      reason: decision.reason,
      capabilityManifest: Object.freeze([M3_CAPABILITY_ID])
    });
  }
}
