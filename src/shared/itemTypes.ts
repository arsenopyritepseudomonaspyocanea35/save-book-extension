import type { Component } from 'solid-js';
import type { Item, ItemKind } from './schema';

export interface ItemDefinition {
  kind: ItemKind;
  label: string;
  placeholder: string;
  secret: boolean;
  copy: (item: Item) => string;
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

export const itemTypeList: ItemDefinition[] = Object.values(itemTypes);

export function isItemKind(value: unknown): value is ItemKind {
  return itemTypeList.some((definition) => definition.kind === value);
}
