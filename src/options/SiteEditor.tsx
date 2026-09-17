import { For, Show, createSignal, onCleanup, type Component } from 'solid-js';
import { ItemRow } from './ItemRow';
import { parsePattern } from '../shared/pattern';
import { itemTypeList } from '../shared/itemTypes';
import type { ItemKind, Site } from '../shared/schema';

export interface SiteEditorProps {
  site: Site;
  /** The domain field's text, owned by App so a denied change can be reverted. */
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
          <label class="field">
            <span>Domain</span>
            <div class="field-row">
              <input
                type="text"
                spellcheck={false}
                autocomplete="off"
                value={props.patternDraft}
                onInput={(event) => props.onPatternDraft(event.currentTarget.value)}
              />
              <button
                class="btn"
                type="button"
                disabled={!canApply()}
                title="Ask Chrome for access to the new domain"
                onClick={() => props.onApplyPattern()}
              >
                Apply
              </button>
            </div>
          </label>
          <label class="field">
            <span>Label</span>
            <input
              type="text"
              placeholder="Optional, shown in the card"
              value={props.site.label}
              onInput={(event) => props.onLabel(event.currentTarget.value)}
            />
          </label>
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
          <h2>Items</h2>
          <div class="kinds">
            <For each={itemTypeList}>
              {(definition) => (
                <button class="btn ghost" type="button" onClick={() => props.onAddItem(definition.kind)}>
                  + {definition.label}
                </button>
              )}
            </For>
          </div>
        </div>

        <ul class="items">
          <Show
            when={props.site.items.length}
            fallback={<li class="empty">No items yet — add the first one.</li>}
          >
            <For each={props.site.items}>
              {(item) => (
                <ItemRow
                  item={item}
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
          <button class="btn ghost" type="button" onClick={() => props.onResetCard()}>
            Reset card position
          </button>
          <button class="btn danger" type="button" onClick={confirmDelete}>
            {armed() ? 'Click again to delete' : 'Delete site'}
          </button>
        </div>
      </div>
    </>
  );
};
