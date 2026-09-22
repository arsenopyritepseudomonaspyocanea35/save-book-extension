import { For, Show, type Component } from 'solid-js';
import { LockIcon, TextIcon } from '../ui/icons/icons';
import { itemName } from '../shared/naming';
import type { Item } from '../shared/schema';

const DOTS = '••••••••';

export interface ItemListProps {
  /** Items matching the current filter. */
  items: Item[];
  /** How many items the store holds, so a filtered-out list can say so. */
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
          {props.total ? 'No item matches that filter.' : 'No items yet — add one above.'}
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
                  <span class="flag">not on any site</span>
                </Show>
              </span>
            </button>
          </li>
        )}
      </For>
    </Show>
  </ul>
);
