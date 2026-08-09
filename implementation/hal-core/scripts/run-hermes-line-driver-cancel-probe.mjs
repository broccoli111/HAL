import { spawn } from "node:child_process";
import { clearTimeout, setTimeout } from "node:timers";

const key = process.env.HAL_HERMES_TEST_IDENTITY;
if (!key) throw new Error("HAL_HERMES_TEST_IDENTITY is required.");
const child = spawn(
  "ssh",
  [
    "-i",
    key,
    "-o",
    "IdentitiesOnly=yes",
    "-o",
    "BatchMode=yes",
    "hal_eval@gx10-01",
    "python3 /home/hal_eval/hermes-acquisition/hermes-synthetic-line-driver.py"
  ],
  { stdio: ["pipe", "pipe", "pipe"] }
);
const timeout = setTimeout(() => child.kill("SIGTERM"), 15 * 60 * 1000);
timeout.unref();
let output = "";
child.stdout.on("data", (chunk) => {
  output += chunk;
  if (output.includes('"type": "progress"'))
    child.stdin.end('{"type":"cancel","agentId":"agent_cancel"}\n');
});
child.stdin.write(
  '{"type":"execute_task","correlationId":"cancel_correlation","runtimeId":"hermes_test","agentId":"agent_cancel","taskId":"cancel_task","context":"await_cancel","capabilities":[]}\n'
);
const code = await new Promise((resolve) => child.on("close", resolve));
clearTimeout(timeout);
if (code !== 0 || !output.includes('"type": "failure"') || !output.includes("cancelled by HAL"))
  throw new Error(`Cancellation probe failed: ${output}`);
console.log(JSON.stringify({ status: "passed", output }));
