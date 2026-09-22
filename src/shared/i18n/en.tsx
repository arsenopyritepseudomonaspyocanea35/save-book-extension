import type { JSX } from 'solid-js';
import type { Locale } from '../schema';

const sites = (count: number) => (count === 1 ? 'site' : 'sites');
const items = (count: number) => (count === 1 ? 'item' : 'items');

const LANGUAGE_NAME: Record<Locale, string> = {
  en: 'English',
  pl: 'Polish',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
};

export const en = {
  'common.system': 'System',
  'common.everySite': 'every site',

  'tabs.items': 'Items',
  'tabs.sites': 'Sites',
  'tabs.settings': 'Settings',
  'tabs.label': 'Views',

  'sites.addDomainLabel': 'Domain to add',
  'sites.add': 'Add',
  'sites.note': (): JSX.Element => (
    <>
      Cards appear on that domain and its subdomains. Use <code>*</code> for every site.
    </>
  ),
  'sites.emptySelected': 'Nothing selected',
  'sites.emptyFirst': 'Add your first site',
  'sites.emptyBody':
    'Type a domain in the sidebar — for example example.com — and Save Book asks Chrome for access to just that domain. Then add the logins, numbers or snippets you want one click away there.',
  'sites.list.empty': 'No sites yet.',
  'sites.list.cardOff': 'card off',
  'sites.list.noAccess': 'no access',
  'sites.list.noAccessTitle': 'Chrome access to this domain was not granted',

  'site.field.domain': 'Domain',
  'site.field.label': 'Label',
  'site.field.labelPlaceholder': 'Optional, shown in the card',
  'site.applyTitle': 'Ask Chrome for access to the new domain',
  'site.applyTitleSame': 'Ask Chrome for access to this domain',
  'site.apply': 'Apply',
  'site.grantAccess': 'Grant access',
  'site.showCard': 'Show the card on this site',
  'site.hint.noAccess': (pattern: string) =>
    `Chrome access to ${pattern} was not granted, so no card shows there yet.`,
  'site.hint.everySite': 'Applies to every site.',
  'site.hint.subdomains': (pattern: string) => `Applies to ${pattern} and its subdomains.`,
  'site.items.title': 'Items on this site',
  'site.items.note':
    'Items are shared: a value edited here changes on every site it is shown on. Removing one here takes it off this site only.',
  'site.items.empty': (): JSX.Element => (
    <>
      Nothing saved for this site yet. Add one below, or route an item you already keep on another
      site from <strong>Items</strong>.
    </>
  ),
  'site.resetCard': 'Reset card position',
  'site.delete': 'Delete site',
  'site.deleteArmed': 'Click again to delete',

  'items.filterPlaceholder': 'Filter items',
  'items.filterLabel': 'Filter items',
  'items.note': 'One item, many sites: a value is stored once and shown on every site you add it to.',
  'items.emptyFirst': 'No items yet',
  'items.emptyBody':
    "Add a login, a code or a number from the sidebar, then choose the sites it belongs on. The same value then shows on each of those site's cards — you never re-type it.",
  'items.list.noMatch': 'No item matches that filter.',
  'items.list.empty': 'No items yet — add one above.',
  'items.list.notOnAnySite': 'not on any site',

  'item.kind.text': 'Text',
  'item.kind.secret': 'Password',
  'item.kind.label': 'Kind',
  'item.kind.group': 'Item kind',
  'item.placeholder.text': 'Anything you copy often',
  'item.placeholder.secret': '••••••••',
  'item.untitled': 'Untitled item',
  'item.field.label': 'Label',
  'item.field.labelPlaceholder': 'Optional, shown in the card',
  'item.field.value': 'Value',
  'item.field.labelLabel': 'Item label',
  'item.field.valueLabel': 'Item value',
  'item.revealValue': 'Reveal the value',
  'item.hideValue': 'Hide the value',
  'item.valueHint.assigned': (count: number) =>
    `Stored once and shown on ${count} ${sites(count)}: editing the value here changes it on all of them.`,
  'item.valueHint.unassigned': 'Stored once. No card shows it while it is not on any site.',
  'item.sites.title': 'Sites this item is on',
  'item.sites.noSites':
    'Add a site in the Sites tab first — until then there is nowhere for this to show.',
  'item.sites.selectLabel': 'Site to add this item to',
  'item.sites.noneAvailable': 'On every site you have',
  'item.sites.addTitle': 'Show this item on that site too',
  'item.sites.add': 'Add',
  'item.sites.note':
    'Adding shows the same value there; removing takes it off that site only and keeps it for the others.',
  'item.sites.empty': (): JSX.Element => (
    <>
      Not on any site yet. Pick one above, or open <strong>Sites</strong> to set up a site it belongs
      on.
    </>
  ),
  'item.sites.openTitle': 'Open this site in the Sites tab',
  'item.sites.remove': (site: string) => `Remove from ${site}`,
  'item.sites.cardOff': 'card off',
  'item.foot.assigned': (count: number) => `One item, ${count} ${sites(count)}.`,
  'item.foot.none': 'One item, no sites yet.',
  'item.delete': 'Delete item',
  'item.deleteArmed': 'Click again to delete everywhere',
  'item.removeFromSite': 'Remove from this site',

  'card.copyHint': 'Click to copy',
  'card.copied': 'Copied',
  'card.reveal': 'Reveal',
  'card.hide': 'Hide',
  'card.collapse': 'Collapse',
  'card.hideCard': 'Hide card',
  'card.empty': 'No items yet',
  'card.addItems': 'Add items',

  'settings.nav': 'Settings sections',
  'settings.appearance': 'Appearance',
  'settings.language': 'Language',
  'settings.data': 'Data',
  'settings.theme.title': 'Theme',
  'settings.theme.group': 'Theme',
  'settings.theme.light': 'Light',
  'settings.theme.dark': 'Dark',
  'settings.theme.noteSystem': (current: 'light' | 'dark') =>
    `Follows your system, which is ${current} right now. Applies to this page and to the card on every site you have.`,
  'settings.theme.noteFixed': (theme: 'light' | 'dark') =>
    `Always ${theme}, whatever your system says. Applies to this page and to the card on every site you have.`,
  'settings.language.group': 'Language',
  'settings.language.noteSystem': (current: Locale) =>
    `Follows your browser, which is ${LANGUAGE_NAME[current]} right now. Applies to this page and to the card on every site you have.`,
  'settings.language.noteFixed': (current: Locale) =>
    `Always ${LANGUAGE_NAME[current]}, whatever your browser says. Applies to this page and to the card on every site you have.`,
  'settings.data.title': 'Clear data',
  'settings.data.note':
    'Everything Save Book keeps is in this browser and nowhere else, so clearing cannot be undone. Your theme and language choices are not data and stay.',
  'settings.data.sites': 'Sites',
  'settings.data.sitesNote':
    'Removes every site and hands its Chrome access back. Items are kept — no site shows them.',
  'settings.data.sitesLabel': 'Clear sites',
  'settings.data.sitesArmed': 'Click again to clear',
  'settings.data.items': 'Items',
  'settings.data.itemsNote':
    'Deletes every saved value, on every site. Sites and card positions stay.',
  'settings.data.itemsLabel': 'Clear items',
  'settings.data.everything': 'Everything',
  'settings.data.everythingNote':
    'Removes every site, every item and every saved card position, and hands the Chrome access back.',
  'settings.data.everythingLabel': 'Clear everything',
  'settings.data.everythingArmed': 'Click again to clear everything',

  'count.sites': (count: number) => `${count} ${sites(count)}`,
  'count.items': (count: number) => `${count} ${items(count)}`,

  'stamp.title': (count: number, list: string) => `Shown on ${count} ${sites(count)}: ${list}`,

  'toast.badDomain': 'Enter a domain like example.com, or * for every site',
  'toast.siteExists': 'That site is already here',
  'toast.siteAdded': (pattern: string) => `Added ${pattern}. Reload that site to see the card.`,
  'toast.siteTaken': (pattern: string) => `Another site already uses ${pattern}`,
  'toast.siteUpdated': 'Domain updated. Reload that site to see the card.',
  'toast.siteRemoved': (pattern: string) =>
    `Removed ${pattern}. Anything saved only there is now in “Not on any site”.`,
  'toast.accessDenied': (pattern: string) => `Chrome access to ${pattern} was not granted`,
  'toast.accessMissing': (pattern: string) =>
    `Chrome access to ${pattern} was not granted, so no card shows there`,
  'toast.pendingAccess': (pattern: string) => `Press Add to give Save Book access to ${pattern}.`,
  'toast.cardReset': 'The card will show up again, top right.',
  'toast.itemAssigned': (item: string, site: string) => `${item} now shows on ${site}.`,
  'toast.itemAssignedCardOff': (item: string, site: string) =>
    `${item} is added to ${site}, but the card is off there.`,
  'toast.itemUnassigned': (item: string, site: string, count: number) =>
    `${item} is off ${site} — still shown on ${count} other ${sites(count)}.`,
  'toast.itemUnassignedLast': (item: string) =>
    `${item} is not on any site now, so no card shows it.`,
  'toast.itemDeleted': (item: string) => `${item} deleted, on every site.`,
  'toast.sitesCleared': (count: number) =>
    `Removed ${sites(count)}. Chrome access was handed back; every item is now in “Not on any site”.`,
  'toast.itemsCleared': (count: number) =>
    `Deleted ${items(count)}. Sites and card positions are untouched.`,
  'toast.allCleared': (sitesCount: number, itemsCount: number) =>
    `Cleared ${sites(sitesCount)} and ${items(itemsCount)}, plus every card position. Chrome access was handed back.`,
};

export type Dictionary = typeof en;
