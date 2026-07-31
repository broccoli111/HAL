import { contextBridge, ipcRenderer } from "electron";

import { M8_IPC_CHANNELS } from "./ipcContracts.js";
import type {
  M8BoundaryMode,
  M8InquiryPanel,
  M8QuestionSubmission,
  M8ReplaySubmission,
  M8StateDirectoryStatus
} from "./types.js";

export type M8RendererApi = Readonly<{
  getBoundaryModes: () => Promise<readonly M8BoundaryMode[]>;
  getStateDirectoryStatus: () => Promise<M8StateDirectoryStatus>;
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
  pickStateDirectory: async () => await ipcRenderer.invoke(M8_IPC_CHANNELS.pickStateDirectory),
  submitQuestion: async (payload) =>
    await ipcRenderer.invoke(M8_IPC_CHANNELS.submitQuestion, payload),
  submitReplay: async (payload) => await ipcRenderer.invoke(M8_IPC_CHANNELS.submitReplay, payload)
});

contextBridge.exposeInMainWorld("halM8", api);
