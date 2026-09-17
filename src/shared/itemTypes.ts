import type { Component } from 'solid-js';
import type { Item, ItemKind } from './schema';

/**
 * The item registry: the one place a new kind of item is added. It is keyed by
 * `ItemKind`, so adding a kind to `ITEM_KINDS` fails the build until it has an
 * entry here — and the card and the editor both read this registry rather than
 * switching on the kind themselves.
 */
export interface ItemDefinition {
  kind: ItemKind;
  /** Shown in the editor's kind picker. */
  label: string;
  placeholder: string;
  /** Mask the value in the card until the user reveals it. */
  secret: boolean;
  /** What lands in the clipboard. */
  copy: (item: Item) => string;
  /** Kind-specific buttons inside the card row (a "Run" button, a filler, …). */
  Actions?: Component<{ item: Item }>;
}

export const itemTypes: Record<ItemKind, ItemDefinition> = {
  text: {
    kind: 'text',
    label: 'Text',
    placeholder: 'Anything you copy often',
    secret: false,
    copy: (item) => item.value,
  },
  secret: {
    kind: 'secret',
    label: 'Password',
    placeholder: '••••••••',
    secret: true,
    copy: (item) => item.value,
  },
};

/** Insertion order of `itemTypes`, so the editor's picker is stable. */
export const itemTypeList: ItemDefinition[] = Object.values(itemTypes);

export function isItemKind(value: unknown): value is ItemKind {
  return itemTypeList.some((definition) => definition.kind === value);
}
