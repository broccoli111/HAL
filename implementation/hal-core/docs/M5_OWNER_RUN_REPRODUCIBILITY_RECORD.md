# M5 Owner-Run Reproducibility Record

**Status:** Owner-run reproducibility evidence record (documentation evidence only)  
**Scope:** HAL v0.1 M0-M4 local-only slice  
**Evidence type:** reproducibility record, not independent verification or certification

## 1) Purpose and limits

This record captures observed results from an Owner-run reproducibility review.

- It is not an independent verification report.
- It is not a certification decision.
- It does not create authority, readiness uplift, or any Reality Boundary change.

## 2) Review context (observed)

- Clean clone pinned to commit `8771694`.
- Node version observed: `v26.5.0`.
- Baseline checks observed as passed:
  - `format:check`
  - `lint`
  - `typecheck`
  - tests: `50` passed across `8` files
  - dependency-security scan: `0 vulnerabilities`

## 3) Required local test configuration prerequisite (observed)

For M1 and M2 demos, the following explicit local configuration values were required:

```bash
export HAL_ENVIRONMENT=development
export HAL_SAFE_MODE=restrictive
export HAL_OWNER_ID=owner_independent_reviewer
```

These are local non-secret test configuration values. They are not authentication credentials and do not create authority.

## 4) Scenario execution table

| scenario                          | result summary | evidence detail                                                                                                               |
| --------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| M3 allowed bounded-capability run | observed       | verification passed; claimed effect `inspection_only`                                                                         |
| M4 allowed verified scenario      | observed       | correlation `dc142aaa-4647-4483-b216-d30eb2f2e856`; final outcome `achieved_without_effect`; claimed effect `inspection_only` |
| M4 blocked scenario               | observed       | `TBD`                                                                                                                         |
| M4 cancelled scenario             | observed       | `TBD`                                                                                                                         |
| M4 timed-out scenario             | observed       | `TBD`                                                                                                                         |
| M4 verification-rejected scenario | observed       | `TBD`                                                                                                                         |
| M4 incomplete-evidence scenario   | observed       | `TBD`                                                                                                                         |

## 5) Evidence retention (local package)

Observed retained artifacts include:

- journals;
- artifacts;
- reconstruction output;
- `SHA256SUMS.txt`.

Repository-relative evidence package location placeholder:

```text
implementation/hal-core/local-state/m5-independent/evidence-package/<run-id>/
```

## 6) Reviewer-independence limitation

This was an Owner-run reproducibility review, not a role-separated independent verification activity. Reviewer-independence requirements for formal M5 independent verification remain open.

## 7) Decision and boundary reminder

No authority change, readiness uplift, certification outcome, or boundary expansion follows from this record. Independent review remains an explicit residual risk and a prerequisite for any stronger assurance claim or scope expansion.
