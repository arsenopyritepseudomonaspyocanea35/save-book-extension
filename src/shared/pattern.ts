import type { Site, Store } from './schema';

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

export function findSite(store: Store, hostname: string): Site | undefined {
  let best: Site | undefined;
  let bestScore = -1;
  for (const site of store.sites) {
    if (!site.enabled || !matchesHost(site.pattern, hostname)) continue;
    const score = site.pattern === '*' ? 0 : site.pattern.length;
    if (score > bestScore) {
      best = site;
      bestScore = score;
    }
  }
  return best;
}
