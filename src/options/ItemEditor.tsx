import { For, Show, createEffect, createSignal, onCleanup, type Component } from 'solid-js';
import { Button } from '../ui/button/button';
import { IconButton } from '../ui/icon-button/icon-button';
import { Segmented } from '../ui/segmented/segmented';
import { EyeIcon, EyeOffIcon, XIcon } from '../ui/icons/icons';
import { itemKindOptions, itemTypes } from '../shared/itemTypes';
import { t } from '../shared/i18n';
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
            <span class="field-label">{t('item.kind.label')}</span>
            <span class="kind-line">
              <Segmented
                label={t('item.kind.group')}
                options={itemKindOptions()}
                value={props.item.type}
                onChange={(kind) => props.onKind(kind)}
              />
            </span>
          </div>
          <div class="field">
            <label class="field-label" for={`item-label-${props.item.id}`}>
              {t('item.field.label')}
            </label>
            <input
              id={`item-label-${props.item.id}`}
              type="text"
              placeholder={t('item.field.labelPlaceholder')}
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
            {t('item.field.value')}
          </label>
          <div class="value-wrap">
            <input
              id={`item-value-${props.item.id}`}
              type={definition().secret && !revealed() ? 'password' : 'text'}
              placeholder={t(definition().placeholderKey)}
              spellcheck={false}
              autocomplete="off"
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
          </div>
        </div>

        <p class="hint value-hint">
          {assigned().length
            ? t('item.valueHint.assigned', assigned().length)
            : t('item.valueHint.unassigned')}
        </p>
      </div>

      <div class="panel">
        <div class="section-head">
          <h2>{t('item.sites.title')}</h2>
        </div>

        <Show
          when={props.sites.length}
          fallback={
            <p class="hint section-note">{t('item.sites.noSites')}</p>
          }
        >
          <div class="add">
            <select
              aria-label={t('item.sites.selectLabel')}
              disabled={!available().length}
              value={available().length ? draft() : ''}
              onChange={(event) => setDraft(event.currentTarget.value)}
            >
              <Show when={!available().length}>
                <option value="">{t('item.sites.noneAvailable')}</option>
              </Show>
              <For each={available()}>
                {(site) => <option value={site.id}>{siteName(site)}</option>}
              </For>
            </select>
            <Button
              disabled={!draft()}
              title={t('item.sites.addTitle')}
              onClick={() => props.onAssign(draft())}
            >
              {t('item.sites.add')}
            </Button>
          </div>
        </Show>

        <p class="hint section-note">{t('item.sites.note')}</p>

        <ul class="site-list">
          <Show
            when={assigned().length}
            fallback={<li class="items-empty">{t('item.sites.empty')}</li>}
          >
            <For each={assigned()}>
              {(site) => (
                <li class="site-row" classList={{ off: !site.enabled }}>
                  <button
                    class="rail-title"
                    type="button"
                    title={t('item.sites.openTitle')}
                    onClick={() => props.onOpenSite(site.id)}
                  >
                    {siteName(site)}
                  </button>
                  <span class="count">{props.counts[site.id] ?? 0}</span>
                  <IconButton
                    title={t('item.sites.remove', siteName(site))}
                    danger
                    onClick={() => props.onUnassign(site.id)}
                  >
                    <XIcon />
                  </IconButton>
                  <span class="rail-sub">
                    <span class="rail-sub-text">
                      {site.label ? site.pattern : site.pattern === '*' ? t('common.everySite') : ''}
                    </span>
                    <Show when={!site.enabled}>
                      <span class="flag">{t('item.sites.cardOff')}</span>
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
              ? t('item.foot.assigned', props.item.sites.length)
              : t('item.foot.none')}
          </span>
          <Button variant="danger" onClick={confirmDelete}>
            {armed() ? t('item.deleteArmed') : t('item.delete')}
          </Button>
        </div>
      </div>
    </>
  );
};
