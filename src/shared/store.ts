import { STORAGE_KEY, parseStore, type Site, type Store } from './schema';

export async function readStore(): Promise<Store> {
  const bag = await chrome.storage.local.get(STORAGE_KEY);
  return parseStore(bag[STORAGE_KEY]);
}

export async function writeStore(store: Store): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEY]: store });
}

export async function patchSite(id: string, mutate: (site: Site) => void): Promise<Site | null> {
  const store = await readStore();
  const site = store.sites.find((candidate) => candidate.id === id);
  if (!site) return null;
  mutate(site);
  await writeStore(store);
  return site;
}

export function onStoreChanged(run: (store: Store) => void): () => void {
  const listener = (changes: Record<string, chrome.storage.StorageChange>, area: string) => {
    if (area !== 'local' || !changes[STORAGE_KEY]) return;
    void readStore().then(run);
  };
  chrome.storage.onChanged.addListener(listener);
  return () => chrome.storage.onChanged.removeListener(listener);
}
