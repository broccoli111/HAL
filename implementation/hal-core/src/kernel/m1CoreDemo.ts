import { InMemoryAppendOnlyAuditStore, type AuditRecord } from "../audit/memoryAuditStore.js";
import { evaluateLocalPolicy } from "../authority/localPolicy.js";
import { loadLocalRequestFixture, type LocalRequestFixtureName } from "../request/fixtures.js";
import type { AuthorityDecision } from "../authority/decision.js";
import type { ControlledConfiguration } from "./config.js";
import { SafeMode } from "./safeMode.js";

export type M1DemoResult = Readonly<{
  fixtureName: LocalRequestFixtureName;
  decision: AuthorityDecision;
  requestReceiptAuditRecord: AuditRecord;
  decisionAuditRecord: AuditRecord;
  auditTrailForCorrelation: readonly AuditRecord[];
  safeModeState: string;
  claimedEffect: "none" | "inspection_only";
}>;

export function runM1CoreDemo(
  configuration: ControlledConfiguration,
  fixtureName: LocalRequestFixtureName
): M1DemoResult {
  const safeMode = new SafeMode(configuration.safeMode);
  const request = loadLocalRequestFixture(fixtureName);
  const auditStore = new InMemoryAppendOnlyAuditStore(configuration.environment);

  const requestReceiptAuditRecord = auditStore.append({
    correlationId: request.correlationId,
    eventType: "local_request_received",
    details: `requestId=${request.requestId}; action=${request.declaredAction}; target=${request.declaredTarget}; purpose=${request.declaredPurpose}; classification=${request.dataClassification}`
  });

  const decision = evaluateLocalPolicy(request, safeMode);
  const claimedEffect = decision.disposition === "allow" ? "inspection_only" : "none";

  const decisionAuditRecord = auditStore.append({
    correlationId: request.correlationId,
    causationAuditRecordId: requestReceiptAuditRecord.auditRecordId,
    eventType: "authority_decision_recorded",
    details: `requestId=${request.requestId}; disposition=${decision.disposition}; reason=${decision.reason}; claimedEffect=${claimedEffect}`
  });

  return Object.freeze({
    fixtureName,
    decision,
    requestReceiptAuditRecord,
    decisionAuditRecord,
    auditTrailForCorrelation: auditStore.findByCorrelationId(request.correlationId),
    safeModeState: safeMode.getState(),
    claimedEffect
  });
}
