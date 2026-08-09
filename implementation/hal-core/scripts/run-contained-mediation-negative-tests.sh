#!/usr/bin/env sh

# DR 0019 only: CT-001 through CT-007. No Hermes or model request is permitted.
set -eu

image=${HAL_CONTAINMENT_IMAGE:-sha256:8c5de2243cba89f49a93e05cacb78e27058bcaa69c148baac127005da03af39e}
work_dir=${HAL_CONTAINMENT_WORK_DIR:-"$HOME/hal-containment-mediator"}
socket_path="$work_dir/mediator.sock"
event_log="$work_dir/events.ndjson"
mediator_script="$work_dir/hal_containment_mediator.py"

mkdir -p "$work_dir"
chmod 700 "$work_dir"
test ! -e "$socket_path"
: >"$event_log"

HAL_CONTAINMENT_MEDIATOR_SOCKET="$socket_path" \
HAL_CONTAINMENT_MEDIATOR_EVENT_LOG="$event_log" \
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

run_isolated() {
  docker run --rm --network none --read-only --cap-drop ALL --security-opt no-new-privileges \
    --pids-limit 32 --memory 128m --cpus 1 --user 0 "$@"
}

run_isolated "$image" python3 -c '
import socket
try:
    socket.getaddrinfo("example.invalid", 443)
except OSError:
    pass
else:
    raise SystemExit("unexpected DNS result")
for host, port in (("192.168.124.1", 443), ("127.0.0.1", 22), ("127.0.0.1", 11434)):
    client = socket.socket(); client.settimeout(1)
    try:
        client.connect((host, port))
    except OSError:
        pass
    else:
        raise SystemExit("unexpected route")
    finally:
        client.close()
print("CT-001/002/003 denied")
'

run_isolated "$image" python3 -c '
import os
for path in ("/var/run/docker.sock", "/run/hal/mediator.sock", "/dev/nvidia0"):
    assert not os.path.exists(path), path
assert not any(key.startswith("HAL_") and "CONTAINMENT" not in key for key in os.environ)
print("CT-004 host resources absent")
'

run_mediator_probe() {
  payload=$1
  docker run --rm --network none --read-only --cap-drop ALL --security-opt no-new-privileges \
    --pids-limit 32 --memory 128m --cpus 1 --user 0 \
    --mount "type=bind,src=$socket_path,dst=/run/hal/mediator.sock,readonly" \
    -e HAL_CONTAINMENT_PAYLOAD="$payload" "$image" python3 -c '
import os, socket
with socket.socket(socket.AF_UNIX) as client:
    client.settimeout(10)
    client.connect("/run/hal/mediator.sock")
    client.sendall(os.environ["HAL_CONTAINMENT_PAYLOAD"].encode())
    client.shutdown(socket.SHUT_WR)
    response = client.recv(256)
assert response == b"{\"error\":\"binding_denied\"}", response
print("mediator request denied")
'
}

run_mediator_probe '{}'
echo "CT-005 missing binding denied"
run_mediator_probe '{"binding":"replayed-or-mutated","model":"other"}'
echo "CT-006 invalid binding denied"

cleanup
trap - EXIT HUP INT TERM
test ! -e "$socket_path"
if docker run --rm --network none --read-only --cap-drop ALL --security-opt no-new-privileges \
  --pids-limit 32 --memory 128m --cpus 1 --user 0 \
  --mount "type=bind,src=$socket_path,dst=/run/hal/mediator.sock,readonly" \
  "$image" python3 -c 'raise SystemExit("unexpected mediator mount")'; then
  exit 1
fi
echo "CT-007 mediator teardown prevents reuse"
printf 'events:\n'
cat "$event_log"
docker ps -a --format '{{.Names}} {{.Status}}'
