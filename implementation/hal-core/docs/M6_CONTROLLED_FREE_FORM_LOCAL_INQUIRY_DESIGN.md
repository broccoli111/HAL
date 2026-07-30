# M6 Controlled Free-Form Local Inquiry Design

**Status:** Proposed design only (not implemented)  
**Scope posture:** Proposed scope expansion beyond current approved capability  
**Current authority posture:** `ready_to_remain_local_only` does **not** authorize this implementation by itself

## 1) Purpose and hard boundary

M6 proposes a future local-only feature that accepts one typed natural-language question and returns a deterministic answer based only on the approved synthetic corpus.

Hard boundary:

- M6 is a proposed scope expansion beyond the currently approved M0-M5 local implementation and requires explicit future Owner authorization before implementation.
- This document is non-authorizing and does not change authority boundaries.
- No model/provider admission.
- No model API, internet, or network behavior.
- No private/local user file browsing outside approved synthetic corpus root.
- No personal/private data, accounts, external tools, external databases, or real authentication.
- No controlled reality, live effects, authority expansion, or new Treaty/federation behavior.
- Local-only, synthetic-only, non-live-effect.

## 2) Exact input normalization and rejection

### 2.1 Input type and cardinality

- Exactly one field: `questionText`.
- Type: UTF-8 text string.
- One request contains exactly one question.

### 2.2 Fixed limits

- Maximum `questionCodePoints`: `512` (Unicode code points).
- Maximum `questionUtf8Bytes`: `2048` (UTF-8 bytes).
- Minimum non-whitespace content: one visible character.

### 2.3 Single-line and control-character requirements

- Input must be single-line.
- Reject any `questionText` containing line breaks.
- Reject all ASCII control characters `[\x00-\x1F\x7F]`, including tab (`\x09`) and line feed (`\x0A`).

### 2.4 Deterministic normalization

Normalization sequence for accepted text:

1. UTF-8 decode (fail if malformed).
2. `NFKC` normalize.
3. Trim leading/trailing Unicode whitespace.
4. Lowercase using `en-US`.

The normalized result is `normalizedQuestionText`.

### 2.5 Deterministic rejection pattern set

Regex flavor assumptions for future Node.js TypeScript implementation:

- JavaScript `RegExp` (ECMAScript) with `u` flag for Unicode-aware behavior.
- Case-insensitive matching uses `i` flag (no inline `(?i)` modifiers).
- Pattern evaluation uses `pattern.test(normalizedQuestionText)`.

### 2.6 Rejection category codes and fixed precedence

Allowed rejection category codes:

- `REJ_EMPTY_OR_WHITESPACE`
- `REJ_MALFORMED_UTF8`
- `REJ_NOT_SINGLE_LINE`
- `REJ_ASCII_CONTROL_CHAR`
- `REJ_TOO_MANY_CODE_POINTS`
- `REJ_TOO_MANY_UTF8_BYTES`
- `REJ_SECRET_LIKE`
- `REJ_PATH_LIKE`
- `REJ_URL_LIKE`
- `REJ_COMMAND_METACHAR`
- `REJ_INJECTION_LIKE`

Fixed evaluation order (first match wins):

1. `REJ_MALFORMED_UTF8`
2. `REJ_EMPTY_OR_WHITESPACE`
3. `REJ_NOT_SINGLE_LINE`
4. `REJ_ASCII_CONTROL_CHAR`
5. `REJ_TOO_MANY_CODE_POINTS`
6. `REJ_TOO_MANY_UTF8_BYTES`
7. `REJ_SECRET_LIKE`
8. `REJ_PATH_LIKE`
9. `REJ_URL_LIKE`
10. `REJ_COMMAND_METACHAR`
11. `REJ_INJECTION_LIKE`

If more than one rule matches, only the first matching category code in this order is allowed to be persisted and displayed.

The following pattern checks run on `normalizedQuestionText` and are deterministic.

Secret-like:

