import { Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { createStore, unwrap } from 'solid-js/store';
import { SiteEditor } from './SiteEditor';
import { SiteList } from './SiteList';
import { originsFor, parsePattern } from '../shared/pattern';
import {
  createItem,
  createSite,
  emptyStore,
  type ItemKind,
  type Site,
  type Store,
} from '../shared/schema';
import { readStore, writeStore } from '../shared/store';

type ToastKind = 'info' | 'error';

export function App() {
  const [store, setStore] = createStore<Store>(emptyStore());
  const [loaded, setLoaded] = createSignal(false);
  const [selectedId, setSelectedId] = createSignal<string | null>(null);
  const [patternDraft, setPatternDraft] = createSignal('');
  const [newPattern, setNewPattern] = createSignal('');
  const [toast, setToast] = createSignal<{ text: string; kind: ToastKind } | null>(null);
  let saveTimer = 0;
  let toastTimer = 0;

  onCleanup(() => {
    clearTimeout(saveTimer);
    clearTimeout(toastTimer);
  });

  const notify = (text: string, kind: ToastKind = 'info') => {
    setToast({ text, kind });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToast(null), 4200);
  };

  const persist = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => void writeStore(structuredClone(unwrap(store))), 300);
  };

  const persistNow = () => {
    clearTimeout(saveTimer);
    return writeStore(structuredClone(unwrap(store)));
  };

  const indexOfSite = (id: string) => store.sites.findIndex((site) => site.id === id);
  const selectedSite = () => store.sites.find((site) => site.id === selectedId());

  // Follow the stored pattern: switching sites, or applying a change, resets the field.
  createEffect(() => setPatternDraft(selectedSite()?.pattern ?? ''));

  const requestOrigins = (origins: string[]) =>
    chrome.permissions.request({ origins }).catch(() => false);

  /** Hand back host permissions no remaining site needs. */
  const dropOrigins = async (candidates: string[]) => {
    const kept = new Set(store.sites.flatMap((site) => site.origins));
    const drop = candidates.filter((origin) => !kept.has(origin));
    if (!drop.length) return;
    await chrome.permissions.remove({ origins: drop }).catch(() => {});
  };

  const addSite = async (raw: string) => {
    const pattern = parsePattern(raw);
    if (!pattern) {
      notify('Enter a domain like example.com, or * for every site', 'error');
      return;
    }
    const existing = store.sites.find((site) => site.pattern === pattern);
    if (existing) {
      setSelectedId(existing.id);
      notify('That site is already here');
      return;
    }
    const origins = originsFor(pattern);
    if (!(await requestOrigins(origins))) {
      notify(`Chrome access to ${pattern} was not granted`, 'error');
      return;
    }
    const site = createSite(pattern, origins);
    setStore('sites', (sites) => [...sites, site]);
    setSelectedId(site.id);
    await persistNow();
    setNewPattern('');
    notify(`Added ${pattern}. Reload that site to see the card.`);
  };

  const changePattern = async (site: Site, raw: string) => {
    const pattern = parsePattern(raw);
    if (!pattern) {
      notify('Enter a domain like example.com, or * for every site', 'error');
      setPatternDraft(site.pattern);
      return;
    }
    if (pattern === site.pattern) return;
    if (store.sites.some((candidate) => candidate.id !== site.id && candidate.pattern === pattern)) {
      notify(`Another site already uses ${pattern}`, 'error');
      setPatternDraft(site.pattern);
      return;
    }
    if (!(await requestOrigins(originsFor(pattern)))) {
      notify(`Chrome access to ${pattern} was not granted`, 'error');
      setPatternDraft(site.pattern);
      return;
    }
    const index = indexOfSite(site.id);
    if (index < 0) return;
    const previous = [...site.origins];
    setStore('sites', index, 'pattern', pattern);
    setStore('sites', index, 'origins', originsFor(pattern));
    await persistNow();
    await dropOrigins(previous);
    notify('Domain updated. Reload that site to see the card.');
  };

  const deleteSite = async (site: Site) => {
    if (indexOfSite(site.id) < 0) return;
    const origins = [...site.origins];
    setStore('sites', (sites) => sites.filter((candidate) => candidate.id !== site.id));
    if (selectedId() === site.id) setSelectedId(store.sites[0]?.id ?? null);
    await persistNow();
    await dropOrigins(origins);
    notify(`Removed ${site.pattern}`);
  };

  const setEnabled = (site: Site, enabled: boolean) => {
    const index = indexOfSite(site.id);
    if (index < 0) return;
    setStore('sites', index, 'enabled', enabled);
    void persistNow();
  };

  const resetCard = (site: Site) => {
    const index = indexOfSite(site.id);
    if (index < 0) return;
    setStore('sites', index, 'ui', { x: null, y: null, collapsed: false, hidden: false });
    void persistNow();
    notify('The card will show up again, top right.');
  };

  const addItem = (site: Site, kind: ItemKind) => {
    const index = indexOfSite(site.id);
    if (index < 0) return;
    const item = createItem(kind);
    setStore('sites', index, 'items', (items) => [...items, item]);
    void persistNow();
    const input = document.querySelector<HTMLInputElement>(`[data-label-for="${item.id}"]`);
    input?.focus();
  };

  const removeItem = (site: Site, itemId: string) => {
    const index = indexOfSite(site.id);
    if (index < 0) return;
    setStore('sites', index, 'items', (items) => items.filter((item) => item.id !== itemId));
    void persistNow();
  };

  const patchItem = (site: Site, itemId: string, field: 'label' | 'value', value: string) => {
    const siteIndex = indexOfSite(site.id);
    const itemIndex = store.sites[siteIndex]?.items.findIndex((item) => item.id === itemId) ?? -1;
    if (siteIndex < 0 || itemIndex < 0) return;
    if (field === 'label') setStore('sites', siteIndex, 'items', itemIndex, 'label', value);
    else setStore('sites', siteIndex, 'items', itemIndex, 'value', value);
    persist();
  };

  const setItemKind = (site: Site, itemId: string, kind: ItemKind) => {
    const siteIndex = indexOfSite(site.id);
    const itemIndex = store.sites[siteIndex]?.items.findIndex((item) => item.id === itemId) ?? -1;
    if (siteIndex < 0 || itemIndex < 0) return;
    setStore('sites', siteIndex, 'items', itemIndex, 'type', kind);
    void persistNow();
  };

  onMount(async () => {
    const initial = await readStore();
    setStore(initial);
    setSelectedId(initial.sites[0]?.id ?? null);
    setLoaded(true);

    try {
      const bag = await chrome.storage.session.get('pendingPattern');
      const pending: unknown = bag.pendingPattern;
      if (typeof pending !== 'string') return;
      await chrome.storage.session.remove('pendingPattern');
      const pattern = parsePattern(pending);
      if (!pattern) return;
      setNewPattern(pattern);
      notify(`Press Add to give Save Book access to ${pattern}.`);
    } catch {
      /* session storage is optional */
    }
  });

  return (
    <>
      <div class="app">
        <aside class="side">
          <div class="brand">
            <span class="mark" aria-hidden="true">
              <svg viewBox="0 0 128 128" width="16" height="16">
                <rect x="8" y="8" width="112" height="112" rx="30" fill="currentColor" />
                <g fill="#fff">
                  <rect x="32" y="40" width="64" height="9" rx="4.5" />
                  <rect x="32" y="59.5" width="48" height="9" rx="4.5" opacity=".85" />
                  <rect x="32" y="79" width="30" height="9" rx="4.5" opacity=".7" />
                </g>
              </svg>
            </span>
            <span class="brand-name">Save Book</span>
          </div>

          <form
            class="add"
            autocomplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              void addSite(newPattern());
            }}
          >
            <input
              type="text"
              placeholder="example.com"
              spellcheck={false}
              aria-label="Domain to add"
              value={newPattern()}
              onInput={(event) => setNewPattern(event.currentTarget.value)}
            />
            <button class="btn primary" type="submit">
              Add
            </button>
          </form>

          <p class="note">
            Cards appear on that domain and its subdomains. Use <code>*</code> for every site.
          </p>

          <SiteList sites={store.sites} selectedId={selectedId()} onSelect={setSelectedId} />
        </aside>

        <main class="main">
          <div class="editor">
            <Show when={loaded()}>
              <Show
                when={selectedSite()}
                fallback={
                  <div class="placeholder">
                    <h2>{store.sites.length ? 'Nothing selected' : 'Add your first site'}</h2>
                    <p>
                      Type a domain in the sidebar — for example example.com — and Save Book asks
                      Chrome for access to just that domain. Then add the logins, numbers or snippets
                      you want one click away there.
                    </p>
                  </div>
                }
              >
                {(site) => (
                  <SiteEditor
                    site={site()}
                    patternDraft={patternDraft()}
                    onPatternDraft={setPatternDraft}
                    onApplyPattern={() => void changePattern(site(), patternDraft())}
                    onLabel={(value) => {
                      const index = indexOfSite(site().id);
                      if (index < 0) return;
                      setStore('sites', index, 'label', value);
                      persist();
                    }}
                    onEnabled={(enabled) => setEnabled(site(), enabled)}
                    onAddItem={(kind) => addItem(site(), kind)}
                    onItemLabel={(itemId, value) => patchItem(site(), itemId, 'label', value)}
                    onItemValue={(itemId, value) => patchItem(site(), itemId, 'value', value)}
                    onItemKind={(itemId, kind) => setItemKind(site(), itemId, kind)}
                    onRemoveItem={(itemId) => removeItem(site(), itemId)}
                    onResetCard={() => resetCard(site())}
                    onDelete={() => void deleteSite(site())}
                  />
                )}
              </Show>
            </Show>
          </div>
        </main>
      </div>

      <Show when={toast()}>
        {(current) => (
          <div class="toast" classList={{ err: current().kind === 'error' }} role="status">
            {current().text}
          </div>
        )}
      </Show>
    </>
  );
}
