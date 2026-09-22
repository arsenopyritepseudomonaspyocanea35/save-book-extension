import { For, createMemo, type Component } from 'solid-js';
import { LOCALE_NAMES, locale, t } from '../shared/i18n';
import type { Language, Theme } from '../shared/schema';

export const SETTINGS_SECTIONS = ['appearance', 'language', 'data'] as const;

export type SettingsSection = (typeof SETTINGS_SECTIONS)[number];

export const settingsSectionId = (section: SettingsSection) => `settings-${section}`;

export interface SettingsEntry {
  id: SettingsSection;
  label: string;
  reading: string;
}

export interface SettingsListProps {
  active: SettingsSection | null;
  theme: Theme;
  language: Language;
  siteCount: number;
  itemCount: number;
}

const jumpTo = (section: SettingsSection) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document
    .getElementById(settingsSectionId(section))
    ?.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
};

export const SettingsList: Component<SettingsListProps> = (props) => {
  const languageReading = () =>
    props.language === 'system'
      ? `${t('common.system')} · ${LOCALE_NAMES[locale()]}`
      : LOCALE_NAMES[locale()];

  const entries = createMemo<SettingsEntry[]>(() => {
    const sites = t('count.sites', props.siteCount);
    const items = t('count.items', props.itemCount);
    return [
      { id: 'appearance', label: t('settings.appearance'), reading: props.theme },
      { id: 'language', label: t('settings.language'), reading: languageReading() },
      { id: 'data', label: t('settings.data'), reading: `${sites} · ${items}` },
    ];
  });

  return (
    <nav class="settings-nav" aria-label={t('settings.nav')}>
      <ul class="rail-list">
        <For each={entries()}>
          {(entry) => (
            <li class="rail-row" classList={{ on: entry.id === props.active }}>
              <button
                class="rail-open"
                type="button"
                aria-current={entry.id === props.active ? 'true' : undefined}
                onClick={() => jumpTo(entry.id)}
              >
                <span class="rail-title">{entry.label}</span>
                <span class="rail-sub">
                  <span class="rail-sub-text">{entry.reading}</span>
                </span>
              </button>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
};
