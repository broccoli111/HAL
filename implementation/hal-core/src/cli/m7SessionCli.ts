import { createInterface } from "node:readline";

import { runM7Session } from "../m7/session.js";

function parseFlag(argv: readonly string[], flag: string): string | undefined {
  const index = argv.indexOf(flag);
  if (index < 0) {
    return undefined;
  }
  return argv[index + 1];
}

function requireFlag(argv: readonly string[], flag: string): string {
  const value = parseFlag(argv, flag);
  if (!value?.trim()) {
    throw new Error(`Missing required ${flag}.`);
  }
  return value.trim();
}

function printUsage(): void {
  console.log("HAL M7 local inquiry session (terminal-only)");
  console.log('Usage: npm run m7:session -- --state-dir "./local-state/m7"');
  console.log(
    "Commands: help, status, ask <question>, ask --request-id <id> --replay-intent <question>, exit"
  );
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (argv.includes("--help")) {
    printUsage();
    return;
  }
  const stateDirectory = requireFlag(argv, "--state-dir");

  const readlineInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  });

  const io = Object.freeze({
    readLine: async (): Promise<string | null> =>
      await new Promise<string | null>((resolve) => {
        const onLine = (line: string) => {
          cleanup();
          resolve(line);
        };
        const onClose = () => {
          cleanup();
          resolve(null);
        };
        const cleanup = () => {
          readlineInterface.off("line", onLine);
          readlineInterface.off("close", onClose);
        };
        readlineInterface.on("line", onLine);
        readlineInterface.on("close", onClose);
        readlineInterface.setPrompt("m7> ");
        readlineInterface.prompt();
      }),
    writeLine: (line: string) => {
      console.log(line);
    }
  });

  try {
    await runM7Session({
      rawStateDirectory: stateDirectory,
      io
    });
  } finally {
    readlineInterface.close();
  }
}

main().catch((error: unknown) => {
  console.error((error as Error).message);
  process.exitCode = 1;
});
