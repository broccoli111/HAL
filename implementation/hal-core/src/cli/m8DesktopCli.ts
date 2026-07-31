import path from "node:path";

import { app } from "electron";

import { launchM8DesktopApp, resolveM8RuntimePaths } from "../m8/main.js";

async function main(): Promise<void> {
  const projectRoot = path.resolve(import.meta.dirname, "../../..");
  const runtimePaths = resolveM8RuntimePaths(projectRoot);
  await launchM8DesktopApp(runtimePaths);
}

main().catch((error: unknown) => {
  console.error((error as Error).message);
  app.exit(1);
});
