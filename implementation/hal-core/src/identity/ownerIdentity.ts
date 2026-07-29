import type { ImmutableIdentifier } from "../shared/types.js";

export type OwnerIdentity = Readonly<{
  immutableOwnerId: ImmutableIdentifier;
  displayName: string;
}>;

export function createOwnerIdentity(
  immutableOwnerId: ImmutableIdentifier,
  displayName: string
): OwnerIdentity {
  if (!displayName.trim()) {
    throw new Error("Owner displayName must be non-empty.");
  }

  return Object.freeze({
    immutableOwnerId,
    displayName
  });
}
