export {
  M7_REQUEST_ID_PREFIX,
  M8_REQUEST_ID_PREFIX,
  createLocalInquiryRequestIdGenerator,
  executeLocalGovernedInquiry,
  resolveAndValidateLocalInquiryStateDirectory
} from "./localInquiryService.js";
export type {
  LocalInquiryExecutionFailure,
  LocalInquiryExecutionInput,
  LocalInquiryExecutionResult,
  LocalInquiryExecutionSuccess
} from "./localInquiryService.js";
