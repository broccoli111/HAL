"use strict";

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
  "halDesktopAssistant",
  Object.freeze({
    submitQuestion: async (payload) =>
      await ipcRenderer.invoke("desktop-assistant:submit-question", payload),
    submitControl: async (payload) =>
      await ipcRenderer.invoke("desktop-assistant:submit-control", payload)
  })
);
