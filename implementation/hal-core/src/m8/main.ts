import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  BrowserWindow,
  app,
  dialog,
  ipcMain,
  protocol,
  type BrowserWindowConstructorOptions,
  type IpcMainInvokeEvent
} from "electron";

import { resolveAndValidateLocalInquiryStateDirectory } from "../inquiry/localInquiryService.js";
import {
  buildDeniedStateDirectoryStatus,
  M8_IPC_CHANNELS,
  parseM8QuestionSubmission,
  parseM8ReplaySubmission,
  validateM8IpcSender
} from "./ipcContracts.js";
import { buildBlockedPanel, createM8InquiryExecutor } from "./presentationService.js";
import type { M8BoundaryMode, M8StateDirectoryStatus } from "./types.js";
import {
  M8_APP_PROTOCOL,
  M8_APP_HOST,
  createM8WebPreferences,
  getMimeTypeForAsset,
  isAllowedM8Navigation,
  parseM8ProtocolRequestUrl,
  resolveRendererAssetPath,
  toM8AppUrl
} from "./securityPolicy.js";

protocol.registerSchemesAsPrivileged([
  {
    scheme: M8_APP_PROTOCOL,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: false,
      corsEnabled: false,
      bypassCSP: false
    }
  }
]);

const BOUNDARY_MODES: readonly M8BoundaryMode[] = Object.freeze([
  "local_only",
  "synthetic_only",
  "deterministic",
  "non_live_effect"
]);

export type M8DesktopLaunchOptions = Readonly<{
  rendererRoot: string;
  preloadPath: string;
}>;

type M8InMemoryState = {
  selectedStateDirectory?: string;
  selectionError?: string;
};

export function createM8WindowOptions(input: {
  preloadPath: string;
}): BrowserWindowConstructorOptions {
  return Object.freeze({
    width: 980,
    height: 760,
    minWidth: 840,
    minHeight: 640,
    title: "HAL M8 Offline Desktop Interface",
    webPreferences: createM8WebPreferences(input.preloadPath)
  });
}

export async function launchM8DesktopApp(options: M8DesktopLaunchOptions): Promise<void> {
  await app.whenReady();
  app.on("window-all-closed", () => {
    app.quit();
  });
  const inMemoryState: M8InMemoryState = {};
  const executeInquiry = createM8InquiryExecutor();
  const mainWindow = new BrowserWindow(createM8WindowOptions({ preloadPath: options.preloadPath }));

  await registerM8Protocol(options.rendererRoot);
  enforceM8Security(mainWindow);
  registerM8IpcHandlers({
    mainWindow,
    inMemoryState,
    executeInquiry
  });

  await mainWindow.loadURL(toM8AppUrl("/index.html"));
}

export async function registerM8Protocol(rendererRoot: string): Promise<void> {
  await protocol.handle(M8_APP_PROTOCOL, async (request) => {
    const parsed = parseM8ProtocolRequestUrl(request.url);
    if (!parsed.ok) {
      return new Response("Not found", { status: 404 });
    }
    const assetPath = resolveRendererAssetPath(rendererRoot, parsed.pathname);
    if (!assetPath) {
      return new Response("Not found", { status: 404 });
    }
    const body = await readFile(assetPath);
    return new Response(body, {
      headers: {
        "content-type": getMimeTypeForAsset(assetPath)
      }
    });
  });
}

function enforceM8Security(mainWindow: BrowserWindow): void {
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  mainWindow.webContents.on("will-attach-webview", (event) => {
    event.preventDefault();
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!isAllowedM8Navigation(url)) {
      event.preventDefault();
    }
  });
  mainWindow.webContents.session.setPermissionRequestHandler(
    (_webContents, _permission, callback) => {
      callback(false);
    }
  );
}

