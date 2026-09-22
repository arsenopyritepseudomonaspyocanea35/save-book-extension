import { Show, createSignal, onCleanup, onMount, type Component } from 'solid-js';
import { Button } from '../ui/button/button';
import { Segmented, type SegmentedOption } from '../ui/segmented/segmented';
import type { SettingsSection } from './SettingsList';
import { LOCALE_NAMES, locale, t } from '../shared/i18n';
import { LOCALES, type Language, type Theme } from '../shared/schema';

const themeOptions = (): SegmentedOption<Theme>[] => [
  { value: 'system', label: t('common.system') },
  { value: 'light', label: t('settings.theme.light') },
  { value: 'dark', label: t('settings.theme.dark') },
];

const languageOptions = (): SegmentedOption<Language>[] => [
  { value: 'system', label: t('common.system') },
  ...LOCALES.map((code) => ({ value: code, label: LOCALE_NAMES[code] })),
];

export interface SettingsEditorProps {
  section: SettingsSection;
  theme: Theme;
  language: Language;
  siteCount: number;
  itemCount: number;
  onTheme: (theme: Theme) => void;
  onLanguage: (language: Language) => void;
  onClearSites: () => void;
  onClearItems: () => void;
  onClearEverything: () => void;
}

interface ClearRowProps {
  title: string;
  count?: number;
  note: string;
  label: string;
  armedLabel: string;
  disabled: boolean;
  onClear: () => void;
}

const ClearRow: Component<ClearRowProps> = (props) => {
  const [armed, setArmed] = createSignal(false);
  let armTimer = 0;

  onCleanup(() => clearTimeout(armTimer));

  const confirmClear = () => {
    if (armed()) {
      props.onClear();
      setArmed(false);
      return;
    }
    setArmed(true);
    clearTimeout(armTimer);
    armTimer = setTimeout(() => setArmed(false), 4000);
  };

  return (
    <li class="setting-row">
      <span class="setting-text">
        <span class="setting-title">
          {props.title}
          <Show when={props.count}>{(count) => <span class="count">{count()}</span>}</Show>
        </span>
        <span class="setting-note">{props.note}</span>
      </span>
      <Button variant="danger" disabled={props.disabled} onClick={confirmClear}>
        {armed() ? props.armedLabel : props.label}
      </Button>
    </li>
  );
};

export const SettingsEditor: Component<SettingsEditorProps> = (props) => {
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  const [systemTheme, setSystemTheme] = createSignal<'light' | 'dark'>(query.matches ? 'dark' : 'light');

  onMount(() => {
    const follow = (event: MediaQueryListEvent) =>
      setSystemTheme(event.matches ? 'dark' : 'light');
    query.addEventListener('change', follow);
    onCleanup(() => query.removeEventListener('change', follow));
  });

  const themeNote = () =>
    props.theme === 'system'
      ? t('settings.theme.noteSystem', systemTheme())
      : t('settings.theme.noteFixed', props.theme);

  const languageNote = () =>
    props.language === 'system'
      ? t('settings.language.noteSystem', locale())
      : t('settings.language.noteFixed', locale());

  return (
    <>
      <Show when={props.section === 'appearance'}>
        <div class="panel">
          <ul class="setting-rows">
            <li class="setting-row">
              <span class="setting-text">
                <span class="setting-title">{t('settings.theme.title')}</span>
                <span class="setting-note">{themeNote()}</span>
              </span>
              <Segmented
                label={t('settings.theme.group')}
                options={themeOptions()}
                value={props.theme}
                onChange={(theme) => props.onTheme(theme)}
              />
            </li>
          </ul>
        </div>
      </Show>

      <Show when={props.section === 'language'}>
        <div class="panel">
          <ul class="setting-rows">
            <li class="setting-row">
              <span class="setting-text">
                <span class="setting-title">{t('settings.language')}</span>
                <span class="setting-note">{languageNote()}</span>
              </span>
              <Segmented
                label={t('settings.language.group')}
                options={languageOptions()}
                value={props.language}
                onChange={(language) => props.onLanguage(language)}
              />
            </li>
          </ul>
        </div>
      </Show>

      <Show when={props.section === 'data'}>
        <div class="panel">
          <div class="section-head">
            <h2>{t('settings.data.title')}</h2>
          </div>
          <p class="hint section-note">{t('settings.data.note')}</p>

          <ul class="setting-rows">
            <ClearRow
              title={t('settings.data.sites')}
              count={props.siteCount}
              note={t('settings.data.sitesNote')}
              label={t('settings.data.sitesLabel')}
              armedLabel={t('settings.data.sitesArmed')}
              disabled={props.siteCount === 0}
              onClear={props.onClearSites}
            />
            <ClearRow
              title={t('settings.data.items')}
              count={props.itemCount}
              note={t('settings.data.itemsNote')}
              label={t('settings.data.itemsLabel')}
              armedLabel={t('settings.data.sitesArmed')}
              disabled={props.itemCount === 0}
              onClear={props.onClearItems}
            />
            <ClearRow
              title={t('settings.data.everything')}
              note={t('settings.data.everythingNote')}
              label={t('settings.data.everythingLabel')}
              armedLabel={t('settings.data.everythingArmed')}
              disabled={props.siteCount === 0 && props.itemCount === 0}
              onClear={props.onClearEverything}
            />
          </ul>
        </div>
      </Show>
    </>
  );
};
