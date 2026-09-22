import type { Item, Site } from './schema';

/** What a site is called wherever the interface names it. */
export function siteName(site: Site): string {
  return site.label || site.pattern;
}

/** What an item is called when only one line fits, without ever printing a stored secret. */
export function itemName(item: Item): string {
  if (item.label) return item.label;
  if (item.type === 'secret') return 'Password';
  return item.value || 'Untitled item';
}
