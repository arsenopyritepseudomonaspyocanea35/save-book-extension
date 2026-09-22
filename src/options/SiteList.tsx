import { For, Show, type Component } from 'solid-js';
import { siteName } from '../shared/naming';
import type { Site } from '../shared/schema';

export interface SiteListProps {
  sites: Site[];
  /** Item count per site, from the shared pool. */
  counts: Record<string, number>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const SiteList: Component<SiteListProps> = (props) => (
  <ul class="rail-list">
    <Show when={props.sites.length} fallback={<li class="rail-empty">No sites yet.</li>}>
      <For each={props.sites}>
        {(site) => (
          <li
            class="rail-row"
            classList={{ on: site.id === props.selectedId, off: !site.enabled }}
            onClick={() => props.onSelect(site.id)}
          >
            <button
              class="rail-title"
              type="button"
              aria-current={site.id === props.selectedId ? 'true' : undefined}
              onClick={() => props.onSelect(site.id)}
            >
              {siteName(site)}
            </button>
            <span class="count">{props.counts[site.id] ?? 0}</span>
            <span class="rail-sub">
              <span class="rail-sub-text">
                {site.label ? site.pattern : site.pattern === '*' ? 'every site' : ''}
              </span>
              <Show when={!site.enabled}>
                <span class="flag">card off</span>
              </Show>
            </span>
          </li>
        )}
      </For>
    </Show>
  </ul>
);