function registerM8IpcHandlers(input: {
  mainWindow: BrowserWindow;
  inMemoryState: M8InMemoryState;
  executeInquiry: ReturnType<typeof createM8InquiryExecutor>;
}): void {
  const validateSender = (event: IpcMainInvokeEvent): string | undefined =>
    (() => {
      const senderFrame = event.senderFrame;
      if (!senderFrame) {
        return "unexpected_frame";
      }
      return validateM8IpcSender({
        senderId: event.sender.id,
        expectedSenderId: input.mainWindow.webContents.id,
        senderUrl: senderFrame.url,
        expectedProtocol: `${M8_APP_PROTOCOL}:`,
        expectedHost: M8_APP_HOST,
        expectedDocumentPath: "/index.html",
        isMainFrame: senderFrame === event.sender.mainFrame
      });
    })();
  const requireTrustedSender = (event: IpcMainInvokeEvent): string | undefined => {
    const senderError = validateSender(event);
    if (!senderError) {
      return undefined;
    }
    return senderError;
  };

  ipcMain.handle(M8_IPC_CHANNELS.getBoundary, (event) => {
    const senderError = requireTrustedSender(event);
    if (senderError) {
      return Object.freeze(BOUNDARY_MODES);
    }
    return Object.freeze(BOUNDARY_MODES);
  });

  ipcMain.handle(M8_IPC_CHANNELS.getStateDirectoryStatus, (event) => {
    const senderError = requireTrustedSender(event);
    if (senderError) {
      return buildDeniedStateDirectoryStatus();
    }
    return buildStateDirectoryStatus(input.inMemoryState);
  });

  ipcMain.handle(M8_IPC_CHANNELS.pickStateDirectory, async (event) => {
    const senderError = requireTrustedSender(event);
    if (senderError) {
      return buildDeniedStateDirectoryStatus();
    }
    const selection = await dialog.showOpenDialog(input.mainWindow, {
      properties: ["openDirectory", "dontAddToRecent", "noResolveAliases"]
    });
    if (selection.canceled || selection.filePaths.length === 0) {
      input.inMemoryState.selectionError = "state_directory_not_selected";
      return buildStateDirectoryStatus(input.inMemoryState, "state_directory_not_selected");
    }
    const candidatePath = selection.filePaths[0];
    try {
      const validated = resolveAndValidateLocalInquiryStateDirectory(candidatePath ?? "");
      input.inMemoryState.selectedStateDirectory = validated;
      delete input.inMemoryState.selectionError;
      return buildStateDirectoryStatus(input.inMemoryState);
    } catch (error) {
      input.inMemoryState.selectionError = (error as Error).message;
      return buildStateDirectoryStatus(input.inMemoryState, "state_directory_validation_failed");
    }
  });

  ipcMain.handle(M8_IPC_CHANNELS.submitQuestion, (event, payload: unknown) => {
    const senderError = requireTrustedSender(event);
    if (senderError) {
      return buildBlockedPanel({
        code: "ipc_validation_failed",
        reason: senderError,
        requestId: "unavailable",
        correlationId: "unavailable"
      });
    }
    const parsed = parseM8QuestionSubmission(payload);
    if (!parsed || !parsed.questionText.trim()) {
      return buildBlockedPanel({
        code: "malformed_input",
        reason: "question_required",
        requestId: "unavailable",
        correlationId: "unavailable"
      });
    }
    if (!input.inMemoryState.selectedStateDirectory) {
      return buildBlockedPanel({
        code: "state_directory_validation_failed",
        reason: "state_directory_not_selected",
        requestId: "unavailable",
        correlationId: "unavailable"
      });
    }
    return input.executeInquiry({
      stateDirectory: input.inMemoryState.selectedStateDirectory,
      questionText: parsed.questionText,
      replayIntentional: false
    });
  });

  ipcMain.handle(M8_IPC_CHANNELS.submitReplay, (event, payload: unknown) => {
    const senderError = requireTrustedSender(event);
    if (senderError) {
      return buildBlockedPanel({
        code: "ipc_validation_failed",
        reason: senderError,
        requestId: "unavailable",
        correlationId: "unavailable"
      });
    }
    const parsed = parseM8ReplaySubmission(payload);
    if (!parsed || !parsed.requestId.trim() || !parsed.questionText.trim()) {
      return buildBlockedPanel({
        code: "malformed_input",
        reason: "request_id_and_question_required",
        requestId: "unavailable",
        correlationId: "unavailable"
      });
    }
    if (!input.inMemoryState.selectedStateDirectory) {
      return buildBlockedPanel({
        code: "state_directory_validation_failed",
        reason: "state_directory_not_selected",
        requestId: "unavailable",
        correlationId: "unavailable"
      });
    }
    return input.executeInquiry({
      stateDirectory: input.inMemoryState.selectedStateDirectory,
      questionText: parsed.questionText,
      replayIntentional: true,
      requestId: parsed.requestId
    });
  });
}

function buildStateDirectoryStatus(
  state: M8InMemoryState,
  error?: string
): Readonly<M8StateDirectoryStatus> {
  return Object.freeze({
    selected: Boolean(state.selectedStateDirectory),
    ...(state.selectedStateDirectory ? { stateDirectory: state.selectedStateDirectory } : {}),
    ...(error ? { error } : {}),
    ...(state.selectionError ? { error: state.selectionError } : {})
  });
}

export function resolveM8RuntimePaths(projectRoot: string): M8DesktopLaunchOptions {
  return Object.freeze({
    rendererRoot: path.resolve(projectRoot, "dist/src/m8/renderer"),
    preloadPath: path.resolve(projectRoot, "dist/src/m8/preload.js")
  });
}