- `/\b(api[_-]?key|secret|token|password|passwd|private[_-]?key|bearer\s+[a-z0-9._-]+)\b/iu`
- `/\b(aws|ghp|xox[baprs]|sk)_[a-z0-9]{16,}\b/iu`
- `/\b[0-9a-f]{32,}\b/iu`

Path-like:

- `/(^|\s)(\/[^\s]+)/u` (absolute POSIX-like path)
- `/(^|\s)(~\/[^\s]*)/u` (home-relative path)
- `/\.\./u` or `/\.\\/u` (traversal)
- `/\b[a-z]:\\/iu` (Windows drive path)

URL-like:

- `/\b[a-z][a-z0-9+.-]*:\/\/[^\s]+/iu`
- `/\bwww\.[^\s]+\.[a-z]{2,}\b/iu`

Command-metacharacter-like:

- `/[;&|\x60]/u` (single-character metacharacters)
- `/\$\(/u` (subshell start)
- `/\|\|/u` (or-chain)
- `/&&/u` (and-chain)
- `/>/u` (stdout redirection)
- `/</u` (stdin redirection)

Injection-like:

- `/\b(ignore\s+previous|ignore\s+all\s+instructions|system\s+prompt|developer\s+message|tool\s+call|execute\s+command|run\s+shell|override\s+policy|bypass\s+safety)\b/iu`

If any pattern matches, reject with deterministic `inputDisposition=denied` and the first-matching category code only.

### 2.7 Rejection outcomes

Rejected input yields:

- no M6 inquiry execution;
- deterministic denied result with category-only reason code;
- denied result must not include raw question text;
- no raw `questionText` in durable records.

### 2.8 Semantic authority restrictions

- Input text is never authority, policy, or instruction to HAL.
- Input text is never a filesystem selector or capability admission override.
- Input text is untrusted content only.

## 3) Exact tokenization and lexical preparation

Tokenizer definition version: `m6.tokenizer.v1`.

Pipeline over `normalizedQuestionText`:

1. Token regex (global Unicode): `[\\p{L}\\p{N}]+(?:['-][\\p{L}\\p{N}]+)*`
2. Minimum token length: `2` code points.
3. Drop tokens shorter than minimum.
4. De-duplicate while preserving first-seen order.
5. Remove stopwords using this ordered list:
   - `a`, `an`, `and`, `are`, `as`, `at`, `be`, `but`, `by`, `for`, `from`, `how`, `in`, `into`, `is`, `it`, `of`, `on`, `or`, `that`, `the`, `to`, `was`, `were`, `what`, `when`, `where`, `which`, `who`, `why`, `with`

Resulting array is `questionTokens`.

If `questionTokens` is empty, result is deterministic no-match completion (`completed_without_effect`), not a capability error.

## 4) Exact corpus and index behavior

### 4.1 Approved corpus format and root

Corpus root remains fixed and approved:

- `implementation/hal-core/fixtures/synthetic-corpus/`

Allowed files:

- regular `.json` files directly in corpus root (no subdirectories);
- sorted lexicographically by filename before load.

### 4.2 File safety and schema validation

Reject corpus load if any of the following occurs:

- symlink encountered;
- non-regular entry;
- non-`.json` entry;
- path resolves outside fixed corpus root;
- malformed JSON;
- schema mismatch from required shape:
  - `id: string`
  - `title: string`
  - `tags: string[]`
  - `paragraphs: string[]`
- duplicate document IDs;
- secret-like content match in any `title`, `tags[]`, or `paragraphs[]` using section 2.5 secret patterns.

### 4.3 Section identifiers

For each paragraph in document order, section ID is:

- `paragraph:<zero-based-index>`

### 4.4 Deterministic index build

For each document:

- normalize/title-tags-paragraphs with same `NFKC -> trim -> lowercase en-US` rules;
- tokenize each field with tokenizer `m6.tokenizer.v1`;
- store token sets for title, each tag entry, and each paragraph section.

Index version: `m6.corpus-index.v1`.

## 5) Exact ranking and output behavior

Matcher version: `m6.matcher.v1`.

