import { translator } from '@solid-primitives/i18n';
import { createSignal } from 'solid-js';
import { LOCALES, type Language, type Locale } from '../schema';
import { en, type Dictionary } from './en';
import { pl } from './pl';

const DICTIONARIES: Record<Locale, Dictionary> = { en, pl };

const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', pl: 'Polski' };

const [locale, setLocale] = createSignal<Locale>(DEFAULT_LOCALE);

export { locale };

function detectLocale(): Locale {
  const tags = navigator.languages.length ? navigator.languages : [navigator.language];
  for (const tag of tags) {
    const primary = tag.toLowerCase().split('-')[0] ?? '';
    const match = LOCALES.find((candidate) => candidate === primary);
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}

export function setLanguage(language: Language): void {
  setLocale(language === 'system' ? detectLocale() : language);
}

export const t = translator(() => DICTIONARIES[locale()]);
