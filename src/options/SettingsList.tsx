import { For, createMemo, type Component } from 'solid-js';
import type { Theme } from '../shared/schema';

export type SettingsSection = 'appearance' | 'data';

export interface SettingsEntry {
  id: SettingsSection;
  label: string;
  reading: string;
}

export interface SettingsListProps {
  active: SettingsSection;
  theme: Theme;
  siteCount: number;
  itemCount: number;
  onSelect: (id: SettingsSection) => void;
}

export const SettingsList: Component<SettingsListProps> = (props) => {
  const entries = createMemo<SettingsEntry[]>(() => {
    const sites = `${props.siteCount} ${props.siteCount === 1 ? 'site' : 'sites'}`;
    const items = `${props.itemCount} ${props.itemCount === 1 ? 'item' : 'items'}`;
    return [
      { id: 'appearance', label: 'Appearance', reading: props.theme },
      { id: 'data', label: 'Data', reading: `${sites} · ${items}` },
    ];
  });

  return (
    <ul class="rail-list">
      <For each={entries()}>
        {(entry) => (
          <li class="rail-row" classList={{ on: entry.id === props.active }}>
            <button
              class="rail-open"
              type="button"
              aria-current={entry.id === props.active ? 'true' : undefined}
              onClick={() => props.onSelect(entry.id)}
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
  );
};
