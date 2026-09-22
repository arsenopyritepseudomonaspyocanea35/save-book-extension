import type { Item, Site, Store } from './schema';

export function parsePattern(input: string): string {
 let value = input.trim().toLowerCase();
 if (!value) return '';
 value = value.replace(/^[a-z][a-z0-9+.-]*:\/\//, '');
 value = value.split(/[/?#]/)[0] ?? '';
 value = value.replace(/:\d+$/, '');
 if (value === '*') return '*';
 value = value.replace(/^\*\./, '').replace(/^\.+/, '').replace(/\.+$/, '');
 return /^[a-z0-9-]+(\.[a-z0-9-]+)*$/.test(value) ? value : '';
}

export function matchesHost(pattern: string, hostname: string): boolean {
 if (!pattern) return false;
 if (pattern === '*') return true;
 const host = hostname.toLowerCase();
 return host === pattern || host.endsWith(`.${pattern}`);
}

export function originsFor(pattern: string): string[] {
 if (!pattern) return [];
 if (pattern === '*') return ['*://*/*'];
 return [`*://${pattern}/*`, `*://*.${pattern}/*`];
}

function patternScore(pattern: string): number {
 return pattern === '*' ? 0 : pattern.length;
}

export function matchingSites(store: Store, hostname: string): Site[] {
 return store.sites
  .filter((site) => site.enabled && matchesHost(site.pattern, hostname))
  .sort((a, b) => patternScore(b.pattern) - patternScore(a.pattern));
}

export function itemsOn(sites: Site[], items: Item[]): Item[] {
 const ids = sites.map((site) => site.id);
 return items.filter((item) => item.sites.some((id) => ids.includes(id)));
}
