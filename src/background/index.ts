import type { BackgroundToCard } from '../shared/messages';
import { originsFor } from '../shared/pattern';
import { STORAGE_KEY } from '../shared/schema';
import { readStore } from '../shared/store';

/*
 * The service worker owns exactly one thing: keeping Chrome's registered content
 * scripts in sync with the sites the user configured, so the card only ever runs
 * where the user granted access.
 */

const SCRIPT_PREFIX = 'savebook:';
/** The bundled card script — a single classic script, not a module. */
const CARD_FILES = ['content.js'];

async function desiredScripts(): Promise<Map<string, chrome.scripting.RegisteredContentScript>> {
  const store = await readStore();
  const scripts = new Map<string, chrome.scripting.RegisteredContentScript>();
  for (const site of store.sites) {
    if (!site.enabled) continue;
    const matches = originsFor(site.pattern);
    if (!matches.length) continue;
    // Never register a script for a host the user has not actually granted.
    if (!(await chrome.permissions.contains({ origins: matches }))) continue;
    const id = `${SCRIPT_PREFIX}${site.id}`;
    scripts.set(id, {
      id,
      matches,
      js: CARD_FILES,
      runAt: 'document_idle',
      allFrames: false,
      persistAcrossSessions: true,
    });
  }
  return scripts;
}

/** A newly registered site should show up without making the user reload. */
async function injectOpenTabs(matches: string[]): Promise<void> {
  let tabs: chrome.tabs.Tab[] = [];
  try {
    tabs = await chrome.tabs.query({ url: matches });
  } catch {
    return;
  }
  for (const tab of tabs) {
    if (tab.id === undefined) continue;
    try {
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: CARD_FILES });
    } catch {
      /* restricted page, or the tab went away */
    }
  }
}

async function syncRegistrations(): Promise<void> {
  const wanted = await desiredScripts();

  let registered: chrome.scripting.RegisteredContentScript[] = [];
  try {
    registered = await chrome.scripting.getRegisteredContentScripts();
  } catch {
    return;
  }
  const known = new Map(registered.map((script) => [script.id, script]));

  const remove: string[] = [];
  for (const id of known.keys()) {
    if (id.startsWith(SCRIPT_PREFIX) && !wanted.has(id)) remove.push(id);
  }

  const add: chrome.scripting.RegisteredContentScript[] = [];
  const update: chrome.scripting.RegisteredContentScript[] = [];
  const changed: chrome.scripting.RegisteredContentScript[] = [];
  for (const [id, script] of wanted) {
    const current = known.get(id);
    if (!current) {
      add.push(script);
      changed.push(script);
      continue;
    }
    if (JSON.stringify(current.matches) !== JSON.stringify(script.matches)) {
      update.push(script);
      changed.push(script);
    }
  }

  try {
    if (remove.length) await chrome.scripting.unregisterContentScripts({ ids: remove });
    if (update.length) await chrome.scripting.updateContentScripts(update);
    if (add.length) await chrome.scripting.registerContentScripts(add);
  } catch {
    /* host permission missing or revoked — nothing to run on */
  }

  if (!changed.length) return;
  await injectOpenTabs(changed.flatMap((script) => script.matches ?? []));
}

let syncTimer = 0;
let syncChain: Promise<void> = Promise.resolve();

/**
 * Serialized: an in-flight plan must never register a site a newer sync already
 * dropped (disabling a site mid-plan used to resurrect its registration).
 */
function queueSync(): void {
  syncChain = syncChain.then(syncRegistrations).catch(() => {});
}

function scheduleSync(): void {
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncTimer = 0;
    queueSync();
  }, 150);
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[STORAGE_KEY]) scheduleSync();
});

chrome.permissions.onAdded.addListener(scheduleSync);
chrome.permissions.onRemoved.addListener(scheduleSync);

chrome.runtime.onInstalled.addListener((details) => {
  queueSync();
  if (details.reason === 'install') chrome.runtime.openOptionsPage();
});

chrome.runtime.onStartup.addListener(queueSync);

chrome.action.onClicked.addListener(async (tab) => {
  const toggle: BackgroundToCard = { type: 'sb:toggle' };
  if (tab.id !== undefined) {
    try {
      await chrome.tabs.sendMessage(tab.id, toggle);
      return;
    } catch {
      /* no card in this tab */
    }
  }
  try {
    if (tab.url) {
      const url = new URL(tab.url);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        await chrome.storage.session.set({ pendingPattern: url.hostname });
      }
    }
  } catch {
    /* tab.url is often unavailable without host access */
  }
  await chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener((message: unknown) => {
  if (typeof message !== 'object' || message === null) return;
  if (!('type' in message) || message.type !== 'sb:open-options') return;
  void chrome.runtime.openOptionsPage();
});

queueSync();
