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
        {(item) => {
          const select = () => props.onSelect(item.id);
          const subtitle = () => {
            if (!item.label && item.type !== 'secret') return '';
            return item.type === 'secret' ? DOTS : item.value;
          };
          return (
            <li
              class="rail-row rail-row-item"
              classList={{ on: item.id === props.selectedId, off: !item.sites.length }}
              role="button"
              tabindex="0"
              aria-current={item.id === props.selectedId ? 'true' : undefined}
              onClick={select}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                select();
              }}
            >
              <span class="rail-mark" aria-hidden="true">
                {item.type === 'secret' ? <LockIcon /> : <TextIcon />}
              </span>
              <span class="rail-title">{itemName(item)}</span>
              <span class="count">{item.sites.length}</span>
              <span class="rail-sub">{subtitle()}</span>
            </li>
          );
        }}
      </For>
    </Show>
  </ul>
);
