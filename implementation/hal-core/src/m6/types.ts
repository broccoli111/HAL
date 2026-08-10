import type { CorrelationId, ImmutableIdentifier } from "../shared/types.js";

export const M6_SCHEMA_VERSION = "m6.inquiry.evidence.v1" as const;
export const M6_TOKENIZER_VERSION = "m6.tokenizer.v1" as const;
export const M6_MATCHER_VERSION = "m6.matcher.v1" as const;
export const M6_CORPUS_INDEX_VERSION = "m6.corpus-index.v1" as const;
export const M6_CAPABILITY_ID = "answer_synthetic_corpus_question_deterministic_v1" as const;
export const M6_PROVIDER_ID = "LocalDeterministicInquiryProvider" as const;
export const M6_PROVIDER_VERSION = "1.0.0" as const;

export const M6_MAX_CODE_POINTS = 512;
export const M6_MAX_UTF8_BYTES = 2048;
export const M6_MAX_RESPONSE_UTF8_BYTES = 1200;
export const M6_EXCERPT_MAX_UTF8_BYTES = 80;

export const M6_REJECTION_CODES = Object.freeze([
  "REJ_EMPTY_OR_WHITESPACE",
  "REJ_MALFORMED_UTF8",
  "REJ_NOT_SINGLE_LINE",
  "REJ_ASCII_CONTROL_CHAR",
  "REJ_TOO_MANY_CODE_POINTS",
  "REJ_TOO_MANY_UTF8_BYTES",
  "REJ_SECRET_LIKE",
  "REJ_PATH_LIKE",
  "REJ_URL_LIKE",
  "REJ_COMMAND_METACHAR",
  "REJ_INJECTION_LIKE"
] as const);

export type M6RejectionCode = (typeof M6_REJECTION_CODES)[number];
export type M6InputDisposition = "accepted" | "denied";
export type M6InquiryResult = "matched" | "no_match" | "denied" | "blocked";

export type M6QuestionAssessment = Readonly<{
  disposition: M6InputDisposition;
  code?: M6RejectionCode;
  normalizedQuestionText?: string;
  questionCodePoints: number;
  questionUtf8Bytes: number;
  questionNormalizedHashSha256: string;
  questionTokens: readonly string[];
}>;

export type M6CorpusSection = Readonly<{
  sectionId: string;
  index: number;
  originalParagraph: string;
  normalizedParagraph: string;
  tokens: readonly string[];
}>;

export type M6CorpusDocument = Readonly<{
  id: string;
  title: string;
  tags: readonly string[];
  paragraphs: readonly string[];
  normalizedTitle: string;
  normalizedTags: readonly string[];
  titleTokens: readonly string[];
  tagTokens: readonly string[];
  sections: readonly M6CorpusSection[];
}>;

export type M6CorpusSnapshot = Readonly<{
  manifestHashSha256: string;
  documents: readonly M6CorpusDocument[];
}>;

export type M6SelectedSection = Readonly<{
  documentId: string;
  sectionId: string;
  sectionIndex: number;
  sectionScore: number;
  paragraph: string;
}>;

export type M6SelectedDocument = Readonly<{
  documentId: string;
  documentScore: number;
  titleMatches: number;
  /**
   * Retrieval-only document classification retained with the selected result.
   * It carries no authority or source content; renderers use it only to apply
   * the bounded topic-index excerpt policy.
   */
  tags?: readonly string[];
  selectedSections: readonly M6SelectedSection[];
}>;

export type M6MatchOutcome = Readonly<{
  noMatch: boolean;
  selectedDocuments: readonly M6SelectedDocument[];
  selectedSectionIds: readonly string[];
  selectedDocumentIds: readonly string[];
}>;

export type M6EvidenceRecord = Readonly<{
  inquiryRecordId: ImmutableIdentifier;
  requestId: ImmutableIdentifier;
  requestFingerprintSha256: string;
  requestedAdmissionMode: "allow" | "approval_required" | "deny";
  m2IntentId?: ImmutableIdentifier;
  m2PlanId?: ImmutableIdentifier;
  m2DecisionId?: ImmutableIdentifier;
  m2TransactionId?: ImmutableIdentifier;
  schemaVersion: typeof M6_SCHEMA_VERSION;
  timestampIso8601: string;
  correlationId: CorrelationId;
  causationEventId?: ImmutableIdentifier;
  questionNormalizedHashSha256: string;
  questionCodePoints: number;
  questionUtf8Bytes: number;
  tokenizerVersion: typeof M6_TOKENIZER_VERSION;
  matcherVersion: typeof M6_MATCHER_VERSION;
  corpusIndexVersion: typeof M6_CORPUS_INDEX_VERSION;
  corpusManifestHashSha256: string;
  m9PackId?: string;
  m9PackVersion?: string;
  m9ManifestHashSha256?: string;
  m9ActivationRecordId?: ImmutableIdentifier;
  selectedDocumentIds: readonly string[];
  selectedSectionIds: readonly string[];
  noMatch: boolean;
  disposition: "completed_without_effect" | "blocked";
  answerHashSha256: string;
  externalEffect: "none";
  inputClassification: M6RejectionCode | "ACCEPTED";
  inputDisposition: "accepted" | "denied";
  previousIntegrityHash?: string;
  integrityHash: string;
}>;

export type M6JournalEvent = Readonly<{
  eventRecordId: ImmutableIdentifier;
  timestampIso8601: string;
  correlationId: CorrelationId;
  eventType: "M6InquiryRecorded";
  record: M6EvidenceRecord;
  previousIntegrityHash?: string;
  integrityHash: string;
}>;
