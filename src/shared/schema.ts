import * as v from 'valibot';
import { parsePattern } from './pattern';

export const STORAGE_KEY = 'saveBook';
export const SCHEMA_VERSION = 1;

/** Every kind of item a site can hold; `itemTypes` must define all of them. */
export const ITEM_KINDS = ['text', 'secret'] as const;
export const ItemKindSchema = v.picklist(ITEM_KINDS);
export type ItemKind = v.InferOutput<typeof ItemKindSchema>;

/*
 * The persisted blob outlives the code that wrote it, so everything crossing the
 * storage boundary is parsed rather than trusted. Leaves declare a fallback: one
 * corrupt field must never cost the user a whole site.
 */
const ItemSchema = v.object({
  id: v.fallback(v.pipe(v.string(), v.minLength(1)), () => crypto.randomUUID()),
  type: v.fallback(ItemKindSchema, 'text'),
  label: v.fallback(v.string(), ''),
  value: v.fallback(v.string(), ''),
});

const DEFAULT_UI = { x: null, y: null, collapsed: false, hidden: false };

const SiteUiSchema = v.object({
  x: v.fallback(v.nullable(v.number()), null),
  y: v.fallback(v.nullable(v.number()), null),
  collapsed: v.fallback(v.boolean(), false),
  hidden: v.fallback(v.boolean(), false),
});

const SiteSchema = v.object({
  id: v.fallback(v.pipe(v.string(), v.minLength(1)), () => crypto.randomUUID()),
  pattern: v.fallback(v.string(), ''),
  label: v.fallback(v.string(), ''),
  enabled: v.fallback(v.boolean(), true),
  origins: v.fallback(v.array(v.string()), []),
  items: v.fallback(v.array(v.unknown()), []),
  ui: v.fallback(SiteUiSchema, DEFAULT_UI),
});

const StoreShapeSchema = v.object({
  version: v.fallback(v.number(), SCHEMA_VERSION),
  sites: v.fallback(v.array(v.unknown()), []),
});

export type Item = v.InferOutput<typeof ItemSchema>;
export type SiteUI = v.InferOutput<typeof SiteUiSchema>;

export interface Site {
  id: string;
  pattern: string;
  label: string;
  enabled: boolean;
  /** Host permissions granted for this site, so they can be revoked cleanly. */
  origins: string[];
  items: Item[];
  ui: SiteUI;
}

export interface Store {
  version: number;
  sites: Site[];
}

function parseSite(raw: unknown): Site | undefined {
  const parsed = v.safeParse(SiteSchema, raw);
  if (!parsed.success) return undefined;
  const items: Item[] = [];
  for (const candidate of parsed.output.items) {
    const item = v.safeParse(ItemSchema, candidate);
    if (item.success) items.push(item.output);
  }
  return { ...parsed.output, pattern: parsePattern(parsed.output.pattern), items };
}

/** Total: any value at all yields a usable store, never a throw. */
export function parseStore(raw: unknown): Store {
  const shape = v.safeParse(StoreShapeSchema, raw);
  if (!shape.success) return emptyStore();
  const sites: Site[] = [];
  for (const candidate of shape.output.sites) {
    const site = parseSite(candidate);
    if (site) sites.push(site);
  }
  return { version: SCHEMA_VERSION, sites };
}

export function emptyStore(): Store {
  return { version: SCHEMA_VERSION, sites: [] };
}

export function createItem(kind: ItemKind): Item {
  return { id: crypto.randomUUID(), type: kind, label: '', value: '' };
}

export function createSite(pattern: string, origins: string[]): Site {
  return {
    id: crypto.randomUUID(),
    pattern,
    label: '',
    enabled: true,
    origins,
    items: [],
    ui: { ...DEFAULT_UI },
  };
}
