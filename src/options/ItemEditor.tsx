import { For, Show, createEffect, createSignal, onCleanup, type Component } from 'solid-js';
import { Button } from '../ui/button/button';
import { IconButton } from '../ui/icon-button/icon-button';
import { Segmented } from '../ui/segmented/segmented';
import { EyeIcon, EyeOffIcon, XIcon } from '../ui/icons/icons';
import { itemKindOptions, itemTypes } from '../shared/itemTypes';
import { siteName } from '../shared/naming';
import type { Item, ItemKind, Site } from '../shared/schema';

export interface ItemEditorProps {
  item: Item;
  sites: Site[];
  counts: Record<string, number>;
  onLabel: (value: string) => void;
  onValue: (value: string) => void;
  onKind: (kind: ItemKind) => void;
  onAssign: (siteId: string) => void;
  onUnassign: (siteId: string) => void;
  onOpenSite: (siteId: string) => void;
  onDelete: () => void;
}

export const ItemEditor: Component<ItemEditorProps> = (props) => {
  const [revealed, setRevealed] = createSignal(false);
  const [armed, setArmed] = createSignal(false);
  const [draft, setDraft] = createSignal('');
  let armTimer = 0;

  onCleanup(() => clearTimeout(armTimer));

  const definition = () => itemTypes[props.item.type];
  const assigned = () => props.sites.filter((site) => props.item.sites.includes(site.id));
  const available = () =>
    props.sites.filter((site) => !props.item.sites.includes(site.id));

  createEffect(() => {
    const next = available()[0];
    setDraft(next ? next.id : '');
  });

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
          <div class="field">
            <span class="field-label">Kind</span>
            <span class="kind-line">
              <Segmented
                label="Item kind"
                options={itemKindOptions}
                value={props.item.type}
                onChange={(kind) => props.onKind(kind)}
              />
            </span>
          </div>
          <div class="field">
            <label class="field-label" for={`item-label-${props.item.id}`}>
              Label
            </label>
            <input
              id={`item-label-${props.item.id}`}
              type="text"
              placeholder="Optional, shown in the card"
              spellcheck={false}
              autocomplete="off"
              data-label-for={props.item.id}
              value={props.item.label}
              onInput={(event) => props.onLabel(event.currentTarget.value)}
            />
          </div>
        </div>

        <div class="field value-field">
          <label class="field-label" for={`item-value-${props.item.id}`}>
            Value
          </label>
          <div class="value-wrap">
            <input
              id={`item-value-${props.item.id}`}
              type={definition().secret && !revealed() ? 'password' : 'text'}
              placeholder={definition().placeholder}
              spellcheck={false}
              autocomplete="off"
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
          </div>
        </div>

        <p class="hint value-hint">
          {assigned().length
            ? `Stored once and shown on ${assigned().length} ${assigned().length === 1 ? 'site' : 'sites'
            }: editing the value here changes it on all of them.`
            : 'Stored once. No card shows it while it is not on any site.'}
        </p>
      </div>

      <div class="panel">
        <div class="section-head">
          <h2>Sites this item is on</h2>
        </div>

        <Show
          when={props.sites.length}
          fallback={
            <p class="hint section-note">
              Add a site in the Sites tab first — until then there is nowhere for this to show.
            </p>
          }
        >
          <div class="add">
            <select
              aria-label="Site to add this item to"
              disabled={!available().length}
              value={available().length ? draft() : ''}
              onChange={(event) => setDraft(event.currentTarget.value)}
            >
              <Show when={!available().length}>
                <option value="">On every site you have</option>
              </Show>
              <For each={available()}>
                {(site) => <option value={site.id}>{siteName(site)}</option>}
              </For>
            </select>
            <Button
              disabled={!draft()}
              title="Show this item on that site too"
              onClick={() => props.onAssign(draft())}
            >
              Add
            </Button>
          </div>
        </Show>

        <p class="hint section-note">
          Adding shows the same value there; removing takes it off that site only and keeps it for
          the others.
        </p>

        <ul class="site-list">
          <Show
            when={assigned().length}
            fallback={
              <li class="items-empty">
                Not on any site yet. Pick one above, or open <strong>Sites</strong> to set up a site
                it belongs on.
              </li>
            }
          >
            <For each={assigned()}>
              {(site) => (
                <li class="site-row" classList={{ off: !site.enabled }}>
                  <button
                    class="rail-title"
                    type="button"
                    title="Open this site in the Sites tab"
                    onClick={() => props.onOpenSite(site.id)}
                  >
                    {siteName(site)}
                  </button>
                  <span class="count">{props.counts[site.id] ?? 0}</span>
                  <IconButton
                    title={`Remove from ${siteName(site)}`}
                    danger
                    onClick={() => props.onUnassign(site.id)}
                  >
                    <XIcon />
                  </IconButton>
                  <span class="rail-sub">
                    <span class="rail-sub-text">
                      {site.label ? site.pattern : site.pattern === '*' ? 'every site' : ''}
                    </span>
                    <Show when={!site.enabled}>
                      <span class="flag">card off</span>
                    </Show>
                  </span>
                </li>
              )}
            </For>
          </Show>
        </ul>

        <div class="foot">
          <span class="hint">
            {props.item.sites.length
              ? `One item, ${props.item.sites.length} ${props.item.sites.length === 1 ? 'site' : 'sites'
              }.`
              : 'One item, no sites yet.'}
          </span>
          <Button variant="danger" onClick={confirmDelete}>
            {armed() ? 'Click again to delete everywhere' : 'Delete item'}
          </Button>
        </div>
      </div>
    </>
  );
};
