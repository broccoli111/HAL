import { describe, expect, test } from "vitest";

import { renderDesktopAssistantResponse } from "../src/desktopAssistant/terminalOutput.js";

describe("desktop assistant terminal output presentation", () => {
  test("removes only known terminal framing while preserving answer text", () => {
    expect(
      renderDesktopAssistantResponse(
        [
          "HAL local-document pilot assistant (bounded, stateless; type /exit to end). Context is non-canonical; no tools or resource capabilities are available.",
          "HAL> Green is listed in the approved source.",
          "HAL local-document pilot assistant session ended."
        ].join("\n")
      )
    ).toBe("Green is listed in the approved source.");
  });

  test("preserves multiline model responses and unrelated HAL text", () => {
    expect(
      renderDesktopAssistantResponse(
        "HAL> First line\nSecond line\nHAL is still part of this answer."
      )
    ).toBe("First line\nSecond line\nHAL is still part of this answer.");
  });
});
