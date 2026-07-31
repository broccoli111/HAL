import type { M8RendererApi } from "./preload.js";
import type { M8InquiryPanel, M8StateDirectoryStatus } from "./types.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    halM8: M8RendererApi;
  }
}

function byId<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Missing required element: ${id}`);
  }
  return element as T;
}

const boundaryList = byId<HTMLUListElement>("boundary-list");
const stateDirectoryValue = byId<HTMLElement>("state-directory-value");
const stateDirectoryError = byId<HTMLElement>("state-directory-error");
const pickStateDirectoryButton = byId<HTMLButtonElement>("pick-state-directory");
const questionInput = byId<HTMLInputElement>("question-input");
const submitQuestionButton = byId<HTMLButtonElement>("submit-question");
const replayRequestIdInput = byId<HTMLInputElement>("replay-request-id-input");
const replayQuestionInput = byId<HTMLInputElement>("replay-question-input");
const submitReplayButton = byId<HTMLButtonElement>("submit-replay");

const resultRequestId = byId<HTMLElement>("result-request-id");
const resultCorrelationId = byId<HTMLElement>("result-correlation-id");
const resultResult = byId<HTMLElement>("result-result");
const resultDisposition = byId<HTMLElement>("result-disposition");
const resultReplayed = byId<HTMLElement>("result-replayed");
const resultAttestationStatus = byId<HTMLElement>("result-attestation-status");
const resultAttestationEffect = byId<HTMLElement>("result-attestation-effect");
const resultInputClassification = byId<HTMLElement>("result-input-classification");
const resultResponse = byId<HTMLElement>("result-response");
const resultError = byId<HTMLElement>("result-error");

function writeStateDirectoryStatus(status: M8StateDirectoryStatus): void {
  stateDirectoryValue.textContent = status.stateDirectory ?? "not selected";
  stateDirectoryError.textContent = status.error ?? "";
}

function writeResult(panel: M8InquiryPanel): void {
  resultRequestId.textContent = panel.requestId;
  resultCorrelationId.textContent = panel.correlationId;
  resultResult.textContent = panel.result;
  resultDisposition.textContent = panel.disposition;
  resultReplayed.textContent = panel.replayed ? "true" : "false";
  resultAttestationStatus.textContent = panel.attestationStatus;
  resultAttestationEffect.textContent = panel.attestationClaimedEffect;
  resultInputClassification.textContent = panel.inputClassification;
  resultResponse.textContent = panel.response;
}

function clearResultError(): void {
  resultError.textContent = "";
}

function setResultError(message: string): void {
  resultError.textContent = message;
}

async function refreshBoundaryModes(): Promise<void> {
  const modes = await window.halM8.getBoundaryModes();
  boundaryList.innerHTML = "";
  for (const mode of modes) {
    const item = document.createElement("li");
    item.textContent = mode;
    boundaryList.appendChild(item);
  }
}

async function refreshStateDirectoryStatus(): Promise<void> {
  try {
    const status = await window.halM8.getStateDirectoryStatus();
    writeStateDirectoryStatus(status);
  } catch {
    writeStateDirectoryStatus({
      selected: false,
      error: "state_directory_picker_unavailable"
    });
  }
}

pickStateDirectoryButton.addEventListener("click", async () => {
  clearResultError();
  try {
    const status = await window.halM8.pickStateDirectory();
    writeStateDirectoryStatus(status);
  } catch {
    writeStateDirectoryStatus({
      selected: false,
      error: "state_directory_picker_unavailable"
    });
  }
});

submitQuestionButton.addEventListener("click", async () => {
  clearResultError();
  const questionText = questionInput.value;
  if (!questionText.trim()) {
    setResultError("Question is required.");
    return;
  }
  const panel = await window.halM8.submitQuestion({ questionText });
  writeResult(panel);
});

submitReplayButton.addEventListener("click", async () => {
  clearResultError();
  const requestId = replayRequestIdInput.value;
  const questionText = replayQuestionInput.value;
  if (!requestId.trim() || !questionText.trim()) {
    setResultError("Replay request ID and question are required.");
    return;
  }
  const panel = await window.halM8.submitReplay({
    requestId,
    questionText
  });
  writeResult(panel);
});

void (async () => {
  try {
    await refreshBoundaryModes();
    await refreshStateDirectoryStatus();
  } catch (error) {
    setResultError(`Initialization failed: ${(error as Error).message}`);
  }
})();
