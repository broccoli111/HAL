# Service And Capacity Health

**Owner:** Operations Assurance Lead

Required panels:
- functional readiness: current value, threshold, freshness, source, scope, and evidence link.
- dependency readiness: current value, threshold, freshness, source, scope, and evidence link.
- latency: current value, threshold, freshness, source, scope, and evidence link.
- error disposition: current value, threshold, freshness, source, scope, and evidence link.
- queue age: current value, threshold, freshness, source, scope, and evidence link.
- saturation: current value, threshold, freshness, source, scope, and evidence link.
- backpressure: current value, threshold, freshness, source, scope, and evidence link.

Unknown or stale values MUST render as unknown, never healthy. Every panel MUST link to the controlling runbook and alert.
