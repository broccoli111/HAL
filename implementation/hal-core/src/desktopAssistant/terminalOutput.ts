/**
 * Removes only the known terminal-shell framing emitted by the existing
 * bounded assistant launchers. Model text is otherwise preserved verbatim.
 */
export function renderDesktopAssistantResponse(terminalOutput: string): string {
  return terminalOutput
    .split(/\r?\n/)
    .filter((line) => !isTerminalFraming(line))
    .map((line) => line.replace(/^HAL>\s?/, ""))
    .join("\n")
    .trim();
}

function isTerminalFraming(line: string): boolean {
  return (
    /^HAL .*assistant \(bounded, stateless; type \/exit to end\)\./.test(line) ||
    /^HAL .*assistant session ended\.$/.test(line)
  );
}
