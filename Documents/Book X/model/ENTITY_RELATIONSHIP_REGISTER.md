# Entity Relationship Register

| Relation ID | Source | Relationship | Target | Source cardinality | Target cardinality | Constraint |
|---|---|---|---|---|---|---|
| HAL-REL-0001 | Owner | owns constitutionally | HAL | 1 | 1 | Book I-reserved ownership; infrastructure possession is insufficient. |
| HAL-REL-0002 | Constitution | governs | HAL | 1 | 1 | Supreme authority. |
| HAL-REL-0003 | Constitutional Kernel | enforces | Constitutional Invariant | 1 | many | Only at Book II-designated enforcement points. |
| HAL-REL-0004 | Constitutional Mirror | describes | HAL | 1 | 1 | Evidence-linked and non-self-authorizing. |
| HAL-REL-0005 | HAL | manifests through | Presence | 1 | many | All Presences share one HAL identity. |
| HAL-REL-0006 | Presence | binds to | Embodiment | many | 0..many | Within explicit context and lifecycle. |
| HAL-REL-0007 | Identity Record | represents | Identity | 1 | 1 | Record and entity remain distinct. |
| HAL-REL-0008 | Identifier | references | Identity | many | 1 | Within a declared namespace. |
| HAL-REL-0009 | Identity Attribute | describes | Identity | many | 1 | Does not establish authority. |
| HAL-REL-0010 | Authentication Evidence | supports | Authentication | many | many | Evidence role, not authorization. |
| HAL-REL-0011 | Delegation | grants bounded | Authority | many | 1 | Cannot exceed delegator authority. |
| HAL-REL-0012 | Policy | evaluates for | Permission | many | many | Result is contextual and scoped. |
| HAL-REL-0013 | Authority | constrains | Permission | many | many | Authority is not the decision result. |
| HAL-REL-0014 | Trust | informs | Policy Decision Record | many | many | Never sole authority. |
| HAL-REL-0015 | Intent | decomposes into | Goal | 1 | many | Traceability is retained. |
| HAL-REL-0016 | Goal | decomposes into | Objective | 1 | many | Criteria remain explicit. |
| HAL-REL-0017 | Objective | is pursued by | Plan | many | many | Plans do not confer authority. |
| HAL-REL-0018 | Plan | contains | Task | 1 | many | Execution may diverge with evidence. |
| HAL-REL-0019 | Decision Object | records | Judgment | many | 1 | Includes alternatives and uncertainty. |
| HAL-REL-0020 | Outcome Object | evaluates | Goal | many | many | Against evidence and side effects. |
| HAL-REL-0021 | Capability Contract | defines | Capability | many | 1 | Versioned semantic contract. |
| HAL-REL-0022 | Provider | fulfills | Capability | many | many | Selection remains governed. |
| HAL-REL-0023 | Adapter | connects | Provider | many | 1 | Preserves canonical capability semantics. |
| HAL-REL-0024 | Transaction | coordinates | Action | 1 | many | Includes commit and recovery state. |
| HAL-REL-0025 | Canary | is governed stage within | Reality Boundary | many | 1 | A Canary is a limited real-operation stage; it is not a kind of boundary. |
| HAL-REL-0026 | Evidence Candidate | may be admitted as | Evidence Object | many | 0..1 | Only through the authoritative evidence process. |
| HAL-REL-0027 | Evidence Object | supports or opposes | Claim | many | many | Relation and weight are explicit. |
| HAL-REL-0028 | Evidence Graph | contains | Evidence Object | 1 | many | Objects remain immutable. |
| HAL-REL-0029 | Verification | evaluates | Claim | many | many | Against explicit criteria. |
| HAL-REL-0030 | Assurance Case | organizes | Claim | 1 | many | Includes reasoning and defeaters. |
| HAL-REL-0031 | Certification | depends on | Assurance Case | many | 1..many | Scoped and time-bounded. |
| HAL-REL-0032 | Experience Ledger | contains | Experience | 1 | many | Append-oriented and governed. |
| HAL-REL-0033 | Memory Graph | associates | Memory | 1 | many | Association is not causation. |
| HAL-REL-0034 | Knowledge Graph | represents | Knowledge | 1 | many | Preserves provenance and validity. |
| HAL-REL-0035 | Pattern | is derived from | Experience | many | many | Reproducibly supported. |
| HAL-REL-0036 | Wisdom | informs | Judgment | many | many | Does not grant authority. |
| HAL-REL-0037 | Command | may cause | Event | many | 0..many | Only after authoritative handling. |
| HAL-REL-0038 | Projection | is derived from | Event Journal | many | 1..many | Not authoritative unless designated. |
| HAL-REL-0039 | Transactional Outbox | publishes | Event | 1 | many | After local authoritative commit. |
| HAL-REL-0040 | Message Envelope | carries | Command | many | 0..1 | Also may carry Query or Event. |
| HAL-REL-0041 | Treaty | governs exchange with | External Trust Domain | many | 1 | Revocable and constitutionally bounded. |
| HAL-REL-0042 | Constitutional Firewall | enforces | Treaty | 1 | many | At external exchange paths. |
| HAL-REL-0043 | Data Classification | constrains | Retention Class | many | many | Alongside purpose and authority. |
| HAL-REL-0044 | Supervisor | controls lifecycle of | Service | many | many | Within declared authority. |
| HAL-REL-0045 | Reservation | allocates | Resource | many | 1 | Time-bounded and purpose-bound. |
| HAL-REL-0046 | Recovery | restores toward | Desired State | many | 1 | Validated against Observed State. |
| HAL-REL-0047 | Architecture Decision Record | documents | Semantic Change | many | 0..many | When architectural consequence exists. |
| HAL-REL-0048 | Exception | applies to | Control | many | 1 | Time-bounded; never constitutional. |
| HAL-REL-0049 | Cross-Book Term Index | indexes | Canonical Term | 1 | many | Does not replace governing source. |
| HAL-REL-0050 | External Trust Domain | specializes | Trust Domain | many | 1 | Externality changes governance assumptions and requires controlled exchange. |
| HAL-REL-0051 | Owner | performs | Owner Authorization Ceremony | 1 | many | Each ceremony is bound to one exact immutable decision identifier, scope, and validity period. |
| HAL-REL-0052 | Owner Authorization Ceremony | authorizes exact | Protected Action | many | 1 | Authorization is non-transferable and cannot be reused for a different action, Treaty, capability class, or mutation. |
| HAL-REL-0053 | Evidence Service | admits and governs | Evidence Object | 1 | many | Only the authoritative admission process may create governed Evidence Objects or change their verification state through new linked evidence. |
| HAL-REL-0054 | Release Authority | certifies | Release | many | many | Certification is evidence-based, attributable, scoped, and cannot exceed the qualified release or deployment scope. |
