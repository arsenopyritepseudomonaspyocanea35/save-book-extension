import { migration1to2 } from './1-2.migration';
import type { Migration } from './types';

export const migrations: Migration[] = [migration1to2];

export const LATEST_VERSION = migrations.reduce((highest, step) => Math.max(highest, step.to), 1);

function declaredVersion(raw: unknown): number {
  if (typeof raw !== 'object' || raw === null) return 1;
  const declared = 'version' in raw ? raw.version : undefined;
  return typeof declared === 'number' && Number.isFinite(declared) ? declared : 1;
}

export function applyMigrations(raw: unknown): unknown {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return raw;
  let current: unknown = raw;
  let version = declaredVersion(current);
  for (const step of migrations) {
    if (step.from !== version && !step.alsoApplies?.(current)) continue;
    current = step.run(current);
    version = step.to;
  }
  return current;
}
