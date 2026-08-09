#!/usr/bin/env sh

# Host-side synthetic test only. This does not start Hermes or a container.
set -eu

proxy_dir=${HAL_OLLAMA_PROXY_DIR:-"$HOME/hal-ollama-proxy"}
socket_path="$proxy_dir/ollama.sock"
proxy_script="$proxy_dir/hal_ollama_unix_proxy.py"

test ! -e "$socket_path"
HAL_OLLAMA_PROXY_SOCKET="$socket_path" python3 "$proxy_script" >"$proxy_dir/proxy-test.log" 2>&1 &
proxy_pid=$!

cleanup() {
  kill -TERM "$proxy_pid" 2>/dev/null || true
  wait "$proxy_pid" 2>/dev/null || true
}
trap cleanup EXIT HUP INT TERM

attempt=0
while test ! -S "$socket_path"; do
  attempt=$((attempt + 1))
  test "$attempt" -lt 20 || exit 1
  sleep 1
done

HAL_OLLAMA_PROXY_SOCKET="$socket_path" python3 - <<'PY'
import os
import socket

request = b'{"model":"qwen3:8b","prompt":"HAL synthetic mediation pilot"}'
with socket.socket(socket.AF_UNIX) as client:
    client.settimeout(60)
    client.connect(os.environ["HAL_OLLAMA_PROXY_SOCKET"])
    client.sendall(request)
    client.shutdown(socket.SHUT_WR)
    response = b""
    while chunk := client.recv(4096):
        response += chunk

assert response.startswith(b"HTTP/1.1 200"), response[:256]
assert len(response) <= 16_384, len(response)
print(f"bounded proxy response bytes: {len(response)}")
PY

HAL_OLLAMA_PROXY_SOCKET="$socket_path" python3 - <<'PY'
import os
import socket

with socket.socket(socket.AF_UNIX) as client:
    client.settimeout(10)
    client.connect(os.environ["HAL_OLLAMA_PROXY_SOCKET"])
    client.sendall(b'{"model":"qwen3:8b","prompt":"not admitted"}')
    client.shutdown(socket.SHUT_WR)
    response = client.recv(256)

assert response == b'{"error":"request_denied"}', response
print("non-allow-listed request denied")
PY

cleanup
trap - EXIT HUP INT TERM
test ! -e "$socket_path"
ollama ps
