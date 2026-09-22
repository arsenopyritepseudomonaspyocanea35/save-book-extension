import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import { createStore, unwrap } from 'solid-js/store';
import { Button } from '../ui/button/button';
import { PlusIcon } from '../ui/icons/icons';
import { Tabs, type TabDefinition } from '../ui/tabs/tabs';
import { ItemEditor } from './ItemEditor';
import { ItemList } from './ItemList';
import { SettingsEditor } from './SettingsEditor';
import { SettingsList, type SettingsSection } from './SettingsList';
import { SiteEditor } from './SiteEditor';
import { SiteList } from './SiteList';
import { itemTypeList } from '../shared/itemTypes';
import { itemName, siteName } from '../shared/naming';
import { originsFor, parsePattern } from '../shared/pattern';
import {
  createItem,
  createSite,
  emptyStore,
  type Item,
  type ItemKind,
  type Language,
  type Site,
  type Store,
  type Theme,
} from '../shared/schema';
import { readStore, writeStore } from '../shared/store';
import { locale, setLanguage, t } from '../shared/i18n';

type View = 'sites' | 'items' | 'settings';
type ToastKind = 'info' | 'error';

export function App() {
  const [store, setStore] = createStore<Store>(emptyStore());
  const [loaded, setLoaded] = createSignal(false);
  const [view, setView] = createSignal<View>('items');
  const [selectedSiteId, setSelectedSiteId] = createSignal<string | null>(null);
  const [selectedItemId, setSelectedItemId] = createSignal<string | null>(null);
  const [settingsSection, setSettingsSection] = createSignal<SettingsSection>('appearance');
  const [patternDraft, setPatternDraft] = createSignal('');
  const [newPattern, setNewPattern] = createSignal('');
  const [filter, setFilter] = createSignal('');
  const [toast, setToast] = createSignal<{ text: string; kind: ToastKind } | null>(null);
  const [noAccess, setNoAccess] = createSignal<Record<string, boolean>>({});
  const touchedUi = new Set<string>();
  let saveTimer = 0;
  let toastTimer = 0;
  let patternInput: HTMLInputElement | undefined;

  onCleanup(() => {
    clearTimeout(saveTimer);
    clearTimeout(toastTimer);
  });

  const notify = (text: string, kind: ToastKind = 'info') => {
    setToast({ text, kind });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToast(null), 4200);
  };

  createEffect(() => {
    const theme = store.settings.theme;
    if (theme === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.dataset.theme = theme;
  });

  createEffect(() => setLanguage(store.settings.language));

  createEffect(() => {
    document.documentElement.lang = locale();
  });

  const flushWrite = async () => {
    clearTimeout(saveTimer);
    saveTimer = 0;
    const next = structuredClone(unwrap(store));
    const stored = new Map((await readStore()).sites.map((site) => [site.id, site]));
    for (const site of next.sites) {
      if (touchedUi.has(site.id)) continue;
      const current = stored.get(site.id);
      if (current) site.ui = current.ui;
    }
    await writeStore(next);
    touchedUi.clear();
  };

  const persist = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => void flushWrite(), 300);
  };

  const persistNow = () => flushWrite();

  const indexOfSite = (id: string) => store.sites.findIndex((site) => site.id === id);
  const indexOfItem = (id: string) => store.items.findIndex((item) => item.id === id);
  const selectedSite = () => store.sites.find((site) => site.id === selectedSiteId());
  const selectedItem = () => store.items.find((item) => item.id === selectedItemId());

  createEffect(() => setPatternDraft(selectedSite()?.pattern ?? ''));

  const siteItems = createMemo(() => {
    const site = selectedSite();
    return site ? store.items.filter((item) => item.sites.includes(site.id)) : [];
  });

  const siteCounts = createMemo<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    for (const item of store.items) {
      for (const id of item.sites) counts[id] = (counts[id] ?? 0) + 1;
    }
    return counts;
  });

  const filteredItems = createMemo(() => {
    const needle = filter().trim().toLowerCase();
    if (!needle) return store.items;
    return store.items.filter((item) => {
      const routes = store.sites
        .filter((site) => item.sites.includes(site.id))
        .map(siteName)
        .join(' ');
      return `${itemName(item)} ${item.type} ${item.value} ${routes}`.toLowerCase().includes(needle);
    });
  });

  const dropOrigins = async (candidates: string[]) => {
    const kept = new Set(store.sites.flatMap((site) => site.origins));
    const drop = candidates.filter((origin) => !kept.has(origin));
    if (!drop.length) return;
    await chrome.permissions.remove({ origins: drop }).catch(() => { });
  };

  const holdsAccess = async (site: Site): Promise<boolean> => {
    const origins = [...site.origins];
    if (!origins.length) return false;
    try {
      return await chrome.permissions.contains({ origins });
    } catch {
      return false;
    }
  };

  const refreshAccess = async () => {
    const checks = await Promise.all(
      store.sites.map(async (site) => [site.id, !(await holdsAccess(site))] as const),
    );
    setNoAccess(Object.fromEntries(checks));
  };

  const grantAccess = async (site: Site) => {
    const origins = [...site.origins];
    if (!origins.length) return;
    let granted = false;
    try {
      granted = await chrome.permissions.request({ origins });
    } catch {
      granted = false;
    }
    await refreshAccess();
    if (!granted) {
      notify(t('toast.accessMissing', site.pattern), 'error');
    }
  };

  const addSite = async (raw: string) => {
    const pattern = parsePattern(raw);
    if (!pattern) {
      notify(t('toast.badDomain'), 'error');
      return;
    }
    const existing = store.sites.find((site) => site.pattern === pattern);
    if (existing) {
      setSelectedSiteId(existing.id);
      notify(t('toast.siteExists'));
      return;
    }
    const origins = originsFor(pattern);
    if (!(await chrome.permissions.request({ origins }).catch(() => false))) {
      notify(t('toast.accessDenied', pattern), 'error');
      return;
    }
    const site = createSite(pattern, origins);
    setStore('sites', (sites) => [...sites, site]);
    setSelectedSiteId(site.id);
    await persistNow();
    void refreshAccess();
    setNewPattern('');
    notify(t('toast.siteAdded', pattern));
  };

  const changePattern = async (site: Site, raw: string) => {
    const pattern = parsePattern(raw);
    if (!pattern) {
      notify(t('toast.badDomain'), 'error');
      setPatternDraft(site.pattern);
      return;
    }
    if (pattern === site.pattern) return;
    if (store.sites.some((candidate) => candidate.id !== site.id && candidate.pattern === pattern)) {
      notify(t('toast.siteTaken', pattern), 'error');
      setPatternDraft(site.pattern);
      return;
    }
    if (!(await chrome.permissions.request({ origins: originsFor(pattern) }).catch(() => false))) {
      notify(t('toast.accessDenied', pattern), 'error');
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
    await refreshAccess();
    notify(t('toast.siteUpdated'));
  };

  const deleteSite = async (site: Site) => {
    if (indexOfSite(site.id) < 0) return;
    const origins = [...site.origins];
    setStore('sites', (sites) => sites.filter((candidate) => candidate.id !== site.id));
    setStore('items', (items) =>
      items.map((item) =>
        item.sites.includes(site.id)
          ? { ...item, sites: item.sites.filter((id) => id !== site.id) }
          : item,
      ),
    );
    if (selectedSiteId() === site.id) setSelectedSiteId(store.sites[0]?.id ?? null);
    await persistNow();
    await dropOrigins(origins);
    await refreshAccess();
    notify(t('toast.siteRemoved', site.pattern));
  };

  const setEnabled = (site: Site, enabled: boolean) => {
    const index = indexOfSite(site.id);
    if (index < 0) return;
    setStore('sites', index, 'enabled', enabled);
    void persistNow();
    if (enabled && noAccess()[site.id]) void grantAccess(site);
  };

  const resetCard = (site: Site) => {
    const index = indexOfSite(site.id);
    if (index < 0) return;
    touchedUi.add(site.id);
    setStore('sites', index, 'ui', { x: null, y: null, collapsed: false, hidden: false });
    void persistNow();
    notify(t('toast.cardReset'));
  };

  const assign = (item: Item, siteId: string) => {
    const index = indexOfItem(item.id);
    const site = store.sites.find((candidate) => candidate.id === siteId);
    if (index < 0 || !site || item.sites.includes(siteId)) return;
    setStore('items', index, 'sites', (sites) => [...sites, siteId]);
    void persistNow();
    notify(
      site.enabled
        ? t('toast.itemAssigned', itemName(item), siteName(site))
        : t('toast.itemAssignedCardOff', itemName(item), siteName(site)),
    );
  };

  const unassign = (item: Item, siteId: string) => {
    const index = indexOfItem(item.id);
    const site = store.sites.find((candidate) => candidate.id === siteId);
    if (index < 0 || !site) return;
    const rest = item.sites.filter((id) => id !== siteId);
    setStore('items', index, 'sites', rest);
    void persistNow();
    notify(
      rest.length
        ? t('toast.itemUnassigned', itemName(item), siteName(site), rest.length)
        : t('toast.itemUnassignedLast', itemName(item)),
    );
  };

  const addItem = (kind: ItemKind, siteIds: string[]) => {
    const item = createItem(kind, siteIds);
    setStore('items', (items) => [...items, item]);
    setSelectedItemId(item.id);
    void persistNow();
    requestAnimationFrame(() => {
      document
        .querySelector<HTMLInputElement>(`#panel-${view()} [data-label-for="${item.id}"]`)
        ?.focus();
    });
  };

  const removeItemFromSite = (itemId: string) => {
    const site = selectedSite();
    const item = store.items.find((candidate) => candidate.id === itemId);
    if (!site || !item) return;
    unassign(item, site.id);
  };

  const patchItem = (itemId: string, field: 'label' | 'value', value: string) => {
    const index = indexOfItem(itemId);
    if (index < 0) return;
    setStore('items', index, field, value);
    persist();
  };

  const setItemKind = (itemId: string, kind: ItemKind) => {
    const index = indexOfItem(itemId);
    if (index < 0) return;
    setStore('items', index, 'type', kind);
    void persistNow();
  };

  const deleteItem = (item: Item) => {
    const rest = store.items.filter((candidate) => candidate.id !== item.id);
    setStore('items', rest);
    if (selectedItemId() === item.id) setSelectedItemId(rest[0]?.id ?? null);
    void persistNow();
    notify(t('toast.itemDeleted', itemName(item)));
  };

  const setTheme = (theme: Theme) => {
    setStore('settings', 'theme', theme);
    void persistNow();
  };

  const changeLanguage = (language: Language) => {
    setStore('settings', 'language', language);
    void persistNow();
  };

  const clearSites = async () => {
    const count = store.sites.length;
    if (!count) return;
    const origins = store.sites.flatMap((site) => site.origins);
    setStore('sites', []);
    setStore('items', (items) => items.map((item) => ({ ...item, sites: [] })));
    setSelectedSiteId(null);
    await persistNow();
    await dropOrigins(origins);
    notify(t('toast.sitesCleared', count));
  };

  const clearItems = async () => {
    const count = store.items.length;
    if (!count) return;
    setStore('items', []);
    setSelectedItemId(null);
    await persistNow();
    notify(t('toast.itemsCleared', count));
  };

  const clearEverything = async () => {
    const sites = store.sites.length;
    const items = store.items.length;
    if (!sites && !items) return;
    const origins = store.sites.flatMap((site) => site.origins);
    setStore('sites', []);
    setStore('items', []);
    setSelectedSiteId(null);
    setSelectedItemId(null);
    await persistNow();
    await dropOrigins(origins);
    notify(t('toast.allCleared', sites, items));
  };

  const openSite = (siteId: string) => {
    setSelectedSiteId(siteId);
    setView('sites');
  };

  const changeView = (next: View) => {
    setView(next);
    if (next === 'items' && !selectedItem()) setSelectedItemId(store.items[0]?.id ?? null);
  };

  const tabs = createMemo<TabDefinition<View>[]>(() => [
    { id: 'items', label: t('tabs.items'), count: store.items.length },
    { id: 'sites', label: t('tabs.sites'), count: store.sites.length },
    { id: 'settings', label: t('tabs.settings') },
  ]);

  onMount(async () => {
    const initial = await readStore();
    setStore(initial);
    setSelectedSiteId(initial.sites[0]?.id ?? null);
    setSelectedItemId(initial.items[0]?.id ?? null);
    setLoaded(true);
    void refreshAccess();

    try {
      const bag = await chrome.storage.session.get('pendingPattern');
      const pending: unknown = bag.pendingPattern;
      if (typeof pending !== 'string') return;
      await chrome.storage.session.remove('pendingPattern');
      const pattern = parsePattern(pending);
      if (!pattern) return;
      setNewPattern(pattern);
      setView('sites');
      notify(t('toast.pendingAccess', pattern));
      requestAnimationFrame(() => patternInput?.focus());
    } catch { }
  });

  onMount(() => {
    const onPermissions = () => void refreshAccess();
    chrome.permissions.onAdded.addListener(onPermissions);
    chrome.permissions.onRemoved.addListener(onPermissions);
  });

  return (
    <>
      <div class="app">
        <header class="bar">
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
            <h1 class="brand-name">Save Book</h1>
          </div>
          <Tabs label={t('tabs.label')} tabs={tabs()} value={view()} onChange={changeView} />
        </header>

        <div
          class="view"
          id="panel-sites"
          role="tabpanel"
          aria-labelledby="tab-sites"
          hidden={view() !== 'sites'}
        >
          <aside class="side">
            <form
              class="add"
              autocomplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                void addSite(newPattern());
              }}
            >
              <input
                ref={patternInput}
                class="input-mono"
                type="text"
                placeholder="example.com"
                spellcheck={false}
                aria-label={t('sites.addDomainLabel')}
                value={newPattern()}
                onInput={(event) => setNewPattern(event.currentTarget.value)}
              />
              <Button variant="primary" type="submit">
                {t('sites.add')}
              </Button>
            </form>

            <p class="note">{t('sites.note')}</p>

            <Show when={loaded()}>
              <SiteList
                sites={store.sites}
                counts={siteCounts()}
                noAccess={noAccess()}
                selectedId={selectedSiteId()}
                onSelect={setSelectedSiteId}
              />
            </Show>
          </aside>

          <main class="main">
            <div class="editor">
              <Show when={loaded()}>
                <Show
                  when={selectedSite()}
                  fallback={
                    <div class="placeholder">
                      <h2>
                        {store.sites.length ? t('sites.emptySelected') : t('sites.emptyFirst')}
                      </h2>
                      <p>{t('sites.emptyBody')}</p>
                    </div>
                  }
                >
                  {(site) => (
                    <SiteEditor
                      site={site()}
                      sites={store.sites}
                      items={siteItems()}
                      patternDraft={patternDraft()}
                      onPatternDraft={setPatternDraft}
                      onApplyPattern={() => void changePattern(site(), patternDraft())}
                      needsAccess={noAccess()[site().id] === true}
                      onGrantAccess={() => void grantAccess(site())}
                      onLabel={(value) => {
                        const index = indexOfSite(site().id);
                        if (index < 0) return;
                        setStore('sites', index, 'label', value);
                        persist();
                      }}
                      onEnabled={(enabled) => setEnabled(site(), enabled)}
                      onAddItem={(kind) => addItem(kind, [site().id])}
                      onItemLabel={(itemId, value) => patchItem(itemId, 'label', value)}
                      onItemValue={(itemId, value) => patchItem(itemId, 'value', value)}
                      onItemKind={(itemId, kind) => setItemKind(itemId, kind)}
                      onRemoveItem={removeItemFromSite}
                      onResetCard={() => resetCard(site())}
                      onDelete={() => void deleteSite(site())}
                    />
                  )}
                </Show>
              </Show>
            </div>
          </main>
        </div>

        <div
          class="view"
          id="panel-items"
          role="tabpanel"
          aria-labelledby="tab-items"
          hidden={view() !== 'items'}
        >
          <aside class="side">
            <div class="kinds">
              <For each={itemTypeList}>
                {(definition) => (
                  <Button variant="ghost" onClick={() => addItem(definition.kind, [])}>
                    <PlusIcon />
                    {t(definition.labelKey)}
                  </Button>
                )}
              </For>
            </div>

            <input
              class="filter"
              type="search"
              placeholder={t('items.filterPlaceholder')}
              aria-label={t('items.filterLabel')}
              spellcheck={false}
              value={filter()}
              onInput={(event) => setFilter(event.currentTarget.value)}
            />

            <Show when={loaded()}>
              <ItemList
                items={filteredItems()}
                total={store.items.length}
                selectedId={selectedItemId()}
                onSelect={setSelectedItemId}
              />
            </Show>

            <p class="note">{t('items.note')}</p>
          </aside>

          <main class="main">
            <div class="editor">
              <Show when={loaded()}>
                <Show
                  when={selectedItem()}
                  fallback={
                    <div class="placeholder">
                      <h2>{t('items.emptyFirst')}</h2>
                      <p>{t('items.emptyBody')}</p>
                    </div>
                  }
                >
                  {(item) => (
                    <ItemEditor
                      item={item()}
                      sites={store.sites}
                      counts={siteCounts()}
                      onLabel={(value) => patchItem(item().id, 'label', value)}
                      onValue={(value) => patchItem(item().id, 'value', value)}
                      onKind={(kind) => setItemKind(item().id, kind)}
                      onAssign={(siteId) => assign(item(), siteId)}
                      onUnassign={(siteId) => unassign(item(), siteId)}
                      onOpenSite={openSite}
                      onDelete={() => deleteItem(item())}
                    />
                  )}
                </Show>
              </Show>
            </div>
          </main>
        </div>

        <div
          class="view"
          id="panel-settings"
          role="tabpanel"
          aria-labelledby="tab-settings"
          hidden={view() !== 'settings'}
        >
          <aside class="side">
            <SettingsList
              active={settingsSection()}
              theme={store.settings.theme}
              language={store.settings.language}
              siteCount={store.sites.length}
              itemCount={store.items.length}
              onSelect={setSettingsSection}
            />
          </aside>

          <main class="main">
            <div class="editor">
              <SettingsEditor
                section={settingsSection()}
                theme={store.settings.theme}
                language={store.settings.language}
                siteCount={store.sites.length}
                itemCount={store.items.length}
                onTheme={setTheme}
                onLanguage={changeLanguage}
                onClearSites={() => void clearSites()}
                onClearItems={() => void clearItems()}
                onClearEverything={() => void clearEverything()}
              />
            </div>
          </main>
        </div>
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
