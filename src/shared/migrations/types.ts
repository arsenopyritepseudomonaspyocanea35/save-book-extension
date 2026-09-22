export interface Migration {
  from: number;
  to: number;
  alsoApplies?: (raw: unknown) => boolean;
  run: (raw: unknown) => unknown;
}
