import { For, Show, createSignal, onCleanup, type Component } from 'solid-js';
import { Button } from '../ui/button/button';
import { Field } from '../ui/field/field';
import { PlusIcon } from '../ui/icons/icons';
import { ItemRow } from './ItemRow';
import { parsePattern } from '../shared/pattern';
import { t } from '../shared/i18n';
import { itemTypeList } from '../shared/itemTypes';
import type { Item, ItemKind, Site } from '../shared/schema';

export interface SiteEditorProps {
  site: Site;
  sites: Site[];
  items: Item[];
  patternDraft: string;
  onPatternDraft: (value: string) => void;
  onApplyPattern: () => void;
  needsAccess: boolean;
  onGrantAccess: () => void;
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
          <Field label={t('site.field.domain')}>
            <div class="field-row">
              <input
                class="input-mono"
                type="text"
                spellcheck={false}
                autocomplete="off"
                value={props.patternDraft}
                onInput={(event) => props.onPatternDraft(event.currentTarget.value)}
              />
              <Button
                disabled={!canApply() && !props.needsAccess}
                title={
                  canApply() ? t('site.applyTitle') : t('site.applyTitleSame')
                }
                onClick={() => (canApply() ? props.onApplyPattern() : props.onGrantAccess())}
              >
                {canApply() || !props.needsAccess ? t('site.apply') : t('site.grantAccess')}
              </Button>
            </div>
          </Field>
          <Field label={t('site.field.label')}>
            <input
              type="text"
              placeholder={t('site.field.labelPlaceholder')}
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
          <span class="switch-label">{t('site.showCard')}</span>
        </label>
        <p class="hint">
          {props.needsAccess
            ? t('site.hint.noAccess', props.site.pattern)
            : props.site.pattern === '*'
              ? t('site.hint.everySite')
              : t('site.hint.subdomains', props.site.pattern)}
        </p>
      </div>

      <div class="panel">
        <div class="section-head">
          <h2>{t('site.items.title')}</h2>
          <div class="kinds">
            <For each={itemTypeList}>
              {(definition) => (
                <Button variant="ghost" onClick={() => props.onAddItem(definition.kind)}>
                  <PlusIcon />
                  {t(definition.labelKey)}
                </Button>
              )}
            </For>
          </div>
        </div>
        <p class="hint section-note">{t('site.items.note')}</p>

        <ul class="items">
          <Show
            when={props.items.length}
            fallback={<li class="items-empty">{t('site.items.empty')}</li>}
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
            {t('site.resetCard')}
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            {armed() ? t('site.deleteArmed') : t('site.delete')}
          </Button>
        </div>
      </div>
    </>
  );
};
