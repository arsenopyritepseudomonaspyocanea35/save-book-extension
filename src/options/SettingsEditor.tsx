import {
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  type Component,
} from 'solid-js';
import { Button } from '../ui/button/button';
import { Segmented, type SegmentedOption } from '../ui/segmented/segmented';
import { SETTINGS_SECTIONS, settingsSectionId, type SettingsSection } from './SettingsList';
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

const DATA_TITLE_ID = `${settingsSectionId('data')}-title`;

const SCROLL_GAP = 22;
const AT_END = 4;

const scrollerOf = (node: HTMLElement): HTMLElement => {
  for (let parent = node.parentElement; parent; parent = parent.parentElement) {
    const { overflowY } = getComputedStyle(parent);
    if (overflowY === 'auto' || overflowY === 'scroll') return parent;
  }
  return (document.scrollingElement as HTMLElement | null) ?? document.documentElement;
};

export interface SettingsEditorProps {
  visible: boolean;
  theme: Theme;
  language: Language;
  siteCount: number;
  itemCount: number;
  onTheme: (theme: Theme) => void;
  onLanguage: (language: Language) => void;
  onActive: (section: SettingsSection | null) => void;
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

  const trackSection = () => {
    if (!props.visible) return;
    const first = document.getElementById(settingsSectionId(SETTINGS_SECTIONS[0]));
    if (!first) return;
    const scroller = scrollerOf(first);
    const reach = scroller.scrollHeight - scroller.clientHeight;
    if (reach <= AT_END) {
      props.onActive(null);
      return;
    }
    const last = SETTINGS_SECTIONS.at(-1);
    if (last !== undefined && scroller.scrollTop >= reach - AT_END) {
      props.onActive(last);
      return;
    }
    const origin =
      scroller === document.scrollingElement ? 0 : scroller.getBoundingClientRect().top;
    const line = origin + SCROLL_GAP + AT_END;
    let current: SettingsSection = SETTINGS_SECTIONS[0];
    for (const section of SETTINGS_SECTIONS) {
      const node = document.getElementById(settingsSectionId(section));
      if (node && node.getBoundingClientRect().top <= line) current = section;
    }
    props.onActive(current);
  };

  onMount(() => {
    const follow = () => trackSection();
    document.addEventListener('scroll', follow, { capture: true, passive: true });
    window.addEventListener('resize', follow);
    onCleanup(() => {
      document.removeEventListener('scroll', follow, true);
      window.removeEventListener('resize', follow);
    });
  });

  createEffect(() => {
    if (!props.visible) return;
    requestAnimationFrame(trackSection);
  });

  return (
    <>
      <section
        class="panel settings-section"
        id={settingsSectionId('appearance')}
        aria-label={t('settings.appearance')}
      >
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
      </section>

      <section
        class="panel settings-section"
        id={settingsSectionId('language')}
        aria-label={t('settings.language')}
      >
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
      </section>

      <section
        class="panel settings-section"
        id={settingsSectionId('data')}
        aria-labelledby={DATA_TITLE_ID}
      >
        <div class="section-head">
          <h2 id={DATA_TITLE_ID}>{t('settings.data.title')}</h2>
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
      </section>
    </>
  );
};
