import { Show, createSignal, type Component } from 'solid-js';
import { IconButton } from '../ui/icon-button/icon-button';
import { Segmented } from '../ui/segmented/segmented';
import { EyeIcon, EyeOffIcon, XIcon } from '../ui/icons/icons';
import { RouteStamp } from './RouteStamp';
import { t } from '../shared/i18n';
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
    label={t('item.kind.group')}
    options={itemKindOptions()}
    value={props.item.type}
    onChange={(kind) => props.onKind(kind)}
   />

   <input
    class="item-label"
    type="text"
    placeholder={t('item.field.label')}
    spellcheck={false}
    autocomplete="off"
    aria-label={t('item.field.labelLabel')}
    data-label-for={props.item.id}
    value={props.item.label}
    onInput={(event) => props.onLabel(event.currentTarget.value)}
   />

   <input
    class="item-value"
    type={definition().secret && !revealed() ? 'password' : 'text'}
    placeholder={t(definition().placeholderKey)}
    spellcheck={false}
    autocomplete="off"
    aria-label={t('item.field.valueLabel')}
    value={props.item.value}
    onInput={(event) => props.onValue(event.currentTarget.value)}
   />

   <span class="field-actions">
    <Show when={definition().secret}>
     <IconButton
      title={revealed() ? t('item.hideValue') : t('item.revealValue')}
      pressed={revealed()}
      onClick={() => setRevealed((value) => !value)}
     >
      {revealed() ? <EyeOffIcon /> : <EyeIcon />}
     </IconButton>
    </Show>
   </span>

   <RouteStamp sites={props.shownOn} />

   <IconButton title={t('item.removeFromSite')} danger onClick={() => props.onRemove()}>
    <XIcon />
   </IconButton>
  </li>
 );
};
