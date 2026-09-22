import { Show, createSignal, type Component } from 'solid-js';
import { IconButton } from '../ui/icon-button/icon-button';
import { EyeIcon, EyeOffIcon, XIcon } from '../ui/icons/icons';
import { KindSwitch } from './KindSwitch';
import { RouteStamp } from './RouteStamp';
import { itemTypes } from '../shared/itemTypes';
import type { Item, ItemKind, Site } from '../shared/schema';

export interface ItemRowProps {
 item: Item;
 /** Every site this item is shown on, so a shared item says so in place. */
 shownOn: Site[];
 onLabel: (value: string) => void;
 onValue: (value: string) => void;
 onKind: (kind: ItemKind) => void;
 onRemove: () => void;
}

/**
 * One row of a site's items. Every cell is its own grid column — kind, label, value, reveal,
 * stamp, remove — so the same field sits in the same place and at the same width in every row,
 * whether or not that row has a secret to reveal or a stamp to show.
 */
export const ItemRow: Component<ItemRowProps> = (props) => {
 const definition = () => itemTypes[props.item.type];
 const [revealed, setRevealed] = createSignal(false);

 return (
  <li class="item">
   <KindSwitch value={props.item.type} onChange={(kind) => props.onKind(kind)} />

   <input
    class="item-label"
    type="text"
    placeholder="Label"
    spellcheck={false}
    autocomplete="off"
    aria-label="Item label"
    data-label-for={props.item.id}
    value={props.item.label}
    onInput={(event) => props.onLabel(event.currentTarget.value)}
   />

   <input
    class="item-value"
    type={definition().secret && !revealed() ? 'password' : 'text'}
    placeholder={definition().placeholder}
    spellcheck={false}
    autocomplete="off"
    aria-label="Item value"
    value={props.item.value}
    onInput={(event) => props.onValue(event.currentTarget.value)}
   />

   <span class="item-actions">
    <Show when={definition().secret}>
     <IconButton title="Show / hide the value" onClick={() => setRevealed((value) => !value)}>
      {revealed() ? <EyeOffIcon /> : <EyeIcon />}
     </IconButton>
    </Show>
   </span>

   <RouteStamp sites={props.shownOn} />

   <IconButton title="Remove from this site" danger onClick={() => props.onRemove()}>
    <XIcon />
   </IconButton>
  </li>
 );
};
