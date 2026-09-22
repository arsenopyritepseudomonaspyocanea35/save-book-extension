import type { Component } from 'solid-js';
import { t } from './i18n';
import type { Item, ItemKind } from './schema';

export interface ItemDefinition {
  kind: ItemKind;
  labelKey: 'item.kind.text' | 'item.kind.secret';
  placeholderKey: 'item.placeholder.text' | 'item.placeholder.secret';
  secret: boolean;
  copy: (item: Item) => string;
  Actions?: Component<{ item: Item }>;
}

export const itemTypes: Record<ItemKind, ItemDefinition> = {
  text: {
    kind: 'text',
    labelKey: 'item.kind.text',
    placeholderKey: 'item.placeholder.text',
    secret: false,
    copy: (item) => item.value,
  },
  secret: {
    kind: 'secret',
    labelKey: 'item.kind.secret',
    placeholderKey: 'item.placeholder.secret',
    secret: true,
    copy: (item) => item.value,
  },
};

export const itemTypeList: ItemDefinition[] = Object.values(itemTypes);

export function itemKindOptions(): { value: ItemKind; label: string }[] {
  return itemTypeList.map((definition) => ({
    value: definition.kind,
    label: t(definition.labelKey),
  }));
}

export function isItemKind(value: unknown): value is ItemKind {
  return itemTypeList.some((definition) => definition.kind === value);
}
