import type { ProviderSummaryResult } from "../m3/types.js";
import { M6_M3_PROVIDER_ID, type M3ProviderVersion } from "../m3/types.js";
import { createHash } from "node:crypto";
import path from "node:path";
import { loadSyntheticCorpusFromFilesForTest } from "./corpus.js";
import { matchCorpus } from "./matcher.js";
import { renderM6Response } from "./response.js";
import { M6_PROVIDER_VERSION } from "./types.js";

type M6ProviderInput = Readonly<{
  questionNormalizedHashSha256: string;
  questionTokens: readonly string[];
  requestedAdmissionMode: string;
  m2LinkageIdentity: Readonly<{
    intentId: string;
    planId: string;
    decisionId: string;
    transactionId: string;
  }>;
  m9ActivationContext?: Readonly<{
    activationRecordId: string;
    packId: string;
    packVersion: string;
    manifestHashSha256: string;
  }>;
}>;

function isM6ProviderInput(value: unknown): value is M6ProviderInput {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value as Partial<M6ProviderInput>;
  const m9ActivationContext = candidate.m9ActivationContext;
  const m9Valid =
    !m9ActivationContext ||
    (typeof m9ActivationContext.activationRecordId === "string" &&
      typeof m9ActivationContext.packId === "string" &&
      typeof m9ActivationContext.packVersion === "string" &&
      typeof m9ActivationContext.manifestHashSha256 === "string");
  return (
    typeof candidate.questionNormalizedHashSha256 === "string" &&
    candidate.questionNormalizedHashSha256.trim().length > 0 &&
    Array.isArray(candidate.questionTokens) &&
    candidate.questionTokens.every((v) => typeof v === "string") &&
    typeof candidate.requestedAdmissionMode === "string" &&
    !!candidate.m2LinkageIdentity &&
    typeof candidate.m2LinkageIdentity.intentId === "string" &&
    typeof candidate.m2LinkageIdentity.planId === "string" &&
    typeof candidate.m2LinkageIdentity.decisionId === "string" &&
    typeof candidate.m2LinkageIdentity.transactionId === "string" &&
    m9Valid
  );
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export class LocalDeterministicInquiryProvider {
  private invocationCount = 0;

  public execute(input: {
    fixtureRoot: string;
    files: readonly string[];
    fixtureManifestHash: string;
    providerInput?: Readonly<Record<string, unknown>>;
  }): ProviderSummaryResult {
    if (!isM6ProviderInput(input.providerInput)) {
      throw new Error("M6 provider input is malformed.");
    }

    this.invocationCount += 1;
    const corpus = loadSyntheticCorpusFromFilesForTest(
      input.fixtureRoot,
      input.files,
      input.providerInput.m9ActivationContext?.packId === "hal_canon_v1" ||
        input.providerInput.m9ActivationContext?.packId === "personal_document_pilot_v1"
    );
    const match = matchCorpus(input.providerInput.questionTokens, corpus.documents);
    const rendered = renderM6Response({
      match,
      corpusManifestHashSha256: corpus.manifestHashSha256,
      corpusContext:
        input.providerInput.m9ActivationContext?.packId === "hal_canon_v1"
          ? "owner_approved_hal_canon"
          : input.providerInput.m9ActivationContext?.packId === "personal_document_pilot_v1"
            ? "owner_approved_local_document"
            : "synthetic"
    });
    const consumedFiles = input.files.map((filePath) => path.basename(filePath)).sort();
    const summaryTitles = corpus.documents.map((doc) => doc.id).slice(0, 8);

    return Object.freeze({
      providerId: M6_M3_PROVIDER_ID,
      providerVersion: M6_PROVIDER_VERSION as M3ProviderVersion,
      fixtureManifestHash: corpus.manifestHashSha256,
      consumedFiles: Object.freeze(consumedFiles),
      itemCount: match.selectedSectionIds.length,
      deterministicInquiry: Object.freeze({
        questionNormalizedHashSha256: input.providerInput.questionNormalizedHashSha256,
        selectedDocumentIds: match.selectedDocumentIds,
        selectedSectionIds: match.selectedSectionIds,
        noMatch: match.noMatch,
        answerHashSha256: sha256(rendered.responseText),
        ...(input.providerInput.m9ActivationContext
          ? {
              m9ActivationContext: {
                activationRecordId: input.providerInput.m9ActivationContext.activationRecordId,
                packId: input.providerInput.m9ActivationContext.packId,
                packVersion: input.providerInput.m9ActivationContext.packVersion,
                manifestHashSha256: input.providerInput.m9ActivationContext.manifestHashSha256
              }
            }
          : {})
      }),
      summary: Object.freeze({
        totalItems: match.selectedSectionIds.length,
        titles: Object.freeze(summaryTitles),
        totalParagraphs: corpus.documents.reduce((sum, doc) => sum + doc.paragraphs.length, 0),
        totalParagraphCharacters: corpus.documents.reduce(
          (sum, doc) =>
            sum +
            doc.paragraphs.reduce((sectionSum, paragraph) => sectionSum + paragraph.length, 0),
          0
        )
      })
    });
  }

  public getInvocationCount(): number {
    return this.invocationCount;
  }
}
