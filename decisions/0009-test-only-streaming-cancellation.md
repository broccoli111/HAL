# Decision Record 0009 — Test-Only Streaming Cancellation

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-08-09 |
| Scope | GX10-1 synthetic streaming cancellation test |
| Owner Review | Explicitly approved by the Owner on 2026-08-09 |

## Decision

The external test harness may own one SSH stdio session to the isolated GX10-1 synthetic line driver. It has a 15-minute maximum duration, accepts only bounded lifecycle frames, and records cancellation as a correlated failure claim. It opens no inbound port and grants no capability, model, credential, tool, or HAL resource.
