import { For, type Component } from 'solid-js';
import { itemTypeList } from '../shared/itemTypes';
import type { ItemKind } from '../shared/schema';

export interface KindSwitchProps {
  value: ItemKind;
  onChange: (kind: ItemKind) => void;
}

export const KindSwitch: Component<KindSwitchProps> = (props) => (
  <div class="kind-switch" role="group" aria-label="Item kind">
    <For each={itemTypeList}>
      {(definition) => (
        <button
          type="button"
          classList={{ on: props.value === definition.kind }}
          aria-pressed={props.value === definition.kind}
          onClick={() => props.onChange(definition.kind)}
        >
          {definition.label}
        </button>
      )}
    </For>
  </div>
);
