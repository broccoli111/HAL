# Ambiguous and Forbidden Terms

These usages MUST be replaced or qualified in normative HAL artifacts.

| Usage | Required replacement | Reason |
|---|---|---|
| user | Use Principal, Owner, human, operator, or another qualified role. | “User” collapses distinct identity and authority roles. |
| agent | Use HAL, Principal, service, model, provider, or external agent. | “Agent” obscures identity, accountability, and authority. |
| authorization | Use Authority for governed scope; Permission for the decision result; Policy evaluation for the process. | The word often collapses three distinct concepts. |
| proof | Use Evidence Object, Verification result, or formal proof as applicable. | Evidence supports claims; empirical evidence is not necessarily mathematical proof. |
| truth | Use authoritative state, verified claim, observation, or confidence-qualified conclusion. | Unqualified truth hides source, time, scope, and uncertainty. |
| memory | Use Experience, Experience Ledger, Memory, Knowledge, or cache as applicable. | The generic word hides governance, durability, and epistemic status. |
| production | Qualify the exact environment and Reality Boundary stage. | A name does not establish real authority or effect boundaries. |
| rollback | Use Rollback only for truthful reversal; use Compensation for remedial new action. | External effects may not be erasable. |
| exactly once | State the bounded delivery, deduplication, and effect guarantee. | Distributed and external effects rarely support an unqualified guarantee. |
| real time | Declare latency, freshness, clock, and ordering bounds. | The phrase is not objectively testable without thresholds. |
| secure | Name the control objective, threat, enforcement, and evidence. | A broad adjective is not a security claim. |
| safe | Name the hazard, invariant, containment, verification, and residual risk. | A broad adjective is not a safety claim. |
| trusted | Name the Trust dimension, scope, evidence, confidence, and expiry. | Trust is multidimensional and does not imply authority. |
| owner | Capitalize Owner only for the constitutional role; qualify other ownership such as code owner or data custodian. | Lowercase operational ownership must not be confused with Book I authority. |
| HAL instance | Use Runtime, Node, Presence, service instance, or model instance. | HAL has one constitutional identity. |
| evidence | Use Evidence Object when authoritative admission is meant; otherwise qualify Evidence Candidate or source material. | Not every record or observation is authoritative Evidence. |
| Founder | Use Owner in new canon text; Founder is permitted only as a historical source alias for that same role. | Book I states Founder and Owner are the same constitutional role; Founder must not be interpreted as a second role. |
