#!/usr/bin/env sh

# DR 0020 only: one synthetic request. This script must not be generalized.
set -eu

image=${HAL_CONTAINMENT_IMAGE:-sha256:8c5de2243cba89f49a93e05cacb78e27058bcaa69c148baac127005da03af39e}
work_dir=${HAL_CT008_WORK_DIR:-"$HOME/hal-ct008"}
socket_path="$work_dir/mediator.sock"
event_log="$work_dir/events.ndjson"
mediator_script="$work_dir/hal_positive_inference_mediator.py"
binding=$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')
expires_at=$(python3 -c 'import time; print(time.time() + 60)')

mkdir -p "$work_dir"
chmod 700 "$work_dir"
test ! -e "$socket_path"
: >"$event_log"

HAL_CT008_SOCKET="$socket_path" HAL_CT008_EVENT_LOG="$event_log" HAL_CT008_BINDING="$binding" HAL_CT008_EXPIRES_AT="$expires_at" \
  python3 "$mediator_script" >"$work_dir/mediator.log" 2>&1 &
mediator_pid=$!

cleanup() {
  kill -TERM "$mediator_pid" 2>/dev/null || true
  wait "$mediator_pid" 2>/dev/null || true
}
trap cleanup EXIT HUP INT TERM

attempt=0
while test ! -S "$socket_path"; do
  attempt=$((attempt + 1))
  test "$attempt" -lt 20 || exit 1
  sleep 1
done

docker run --rm --network none --read-only --cap-drop ALL --security-opt no-new-privileges \
  --pids-limit 32 --memory 128m --cpus 1 --user 0 \
  --mount "type=bind,src=$socket_path,dst=/run/hal/mediator.sock,readonly" \
  -e HAL_CT008_BINDING="$binding" "$image" python3 -c '
import json, os, socket
request = {
    "binding": os.environ["HAL_CT008_BINDING"],
    "runtime_id": "ct008-test-runtime",
    "adapter_id": "test-adapter",
    "agent_id": "ct008-agent",
    "task_id": "ct008-task",
    "correlation_id": "ct008-correlation",
    "profile": "gx10-1-qwen3-8b-synthetic-v1",
    "prompt": "HAL synthetic mediation pilot",
}
with socket.socket(socket.AF_UNIX) as client:
    client.settimeout(300)
    client.connect("/run/hal/mediator.sock")
    client.sendall(json.dumps(request, separators=(",", ":")).encode())
    client.shutdown(socket.SHUT_WR)
    response = b""
    while chunk := client.recv(4096):
        response += chunk
assert response.startswith(b"HTTP/1.1 200"), response[:256]
assert len(response) <= 16384, len(response)
print(f"CT-008 bounded noncanonical response bytes: {len(response)}")
'

cleanup
trap - EXIT HUP INT TERM
test ! -e "$socket_path"
printf 'events:\n'
cat "$event_log"
ollama ps
