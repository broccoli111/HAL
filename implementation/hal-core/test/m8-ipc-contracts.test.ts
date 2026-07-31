import { describe, expect, test } from "vitest";

import {
  buildDeniedStateDirectoryStatus,
  parseM8PackActivationRequest,
  parseM8QuestionSubmission,
  parseM8ReplaySubmission,
  validateM8IpcSender
} from "../src/m8/ipcContracts.js";

describe("M8 IPC contracts", () => {
  test("parses valid question payload and rejects malformed payload", () => {
    expect(parseM8QuestionSubmission({ questionText: "what is hal" })).toEqual({
      questionText: "what is hal"
    });
    expect(parseM8QuestionSubmission({ questionText: 3 })).toBeUndefined();
    expect(parseM8QuestionSubmission("bad")).toBeUndefined();
  });

  test("parses valid replay payload and rejects malformed replay payload", () => {
    expect(
      parseM8ReplaySubmission({
        requestId: "m8-replay-001",
        questionText: "what is hal"
      })
    ).toEqual({
      requestId: "m8-replay-001",
      questionText: "what is hal"
    });
    expect(parseM8ReplaySubmission({ requestId: "x" })).toBeUndefined();
    expect(parseM8ReplaySubmission({ requestId: 1, questionText: "x" })).toBeUndefined();
  });

  test("parses request-only M9 activation payload", () => {
    expect(
      parseM8PackActivationRequest({
        requestId: "req-1",
        ownerDisposition: "activate",
        packId: "pack_alpha",
        ownerConfirmation: "local_owner_confirmed",
        reasonCode: "owner_local_activation"
      })
    ).toEqual({
      requestId: "req-1",
      ownerDisposition: "activate",
      packId: "pack_alpha",
      ownerConfirmation: "local_owner_confirmed",
      reasonCode: "owner_local_activation"
    });
    expect(
      parseM8PackActivationRequest({
        requestId: "req-2",
        ownerDisposition: "deactivate",
        ownerConfirmation: "local_owner_confirmed",
        reasonCode: "owner_local_deactivation"
      })
    ).toEqual({
      requestId: "req-2",
      ownerDisposition: "deactivate",
      ownerConfirmation: "local_owner_confirmed",
      reasonCode: "owner_local_deactivation"
    });
    expect(
      parseM8PackActivationRequest({
        requestId: "req-3",
        ownerDisposition: "activate",
        ownerConfirmation: "not_owner",
        reasonCode: "owner_local_activation"
      })
    ).toBeUndefined();
  });

  test("enforces sender identity, frame, and origin", () => {
    expect(
      validateM8IpcSender({
        senderId: 10,
        expectedSenderId: 10,
        senderUrl: "hal-m8://app/index.html",
        expectedProtocol: "hal-m8:",
        expectedHost: "app",
        expectedDocumentPath: "/index.html",
        isMainFrame: true
      })
    ).toBeUndefined();
    expect(
      validateM8IpcSender({
        senderId: 10,
        expectedSenderId: 11,
        senderUrl: "hal-m8://app/index.html",
        expectedProtocol: "hal-m8:",
        expectedHost: "app",
        expectedDocumentPath: "/index.html",
        isMainFrame: true
      })
    ).toBe("unexpected_sender");
    expect(
      validateM8IpcSender({
        senderId: 10,
        expectedSenderId: 10,
        senderUrl: "hal-m8://app/index.html",
        expectedProtocol: "hal-m8:",
        expectedHost: "app",
        expectedDocumentPath: "/index.html",
        isMainFrame: false
      })
    ).toBe("unexpected_frame");
    expect(
      validateM8IpcSender({
        senderId: 10,
        expectedSenderId: 10,
        senderUrl: "https://example.com",
        expectedProtocol: "hal-m8:",
        expectedHost: "app",
        expectedDocumentPath: "/index.html",
        isMainFrame: true
      })
    ).toBe("unexpected_origin");
    expect(
      validateM8IpcSender({
        senderId: 10,
        expectedSenderId: 10,
        senderUrl: "hal-m8://app.evil/index.html",
        expectedProtocol: "hal-m8:",
        expectedHost: "app",
        expectedDocumentPath: "/index.html",
        isMainFrame: true
      })
    ).toBe("unexpected_origin");
    expect(
      validateM8IpcSender({
        senderId: 10,
        expectedSenderId: 10,
        senderUrl: "not-a-url",
        expectedProtocol: "hal-m8:",
        expectedHost: "app",
        expectedDocumentPath: "/index.html",
        isMainFrame: true
      })
    ).toBe("malformed_sender_url");
    expect(
      validateM8IpcSender({
        senderId: 10,
        expectedSenderId: 10,
        senderUrl: "hal-m8://app/renderer.js",
        expectedProtocol: "hal-m8:",
        expectedHost: "app",
        expectedDocumentPath: "/index.html",
        isMainFrame: true
      })
    ).toBe("unexpected_document");
  });

  test("returns minimized denied state status for untrusted sender paths", () => {
    expect(buildDeniedStateDirectoryStatus()).toEqual({
      selected: false,
      error: "ipc_validation_failed"
    });
    expect(buildDeniedStateDirectoryStatus("unexpected_sender")).toEqual({
      selected: false,
      error: "unexpected_sender"
    });
  });
});
