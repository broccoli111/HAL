import { describe, expect, test } from "vitest";

import {
  DESKTOP_ASSISTANT_MAX_QUESTION_CHARS,
  parseDesktopAssistantQuestionRequest,
  validateDesktopAssistantIpcSender
} from "../src/desktopAssistant/ipcContracts.js";
import { createDesktopAssistantQuestionGate } from "../src/desktopAssistant/questionGate.js";
import { resolveDesktopAssistantAssetPath } from "../src/desktopAssistant/securityPolicy.js";

describe("bounded desktop assistant IPC", () => {
  test("admits only fixed scopes and bounded non-empty questions", () => {
    expect(
      parseDesktopAssistantQuestionRequest({ scope: "canon", questionText: " What is HAL? " })
    ).toEqual({
      scope: "canon",
      questionText: "What is HAL?"
    });
    expect(
      parseDesktopAssistantQuestionRequest({ scope: "other", questionText: "question" })
    ).toBeUndefined();
    expect(
      parseDesktopAssistantQuestionRequest({ scope: "canon", questionText: " " })
    ).toBeUndefined();
    expect(
      parseDesktopAssistantQuestionRequest({
        scope: "canon",
        questionText: "a".repeat(DESKTOP_ASSISTANT_MAX_QUESTION_CHARS + 1)
      })
    ).toBeUndefined();
  });

  test("rejects non-main, non-local IPC senders", () => {
    expect(
      validateDesktopAssistantIpcSender({
        senderId: 1,
        expectedSenderId: 1,
        senderUrl: "hal-desktop://app/index.html",
        isMainFrame: true
      })
    ).toBeUndefined();
    expect(
      validateDesktopAssistantIpcSender({
        senderId: 1,
        expectedSenderId: 1,
        senderUrl: "https://example.com/",
        isMainFrame: true
      })
    ).toBe("unexpected_origin");
  });

  test("serves only fixed packaged desktop assets", () => {
    expect(resolveDesktopAssistantAssetPath("/tmp/hal-ui", "hal-desktop://app/index.html")).toBe(
      "/tmp/hal-ui/index.html"
    );
    expect(
      resolveDesktopAssistantAssetPath("/tmp/hal-ui", "hal-desktop://app/../../secret")
    ).toBeUndefined();
    expect(
      resolveDesktopAssistantAssetPath("/tmp/hal-ui", "https://example.com/index.html")
    ).toBeUndefined();
  });

  test("HAL main process permits only one in-flight desktop dispatch", async () => {
    let releaseFirst: (() => void) | undefined;
    const firstPending = new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });
    const dispatchQuestion = createDesktopAssistantQuestionGate(async () => {
      await firstPending;
      return { result: "completed" as const, response: "first result" };
    });
    const request = { scope: "canon" as const, questionText: "What is HAL?" };
    const first = dispatchQuestion(request);

    await expect(dispatchQuestion(request)).resolves.toEqual({
      result: "blocked",
      response: "",
      reasonCode: "desktop_request_in_progress"
    });
    releaseFirst?.();
    await expect(first).resolves.toEqual({ result: "completed", response: "first result" });
    await expect(dispatchQuestion(request)).resolves.toEqual({
      result: "completed",
      response: "first result"
    });
  });
});
