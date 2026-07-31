# M6 Implementation Record - Controlled Free-Form Local Inquiry

## Scope and boundaries

M6 implements a local deterministic inquiry path constrained to:

- local filesystem only;
- approved synthetic corpus only;
- deterministic lexical matching only;
- non-live-effect outcome only (`externalEffect=none`);
- no network/provider/model/auth/database/tool execution expansion.

## Capability and contracts

- M6 capability ID: `answer_synthetic_corpus_question_deterministic_v1`
- M6 provider ID/version: `LocalDeterministicInquiryProvider@1.0.0`
- One question per invocation through `npm run m6:inquire`.
- Caller-visible request identity via `--request-id` supports governed replay/conflict handling.
- Replay is terminal-result complete: materially identical deliberate replay reuses the original governed result for `matched`, `no_match`, `denied`, and policy-blocked outcomes (including original correlation ID and replay flag) without rerunning M2/M3/M4 or appending duplicate M6 evidence.
- Replay/idempotency authority is anchored to the earliest durable M6 record for each request ID (journal order), preserving first-write request identity across restart/hydration while retaining later duplicate/conflict records as immutable historical evidence.
- Fixed input normalization, rejection categories, and first-match precedence from the M6 design.
- Deterministic tokenizer/matcher/index versions:
  - `m6.tokenizer.v1`
  - `m6.matcher.v1`
  - `m6.corpus-index.v1`

## M2/M3/M4 linkage

- M2 intent/plan/decision/transaction/outcome chain is always created.
- M2 `approval_required` and `deny` block before M6 execution.
- M3 emits request/attempt/artifact/verification evidence for accepted and admitted inquiries.
- M4 final attestation runs for every inquiry correlation and preserves no-effect semantics.
- Matched and no-match inquiries both complete with `completed_without_effect` and M4 claimed effect `none`.
- Same-request-ID material mismatch remains a durable request-ID conflict (`blocked`) and is never treated as replay.

## Durable evidence model

M6 durable evidence journal: `m6-event-journal.jsonl` (append-only, hash-chained, fail-closed).

Persisted record schema: `m6.inquiry.evidence.v1` with:

- normalized question hash and bounded length metadata;
- tokenizer/matcher/index version identifiers;
- corpus manifest hash;
- selected document/section identifiers;
- no-match flag;
- disposition (`completed_without_effect` or `blocked`);
- answer hash;
- correlation/causation and integrity-chain metadata.

Explicitly excluded from durable journals:

- raw question text;
- raw corpus paragraphs;
- rendered response text;
- transient excerpt text.

## Corpus and safety controls

- Corpus root is fixed to approved synthetic JSON files under `fixtures/synthetic-corpus` for all production/runtime entrypoints.
- Loader rejects symlinks, non-regular entries, non-JSON entries, malformed JSON, schema mismatch, duplicate IDs, out-of-root paths, and secret-like corpus content.
- Section identifiers use `paragraph:<zero-based-index>`.

## Deterministic output behavior

- Fixed response templates for matched and no-match.
- Deterministic reference ordering from score + tie-break rules.
- Optional matched-only transient `excerpt=` field.
- UTF-8-safe 1200-byte cap with deterministic field omission/truncation sequence.

## Reconstruction and tamper posture

- M6 journal hydration validates hash-chain continuity and event integrity.
- Tamper or corruption causes fail-closed reconstruction error.
- M4 reconstruction continues to fail closed on M2/M3/M4 tamper.

## M5 backup/restore integration

M5 capture/verify/restore scope now includes optional `m6-event-journal.jsonl` preservation and reconstruction checks, while preserving compatibility with historical snapshots that do not include M6.

## Test coverage summary

`test/m6-controlled-inquiry.test.ts` validates:

- deterministic match and deterministic no-match;
- every rejection category and precedence behavior;
- blocked M2 admissions without provider execution;
- corpus safety negative paths;
- deterministic output ordering and truncation bounds;
- exclusion of raw question/answer/corpus text from durable journals;
- M6 journal tamper fail-closed behavior;
- M5 backup/restore/verify inclusion and reconstruction of M6 evidence.

## Non-goals reaffirmed

- No generalized chat or model inference.
- No external data access or network effects.
- No authority escalation beyond local bounded no-effect inquiry.
