# Development Dependency Security Evidence

## Scope and authority

This is implementation evidence, not a source of HAL authority. Book I remains
supreme; Book II Chapter 29 and Book III Chapters 2, 5, and 6 govern software
lifecycle, dependency provenance, security, and verification.

## Current lockfile disposition

- Review date: 2026-08-09
- Input: `package-lock.json`
- SHA-256: `aec527ac7eb177368bf3a35126d5ca6746ab9eb3b547064559d3728a67d1f3dd`
- Installation posture: `npm ci --ignore-scripts`
- Vulnerability command: `npm run security:scan`
- Result: `found 0 vulnerabilities`

The previously reported transitive development advisories are resolved by the
lockfile’s `brace-expansion` 5.0.9 and `nanoid` 3.3.18 entries. No direct HAL
runtime dependency, Agent Runtime Contract, local-model route, source scope, or
authority boundary changed.

## Reproducible SBOM procedure

Run the following from `implementation/hal-core`:

```sh
npm run security:sbom > HAL_CORE_SBOM.cdx.json
```

The command derives a CycloneDX application SBOM from `package-lock.json`
only. It does not run package install scripts, start HAL, contact GX10-1, or
invoke an Agent Runtime. npm includes generated serial/timestamp metadata, so
the SBOM is intentionally produced for the reviewed lockfile at the time of
review rather than committed as a falsely immutable artifact.

Before relying on a newly generated SBOM, confirm the lockfile SHA-256 above or
record the hash of the then-current lockfile beside the generated artifact.
