export type SafeModeState = "restrictive" | "inspection_only";

export const DEFAULT_SAFE_MODE_STATE: SafeModeState = "restrictive";

export class SafeMode {
  private readonly state: SafeModeState;

  public constructor(state: SafeModeState = DEFAULT_SAFE_MODE_STATE) {
    this.state = state;
  }

  public getState(): SafeModeState {
    return this.state;
  }

  public isRestrictive(): boolean {
    return this.state === "restrictive";
  }
}
