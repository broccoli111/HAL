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
const packActiveStatus = byId<HTMLElement>("pack-active-status");
const packList = byId<HTMLUListElement>("pack-list");
const packSelectInput = byId<HTMLInputElement>("pack-select-input");
const packActivateButton = byId<HTMLButtonElement>("pack-activate");
const packDeactivateButton = byId<HTMLButtonElement>("pack-deactivate");
const packActionResult = byId<HTMLElement>("pack-action-result");
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

async function refreshPackStatus(): Promise<void> {
  const status = await window.halM8.getPackStatus();
  packList.innerHTML = "";
  for (const pack of status.approvedPacks) {
    const item = document.createElement("li");
    item.textContent = `${pack.packId}@${pack.packVersion} hash=${pack.manifestHashSha256}`;
    packList.appendChild(item);
  }
  if (status.activePack) {
    packActiveStatus.textContent = `active pack: ${status.activePack.packId}@${status.activePack.packVersion} activationRecordId=${status.activePack.activationRecordId}`;
    if (!packSelectInput.value.trim()) {
      packSelectInput.value = status.activePack.packId;
    }
  } else {
    packActiveStatus.textContent = "active pack: none";
  }
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

const M8_RENDERER_ERROR_CODES = Object.freeze({
  pickerUnavailable: "state_directory_picker_unavailable",
  questionSubmitUnavailable: "question_submission_unavailable",
  replaySubmitUnavailable: "replay_submission_unavailable",
  initializationUnavailable: "renderer_initialization_unavailable"
});

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
      error: M8_RENDERER_ERROR_CODES.pickerUnavailable
    });
  }
}

pickStateDirectoryButton.addEventListener("click", async () => {
  clearResultError();
  try {
    const status = await window.halM8.pickStateDirectory();
    writeStateDirectoryStatus(status);
    await refreshPackStatus();
  } catch {
    writeStateDirectoryStatus({
      selected: false,
      error: M8_RENDERER_ERROR_CODES.pickerUnavailable
    });
  }
});

packActivateButton.addEventListener("click", async () => {
  packActionResult.textContent = "";
  const packId = packSelectInput.value.trim();
  if (!packId) {
    packActionResult.textContent = "pack_id_required";
    return;
  }
  const response = await window.halM8.requestPackActivation({
    requestId: window.crypto.randomUUID(),
    ownerDisposition: "activate",
    packId,
    ownerConfirmation: "local_owner_confirmed",
    reasonCode: "owner_local_activation"
  });
  packActionResult.textContent = `requestId=${response.requestId} result=${response.result} reason=${response.resultReasonCode} replayed=${String(response.replayed)} conflict=${String(response.conflict)} correlationId=${response.correlationId}`;
  await refreshPackStatus();
});

packDeactivateButton.addEventListener("click", async () => {
  packActionResult.textContent = "";
  const response = await window.halM8.requestPackActivation({
    requestId: window.crypto.randomUUID(),
    ownerDisposition: "deactivate",
    ownerConfirmation: "local_owner_confirmed",
    reasonCode: "owner_local_deactivation"
  });
  packActionResult.textContent = `requestId=${response.requestId} result=${response.result} reason=${response.resultReasonCode} replayed=${String(response.replayed)} conflict=${String(response.conflict)} correlationId=${response.correlationId}`;
  await refreshPackStatus();
});

submitQuestionButton.addEventListener("click", async () => {
  clearResultError();
  const questionText = questionInput.value;
  if (!questionText.trim()) {
    setResultError("Question is required.");
    return;
  }
  try {
    const panel = await window.halM8.submitQuestion({ questionText });
    writeResult(panel);
  } catch {
    setResultError(M8_RENDERER_ERROR_CODES.questionSubmitUnavailable);
  }
});

submitReplayButton.addEventListener("click", async () => {
  clearResultError();
  const requestId = replayRequestIdInput.value;
  const questionText = replayQuestionInput.value;
  if (!requestId.trim() || !questionText.trim()) {
    setResultError("Replay request ID and question are required.");
    return;
  }
  try {
    const panel = await window.halM8.submitReplay({
      requestId,
      questionText
    });
    writeResult(panel);
  } catch {
    setResultError(M8_RENDERER_ERROR_CODES.replaySubmitUnavailable);
  }
});

void (async () => {
  try {
    await refreshBoundaryModes();
    await refreshStateDirectoryStatus();
    await refreshPackStatus();
  } catch {
    setResultError(M8_RENDERER_ERROR_CODES.initializationUnavailable);
  }
})();
