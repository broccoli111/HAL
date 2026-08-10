/**
 * The desktop launcher owns a process group on Unix so a bounded dispatch can
 * terminate the launcher and any descendants together. Windows uses the child
 * PID directly because negative process-group signals are not supported.
 */
export function desktopAssistantTerminationTarget(input: {
  pid: number | undefined;
  platform: string;
}): number | undefined {
  if (!input.pid || input.pid <= 0) return undefined;
  return input.platform === "win32" ? input.pid : -input.pid;
}

export function shouldDetachDesktopAssistantLauncher(platform: string): boolean {
  return platform !== "win32";
}
