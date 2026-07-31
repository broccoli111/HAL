export type M8BoundaryMode = "local_only" | "synthetic_only" | "deterministic" | "non_live_effect";

export type M8InquiryPanel = Readonly<{
  requestId: string;
  correlationId: string;
  result: string;
  disposition: string;
  replayed: boolean;
  attestationStatus: string;
  attestationClaimedEffect: string;
  inputClassification: string;
  response: string;
}>;

export type M8StateDirectoryStatus = Readonly<{
  selected: boolean;
  stateDirectory?: string;
  error?: string;
}>;

export type M8BlockedCode =
  | "malformed_input"
  | "ipc_validation_failed"
  | "state_directory_validation_failed"
  | "m6_invocation_failed"
  | "integrity_unavailable";

export type M8QuestionSubmission = Readonly<{
  questionText: string;
}>;

export type M8ReplaySubmission = Readonly<{
  requestId: string;
  questionText: string;
}>;
