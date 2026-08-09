import { describe, expect, test } from "vitest";

import { loadControlledConfiguration } from "../src/kernel/config.js";
import { DEFAULT_SAFE_MODE_STATE, SafeMode } from "../src/kernel/safeMode.js";

describe("loadControlledConfiguration", () => {
  test("loads accepted development configuration", () => {
    const config = loadControlledConfiguration({
      HAL_ENVIRONMENT: "development",
      HAL_SAFE_MODE: "restrictive",
      HAL_OWNER_ID: "owner-local-dev"
    });

    expect(config.environment).toBe("development");
    expect(config.safeMode).toBe("restrictive");
    expect(config.ownerId).toBe("owner-local-dev");
    expect(Object.isFrozen(config)).toBe(true);
  });

  test("rejects missing required keys", () => {
    expect(() =>
      loadControlledConfiguration({
        HAL_ENVIRONMENT: "development",
        HAL_SAFE_MODE: "restrictive"
      })
    ).toThrow(/Missing required configuration keys/);
  });

  test("rejects unknown HAL keys", () => {
    expect(() =>
      loadControlledConfiguration({
        HAL_ENVIRONMENT: "development",
        HAL_SAFE_MODE: "restrictive",
        HAL_OWNER_ID: "owner-local-dev",
        HAL_UNDECLARED: "1"
      })
    ).toThrow(/Unknown HAL configuration keys/);
  });
});

describe("SafeMode", () => {
  test("defaults to restrictive", () => {
    const safeMode = new SafeMode();
    expect(safeMode.getState()).toBe(DEFAULT_SAFE_MODE_STATE);
    expect(safeMode.isRestrictive()).toBe(true);
  });
});
