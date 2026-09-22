import type { JSX } from 'solid-js';
import type { Locale } from '../schema';
import type { Dictionary } from './en';

const sites = (count: number) => (count === 1 ? 'Website' : 'Websites');
const items = (count: number) => (count === 1 ? 'Eintrag' : 'Einträge');
const otherSites = (count: number) => (count === 1 ? 'weiteren Website' : 'weiteren Websites');

const LANGUAGE_NAME: Record<Locale, string> = {
  en: 'Englisch',
  pl: 'Polnisch',
  es: 'Spanisch',
  fr: 'Französisch',
  de: 'Deutsch',
};

export const de: Dictionary = {
  'common.system': 'System',
  'common.everySite': 'alle Websites',

  'tabs.items': 'Einträge',
  'tabs.sites': 'Websites',
  'tabs.settings': 'Einstellungen',
  'tabs.label': 'Ansichten',

  'sites.addDomainLabel': 'Domain zum Hinzufügen',
  'sites.add': 'Hinzufügen',
  'sites.note': (): JSX.Element => (
    <>
      Karten erscheinen auf dieser Domain und ihren Subdomains. Mit <code>*</code> für alle
      Websites.
    </>
  ),
  'sites.emptySelected': 'Nichts ausgewählt',
  'sites.emptyFirst': 'Erste Website hinzufügen',
  'sites.emptyBody':
    'Gib eine Domain im Seitenbereich ein — zum Beispiel example.com — und Save Book fragt Chrome nach Zugriff nur auf diese Domain. Danach fügst du die Logins, Nummern oder Textbausteine hinzu, die einen Klick entfernt sein sollen.',
  'sites.list.empty': 'Noch keine Websites.',
  'sites.list.cardOff': 'Karte aus',
  'sites.list.noAccess': 'kein Zugriff',
  'sites.list.noAccessTitle': 'Chrome hat keinen Zugriff auf diese Domain',

  'site.field.domain': 'Domain',
  'site.field.label': 'Bezeichnung',
  'site.field.labelPlaceholder': 'Optional, auf der Karte sichtbar',
  'site.applyTitle': 'Chrome nach Zugriff auf die neue Domain fragen',
  'site.applyTitleSame': 'Chrome nach Zugriff auf diese Domain fragen',
  'site.apply': 'Anwenden',
  'site.grantAccess': 'Zugriff erlauben',
  'site.showCard': 'Karte auf dieser Website anzeigen',
  'site.hint.noAccess': (pattern: string) =>
    `Chrome hat keinen Zugriff auf ${pattern}, deshalb erscheint dort noch keine Karte.`,
  'site.hint.everySite': 'Gilt für alle Websites.',
  'site.hint.subdomains': (pattern: string) => `Gilt für ${pattern} und seine Subdomains.`,
  'site.items.title': 'Einträge auf dieser Website',
  'site.items.note':
    'Einträge werden geteilt: ein hier geänderter Wert ändert sich auf jeder Website, auf der er erscheint. Wird einer hier entfernt, verschwindet er nur von dieser Website.',
  'site.items.empty': (): JSX.Element => (
    <>
      Für diese Website ist noch nichts gespeichert. Füge unten etwas hinzu oder ordne einen
      Eintrag, den du schon auf einer anderen Website hast, über <strong>Einträge</strong> zu.
    </>
  ),
  'site.resetCard': 'Kartenposition zurücksetzen',
  'site.delete': 'Website löschen',
  'site.deleteArmed': 'Zum Löschen erneut klicken',

  'items.filterPlaceholder': 'Einträge filtern',
  'items.filterLabel': 'Einträge filtern',
  'items.note':
    'Ein Eintrag, viele Websites: ein Wert wird einmal gespeichert und auf jeder Website angezeigt, der du ihn hinzufügst.',
  'items.emptyFirst': 'Noch keine Einträge',
  'items.emptyBody':
    'Füge ein Login, einen Code oder eine Nummer aus dem Seitenbereich hinzu und wähle dann die Websites, zu denen es gehört. Derselbe Wert erscheint danach auf den Karten dieser Websites — du tippst ihn nie erneut.',
  'items.list.noMatch': 'Kein Eintrag passt zu diesem Filter.',
  'items.list.empty': 'Noch keine Einträge — füge oben einen hinzu.',
  'items.list.notOnAnySite': 'auf keiner Website',

  'item.kind.text': 'Text',
  'item.kind.secret': 'Passwort',
  'item.kind.label': 'Art',
  'item.kind.group': 'Art des Eintrags',
  'item.placeholder.text': 'Etwas, das du oft kopierst',
  'item.placeholder.secret': '••••••••',
  'item.untitled': 'Eintrag ohne Namen',
  'item.field.label': 'Bezeichnung',
  'item.field.labelPlaceholder': 'Optional, auf der Karte sichtbar',
  'item.field.value': 'Wert',
  'item.field.labelLabel': 'Bezeichnung des Eintrags',
  'item.field.valueLabel': 'Wert des Eintrags',
  'item.revealValue': 'Wert anzeigen',
  'item.hideValue': 'Wert verbergen',
  'item.valueHint.assigned': (count: number) =>
    `Einmal gespeichert und auf ${count} ${sites(count)} angezeigt: eine Änderung hier ändert den Wert überall.`,
  'item.valueHint.unassigned':
    'Einmal gespeichert. Solange er auf keiner Website liegt, zeigt ihn keine Karte.',
  'item.sites.title': 'Websites, auf denen dieser Eintrag liegt',
  'item.sites.noSites':
    'Füge zuerst im Bereich Websites eine Website hinzu — bis dahin gibt es nichts, worauf er erscheinen könnte.',
  'item.sites.selectLabel': 'Website, der dieser Eintrag hinzugefügt wird',
  'item.sites.noneAvailable': 'Auf allen deinen Websites',
  'item.sites.addTitle': 'Diesen Eintrag auch auf dieser Website anzeigen',
  'item.sites.add': 'Hinzufügen',
  'item.sites.note':
    'Hinzufügen zeigt denselben Wert auch dort; Entfernen nimmt ihn nur von dieser Website und lässt ihn auf den anderen.',
  'item.sites.empty': (): JSX.Element => (
    <>
      Liegt noch auf keiner Website. Wähle oben eine aus oder öffne <strong>Websites</strong>, um
      eine Website anzulegen, zu der er gehört.
    </>
  ),
  'item.sites.openTitle': 'Diese Website im Bereich Websites öffnen',
  'item.sites.remove': (site: string) => `Von ${site} entfernen`,
  'item.sites.cardOff': 'Karte aus',
  'item.foot.assigned': (count: number) => `Ein Eintrag, ${count} ${sites(count)}.`,
  'item.foot.none': 'Ein Eintrag, keine Website.',
  'item.delete': 'Eintrag löschen',
  'item.deleteArmed': 'Zum Löschen überall erneut klicken',
  'item.removeFromSite': 'Von dieser Website entfernen',

  'card.copyHint': 'Zum Kopieren klicken',
  'card.copied': 'Kopiert',
  'card.reveal': 'Anzeigen',
  'card.hide': 'Verbergen',
  'card.collapse': 'Einklappen',
  'card.hideCard': 'Karte ausblenden',
  'card.empty': 'Keine Einträge',
  'card.addItems': 'Einträge hinzufügen',

  'settings.nav': 'Bereiche der Einstellungen',
  'settings.appearance': 'Darstellung',
  'settings.language': 'Sprache',
  'settings.data': 'Daten',
  'settings.theme.title': 'Design',
  'settings.theme.group': 'Design',
  'settings.theme.light': 'Hell',
  'settings.theme.dark': 'Dunkel',
  'settings.theme.noteSystem': (current: 'light' | 'dark') =>
    `Folgt deinem System, das gerade ${current === 'dark' ? 'dunkel' : 'hell'} ist. Gilt für diese Seite und die Karte auf jeder deiner Websites.`,
  'settings.theme.noteFixed': (theme: 'light' | 'dark') =>
    `Immer ${theme === 'dark' ? 'dunkel' : 'hell'}, egal was dein System sagt. Gilt für diese Seite und die Karte auf jeder deiner Websites.`,
  'settings.language.group': 'Sprache',
  'settings.language.noteSystem': (current: Locale) =>
    `Folgt deinem Browser, der gerade auf ${LANGUAGE_NAME[current]} steht. Gilt für diese Seite und die Karte auf jeder deiner Websites.`,
  'settings.language.noteFixed': (current: Locale) =>
    `Immer ${LANGUAGE_NAME[current]}, egal was dein Browser sagt. Gilt für diese Seite und die Karte auf jeder deiner Websites.`,
  'settings.data.title': 'Daten löschen',
  'settings.data.note':
    'Alles, was Save Book speichert, liegt in diesem Browser und nirgendwo sonst, Löschen lässt sich also nicht rückgängig machen. Deine Wahl von Design und Sprache sind keine Daten und bleiben.',
  'settings.data.sites': 'Websites',
  'settings.data.sitesNote':
    'Entfernt alle Websites und gibt ihren Chrome-Zugriff zurück. Einträge bleiben — keine Website zeigt sie.',
  'settings.data.sitesLabel': 'Websites löschen',
  'settings.data.sitesArmed': 'Zum Löschen erneut klicken',
  'settings.data.items': 'Einträge',
  'settings.data.itemsNote':
    'Löscht jeden gespeicherten Wert, auf jeder Website. Websites und Kartenpositionen bleiben.',
  'settings.data.itemsLabel': 'Einträge löschen',
  'settings.data.everything': 'Alles',
  'settings.data.everythingNote':
    'Entfernt alle Websites, alle Einträge und jede gespeicherte Kartenposition und gibt den Chrome-Zugriff zurück.',
  'settings.data.everythingLabel': 'Alles löschen',
  'settings.data.everythingArmed': 'Zum Löschen von allem erneut klicken',

  'count.sites': (count: number) => `${count} ${sites(count)}`,
  'count.items': (count: number) => `${count} ${items(count)}`,

  'stamp.title': (count: number, list: string) =>
    `Angezeigt auf ${count} ${sites(count)}: ${list}`,

  'toast.badDomain': 'Gib eine Domain wie example.com ein, oder * für alle Websites',
  'toast.siteExists': 'Diese Website ist schon da',
  'toast.siteAdded': (pattern: string) =>
    `${pattern} hinzugefügt. Lade diese Website neu, um die Karte zu sehen.`,
  'toast.siteTaken': (pattern: string) => `Eine andere Website nutzt ${pattern} bereits`,
  'toast.siteUpdated': 'Domain aktualisiert. Lade diese Website neu, um die Karte zu sehen.',
  'toast.siteRemoved': (pattern: string) =>
    `${pattern} entfernt. Alles, was nur dort gespeichert war, steht jetzt unter „auf keiner Website“.`,
  'toast.accessDenied': (pattern: string) => `Chrome hat keinen Zugriff auf ${pattern} erlaubt`,
  'toast.accessMissing': (pattern: string) =>
    `Chrome hat keinen Zugriff auf ${pattern} erlaubt, deshalb erscheint dort keine Karte`,
  'toast.pendingAccess': (pattern: string) =>
    `Drücke Hinzufügen, um Save Book Zugriff auf ${pattern} zu geben.`,
  'toast.cardReset': 'Die Karte erscheint wieder oben rechts.',
  'toast.itemAssigned': (item: string, site: string) => `„${item}“ erscheint jetzt auf ${site}.`,
  'toast.itemAssignedCardOff': (item: string, site: string) =>
    `„${item}“ wurde ${site} hinzugefügt, aber die Karte ist dort aus.`,
  'toast.itemUnassigned': (item: string, site: string, count: number) =>
    `„${item}“ wurde von ${site} entfernt — weiterhin auf ${count} ${otherSites(count)} sichtbar.`,
  'toast.itemUnassignedLast': (item: string) =>
    `„${item}“ liegt auf keiner Website mehr, keine Karte zeigt ihn also.`,
  'toast.itemDeleted': (item: string) => `„${item}“ gelöscht, auf allen Websites.`,
  'toast.sitesCleared': (count: number) =>
    `${count} ${sites(count)} entfernt. Der Chrome-Zugriff wurde zurückgegeben; jeder Eintrag steht jetzt unter „auf keiner Website“.`,
  'toast.itemsCleared': (count: number) =>
    `${count} ${items(count)} gelöscht. Websites und Kartenpositionen bleiben unberührt.`,
  'toast.allCleared': (sitesCount: number, itemsCount: number) =>
    `${sites(sitesCount)} und ${items(itemsCount)} gelöscht, dazu jede Kartenposition. Der Chrome-Zugriff wurde zurückgegeben.`,
};
