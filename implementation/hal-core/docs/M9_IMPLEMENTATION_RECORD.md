# M9 Implementation Record - Controlled Local Knowledge Packs

## Scope and authorization boundary

M9 is implemented under explicit Owner authorization for local-only, synthetic-only, deterministic, non-live-effect operation.

Implemented scope is limited to:

- fixed approved synthetic knowledge-pack root under `fixtures/approved-knowledge-packs`;
- strict pack validation/registration for M9 v1 manifest and content contracts;
- explicit local operator-provided Owner confirmation claims for activation/deactivation;
- dedicated governed M2 admission path before any M9 state mutation;
- append-only hash-chained activation journal and fail-closed reconstruction;
- M6/M7/M8/M4/M5 integration for bounded evidence and backup/restore linkage.

Not implemented:

- private/user-document ingestion;
- cloud/network/model/provider sources;
- arbitrary filesystem pack admission;
- real-world identity/authentication claims;
- authority/readiness uplift.

## Delivered modules and sole mutation owners

Added module: `src/m9/`

- `types.ts`
  - M9 schema constants, strict v1 bounds, and bounded record contracts.
- `canonical.ts`
  - deterministic canonical UTF-8 JSON and SHA-256 hashing helpers.
- `validator.ts` (**sole validation/registration owner**)
  - fixed-root resolution;
  - strict layout enforcement (`manifest.json` + `content/`);
  - manifest self-hash verification via canonical hash omission;
  - declared-file completeness and extra-file rejection;
  - symlink/traversal/URL-like/path-escape rejection;
  - malformed JSON, duplicate/ordering/schema/hash/size/count bound rejection;
  - secret-like content rejection.
- `m2Admission.ts` (**sole M2 admission mapper for M9**)
  - explicit, traceable M2 intent/plan/decision/transaction admission path for activation and deactivation.
- `activationJournal.ts` (**sole M9 durable mutation writer**)
  - append-only hash-chained `m9/m9-pack-activation-journal.jsonl`;
  - bounded record size enforcement;
  - deterministic replay/conflict checks by operation request ID.
- `service.ts` (**sole activation/deactivation/reconstruction owner**)
  - `listApprovedM9PackRegistrations()`
  - `activateApprovedM9Pack()`
  - `deactivateApprovedM9Pack()`
  - `getM9ActivePackState()`
  - `resolveM9PackForActiveInquiry()`
  - fail-closed reconstruction on missing/tampered/swapped/invalid pack tuple.
- `index.ts`
  - module exports.

Added CLI:

- `src/cli/m9PacksCli.ts`
  - constrained local commands: `list`, `activate`, `status`, `deactivate`
  - explicit existing `--state-dir` required;
  - no free-form pack path input;
  - bounded output only;
  - explicit `externalEffect: none`.

## Fixed approved synthetic packs

Added deterministic synthetic fixtures under:

- `fixtures/approved-knowledge-packs/pack_alpha`
- `fixtures/approved-knowledge-packs/pack_beta`

Each pack contains:

- one `manifest.json` (control artifact, excluded from `files`);
- `content/` regular JSON files only, each declared exactly once with hash and byte-size.

Pack identity tuples are case-sensitive and compared exactly.

## M6/M7/M8 integration

- M6 now requires one active validated M9 pack for accepted inquiries.
  - no active pack -> fail-closed blocked result (`reason=no_active_pack`);
  - inquiry evidence records include immutable activation tuple fields:
    - `m9PackId`
    - `m9PackVersion`
    - `m9ManifestHashSha256`
    - `m9ActivationRecordId`
  - replay preserves original correlation and original activation tuple.
- M7 remains stateless and delegates through shared governed M6 path.
- M8 adds request-only pack controls:
  - new typed IPC channels for pack status and pack activation request submission;
  - sender/frame/origin/payload validation remains in main process;
  - renderer can only propose activation/deactivation requests;
  - main process remains sole mutation owner;
  - no transcript/raw-content/path persistence by M8.

## M3/M4/M5 integration

- M3 deterministic inquiry artifact metadata carries M9 activation tuple context.
- M4 verification now independently validates:
  - M6 evidence tuple <-> M3 deterministic artifact tuple consistency;
  - tuple references against approved M9 registry;
  - attested corpus manifest consistency for active M9 content root.
- M5 backup/restore coverage extended for M9 activation journal only:
  - allowlisted optional capture: `m9/m9-pack-activation-journal.jsonl`;
  - no arbitrary pack-root/raw-pack-content backup admission.

## Tests and verification coverage

Added tests:

- `test/m9-controlled-local-knowledge-packs.test.ts`
  - approved registry visibility and deterministic manifest-hash validation;
  - explicit activation/deactivation lifecycle with bounded outputs;
  - no mutation on invalid Owner-claim path;
  - inquiry blocked with no active pack;
  - inquiry replay preserves immutable activation tuple/correlation;
  - extra-file/symlink rejection;
  - v1 bound rejection checks;
  - M5 backup/restore + fresh-process M9 reconstruction.

Updated tests:

- `test/m6-controlled-inquiry.test.ts`
- `test/m7-local-inquiry-session.test.ts`
- `test/m8-presentation-service.test.ts`
- `test/local-inquiry-service.test.ts`
- `test/m8-ipc-contracts.test.ts`
- `test/m2-durable-intent.test.ts` (write-boundary inventory includes `m9/activationJournal.ts`)

Verified command suite:

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run security:scan`

## Remaining limits and posture

- Owner confirmation claims are local operational assertions only; they are not authentication or real-world identity proof.
- M9 stays local-only and synthetic-only with `externalEffect=none`.
- This implementation record does not claim authority expansion, certification, or readiness uplift.
