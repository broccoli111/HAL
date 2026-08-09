import { spawn } from "node:child_process";

const endpoint = process.env.HAL_HERMES_TEST_HOST ?? "hal_eval@gx10-01";
const identityFile = process.env.HAL_HERMES_TEST_IDENTITY;
if (!identityFile) throw new Error("HAL_HERMES_TEST_IDENTITY is required.");

const frame = {
  type: "execute_task",
  correlationId: "hal_ssh_probe_correlation",
  runtimeId: "hermes_test",
  agentId: "hal_ssh_probe_agent",
  taskId: "hal_ssh_probe_task",
  context: "bounded synthetic context",
  capabilities: []
};
const remoteCommand = "python3 /home/hal_eval/hermes-acquisition/hermes-synthetic-line-driver.py";
const child = spawn(
  "ssh",
  ["-i", identityFile, "-o", "IdentitiesOnly=yes", "-o", "BatchMode=yes", endpoint, remoteCommand],
  { stdio: ["pipe", "pipe", "pipe"] }
);
let stdout = "";
let stderr = "";
child.stdout.on("data", (chunk) => (stdout += chunk));
child.stderr.on("data", (chunk) => (stderr += chunk));
child.stdin.end(`${JSON.stringify(frame)}\n`);
const exitCode = await new Promise((resolve) => child.on("close", resolve));
if (exitCode !== 0) throw new Error(`Synthetic line driver failed: ${stderr}`);
const replies = stdout
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line) => JSON.parse(line));
const expected = ["progress", "result"];
if (replies.map((reply) => reply.type).join(",") !== expected.join(",")) {
  throw new Error("Synthetic line driver returned an unexpected frame sequence.");
}
if (replies.some((reply) => reply.correlationId !== frame.correlationId || reply.capability)) {
  throw new Error("Synthetic line driver violated correlation or zero-capability constraints.");
}
console.log(JSON.stringify({ status: "passed", replies }));
