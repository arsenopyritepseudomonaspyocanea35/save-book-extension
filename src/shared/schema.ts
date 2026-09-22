import * as v from 'valibot';
import { applyMigrations, LATEST_VERSION } from './migrations';
import { parsePattern } from './pattern';

export const STORAGE_KEY = 'saveBook';
export const SCHEMA_VERSION = LATEST_VERSION;

export const ITEM_KINDS = ['text', 'secret'] as const;
export const ItemKindSchema = v.picklist(ITEM_KINDS);
export type ItemKind = v.InferOutput<typeof ItemKindSchema>;

export const THEMES = ['system', 'light', 'dark'] as const;
export const ThemeSchema = v.picklist(THEMES);
export type Theme = v.InferOutput<typeof ThemeSchema>;

export const LOCALES = ['en', 'pl', 'es', 'fr', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export const LANGUAGES = ['system', ...LOCALES] as const;
export const LanguageSchema = v.picklist(LANGUAGES);
export type Language = v.InferOutput<typeof LanguageSchema>;

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

const SettingsSchema = v.object({
 theme: v.fallback(ThemeSchema, 'system'),
 language: v.fallback(LanguageSchema, 'system'),
});

const StoreShapeSchema = v.object({
 version: v.fallback(v.number(), SCHEMA_VERSION),
 sites: v.fallback(v.array(v.unknown()), () => []),
 items: v.fallback(v.array(v.unknown()), () => []),
 settings: v.fallback(SettingsSchema, () => ({ ...DEFAULT_SETTINGS })),
});

export type Item = v.InferOutput<typeof ItemSchema>;
export type SiteUI = v.InferOutput<typeof SiteUiSchema>;
export type Settings = v.InferOutput<typeof SettingsSchema>;

const DEFAULT_SETTINGS: Settings = { theme: 'system', language: 'system' };

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
 settings: Settings;
}

function parseSite(raw: unknown): Site | undefined {
 const parsed = v.safeParse(SiteSchema, raw);
 if (!parsed.success) return undefined;
 return { ...parsed.output, pattern: parsePattern(parsed.output.pattern) };
}

export function parseStore(raw: unknown): Store {
 const shape = v.safeParse(StoreShapeSchema, applyMigrations(raw));
 if (!shape.success) return emptyStore();

 const sites: Site[] = [];
 for (const candidate of shape.output.sites) {
  const site = parseSite(candidate);
  if (site) sites.push(site);
 }

 const known = new Set(sites.map((site) => site.id));
 const items: Item[] = [];
 for (const candidate of shape.output.items) {
  const parsed = v.safeParse(ItemSchema, candidate);
  if (!parsed.success) continue;
  const item = parsed.output;
  item.sites = [...new Set(item.sites)].filter((id) => known.has(id));
  items.push(item);
 }

 return { version: SCHEMA_VERSION, sites, items, settings: shape.output.settings };
}

export function emptyStore(): Store {
 return { version: SCHEMA_VERSION, sites: [], items: [], settings: { ...DEFAULT_SETTINGS } };
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
