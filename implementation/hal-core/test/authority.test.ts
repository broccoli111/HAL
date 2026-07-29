import { describe, expect, test } from "vitest";

import { createAuthorityDecision } from "../src/authority/decision.js";
import { createCorrelationId } from "../src/shared/id.js";

describe("createAuthorityDecision", () => {
  test("supports allow, deny, and approval_required with correlation ID", () => {
    const correlationId = createCorrelationId();
    const allowDecision = createAuthorityDecision(
      "allow",
      "low-risk local operation",
      correlationId
    );
    const denyDecision = createAuthorityDecision("deny", "no admitted authority", correlationId);
    const approvalDecision = createAuthorityDecision(
      "approval_required",
      "owner confirmation required",
      correlationId
    );

    expect(allowDecision.disposition).toBe("allow");
    expect(denyDecision.disposition).toBe("deny");
    expect(approvalDecision.disposition).toBe("approval_required");
    expect(allowDecision.correlationId).toBe(correlationId);
  });

  test("rejects blank reason", () => {
    expect(() => createAuthorityDecision("deny", "   ", createCorrelationId())).toThrow(
      /reason must be non-empty/
    );
  });
});
