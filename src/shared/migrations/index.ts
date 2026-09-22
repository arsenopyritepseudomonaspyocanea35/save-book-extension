import { migration1to2 } from './1-2.migration';
import type { Migration } from './types';

/** The ladder, oldest step first: one file per hop, named for the versions it joins. */
export const migrations: Migration[] = [migration1to2];

/** The shape the current code reads. Derived from the ladder so the two cannot drift apart. */
export const LATEST_VERSION = migrations.reduce((highest, step) => Math.max(highest, step.to), 1);

/** A store that lost its marker is read as the oldest shape; a non-number is not a version. */
function declaredVersion(raw: unknown): number {
 if (typeof raw !== 'object' || raw === null) return 1;
 const declared = 'version' in raw ? raw.version : undefined;
 return typeof declared === 'number' && Number.isFinite(declared) ? declared : 1;
}

/**
 * Walks a stored value up to the current shape. Only a record is a store, so anything else is
 * handed to the current parser untouched for it to salvage or reject. Each step decides whether it
 * applies by version or by the shape it recognises; a store from a version newer than this build
 * knows is left alone rather than guessed at.
 */
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
