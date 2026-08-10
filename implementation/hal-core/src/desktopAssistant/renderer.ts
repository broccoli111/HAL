import type { DesktopAssistantQuestionResult } from "./types.js";

/* global document, window */

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    halDesktopAssistant: Readonly<{
      // eslint-disable-next-line no-unused-vars
      submitQuestion: (payload: unknown) => Promise<DesktopAssistantQuestionResult>;
      // eslint-disable-next-line no-unused-vars
      submitControl: (payload: unknown) => Promise<{
        result: string;
        response: string;
        proposal?: { proposalId: string };
        reasonCode?: string;
      }>;
    }>;
  }
}

const scope = document.querySelector<HTMLSelectElement>("#scope");
const question = document.querySelector<HTMLTextAreaElement>("#question");
const submit = document.querySelector<HTMLButtonElement>("#submit");
const status = document.querySelector<HTMLElement>("#status");
const response = document.querySelector<HTMLElement>("#response");
const control = document.querySelector<HTMLTextAreaElement>("#control");
const controlSubmit = document.querySelector<HTMLButtonElement>("#control-submit");
const controlResponse = document.querySelector<HTMLElement>("#control-response");

if (
  !scope ||
  !question ||
  !submit ||
  !status ||
  !response ||
  !control ||
  !controlSubmit ||
  !controlResponse
) {
  throw new Error("HAL desktop renderer is missing required elements.");
}

submit.addEventListener("click", async () => {
  const questionText = question.value.trim();
  if (!questionText) {
    status.textContent = "Enter a question.";
    return;
  }
  submit.disabled = true;
  status.textContent = "HAL is processing one bounded local-only question…";
  response.textContent = "";
  try {
    const result = await window.halDesktopAssistant.submitQuestion({
      scope: scope.value,
      questionText
    });
    if (result.result === "completed") {
      status.textContent = "Completed. This response is non-canonical and has no capabilities.";
      response.textContent = result.response;
    } else {
      status.textContent = `Blocked: ${result.reasonCode ?? "unavailable"}`;
    }
  } catch {
    status.textContent = "Blocked: desktop_request_unavailable";
  } finally {
    submit.disabled = false;
  }
});

controlSubmit.addEventListener("click", async () => {
  const message = control.value.trim();
  if (!message) return;
  controlSubmit.disabled = true;
  controlResponse.textContent = "HAL is evaluating the control request…";
  try {
    const result = await window.halDesktopAssistant.submitControl({ message });
    if (result.result === "approval_required" && result.proposal) {
      controlResponse.textContent = `${result.response}\nType: approve ${result.proposal.proposalId}`;
    } else if (result.result === "completed") {
      controlResponse.textContent = result.response;
    } else {
      controlResponse.textContent = `Blocked: ${result.reasonCode ?? "unavailable"}`;
    }
  } catch {
    controlResponse.textContent = "Blocked: desktop_control_unavailable";
  } finally {
    controlSubmit.disabled = false;
  }
});
