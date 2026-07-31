import path from "node:path";

import * as electron from "electron";

import { launchM8DesktopApp, resolveM8RuntimePaths } from "../m8/main.js";

const electronRuntime = (
  "default" in electron
    ? ((electron as { default: typeof electron }).default as unknown)
    : (electron as unknown)
) as typeof electron;
const { app } = electronRuntime;

async function main(): Promise<void> {
  const projectRoot = path.resolve(import.meta.dirname, "../../..");
  const runtimePaths = resolveM8RuntimePaths(projectRoot);
  await launchM8DesktopApp(runtimePaths);
}

main().catch((error: unknown) => {
  console.error((error as Error).message);
  app.exit(1);
});
