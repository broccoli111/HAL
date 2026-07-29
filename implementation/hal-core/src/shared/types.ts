export type CorrelationId = string & { readonly __brand: "CorrelationId" };

export type ImmutableIdentifier = string & { readonly __brand: "ImmutableIdentifier" };

export type RequestId = string & { readonly __brand: "RequestId" };

export type CommandId = string & { readonly __brand: "CommandId" };
