import { t } from './i18n';
import type { Item, Site } from './schema';

export function siteName(site: Site): string {
  return site.label || site.pattern;
}

export function itemName(item: Item): string {
  if (item.label) return item.label;
  if (item.type === 'secret') return t('item.kind.secret');
  return item.value || t('item.untitled');
}
