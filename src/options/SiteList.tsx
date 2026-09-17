import { For, Show, type Component } from 'solid-js';
import type { Site } from '../shared/schema';

export interface SiteListProps {
  sites: Site[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const SiteList: Component<SiteListProps> = (props) => (
  <ul class="sites">
    <Show when={props.sites.length} fallback={<li class="empty">No sites yet</li>}>
      <For each={props.sites}>
        {(site) => {
          const count = () => `${site.items.length} item${site.items.length === 1 ? '' : 's'}`;
          const select = () => props.onSelect(site.id);
          return (
            <li
              class="site"
              classList={{ on: site.id === props.selectedId, off: !site.enabled }}
              tabindex="0"
              onClick={select}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                select();
              }}
            >
              <span class="site-title">{site.label || site.pattern}</span>
              <span class="site-sub">{site.label ? `${site.pattern} · ${count()}` : count()}</span>
              <span class="site-count">{site.items.length}</span>
            </li>
          );
        }}
      </For>
    </Show>
  </ul>
);
