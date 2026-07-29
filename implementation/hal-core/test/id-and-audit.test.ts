import { describe, expect, test } from "vitest";

import { InMemoryAppendOnlyAuditStore } from "../src/audit/memoryAuditStore.js";
import { createCorrelationId, createImmutableIdentifier } from "../src/shared/id.js";

describe("immutable identifiers", () => {
  test("creates stable immutable identifier strings with prefix", () => {
    const first = createImmutableIdentifier("owner");
    const second = createImmutableIdentifier("owner");

    expect(first.startsWith("owner_")).toBe(true);
    expect(second.startsWith("owner_")).toBe(true);
    expect(first).not.toBe(second);
  });
});

describe("InMemoryAppendOnlyAuditStore", () => {
  test("appends and lists immutable audit records", () => {
    const store = new InMemoryAppendOnlyAuditStore("development");
    const correlationId = createCorrelationId();

    const appended = store.append({
      correlationId,
      eventType: "authority_decision",
      details: "Denied because requested action was not admitted."
    });

    const records = store.list();
    expect(records).toHaveLength(1);
    expect(records[0]).toEqual(appended);
    expect(records[0]?.correlationId).toBe(correlationId);
    expect(Object.isFrozen(records[0])).toBe(true);
  });

  test("list returns copy that cannot mutate store order", () => {
    const store = new InMemoryAppendOnlyAuditStore("test");
    const correlationId = createCorrelationId();
    store.append({
      correlationId,
      eventType: "safe_mode_status",
      details: "Safe mode remained restrictive."
    });

    const listed = store.list();
    expect(() => (listed as unknown as Array<unknown>).push("x")).toThrow();
    expect(store.list()).toHaveLength(1);
  });
});
