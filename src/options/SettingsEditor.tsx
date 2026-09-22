import { Show, createSignal, onCleanup, onMount, type Component } from 'solid-js';
import { Button } from '../ui/button/button';
import { Segmented, type SegmentedOption } from '../ui/segmented/segmented';
import type { SettingsSection } from './SettingsList';
import type { Theme } from '../shared/schema';

const THEME_OPTIONS: SegmentedOption<Theme>[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export interface SettingsEditorProps {
  section: SettingsSection;
  theme: Theme;
  siteCount: number;
  itemCount: number;
  onTheme: (theme: Theme) => void;
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
      ? `Follows your system, which is ${systemTheme()} right now. Applies to this page and to the card on every site you have.`
      : `Always ${props.theme}, whatever your system says. Applies to this page and to the card on every site you have.`;

  return (
    <>
      <Show when={props.section === 'appearance'}>
        <div class="panel">
          <ul class="setting-rows">
            <li class="setting-row">
              <span class="setting-text">
                <span class="setting-title">Theme</span>
                <span class="setting-note">{themeNote()}</span>
              </span>
              <Segmented
                label="Theme"
                options={THEME_OPTIONS}
                value={props.theme}
                onChange={(theme) => props.onTheme(theme)}
              />
            </li>
          </ul>
        </div>
      </Show>

      <Show when={props.section === 'data'}>
        <div class="panel">
          <div class="section-head">
            <h2>Clear data</h2>
          </div>
          <p class="hint section-note">
            Everything Save Book keeps is in this browser and nowhere else, so clearing cannot be
            undone. Your theme choice is not data and stays.
          </p>

          <ul class="setting-rows">
            <ClearRow
              title="Sites"
              count={props.siteCount}
              note="Removes every site and hands its Chrome access back. Items are kept — no site shows them."
              label="Clear sites"
              armedLabel="Click again to clear"
              disabled={props.siteCount === 0}
              onClear={props.onClearSites}
            />
            <ClearRow
              title="Items"
              count={props.itemCount}
              note="Deletes every saved value, on every site. Sites and card positions stay."
              label="Clear items"
              armedLabel="Click again to clear"
              disabled={props.itemCount === 0}
              onClear={props.onClearItems}
            />
            <ClearRow
              title="Everything"
              note="Removes every site, every item and every saved card position, and hands the Chrome access back."
              label="Clear everything"
              armedLabel="Click again to clear everything"
              disabled={props.siteCount === 0 && props.itemCount === 0}
              onClear={props.onClearEverything}
            />
          </ul>
        </div>
      </Show>
    </>
  );
};
