import { Show, createSignal } from 'solid-js';
import { render } from 'solid-js/web';
import cardCss from './card.css?inline';
import { Card } from './Card';
import { itemTypes } from '../shared/itemTypes';
import type { CardToBackground, BackgroundToCard } from '../shared/messages';
import { itemsOn, matchingSites } from '../shared/pattern';
import type { Item, Site, SiteUI, Theme } from '../shared/schema';
import { onStoreChanged, patchSite, readStore } from '../shared/store';
declare global {
  var __savebookBoot: Promise<void> | null | undefined;
}

const HOST_ID = 'savebook-card-host';

async function copyText(text: string): Promise<boolean> {
  try {
    if (window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;border:0;';
    document.documentElement.appendChild(area);
    area.select();
    area.setSelectionRange(0, area.value.length);
    const copied = document.execCommand('copy');
    area.remove();
    return copied;
  } catch {
    return false;
  }
}

function isToggleMessage(message: unknown): message is BackgroundToCard {
  return (
    typeof message === 'object' && message !== null && 'type' in message && message.type === 'sb:toggle'
  );
}

function createHost(): { host: HTMLElement; shadow: ShadowRoot } {
  const host = document.createElement('div');
  host.id = HOST_ID;
  host.style.cssText =
    'all:initial!important;position:fixed!important;top:0!important;left:0!important;margin:0!important;' +
    'padding:0!important;border:0!important;display:block!important;width:auto!important;' +
    'height:auto!important;max-width:none!important;z-index:2147483647!important;';
  const shadow = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = cardCss;
  shadow.append(style);
  (document.documentElement ?? document.body).appendChild(host);
  return { host, shadow };
}

async function boot(): Promise<void> {
  if (window.top !== window || document.getElementById(HOST_ID)) return;

  const store = await readStore();
  const initial = matchingSites(store, location.hostname);
  if (!initial.length) return;
  if (document.getElementById(HOST_ID)) return;

  const { host, shadow } = createHost();
  const [site, setSite] = createSignal<Site | undefined>(initial[0]);
  const [items, setItems] = createSignal<Item[]>(itemsOn(initial, store.items));
  const [theme, setTheme] = createSignal<Theme>(store.settings.theme);
  let dispose: (() => void) | undefined;
  let unsubscribe: (() => void) | undefined;

  const patchUi = (patch: Partial<SiteUI>) => {
    const current = site();
    if (!current) return;
    void patchSite(current.id, (target) => Object.assign(target.ui, patch)).catch(() => { });
  };

  function onMessage(
    message: unknown,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: unknown) => void,
  ) {
    if (!isToggleMessage(message)) return;
    patchUi({ hidden: !(site()?.ui.hidden ?? false) });
    sendResponse({ ok: true });
  }

  function unmount() {
    dispose?.();
    unsubscribe?.();
    chrome.runtime.onMessage.removeListener(onMessage);
    host.remove();
    globalThis.__savebookBoot = null;
  }

  const openOptions = () => {
    const message: CardToBackground = { type: 'sb:open-options' };
    void chrome.runtime.sendMessage(message).catch(() => { });
  };

  const copy = (item: Item) => copyText(itemTypes[item.type].copy(item));

  dispose = render(
    () => (
      <Show when={site()}>
        {(current) => (
          <Card
            site={current()}
            items={items()}
            theme={theme()}
            host={host}
            onPatchUi={patchUi}
            onOpenOptions={openOptions}
            copy={copy}
          />
        )}
      </Show>
    ),
    shadow,
  );

  unsubscribe = onStoreChanged((changed) => {
    const next = matchingSites(changed, location.hostname);
    if (!next.length) {
      unmount();
      return;
    }
    setSite(next[0]);
    setItems(itemsOn(next, changed.items));
    setTheme(changed.settings.theme);
  });

  chrome.runtime.onMessage.addListener(onMessage);
}

if (!globalThis.__savebookBoot) {
  globalThis.__savebookBoot = boot().catch((error) => {
    console.error('[Save Book] the card failed to mount on this page', error);
  });
}
