import { describe, expect, test } from "vitest";

import { createDesktopControlChat } from "../src/desktopAssistant/controlChat.js";

describe("desktop conversational control gate", () => {
  test("executes read-only intents and requires a second approval for consequential work", async () => {
    const events: string[] = [];
    const chat = createDesktopControlChat({
      dispatch: async (proposal) => `ran:${proposal.operation}`,
      record: (event) => events.push(event.eventType)
    });
    await expect(chat("matrix image")).resolves.toMatchObject({
      result: "completed",
      response: "ran:matrix_image"
    });
    const proposal = await chat("research");
    expect(proposal).toMatchObject({
      result: "approval_required",
      proposal: { operation: "research" }
    });
    await expect(chat(`approve ${proposal.proposal?.proposalId}`)).resolves.toMatchObject({
      result: "completed",
      response: "ran:research"
    });
    expect(events).toEqual(["proposed", "completed", "proposed", "approved", "completed"]);
  });

  test("rejects arbitrary terminal grammar and unknown approvals", async () => {
    const chat = createDesktopControlChat({
      dispatch: async () => "unused",
      record: () => undefined
    });
    await expect(chat("rm -rf /")).resolves.toMatchObject({
      result: "blocked",
      reasonCode: "unsupported_control_intent"
    });
    await expect(chat("approve 00000000-0000-0000-0000-000000000000")).resolves.toMatchObject({
      result: "blocked",
      reasonCode: "unknown_or_expired_proposal"
    });
  });
});
