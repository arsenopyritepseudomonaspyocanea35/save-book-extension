import type { Site, Store } from './schema';

/**
 * Anything a user might paste is reduced to a bare hostname:
 *   https://sub.Example.com:8443/login?x=1  ->  sub.example.com
 *   *.example.com                           ->  example.com
 *   *                                       ->  *
 */
export function parsePattern(input: string): string {
  let value = input.trim().toLowerCase();
  if (!value) return '';
  value = value.replace(/^[a-z][a-z0-9+.-]*:\/\//, ''); // scheme
  value = value.split(/[/?#]/)[0] ?? ''; // path, query, hash
  value = value.replace(/:\d+$/, ''); // port
  if (value === '*') return '*';
  value = value.replace(/^\*\./, '').replace(/^\.+/, '').replace(/\.+$/, '');
  return /^[a-z0-9-]+(\.[a-z0-9-]+)*$/.test(value) ? value : '';
}

/** A pattern matches its own host and every subdomain of it. */
export function matchesHost(pattern: string, hostname: string): boolean {
  if (!pattern) return false;
  if (pattern === '*') return true;
  const host = hostname.toLowerCase();
  return host === pattern || host.endsWith(`.${pattern}`);
}

/** Match patterns to request from the user and to register scripts for. */
export function originsFor(pattern: string): string[] {
  if (!pattern) return [];
  if (pattern === '*') return ['*://*/*'];
  return [`*://${pattern}/*`, `*://*.${pattern}/*`];
}

/** The most specific enabled site for a host, or undefined. */
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
