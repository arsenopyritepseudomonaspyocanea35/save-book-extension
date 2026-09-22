import * as v from 'valibot';
import { parsePattern } from '../pattern';
import type { Migration } from './types';

/*
 * Schema 1 kept a list of items inside every site, so the same login had to be typed once per site.
 * Schema 2 pools them: one item, carrying the sites it is shown on.
 *
 * The schemas below describe the past and are frozen here on purpose. A migration has to read an
 * old store the way the build that wrote it did, so nothing in the current model can change how an
 * old store is understood.
 */

const ITEM_KINDS = ['text', 'secret'] as const;

const LegacyItemSchema = v.object({
 id: v.fallback(v.pipe(v.string(), v.minLength(1)), () => crypto.randomUUID()),
 type: v.fallback(v.picklist(ITEM_KINDS), 'text'),
 label: v.fallback(v.string(), ''),
 value: v.fallback(v.string(), ''),
});

const LegacyUiSchema = v.object({
 x: v.fallback(v.nullable(v.number()), null),
 y: v.fallback(v.nullable(v.number()), null),
 collapsed: v.fallback(v.boolean(), false),
 hidden: v.fallback(v.boolean(), false),
});

const LegacySiteSchema = v.object({
 id: v.fallback(v.pipe(v.string(), v.minLength(1)), () => crypto.randomUUID()),
 pattern: v.fallback(v.string(), ''),
 label: v.fallback(v.string(), ''),
 enabled: v.fallback(v.boolean(), true),
 origins: v.fallback(v.array(v.string()), () => []),
 items: v.fallback(v.array(v.unknown()), () => []),
 ui: v.fallback(LegacyUiSchema, () => ({ x: null, y: null, collapsed: false, hidden: false })),
});

const LegacyStoreSchema = v.object({
 sites: v.fallback(v.array(v.unknown()), () => []),
});

type LegacyItem = v.InferOutput<typeof LegacyItemSchema>;
type LegacyUi = v.InferOutput<typeof LegacyUiSchema>;

/* The shape this step writes, as schema 2 defined it then. */
interface PooledItem {
 id: string;
 type: LegacyItem['type'];
 label: string;
 value: string;
 sites: string[];
}

interface PooledSite {
 id: string;
 pattern: string;
 label: string;
 enabled: boolean;
 origins: string[];
 ui: LegacyUi;
}

function carriesNestedItems(raw: unknown): boolean {
 if (typeof raw !== 'object' || raw === null) return false;
 const sites = 'sites' in raw ? raw.sites : undefined;
 if (!Array.isArray(sites)) return false;
 return sites.some(
  (site) =>
   typeof site === 'object' &&
   site !== null &&
   'items' in site &&
   Array.isArray(site.items) &&
   site.items.length > 0,
 );
}

export const migration1to2: Migration = {
 from: 1,
 to: 2,
 alsoApplies: carriesNestedItems,
 run: (raw) => {
  const legacy = v.safeParse(LegacyStoreSchema, raw);
  const sites: PooledSite[] = [];
  const carried: { item: LegacyItem; siteId: string }[] = [];

  for (const candidate of legacy.success ? legacy.output.sites : []) {
   const parsed = v.safeParse(LegacySiteSchema, candidate);
   if (!parsed.success) continue;
   const { items, ...site } = parsed.output;
   sites.push({ ...site, pattern: parsePattern(site.pattern) });
   for (const nested of items) {
    const item = v.safeParse(LegacyItemSchema, nested);
    if (item.success) carried.push({ item: item.output, siteId: site.id });
   }
  }

  // Identical items (same kind, label and value) fold into one, carrying every site that had
  // them — which is the whole point of the shared pool.
  const items: PooledItem[] = [];
  const folded = new Map<string, PooledItem>();
  for (const { item, siteId } of carried) {
   const key = `${item.type}\u0000${item.label}\u0000${item.value}`;
   const twin = folded.get(key);
   if (twin) {
    if (!twin.sites.includes(siteId)) twin.sites.push(siteId);
    continue;
   }
   const pooled: PooledItem = { ...item, sites: [siteId] };
   folded.set(key, pooled);
   items.push(pooled);
  }

  // A store written half-way through the upgrade can hold both shapes; keep whatever was
  // already in the pool, after the items that just arrived from the sites.
  const pooled = typeof raw === 'object' && raw !== null && 'items' in raw ? raw.items : undefined;
  const alreadyPooled: unknown[] = Array.isArray(pooled) ? pooled : [];
  return { version: 2, sites, items: [...items, ...alreadyPooled] };
 },
};
