#!/usr/bin/env node
/** Loopback-only HAL Presence. No LAN listener or arbitrary command route. */
import { createHash, randomBytes } from "node:crypto";
import { Buffer } from "node:buffer";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";

import { createDesktopControlChat } from "../dist/src/desktopAssistant/controlChat.js";

const projectRoot = path.resolve(import.meta.dirname, "..");
const token = randomBytes(32).toString("hex");
const scriptNonce = randomBytes(16).toString("base64");
const maxBody = 8_192;
const controlJournalPath = path.resolve(
  projectRoot,
  "local-state/loopback-control/control-journal.jsonl"
);

function loadControlJournalTailHash() {
  if (!existsSync(controlJournalPath)) return undefined;
  try {
    const last = readFileSync(controlJournalPath, "utf8").trim().split("\n").at(-1);
    const parsed = last ? JSON.parse(last) : undefined;
    return typeof parsed?.recordHash === "string" && /^[a-f0-9]{64}$/.test(parsed.recordHash)
      ? parsed.recordHash
      : undefined;
  } catch {
    return undefined;
  }
}

function recordControl(event) {
  mkdirSync(path.dirname(controlJournalPath), { recursive: true });
  const unsigned = {
    ...event,
    timestampUtc: new Date().toISOString(),
    ...(recordControl.previousHash ? { previousRecordHash: recordControl.previousHash } : {})
  };
  const recordHash = createHash("sha256").update(JSON.stringify(unsigned)).digest("hex");
  appendFileSync(controlJournalPath, `${JSON.stringify({ ...unsigned, recordHash })}\n`, "utf8");
  recordControl.previousHash = recordHash;
}
recordControl.previousHash = loadControlJournalTailHash();

const run = (script, args = [], input) =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(projectRoot, "scripts", script), ...args], {
      shell: false,
      stdio: ["pipe", "pipe", "ignore"],
      env: { ...process.env, ELECTRON_RUN_AS_NODE: "1" }
    });
    const chunks = [];
    let bytes = 0;
    child.stdout.on("data", (chunk) => {
      bytes += chunk.length;
      if (bytes > 32768) child.kill();
      else chunks.push(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0
        ? resolve(Buffer.concat(chunks).toString("utf8").trim())
        : reject(new Error("governed operation failed"))
    );
    if (input) child.stdin.end(input);
    else child.stdin.end();
  });
const control = createDesktopControlChat({
  dispatch: async (proposal) => {
    const map = {
      status: ["hal-assistant-status.mjs"],
      recommend_text: ["hal-model-recommend.mjs", "text"],
      recommend_image: ["hal-model-recommend.mjs", "image"],
      matrix_text: ["hal-model-matrix.mjs", "text"],
      matrix_image: ["hal-model-matrix.mjs", "image"],
      research: ["hal-model-research.mjs"],
      refresh_folder: [
        "refresh-hal-ref-2-owner-folder-pack.mjs",
        "--registration-id",
        proposal.args[0]
      ],
      deactivate_folder: [
        "deactivate-owner-folder.mjs",
        "--registration-id",
        proposal.args[0],
        "--owner-confirm",
        "local_owner_confirmed"
      ],
      revoke_folder: [
        "revoke-owner-folder.mjs",
        "--registration-id",
        proposal.args[0],
        "--owner-confirm",
        "local_owner_confirmed"
      ]
    };
    const command = map[proposal.operation];
    if (!command) throw new Error("unsupported operation");
    return await run(command[0], command.slice(1));
  },
  record: recordControl
});
const page = `<!doctype html><meta charset=utf-8><title>HAL Local</title><style>body{font:16px -apple-system,sans-serif;max-width:850px;margin:3rem auto;padding:0 1rem}textarea{width:100%;box-sizing:border-box}pre{white-space:pre-wrap;background:#f4f4f4;padding:1rem}button{margin:.5rem 0}</style><h1>HAL Local</h1><p>Loopback-only · no external providers · governed controls</p><select id=scope><option value=canon>HAL Canon</option><option value=documents>Approved documents</option><option value=combined>Both approved contexts</option><option value=hal-ref-2>Persistent owner folder</option></select><textarea id=question rows=4 placeholder="Ask HAL"></textarea><button id=ask type=button>Ask HAL</button><h2>HAL Control Chat</h2><textarea id=control rows=3 placeholder="matrix image, status, research"></textarea><button id=send-control type=button>Send control request</button><pre id=output aria-live=polite>Ready.</pre><script nonce="${scriptNonce}">const token='${token}';const output=document.getElementById('output');const scope=document.getElementById('scope');const question=document.getElementById('question');const control=document.getElementById('control');async function send(url,body,button){button.disabled=true;output.textContent='HAL is working…';try{const response=await fetch(url,{method:'POST',headers:{'content-type':'application/json','x-hal-session-token':token},body:JSON.stringify(body)});const result=await response.json();if(!response.ok)throw new Error(result.reasonCode||'request failed');output.textContent=JSON.stringify(result,null,2)}catch(error){output.textContent='HAL request failed: '+(error instanceof Error?error.message:'unknown error')}finally{button.disabled=false}}document.getElementById('ask').addEventListener('click',()=>send('/api/question',{scope:scope.value,questionText:question.value},document.getElementById('ask')));document.getElementById('send-control').addEventListener('click',()=>send('/api/control',{message:control.value},document.getElementById('send-control')))</script>`;
const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "content-security-policy": `default-src 'self'; connect-src 'self'; script-src 'nonce-${scriptNonce}'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'`
    });
    return res.end(page);
  }
  if (req.method !== "POST" || req.headers["x-hal-session-token"] !== token) {
    res.writeHead(403);
    return res.end();
  }
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > maxBody) {
      res.writeHead(413);
      return res.end();
    }
  }
  try {
    const body = JSON.parse(raw);
    const value =
      req.url === "/api/control"
        ? await control(body.message)
        : req.url === "/api/question"
          ? {
              result: "completed",
              response: await run(
                "hal-assistant.mjs",
                [body.scope],
                `${body.questionText}\n/exit\n`
              )
            }
          : { result: "blocked", reasonCode: "unknown_route" };
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(value));
  } catch {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify({ result: "blocked", reasonCode: "request_failed" }));
  }
});
server.on("error", (error) => {
  process.stderr.write(
    `HAL local web failed to start: ${error instanceof Error ? error.message : "unknown error"}\n`
  );
  process.exit(1);
});
server.listen(0, "127.0.0.1", () => {
  const address = server.address();
  if (!address || typeof address === "string") process.exit(2);
  const url = `http://127.0.0.1:${address.port}/`;
  process.stdout.write(`HAL local web is running at ${url}\nPress Ctrl+C to stop.\n`);
  if (process.env.HAL_LOCAL_WEB_NO_OPEN !== "1")
    spawn("open", [url], { stdio: "ignore", detached: true }).unref();
});
process.on("SIGINT", () => server.close(() => process.exit(0)));
