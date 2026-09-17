import { Show, createSignal } from 'solid-js';
import { render } from 'solid-js/web';
import cardCss from './card.css?inline';
import { Card } from './Card';
import { itemTypes } from '../shared/itemTypes';
import type { CardToBackground, BackgroundToCard } from '../shared/messages';
import { findSite } from '../shared/pattern';
import type { Item, Site, SiteUI } from '../shared/schema';
import { onStoreChanged, patchSite, readStore } from '../shared/store';

declare global {
  // The card can be injected twice within the same tick (the registered script
  // plus a manual injection from the service worker); the isolated world keeps
  // one boot promise per frame.
  var __savebookBoot: Promise<void> | null | undefined;
}

const HOST_ID = 'savebook-card-host';

async function copyText(text: string): Promise<boolean> {
  try {
    if (window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path on http pages */
  }
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

/**
 * A fixed-position wrapper in the page, with everything inside a shadow root so
 * the host page's CSS cannot reach the card. `!important` inline styles survive
 * whatever the page declares for `div`.
 */
function createHost(): { host: HTMLElement; shadow: ShadowRoot } {
  const host = document.createElement('div');
  host.id = HOST_ID;
  host.style.cssText =
    'all:initial;position:fixed!important;top:0!important;left:0!important;margin:0!important;' +
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
  const initial = findSite(store, location.hostname);
  if (!initial) return;
  if (document.getElementById(HOST_ID)) return; // a parallel injection won

  const { host, shadow } = createHost();
  const [site, setSite] = createSignal<Site | undefined>(initial);
  let dispose: (() => void) | undefined;
  let unsubscribe: (() => void) | undefined;

  const patchUi = (patch: Partial<SiteUI>) => {
    const current = site();
    if (!current) return;
    void patchSite(current.id, (target) => Object.assign(target.ui, patch)).catch(() => {});
  };

  function onMessage(
    message: unknown,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: unknown) => void,
  ) {
    if (!isToggleMessage(message)) return;
    // Always answer: the toolbar click awaits this and would otherwise look
    // like a dead tab and fall through to opening the options page.
    patchUi({ hidden: !(site()?.ui.hidden ?? false) });
    sendResponse({ ok: true });
  }

  function unmount() {
    dispose?.();
    unsubscribe?.();
    chrome.runtime.onMessage.removeListener(onMessage);
    host.remove();
    // Let a later injection boot again now that this instance is gone.
    globalThis.__savebookBoot = null;
  }

  const openOptions = () => {
    const message: CardToBackground = { type: 'sb:open-options' };
    void chrome.runtime.sendMessage(message).catch(() => {});
  };

  const copy = (item: Item) => copyText(itemTypes[item.type].copy(item));

  dispose = render(
    () => (
      <Show when={site()}>
        {(current) => (
          <Card
            site={current()}
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
    // Re-match instead of looking the boot site up by id: editing a pattern can
    // move that site off this host, or hand the host to a more specific one.
    const next = findSite(changed, location.hostname);
    if (!next) {
      unmount();
      return;
    }
    setSite(next);
  });

  chrome.runtime.onMessage.addListener(onMessage);
}

if (!globalThis.__savebookBoot) {
  globalThis.__savebookBoot = boot().catch((error) => {
    console.error('[Save Book] the card failed to mount on this page', error);
  });
}
