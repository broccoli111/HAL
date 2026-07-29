import type { SafeModeState } from "./safeMode.js";

export type HalRuntimeEnvironment = "development" | "test";

export type ControlledConfiguration = Readonly<{
  environment: HalRuntimeEnvironment;
  safeMode: SafeModeState;
  ownerId: string;
}>;

const REQUIRED_KEYS = ["HAL_ENVIRONMENT", "HAL_SAFE_MODE", "HAL_OWNER_ID"] as const;
type RequiredKey = (typeof REQUIRED_KEYS)[number];

type AllowedEnvironment = Record<string, string | undefined>;

const ALLOWED_ENVS: readonly HalRuntimeEnvironment[] = ["development", "test"];
const ALLOWED_SAFE_MODES: readonly SafeModeState[] = ["restrictive", "inspection_only"];

export function loadControlledConfiguration(
  source: AllowedEnvironment = process.env
): ControlledConfiguration {
  const missing = REQUIRED_KEYS.filter((key) => !source[key]?.trim());
  if (missing.length > 0) {
    throw new Error(`Missing required configuration keys: ${missing.join(", ")}`);
  }

  const unknownHalKeys = Object.keys(source).filter(
    (key) => key.startsWith("HAL_") && !REQUIRED_KEYS.includes(key as RequiredKey)
  );
  if (unknownHalKeys.length > 0) {
    throw new Error(
      `Unknown HAL configuration keys are not allowed in controlled baseline: ${unknownHalKeys.join(", ")}`
    );
  }

  const environmentValue = source.HAL_ENVIRONMENT as HalRuntimeEnvironment;
  if (!ALLOWED_ENVS.includes(environmentValue)) {
    throw new Error(`HAL_ENVIRONMENT must be one of: ${ALLOWED_ENVS.join(", ")}`);
  }

  const safeModeValue = source.HAL_SAFE_MODE as SafeModeState;
  if (!ALLOWED_SAFE_MODES.includes(safeModeValue)) {
    throw new Error(`HAL_SAFE_MODE must be one of: ${ALLOWED_SAFE_MODES.join(", ")}`);
  }

  const ownerId = source.HAL_OWNER_ID as string;

  return Object.freeze({
    environment: environmentValue,
    safeMode: safeModeValue,
    ownerId
  });
}
