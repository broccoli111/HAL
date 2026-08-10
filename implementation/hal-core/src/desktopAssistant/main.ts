import { readFile } from "node:fs/promises";
import path from "node:path";

import * as electron from "electron";
import type { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

import {
  DESKTOP_ASSISTANT_IPC_CHANNEL,
  parseDesktopAssistantQuestionRequest,
  validateDesktopAssistantIpcSender
} from "./ipcContracts.js";
import type { DesktopAssistantQuestionResult } from "./types.js";
import {
  createDesktopAssistantQuestionGate,
  type DesktopAssistantQuestionDispatcher
} from "./questionGate.js";
import {
  DESKTOP_ASSISTANT_HOST,
  DESKTOP_ASSISTANT_PROTOCOL,
  isAllowedDesktopAssistantNavigation,
  resolveDesktopAssistantAssetPath
} from "./securityPolicy.js";
import { createM8WebPreferences } from "../m8/securityPolicy.js";

const electronRuntime = (
  "default" in electron
    ? ((electron as { default: typeof electron }).default as unknown)
    : (electron as unknown)
) as typeof electron;
const { BrowserWindow: ElectronBrowserWindow, app, ipcMain, protocol } = electronRuntime;

protocol.registerSchemesAsPrivileged([
  {
    scheme: DESKTOP_ASSISTANT_PROTOCOL,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: false,
      corsEnabled: false,
      bypassCSP: false
    }
  }
]);

export type DesktopAssistantLaunchOptions = Readonly<{
  rendererRoot: string;
  preloadPath: string;
  dispatchQuestion: DesktopAssistantQuestionDispatcher;
}>;

export function createDesktopAssistantWindowOptions(input: {
  preloadPath: string;
}): BrowserWindowConstructorOptions {
  return Object.freeze({
    width: 920,
    height: 720,
    minWidth: 720,
    minHeight: 540,
    title: "HAL Local Assistant",
    webPreferences: createM8WebPreferences(input.preloadPath)
  });
}

export async function launchDesktopAssistantApp(
  options: DesktopAssistantLaunchOptions
): Promise<void> {
  await app.whenReady();
  app.on("window-all-closed", () => app.quit());
  await registerDesktopAssistantProtocol(options.rendererRoot);
  const mainWindow = new ElectronBrowserWindow(
    createDesktopAssistantWindowOptions({ preloadPath: options.preloadPath })
  );
  enforceDesktopAssistantSecurity(mainWindow);
  registerDesktopAssistantIpcHandlers(mainWindow, options.dispatchQuestion);
  await mainWindow.loadURL(`${DESKTOP_ASSISTANT_PROTOCOL}://${DESKTOP_ASSISTANT_HOST}/index.html`);
}

export async function registerDesktopAssistantProtocol(rendererRoot: string): Promise<void> {
  await protocol.handle(DESKTOP_ASSISTANT_PROTOCOL, async (request) => {
    const assetPath = resolveDesktopAssistantAssetPath(rendererRoot, request.url);
    if (!assetPath) return new Response("Not found", { status: 404 });
    return new Response(await readFile(assetPath), {
      headers: { "content-type": mimeType(assetPath) }
    });
  });
}

export function registerDesktopAssistantIpcHandlers(
  mainWindow: BrowserWindow,
  dispatchQuestion: DesktopAssistantQuestionDispatcher
): void {
  const dispatchOneAtATime = createDesktopAssistantQuestionGate(dispatchQuestion);
  ipcMain.handle(DESKTOP_ASSISTANT_IPC_CHANNEL, async (event, payload: unknown) => {
    const senderFrame = event.senderFrame;
    const senderError = validateDesktopAssistantIpcSender({
      senderId: event.sender.id,
      expectedSenderId: mainWindow.webContents.id,
      senderUrl: senderFrame?.url ?? "",
      isMainFrame: senderFrame === event.sender.mainFrame
    });
    if (senderError) return blocked("ipc_validation_failed");
    const request = parseDesktopAssistantQuestionRequest(payload);
    if (!request) return blocked("malformed_question_or_scope");
    return await dispatchOneAtATime(request);
  });
}

export function resolveDesktopAssistantRuntimePaths(input: {
  projectRoot: string;
  dispatchQuestion: DesktopAssistantQuestionDispatcher;
}): DesktopAssistantLaunchOptions {
  return Object.freeze({
    rendererRoot: path.resolve(input.projectRoot, "dist/src/desktopAssistant/renderer"),
    preloadPath: path.resolve(input.projectRoot, "dist/src/desktopAssistant/preload.cjs"),
    dispatchQuestion: input.dispatchQuestion
  });
}

function blocked(reasonCode: string): DesktopAssistantQuestionResult {
  return Object.freeze({ result: "blocked", response: "", reasonCode });
}

function enforceDesktopAssistantSecurity(mainWindow: BrowserWindow): void {
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  mainWindow.webContents.on("will-attach-webview", (event) => event.preventDefault());
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!isAllowedDesktopAssistantNavigation(url)) event.preventDefault();
  });
  mainWindow.webContents.session.setPermissionRequestHandler(
    (_webContents, _permission, callback) => callback(false)
  );
}

function mimeType(assetPath: string): string {
  if (assetPath.endsWith(".html")) return "text/html; charset=utf-8";
  if (assetPath.endsWith(".css")) return "text/css; charset=utf-8";
  return "text/javascript; charset=utf-8";
}
