import { describe, expect, test } from "vitest";

import { runM1CoreDemo } from "../src/kernel/m1CoreDemo.js";
import { SafeMode } from "../src/kernel/safeMode.js";
import { evaluateLocalPolicy } from "../src/authority/localPolicy.js";
import { loadLocalRequestFixture } from "../src/request/fixtures.js";
import { loadControlledConfiguration } from "../src/kernel/config.js";

describe("M1 trustworthy core demo behavior", () => {
  test("allowed request produces expected decision and evidence in restrictive mode", () => {
    const result = runM1CoreDemo(
      {
        environment: "development",
        safeMode: "restrictive",
        ownerId: "owner-local-dev"
      },
      "allowed_inspection_request"
    );

    expect(result.decision.disposition).toBe("allow");
    expect(result.claimedEffect).toBe("inspection_only");
    expect(result.auditTrailForCorrelation).toHaveLength(2);
    expect(result.decisionAuditRecord.causationAuditRecordId).toBe(
      result.requestReceiptAuditRecord.auditRecordId
    );
  });

  test("unknown action still returns deny with no claimed effect", () => {
    const result = runM1CoreDemo(
      {
        environment: "development",
        safeMode: "restrictive",
        ownerId: "owner-local-dev"
      },
      "denied_unknown_request"
    );

    expect(result.decision.disposition).toBe("deny");
    expect(result.claimedEffect).toBe("none");
  });

  test("approval-required request returns approval_required and does not execute in restrictive mode", () => {
    const result = runM1CoreDemo(
      {
        environment: "development",
        safeMode: "restrictive",
        ownerId: "owner-local-dev"
      },
      "approval_required_request"
    );

    expect(result.decision.disposition).toBe("approval_required");
    expect(result.decision.disposition).not.toBe("allow");
    expect(result.claimedEffect).toBe("none");
  });

  test("restrictive Safe Mode blocks execution for approval-required fixture", () => {
    const result = runM1CoreDemo(
      {
        environment: "development",
        safeMode: "restrictive",
        ownerId: "owner-local-dev"
      },
      "approval_required_request"
    );

    expect(result.decision.disposition).toBe("approval_required");
    expect(result.claimedEffect).toBe("none");
  });

  test("Safe Mode keeps unknown actions denied", () => {
    const restrictiveSafeMode = new SafeMode("restrictive");
    const request = loadLocalRequestFixture("denied_unknown_request");

    const decision = evaluateLocalPolicy(request, restrictiveSafeMode);
    expect(decision.disposition).toBe("deny");
    expect(decision.reason).toMatch(/Safe Mode restrictive/);
  });
});

describe("configuration fail-closed behavior", () => {
  test("fails on missing and malformed configuration", () => {
    expect(() =>
      loadControlledConfiguration({
        HAL_ENVIRONMENT: "development",
        HAL_SAFE_MODE: "restrictive"
      })
    ).toThrow(/Missing required configuration keys/);

    expect(() =>
      loadControlledConfiguration({
        HAL_ENVIRONMENT: "invalid_environment",
        HAL_SAFE_MODE: "restrictive",
        HAL_OWNER_ID: "owner-local-dev"
      })
    ).toThrow(/HAL_ENVIRONMENT must be one of/);
  });
});
