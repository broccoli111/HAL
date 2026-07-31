import { readFile } from "node:fs/promises";
import path from "node:path";

import { beforeEach, describe, expect, test, vi } from "vitest";

const ipcHandlers = new Map<string, unknown>();
const dialogShowOpenDialog = vi.fn();
const resolveAndValidateLocalInquiryStateDirectoryMock = vi.fn((value: string) => value);

vi.mock("electron", () => ({
  BrowserWindow: class {},
  app: {
    focus: vi.fn(),
    whenReady: vi.fn(async () => undefined),
    on: vi.fn(),
    quit: vi.fn()
  },
  dialog: {
    showOpenDialog: dialogShowOpenDialog
  },
  ipcMain: {
    handle: vi.fn((channel: string, handler: unknown) => {
      ipcHandlers.set(channel, handler);
    })
  },
  protocol: {
    registerSchemesAsPrivileged: vi.fn(),
    handle: vi.fn()
  }
}));

vi.mock("../src/inquiry/localInquiryService.js", () => ({
  resolveAndValidateLocalInquiryStateDirectory: resolveAndValidateLocalInquiryStateDirectoryMock
}));

function createMainWindow(id = 10): {
  webContents: { id: number; mainFrame: { url: string } };
  show: () => void;
  focus: () => void;
} {
  return {
    webContents: {
      id,
      mainFrame: { url: "hal-m8://app/index.html" }
    },
    show: () => undefined,
    focus: () => undefined
  };
}

function createTrustedEvent(senderId = 10): {
  sender: { id: number; mainFrame: { url: string } };
  senderFrame: { url: string };
} {
  const mainFrame = { url: "hal-m8://app/index.html" };
  return {
    sender: {
      id: senderId,
      mainFrame
    },
    senderFrame: mainFrame
  };
}

