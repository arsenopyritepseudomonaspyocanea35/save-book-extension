import { For, Show, type Component } from 'solid-js';
import { LockIcon, TextIcon } from '../ui/icons/icons';
import { t } from '../shared/i18n';
import { itemName } from '../shared/naming';
import type { Item } from '../shared/schema';

const DOTS = '••••••••';

export interface ItemListProps {
  items: Item[];
  total: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const ItemList: Component<ItemListProps> = (props) => (
  <ul class="rail-list">
    <Show
      when={props.items.length}
      fallback={
        <li class="rail-empty">
          {t(props.total ? 'items.list.noMatch' : 'items.list.empty')}
        </li>
      }
    >
      <For each={props.items}>
        {(item) => (
          <li
            class="rail-row rail-row-item"
            classList={{ on: item.id === props.selectedId, off: !item.sites.length }}
          >
            <button
              class="rail-open"
              type="button"
              aria-current={item.id === props.selectedId ? 'true' : undefined}
              onClick={() => props.onSelect(item.id)}
            >
              <span class="rail-mark" aria-hidden="true">
                {item.type === 'secret' ? <LockIcon /> : <TextIcon />}
              </span>
              <span class="rail-title">{itemName(item)}</span>
              <span class="count">{item.sites.length}</span>
              <span class="rail-sub">
                <span class="rail-sub-text">
                  {!item.label && item.type !== 'secret'
                    ? ''
                    : item.type === 'secret'
                      ? DOTS
                      : item.value}
                </span>
                <Show when={!item.sites.length}>
                  <span class="flag">{t('items.list.notOnAnySite')}</span>
                </Show>
              </span>
            </button>
          </li>
        )}
      </For>
    </Show>
  </ul>
);
