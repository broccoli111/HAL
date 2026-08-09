# Data and Secrets Policy (M0 Baseline)

## Data posture

- Synthetic data is the default and only admitted dataset for this repository baseline.
- Personal, production, and externally sourced sensitive data are not admitted.
- Logs, test outputs, and generated artifacts must avoid sensitive payloads and keep only minimum necessary detail.

## Secrets posture

- Secrets are prohibited from source control.
- `.env*`, credentials, keys, and tokens are ignored via `.gitignore`.
- `.env.example` contains non-secret placeholders only.
- No external credentials are required or consumed by this M0/M1 skeleton.

## Network and external effects

- Outbound network behavior and live-effect actions are prohibited by default.
- Tests are deterministic and local-only; no external account state may influence test results.
- Any future external integration requires explicit capability contract, authority mapping, and M3+ governance admission.
