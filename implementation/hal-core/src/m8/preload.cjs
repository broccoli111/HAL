"use strict";

const { contextBridge, ipcRenderer } = require("electron");

const M8_IPC_CHANNELS = Object.freeze({
  getBoundary: "m8:get-boundary",
  pickStateDirectory: "m8:pick-state-directory",
  getStateDirectoryStatus: "m8:get-state-directory-status",
  submitQuestion: "m8:submit-question",
  submitReplay: "m8:submit-replay"
});

const api = Object.freeze({
  getBoundaryModes: async () => await ipcRenderer.invoke(M8_IPC_CHANNELS.getBoundary),
  getStateDirectoryStatus: async () =>
    await ipcRenderer.invoke(M8_IPC_CHANNELS.getStateDirectoryStatus),
  pickStateDirectory: async () => await ipcRenderer.invoke(M8_IPC_CHANNELS.pickStateDirectory),
  submitQuestion: async (payload) =>
    await ipcRenderer.invoke(M8_IPC_CHANNELS.submitQuestion, payload),
  submitReplay: async (payload) => await ipcRenderer.invoke(M8_IPC_CHANNELS.submitReplay, payload)
});

contextBridge.exposeInMainWorld("halM8", api);
