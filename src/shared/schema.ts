import * as v from 'valibot';
import { parsePattern } from './pattern';

export const STORAGE_KEY = 'saveBook';
export const SCHEMA_VERSION = 2;

export const ITEM_KINDS = ['text', 'secret'] as const;
export const ItemKindSchema = v.picklist(ITEM_KINDS);
export type ItemKind = v.InferOutput<typeof ItemKindSchema>;

const ItemSchema = v.object({
  id: v.fallback(v.pipe(v.string(), v.minLength(1)), () => crypto.randomUUID()),
  type: v.fallback(ItemKindSchema, 'text'),
  label: v.fallback(v.string(), ''),
  value: v.fallback(v.string(), ''),
  sites: v.fallback(v.array(v.string()), () => []),
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
  origins: v.fallback(v.array(v.string()), () => []),
  ui: v.fallback(SiteUiSchema, () => ({ ...DEFAULT_UI })),
});

const StoreShapeSchema = v.object({
  version: v.fallback(v.number(), SCHEMA_VERSION),
  sites: v.fallback(v.array(v.unknown()), () => []),
  items: v.fallback(v.array(v.unknown()), () => []),
});

export type Item = v.InferOutput<typeof ItemSchema>;
export type SiteUI = v.InferOutput<typeof SiteUiSchema>;

export interface Site {
  id: string;
  pattern: string;
  label: string;
  enabled: boolean;
  origins: string[];
  ui: SiteUI;
}

export interface Store {
  version: number;
  sites: Site[];
  items: Item[];
}

function parseSite(raw: unknown): Site | undefined {
  const parsed = v.safeParse(SiteSchema, raw);
  if (!parsed.success) return undefined;
  return { ...parsed.output, pattern: parsePattern(parsed.output.pattern) };
}

/** Items nested inside a site record: the schema-1 shape, still read so old stores migrate. */
function nestedItems(raw: unknown): Item[] {
  if (typeof raw !== 'object' || raw === null || !('items' in raw)) return [];
  const candidates = raw.items;
  if (!Array.isArray(candidates)) return [];
  const items: Item[] = [];
  for (const candidate of candidates) {
    const parsed = v.safeParse(ItemSchema, candidate);
    if (parsed.success) items.push(parsed.output);
  }
  return items;
}

export function parseStore(raw: unknown): Store {
  const shape = v.safeParse(StoreShapeSchema, raw);
  if (!shape.success) return emptyStore();

  const sites: Site[] = [];
  const nested: { item: Item; siteId: string }[] = [];
  for (const candidate of shape.output.sites) {
    const site = parseSite(candidate);
    if (!site) continue;
    sites.push(site);
    for (const item of nestedItems(candidate)) nested.push({ item, siteId: site.id });
  }

  const known = new Set(sites.map((site) => site.id));
  const items: Item[] = [];
  const folded = new Map<string, Item>();

  // A site's own items become pool items; identical ones (same kind, label and value) fold into a
  // single item carrying every site that had it, which is exactly what the shared pool is for.
  for (const { item, siteId } of nested) {
    const key = `${item.type}\u0000${item.label}\u0000${item.value}`;
    const twin = folded.get(key);
    if (twin) {
      if (!twin.sites.includes(siteId)) twin.sites.push(siteId);
      continue;
    }
    item.sites = [siteId];
    folded.set(key, item);
    items.push(item);
  }

  for (const candidate of shape.output.items) {
    const parsed = v.safeParse(ItemSchema, candidate);
    if (!parsed.success) continue;
    const item = parsed.output;
    item.sites = [...new Set(item.sites)].filter((id) => known.has(id));
    items.push(item);
  }

  return { version: SCHEMA_VERSION, sites, items };
}

export function emptyStore(): Store {
  return { version: SCHEMA_VERSION, sites: [], items: [] };
}

export function createItem(kind: ItemKind, sites: string[] = []): Item {
  return { id: crypto.randomUUID(), type: kind, label: '', value: '', sites: [...sites] };
}

export function createSite(pattern: string, origins: string[]): Site {
  return {
    id: crypto.randomUUID(),
    pattern,
    label: '',
    enabled: true,
    origins,
    ui: { ...DEFAULT_UI },
  };
}
