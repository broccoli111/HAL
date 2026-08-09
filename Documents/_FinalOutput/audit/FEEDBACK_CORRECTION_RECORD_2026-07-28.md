# Feedback Correction Record — 2026-07-28

**Scope:** Compiled files inside `_FinalOutput` only  
**Source-book folders modified:** No  
**Disposition:** Complete; full PDF audit passed

## Corrections

1. **Book VI constitutional citations**
   - Replaced `Articles I-XIV` with `Articles I-XII` in two locations.
   - Replaced `Articles XI-XIV` with `Articles XI-XII` in two locations.

2. **Book IX control identifier uniqueness**
   - `IX-GOV-001` through `IX-GOV-003` are defined once in Chapter 1 and cross-referenced from Chapter 2.
   - `IX-CNF-001` through `IX-CNF-004` are defined once in Chapter 14 and cross-referenced from Chapter 15.
   - Automated checks require exactly one governing definition for each affected identifier.

3. **Protected memory restriction semantics**
   - Replaced `Forget Memory` with `Restrict Memory Association`.
   - Replaced `Memory Forgotten` with `Memory Association Restricted`.
   - Updated Book IX paths and event topics accordingly.
   - Books IV and IX now bind the operations to Book II's protected-deletion and tombstone model and prohibit erasure or rewriting of historical experience and immutable Experience Ledger evidence.

4. **Book II authoritative state ownership**
   - Decomposed every composite entry in Chapter 1 §6 into 18 single-domain rows:
     - Identity — Identity Service
     - Delegation — Authority Service
     - Authentication — Identity Service
     - Policy — Policy System
     - Exception — Policy System
     - Approval — Policy System
     - Experience — Experience Ledger
     - Audit — Audit Service
     - Knowledge — Knowledge Service
     - Pattern — Knowledge Service
     - Intent — Intent Manager
     - Plan — Planner
     - Transaction — Transaction Coordinator
     - Outcome — Outcome Service
     - Configuration — Configuration Plane
     - Secret reference — Secrets Service
     - Node observation — Node Registry
     - Provider observation — Provider Registry
   - Every row contains exactly one state domain and one authoritative owner.

## Verification

- Markdown, DOCX, and PDF editions were synchronized for Books II, IV, VI, and IX.
- All four revised DOCX files were freshly rendered.
- Every rendered page was included in visual layout review.
- The ten-book PDF audit passed: 742 pages, zero errors.
- No new constitutional conflict or Owner Review item was introduced.