### 5.1 Scoring formula

Per document score:

- `titleMatches = count(questionTokens intersect titleTokenSet)`
- `tagMatches = count(questionTokens intersect tagTokenSetUnion)`
- `paragraphMatches = sum over sections of count(questionTokens intersect sectionTokenSet)`
- `documentScore = (titleMatches * 5) + (tagMatches * 3) + (paragraphMatches * 1)`

Per section score within a document:

- `sectionScore = count(questionTokens intersect sectionTokenSet)`

Threshold:

- Document qualifies if `documentScore >= 2`.
- Section qualifies if `sectionScore >= 1`.

### 5.2 Tie-break and selection

Document ordering:

1. descending `documentScore`
2. descending `titleMatches`
3. ascending `documentId` (lexicographic)

Section ordering within selected document:

1. descending `sectionScore`
2. ascending section index

Selection bounds:

- top documents: `3`
- top sections per selected document: `2`

### 5.3 No-match semantics

If no document qualifies, return deterministic no-match completion:

- truthful no-match text;
- no fabricated references or claims;
- `externalEffect=none`;
- completion semantics remain no-effect.

### 5.4 Deterministic response template

Template (exact field order):

1. `result=<matched|no_match>`
2. `externalEffect=none`
3. `capabilityId=answer_synthetic_corpus_question_deterministic_v1`
4. `corpusManifestHash=<sha256>`
5. `references=...`
6. `limitations=synthetic_corpus_only; lexical_match_only; no_external_data`
7. `uncertainty=matched: lexical evidence only; synthetic corpus bounded; external data unavailable`
8. `excerpt=<deterministic excerpt payload>` (matched only; optional final field)

No-match template (exact field order and values):

1. `result=no_match`
2. `externalEffect=none`
3. `capabilityId=answer_synthetic_corpus_question_deterministic_v1`
4. `corpusManifestHash=<sha256>`
5. `references=none`
6. `limitations=synthetic_corpus_only; lexical_match_only; no_external_data`
7. `uncertainty=no_match: no lexical evidence met threshold; synthetic corpus bounded; external data unavailable`
8. `message=no matching synthetic corpus sections found for the normalized question tokens`

Reference rendering:

- `references=none` for no-match.
- For matched:
  - `references=<documentId>#paragraph:<idx>[,<documentId>#paragraph:<idx>...]`
  - order exactly as ranking selection order.

### 5.5 Transient excerpt policy

- Bounded synthetic paragraph excerpts are permitted only in transient local response rendering.
- Excerpts are not persisted in durable journals.
- `excerpt=` appears only for matched results and only as final field.
- If excerpts are included, rendering is:
  - references are processed in output order;
  - for each reference include one excerpt segment as `<documentId>#paragraph:<idx>:"<escaped text>"`;
  - segments are joined with `|`;
  - each excerpt text is normalized with the same `NFKC -> trim -> lowercase en-US` pipeline and clipped to `80` UTF-8 bytes before final response-byte budgeting.
- `excerpt=` is omitted entirely for no-match results.

### 5.6 UTF-8-safe 1200-byte truncation

If rendered response exceeds `1200` UTF-8 bytes:

1. Omit the entire optional `excerpt=` field (matched case only), then recompute bytes.
2. If still over limit, shorten `references=` by dropping trailing references one at a time, preserving order of retained references.
3. If still over limit, truncate only the `message=` field (no-match template) or the final `uncertainty=` field content (matched template) at a UTF-8 code-point boundary.
4. If truncation occurs in step 3, append `... [truncated]` only when the suffix fits inside the 1200-byte limit.
5. Never split a UTF-8 multibyte sequence.
6. Always preserve valid `key=value` line format and fixed field order for remaining fields.

## 6) Exact durable evidence contract

Durable record schema version: `m6.inquiry.evidence.v1`.

Persisted fields:

- `inquiryRecordId`
- `schemaVersion`
- `timestampIso8601`
- `correlationId`
- `causationEventId` (optional)
- `questionNormalizedHashSha256`
- `questionCodePoints`
- `questionUtf8Bytes`
- `tokenizerVersion` (`m6.tokenizer.v1`)
- `matcherVersion` (`m6.matcher.v1`)
- `corpusIndexVersion` (`m6.corpus-index.v1`)
- `corpusManifestHashSha256`
- `selectedDocumentIds[]`
- `selectedSectionIds[]` (for example `paragraph:0`)
- `noMatch` (boolean)
- `disposition` (`completed_without_effect` or `blocked`)
- `answerHashSha256`
- `externalEffect` (must be `none`)

Explicitly excluded from durable journals:

- raw question text;
- raw corpus paragraphs;
- fully rendered answer text;
- transient paragraph excerpts.

## 7) Governance semantics and outcome model

### 7.1 Completion semantics

Allowed M6 completion semantics:

- matched inquiry: `completed_without_effect`
- no-match inquiry: `completed_without_effect`

Both are no-effect outcomes.

### 7.2 No-match meaning

- no-match is a truthful result state, not a policy denial;
- no-match is not an error and not fabricated success;
- no external effect is claimed.

### 7.3 Rejections vs completions

- Unsafe/malformed/injection-like input -> deterministic denied disposition before inquiry execution.
- Valid input with empty token set or no qualifying corpus match -> deterministic completed no-match no-effect result.

### 7.4 M2/M3/M4/M5 linkage

- M2: intent/plan/decision/transaction linkage required.
- M3: proposed capability registration remains required.
- M4: deterministic verification and no-effect attestation required.
- M5: backup/restore/evidence scope update required before any broader claim.

### 7.5 Owner authorization requirement reaffirmed

M6 remains blocked for implementation until separate explicit Owner scope-authorization is granted. This document does not authorize implementation.

### 7.6 Final boundary consistency

This design remains:

- proposed and non-authorizing;
- local-only;
- synthetic-only;
- non-live-effect;
- blocked pending separate explicit Owner scope authorization.

## 8) Acceptance and test plan (future implementation gate)

Required tests before any M6 readiness claim:

1. valid deterministic match:
   - repeated identical input yields identical answer hash, references, and disposition;
2. strict input rejection:
   - empty, multiline, control-char, malformed UTF-8, oversized, secret-like, path-like, URL-like, command-metacharacter, and injection-like inputs are rejected;
3. tokenization determinism:
   - NFKC/trim/lower/token regex/min-length/ordered stopword behavior is stable;
4. empty-token no-match:
   - completion no-match (not capability error);
5. corpus validation:
   - reject symlink, malformed JSON, schema mismatch, duplicate IDs, out-of-root path, secret-like corpus content;
6. deterministic ranking:
   - exact score math, threshold, tie-break, and ordering reproducibility;
7. no-match truthfulness:
   - completed no-effect no-match without fabricated content;
8. output constraints:
   - deterministic template and UTF-8-safe 1200-byte truncation;
9. durable evidence minimization:
   - required fields persisted; forbidden raw fields absent;
10. governance behavior:

- M2 deny/approval-required blocks execution; replay/idempotency/conflict behavior is deterministic;

11. tamper/reconstruction/recovery:

- fail closed on evidence mismatch; truthful reconstruction state;

12. no-network/no-external-effect proof:

- static and runtime checks demonstrate no outbound/network/live effects.

## 9) Explicit non-goals

- not general chat;
- not a model-powered assistant;
- not arbitrary document search;
- not a tool-execution system;
- not permission to access local user files.

## 10) Required future Owner authorization before implementation

Implementation is blocked until all are explicitly authorized:

- Owner approval to admit M6 scope expansion beyond current M0-M5 local capability;
- approved M6 capability contract and authority envelope;
- independent verification plan update for M6 claims and negative-path coverage;
- explicit M5 evidence-register and backup/restore scope update for M6 records;
- explicit confirmation that local-only/synthetic-only/non-live-effect boundary remains intact.

Until then, this document is design-only and non-authorizing.