describe("M8 desktop reliability behavior", () => {
  beforeEach(() => {
    vi.resetModules();
    ipcHandlers.clear();
    dialogShowOpenDialog.mockReset();
    resolveAndValidateLocalInquiryStateDirectoryMock.mockReset();
    resolveAndValidateLocalInquiryStateDirectoryMock.mockImplementation((value: string) => value);
  });

  test("asset copy script includes compiled renderer.js copy target", async () => {
    const scriptPath = path.resolve(import.meta.dirname, "../scripts/copy-m8-assets.mjs");
    const source = await readFile(scriptPath, "utf8");
    expect(source).toContain(
      'const compiledRendererScript = path.resolve(projectRoot, "dist/src/m8/renderer.js")'
    );
    expect(source).toContain(
      'await cp(compiledRendererScript, path.resolve(outputDirectory, "renderer.js"), { force: true })'
    );
  });

  test("renderer rejected picker and submit IPC paths use minimized status codes", async () => {
    const rendererPath = path.resolve(import.meta.dirname, "../src/m8/renderer.ts");
    const source = await readFile(rendererPath, "utf8");
    expect(source).toContain('pickerUnavailable: "state_directory_picker_unavailable"');
    expect(source).toContain('questionSubmitUnavailable: "question_submission_unavailable"');
    expect(source).toContain('replaySubmitUnavailable: "replay_submission_unavailable"');
    expect(source).toContain('initializationUnavailable: "renderer_initialization_unavailable"');
    expect(source).not.toContain("Initialization failed:");
    expect(source).not.toContain(".message");
  });

  test("native picker rejection returns minimized status and preserves selected in-memory state", async () => {
    dialogShowOpenDialog.mockRejectedValue(new Error("native picker failure /Users/local/state"));
    const main = await import("../src/m8/main.js");
    const { M8_IPC_CHANNELS } = await import("../src/m8/ipcContracts.js");
    const inMemoryState = {
      selectedStateDirectory: "/safe/existing/state"
    };
    main.registerM8IpcHandlers({
      mainWindow: createMainWindow() as never,
      inMemoryState,
      executeInquiry: vi.fn(() => {
        throw new Error("not used");
      }) as never
    });
    const pickHandler = ipcHandlers.get(M8_IPC_CHANNELS.pickStateDirectory) as
      CallableFunction | undefined;
    const statusHandler = ipcHandlers.get(M8_IPC_CHANNELS.getStateDirectoryStatus) as
      CallableFunction | undefined;
    expect(pickHandler).toBeDefined();
    expect(statusHandler).toBeDefined();
    const pickerResult = await pickHandler!(createTrustedEvent());
    expect(pickerResult).toEqual({
      selected: false,
      error: "state_directory_picker_unavailable"
    });
    expect(JSON.stringify(pickerResult)).not.toContain("/Users/local/state");
    expect(JSON.stringify(pickerResult)).not.toContain("native picker failure");
    const statusResult = statusHandler!(createTrustedEvent());
    expect(statusResult).toEqual({
      selected: true,
      stateDirectory: "/safe/existing/state"
    });
  });

  test("picker cancellation remains distinct from picker unavailable", async () => {
    dialogShowOpenDialog.mockResolvedValue(
      Object.freeze({
        canceled: true,
        filePaths: []
      })
    );
    const main = await import("../src/m8/main.js");
    const { M8_IPC_CHANNELS } = await import("../src/m8/ipcContracts.js");
    const inMemoryState = {};
    main.registerM8IpcHandlers({
      mainWindow: createMainWindow() as never,
      inMemoryState,
      executeInquiry: vi.fn(() => {
        throw new Error("not used");
      }) as never
    });
    const pickHandler = ipcHandlers.get(M8_IPC_CHANNELS.pickStateDirectory) as
      CallableFunction | undefined;
    expect(pickHandler).toBeDefined();
    const pickerResult = await pickHandler!(createTrustedEvent());
    expect(pickerResult).toEqual({
      selected: false,
      error: "state_directory_not_selected"
    });
  });

  test("untrusted sender cannot open picker or receive selected path", async () => {
    dialogShowOpenDialog.mockResolvedValue(
      Object.freeze({
        canceled: false,
        filePaths: ["/safe/existing/state"]
      })
    );
    const main = await import("../src/m8/main.js");
    const { M8_IPC_CHANNELS } = await import("../src/m8/ipcContracts.js");
    const inMemoryState = {
      selectedStateDirectory: "/safe/existing/state"
    };
    main.registerM8IpcHandlers({
      mainWindow: createMainWindow(10) as never,
      inMemoryState,
      executeInquiry: vi.fn(() => {
        throw new Error("not used");
      }) as never
    });
    const pickHandler = ipcHandlers.get(M8_IPC_CHANNELS.pickStateDirectory) as
      CallableFunction | undefined;
    const statusHandler = ipcHandlers.get(M8_IPC_CHANNELS.getStateDirectoryStatus) as
      CallableFunction | undefined;
    expect(pickHandler).toBeDefined();
    expect(statusHandler).toBeDefined();
    const pickerResult = await pickHandler!(createTrustedEvent(44));
    expect(pickerResult).toEqual({
      selected: false,
      error: "ipc_validation_failed"
    });
    expect(dialogShowOpenDialog).not.toHaveBeenCalled();
    const statusResult = statusHandler!(createTrustedEvent(44));
    expect(statusResult).toEqual({
      selected: false,
      error: "ipc_validation_failed"
    });
    expect(JSON.stringify(statusResult)).not.toContain("/safe/existing/state");
  });

  test("state-directory validation failures return minimized status without leaking local path", async () => {
    dialogShowOpenDialog.mockResolvedValue(
      Object.freeze({
        canceled: false,
        filePaths: ["/Users/owner/private/state"]
      })
    );
    resolveAndValidateLocalInquiryStateDirectoryMock.mockImplementation(() => {
      throw new Error("validation failed for /Users/owner/private/state");
    });
    const main = await import("../src/m8/main.js");
    const { M8_IPC_CHANNELS } = await import("../src/m8/ipcContracts.js");
    main.registerM8IpcHandlers({
      mainWindow: createMainWindow() as never,
      inMemoryState: {},
      executeInquiry: vi.fn(() => {
        throw new Error("not used");
      }) as never
    });
    const pickHandler = ipcHandlers.get(M8_IPC_CHANNELS.pickStateDirectory) as
      CallableFunction | undefined;
    expect(pickHandler).toBeDefined();
    const pickerResult = await pickHandler!(createTrustedEvent());
    expect(pickerResult).toEqual({
      selected: false,
      error: "state_directory_validation_failed"
    });
    expect(JSON.stringify(pickerResult)).not.toContain("/Users/owner/private/state");
  });
});
