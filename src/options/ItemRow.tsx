import { For, Show, createSignal, type Component } from 'solid-js';
import { EyeIcon, EyeOffIcon, XIcon } from '../ui/icons';
import { isItemKind, itemTypeList, itemTypes } from '../shared/itemTypes';
import type { Item, ItemKind } from '../shared/schema';

export interface ItemRowProps {
  item: Item;
  onLabel: (value: string) => void;
  onValue: (value: string) => void;
  onKind: (kind: ItemKind) => void;
  onRemove: () => void;
}

export const ItemRow: Component<ItemRowProps> = (props) => {
  const definition = () => itemTypes[props.item.type];
  const [revealed, setRevealed] = createSignal(false);

  return (
    <li class="item">
      <select
        title="Item type"
        value={props.item.type}
        onChange={(event) => {
          const kind = event.currentTarget.value;
          if (isItemKind(kind)) props.onKind(kind);
        }}
      >
        <For each={itemTypeList}>{(type) => <option value={type.kind}>{type.label}</option>}</For>
      </select>

      <input
        type="text"
        placeholder="Label"
        spellcheck={false}
        autocomplete="off"
        data-label-for={props.item.id}
        value={props.item.label}
        onInput={(event) => props.onLabel(event.currentTarget.value)}
      />

      <div class="value-wrap">
        <input
          type={definition().secret && !revealed() ? 'password' : 'text'}
          placeholder={definition().placeholder}
          spellcheck={false}
          autocomplete="off"
          value={props.item.value}
          onInput={(event) => props.onValue(event.currentTarget.value)}
        />
        <Show when={definition().secret}>
          <button
            class="btn icon plain"
            type="button"
            title="Show / hide"
            onClick={() => setRevealed((value) => !value)}
          >
            {revealed() ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </Show>
      </div>

      <button class="btn icon" type="button" title="Remove item" onClick={() => props.onRemove()}>
        <XIcon />
      </button>
    </li>
  );
};
