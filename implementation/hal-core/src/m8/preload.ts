import * as electron from "electron";

import { M8_IPC_CHANNELS } from "./ipcContracts.js";
import type {
  M8BoundaryMode,
  M8InquiryPanel,
  M8PackActivationRequest,
  M8PackActivationResult,
  M8PackStatus,
  M8QuestionSubmission,
  M8ReplaySubmission,
  M8StateDirectoryStatus
} from "./types.js";

const electronRuntime = (
  "default" in electron
    ? ((electron as { default: typeof electron }).default as unknown)
    : (electron as unknown)
) as typeof electron;
const { contextBridge, ipcRenderer } = electronRuntime;

export type M8RendererApi = Readonly<{
  getBoundaryModes: () => Promise<readonly M8BoundaryMode[]>;
  getStateDirectoryStatus: () => Promise<M8StateDirectoryStatus>;
  getPackStatus: () => Promise<M8PackStatus>;
  // eslint-disable-next-line no-unused-vars
  requestPackActivation: (payload: M8PackActivationRequest) => Promise<M8PackActivationResult>;
  pickStateDirectory: () => Promise<M8StateDirectoryStatus>;
  // eslint-disable-next-line no-unused-vars
  submitQuestion: (payload: M8QuestionSubmission) => Promise<M8InquiryPanel>;
  // eslint-disable-next-line no-unused-vars
  submitReplay: (payload: M8ReplaySubmission) => Promise<M8InquiryPanel>;
}>;

const api: M8RendererApi = Object.freeze({
  getBoundaryModes: async () => await ipcRenderer.invoke(M8_IPC_CHANNELS.getBoundary),
  getStateDirectoryStatus: async () =>
    await ipcRenderer.invoke(M8_IPC_CHANNELS.getStateDirectoryStatus),
  getPackStatus: async () => await ipcRenderer.invoke(M8_IPC_CHANNELS.getPackStatus),
  requestPackActivation: async (payload) =>
    await ipcRenderer.invoke(M8_IPC_CHANNELS.requestPackActivation, payload),
  pickStateDirectory: async () => await ipcRenderer.invoke(M8_IPC_CHANNELS.pickStateDirectory),
  submitQuestion: async (payload) =>
    await ipcRenderer.invoke(M8_IPC_CHANNELS.submitQuestion, payload),
  submitReplay: async (payload) => await ipcRenderer.invoke(M8_IPC_CHANNELS.submitReplay, payload)
});

contextBridge.exposeInMainWorld("halM8", api);
