import { For, Show, type Component } from 'solid-js';
import { t } from '../shared/i18n';
import { siteName } from '../shared/naming';
import type { Site } from '../shared/schema';

export interface SiteListProps {
  sites: Site[];
  counts: Record<string, number>;
  noAccess: Record<string, boolean>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const SiteList: Component<SiteListProps> = (props) => (
  <ul class="rail-list">
    <Show when={props.sites.length} fallback={<li class="rail-empty">{t('sites.list.empty')}</li>}>
      <For each={props.sites}>
        {(site) => (
          <li class="rail-row" classList={{ on: site.id === props.selectedId, off: !site.enabled }}>
            <button
              class="rail-open"
              type="button"
              aria-current={site.id === props.selectedId ? 'true' : undefined}
              onClick={() => props.onSelect(site.id)}
            >
              <span class="rail-title">{siteName(site)}</span>
              <span class="count">{props.counts[site.id] ?? 0}</span>
              <span class="rail-sub">
                <span class="rail-sub-text">
                  {site.label ? site.pattern : site.pattern === '*' ? t('common.everySite') : ''}
                </span>
                <Show when={!site.enabled}>
                  <span class="flag">{t('sites.list.cardOff')}</span>
                </Show>
                <Show when={site.enabled && props.noAccess[site.id]}>
                  <span class="flag" title={t('sites.list.noAccessTitle')}>
                    {t('sites.list.noAccess')}
                  </span>
                </Show>
              </span>
            </button>
          </li>
        )}
      </For>
    </Show>
  </ul>
);
