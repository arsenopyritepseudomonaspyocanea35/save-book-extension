import { Show, createSignal, type Component } from 'solid-js';
import { IconButton } from '../ui/icon-button/icon-button';
import { Segmented } from '../ui/segmented/segmented';
import { EyeIcon, EyeOffIcon, XIcon } from '../ui/icons/icons';
import { RouteStamp } from './RouteStamp';
import { itemKindOptions, itemTypes } from '../shared/itemTypes';
import type { Item, ItemKind, Site } from '../shared/schema';

export interface ItemRowProps {
 item: Item;
 shownOn: Site[];
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
   <Segmented
    label="Item kind"
    options={itemKindOptions}
    value={props.item.type}
    onChange={(kind) => props.onKind(kind)}
   />

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

   <span class="field-actions">
    <Show when={definition().secret}>
     <IconButton
      title={revealed() ? 'Hide the value' : 'Reveal the value'}
      pressed={revealed()}
      onClick={() => setRevealed((value) => !value)}
     >
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
