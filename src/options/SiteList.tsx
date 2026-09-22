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
        {(site) => {
          const count = () => props.counts[site.id] ?? 0;
          const select = () => props.onSelect(site.id);
          return (
            <li
              class="rail-row"
              classList={{ on: site.id === props.selectedId, off: !site.enabled }}
              role="button"
              tabindex="0"
              aria-current={site.id === props.selectedId ? 'true' : undefined}
              onClick={select}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                select();
              }}
            >
              <span class="rail-title">{siteName(site)}</span>
              <span class="count">{count()}</span>
              <span class="rail-sub">
                {site.label ? site.pattern : site.pattern === '*' ? 'every site' : ''}
              </span>
            </li>
          );
        }}
      </For>
    </Show>
  </ul>
);
