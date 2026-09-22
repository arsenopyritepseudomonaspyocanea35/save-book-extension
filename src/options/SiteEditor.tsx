import { For, Show, createSignal, onCleanup, type Component } from 'solid-js';
import { Button } from '../ui/button/button';
import { Field } from '../ui/field/field';
import { PlusIcon } from '../ui/icons/icons';
import { ItemRow } from './ItemRow';
import { parsePattern } from '../shared/pattern';
import { itemTypeList } from '../shared/itemTypes';
import type { Item, ItemKind, Site } from '../shared/schema';

export interface SiteEditorProps {
  site: Site;
  /** Every site in the store, so a shared item can name where else it lives. */
  sites: Site[];
  /** Items routed to this site, in pool order. */
  items: Item[];
  patternDraft: string;
  onPatternDraft: (value: string) => void;
  onApplyPattern: () => void;
  onLabel: (value: string) => void;
  onEnabled: (enabled: boolean) => void;
  onAddItem: (kind: ItemKind) => void;
  onItemLabel: (itemId: string, value: string) => void;
  onItemValue: (itemId: string, value: string) => void;
  onItemKind: (itemId: string, kind: ItemKind) => void;
  onRemoveItem: (itemId: string) => void;
  onResetCard: () => void;
  onDelete: () => void;
}

export const SiteEditor: Component<SiteEditorProps> = (props) => {
  const [armed, setArmed] = createSignal(false);
  let armTimer = 0;

  onCleanup(() => clearTimeout(armTimer));

  const canApply = () => {
    const pattern = parsePattern(props.patternDraft);
    return pattern !== '' && pattern !== props.site.pattern;
  };

  const confirmDelete = () => {
    if (armed()) {
      props.onDelete();
      return;
    }
    setArmed(true);
    clearTimeout(armTimer);
    armTimer = setTimeout(() => setArmed(false), 4000);
  };

  return (
    <>
      <div class="panel">
        <div class="fields">
          <Field label="Domain">
            <div class="field-row">
              <input
                type="text"
                spellcheck={false}
                autocomplete="off"
                value={props.patternDraft}
                onInput={(event) => props.onPatternDraft(event.currentTarget.value)}
              />
              <Button
                disabled={!canApply()}
                title="Ask Chrome for access to the new domain"
                onClick={() => props.onApplyPattern()}
              >
                Apply
              </Button>
            </div>
          </Field>
          <Field label="Label">
            <input
              type="text"
              placeholder="Optional, shown in the card"
              value={props.site.label}
              onInput={(event) => props.onLabel(event.currentTarget.value)}
            />
          </Field>
        </div>

        <label class="switch">
          <input
            type="checkbox"
            checked={props.site.enabled}
            onChange={(event) => props.onEnabled(event.currentTarget.checked)}
          />
          <span class="track">
            <span class="knob" />
          </span>
          <span class="switch-label">Show the card on this site</span>
        </label>
        <p class="hint">
          {props.site.pattern === '*'
            ? 'Applies to every site.'
            : `Applies to ${props.site.pattern} and its subdomains.`}
        </p>
      </div>

      <div class="panel">
        <div class="section-head">
          <h2>Items on this site</h2>
          <div class="kinds">
            <For each={itemTypeList}>
              {(definition) => (
                <Button variant="ghost" onClick={() => props.onAddItem(definition.kind)}>
                  <PlusIcon />
                  {definition.label}
                </Button>
              )}
            </For>
          </div>
        </div>
        <p class="hint section-note">
          Items are shared: a value edited here changes on every site it is shown on. Removing one
          here takes it off this site only.
        </p>

        <ul class="items">
          <Show
            when={props.items.length}
            fallback={
              <li class="items-empty">
                Nothing saved for this site yet. Add one below, or route an item you already keep on
                another site from <strong>Items</strong>.
              </li>
            }
          >
            <For each={props.items}>
              {(item) => (
                <ItemRow
                  item={item}
                  shownOn={props.sites.filter((site) => item.sites.includes(site.id))}
                  onLabel={(value) => props.onItemLabel(item.id, value)}
                  onValue={(value) => props.onItemValue(item.id, value)}
                  onKind={(kind) => props.onItemKind(item.id, kind)}
                  onRemove={() => props.onRemoveItem(item.id)}
                />
              )}
            </For>
          </Show>
        </ul>

        <div class="foot">
          <Button variant="ghost" onClick={() => props.onResetCard()}>
            Reset card position
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            {armed() ? 'Click again to delete' : 'Delete site'}
          </Button>
        </div>
      </div>
    </>
  );
};
