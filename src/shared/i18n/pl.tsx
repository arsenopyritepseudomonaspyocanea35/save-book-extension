import type { JSX } from 'solid-js';
import type { Locale } from '../schema';
import type { Dictionary } from './en';

const plural = new Intl.PluralRules('pl');

// Polish counts carry case as well as number: "3 witryny" but "Usunięto 3 witryny",
// "na 3 witrynach". Every form a sentence needs gets its own helper.
const pick = (count: number, one: string, few: string, many: string): string => {
  switch (plural.select(count)) {
    case 'one':
      return one;
    case 'few':
      return few;
    default:
      return many;
  }
};

const sites = (count: number) => pick(count, 'witryna', 'witryny', 'witryn');
const sitesAcc = (count: number) => pick(count, 'witrynę', 'witryny', 'witryn');
const items = (count: number) => pick(count, 'element', 'elementy', 'elementów');
const onSites = (count: number) => pick(count, 'witrynie', 'witrynach', 'witrynach');
const otherSites = (count: number) =>
  pick(count, 'innej witrynie', 'innych witrynach', 'innych witrynach');

const LANGUAGE_NAME: Record<Locale, string> = { en: 'angielski', pl: 'polski' };

export const pl: Dictionary = {
  'common.system': 'System',
  'common.everySite': 'wszystkie witryny',

  'tabs.items': 'Elementy',
  'tabs.sites': 'Witryny',
  'tabs.settings': 'Ustawienia',
  'tabs.label': 'Sekcje ustawień',

  'sites.addDomainLabel': 'Domena do dodania',
  'sites.add': 'Dodaj',
  'sites.note': (): JSX.Element => (
    <>
      Karty pojawiają się na tej domenie i jej subdomenach. Użyj <code>*</code> dla wszystkich
      witryn.
    </>
  ),
  'sites.emptySelected': 'Nic nie wybrano',
  'sites.emptyFirst': 'Dodaj pierwszą witrynę',
  'sites.emptyBody':
    'Wpisz domenę w panelu z boku — na przykład example.com — a Save Book poprosi Chrome o dostęp tylko do tej domeny. Potem dodaj loginy, liczby albo fragmenty, które chcesz mieć o jedno kliknięcie stąd.',
  'sites.list.empty': 'Nie ma jeszcze żadnej witryny.',
  'sites.list.cardOff': 'karta wyłączona',
  'sites.list.noAccess': 'brak dostępu',
  'sites.list.noAccessTitle': 'Chrome nie ma przyznanego dostępu do tej domeny',

  'site.field.domain': 'Domena',
  'site.field.label': 'Etykieta',
  'site.field.labelPlaceholder': 'Opcjonalna, widoczna na karcie',
  'site.applyTitle': 'Poproś Chrome o dostęp do nowej domeny',
  'site.applyTitleSame': 'Poproś Chrome o dostęp do tej domeny',
  'site.apply': 'Zastosuj',
  'site.grantAccess': 'Przyznaj dostęp',
  'site.showCard': 'Pokaż kartę na tej witrynie',
  'site.hint.noAccess': (pattern: string) =>
    `Chrome nie ma przyznanego dostępu do ${pattern}, więc karta tam się jeszcze nie pokaże.`,
  'site.hint.everySite': 'Dotyczy każdej witryny.',
  'site.hint.subdomains': (pattern: string) => `Dotyczy ${pattern} i jej subdomen.`,
  'site.items.title': 'Elementy na tej witrynie',
  'site.items.note':
    'Elementy są wspólne: wartość zmieniona tutaj zmienia się na każdej witrynie, na której jest pokazywana. Usunięcie jej tutaj zdejmuje ją tylko z tej witryny.',
  'site.items.empty': (): JSX.Element => (
    <>
      Nic nie zapisano jeszcze dla tej witryny. Dodaj coś poniżej albo przypisz element, który
      trzymasz na innej witrynie, z zakładki <strong>Elementy</strong>.
    </>
  ),
  'site.resetCard': 'Przywróć pozycję karty',
  'site.delete': 'Usuń witrynę',
  'site.deleteArmed': 'Kliknij ponownie, aby usunąć',

  'items.filterPlaceholder': 'Filtruj elementy',
  'items.filterLabel': 'Filtruj elementy',
  'items.note':
    'Jeden element, wiele witryn: wartość zapisujesz raz i pokazujesz na każdej witrynie, do której go dodasz.',
  'items.emptyFirst': 'Nie ma jeszcze elementów',
  'items.emptyBody':
    'Dodaj login, kod albo liczbę z panelu z boku, a potem wybierz witryny, do których należy. Ta sama wartość pokaże się na kartach tych witryn — nie wpiszesz jej ponownie.',
  'items.list.noMatch': 'Żaden element nie pasuje do tego filtra.',
  'items.list.empty': 'Nie ma jeszcze elementów — dodaj jeden powyżej.',
  'items.list.notOnAnySite': 'nie ma na żadnej witrynie',

  'item.kind.text': 'Tekst',
  'item.kind.secret': 'Hasło',
  'item.kind.label': 'Rodzaj',
  'item.kind.group': 'Rodzaj elementu',
  'item.placeholder.text': 'Coś, co często kopiujesz',
  'item.placeholder.secret': '••••••••',
  'item.untitled': 'Element bez nazwy',
  'item.field.label': 'Etykieta',
  'item.field.labelPlaceholder': 'Opcjonalna, widoczna na karcie',
  'item.field.value': 'Wartość',
  'item.field.labelLabel': 'Etykieta elementu',
  'item.field.valueLabel': 'Wartość elementu',
  'item.revealValue': 'Pokaż wartość',
  'item.hideValue': 'Ukryj wartość',
  'item.valueHint.assigned': (count: number) =>
    `Zapisane raz i pokazywane na ${count} ${onSites(count)}: zmiana wartości tutaj zmienia ją na wszystkich.`,
  'item.valueHint.unassigned':
    'Zapisane raz. Dopóki nie ma go na żadnej witrynie, żadna karta go nie pokaże.',
  'item.sites.title': 'Witryny, na których jest ten element',
  'item.sites.noSites':
    'Najpierw dodaj witrynę w zakładce Witryny — do tego czasu nie ma gdzie tego pokazać.',
  'item.sites.selectLabel': 'Witryna, do której dodać ten element',
  'item.sites.noneAvailable': 'Na każdej witrynie, którą masz',
  'item.sites.addTitle': 'Pokaż ten element także na tej witrynie',
  'item.sites.add': 'Dodaj',
  'item.sites.note':
    'Dodanie pokazuje tę samą wartość także tam; usunięcie zdejmuje ją tylko z tej witryny i zostawia na pozostałych.',
  'item.sites.empty': (): JSX.Element => (
    <>
      Nie ma go jeszcze na żadnej witrynie. Wybierz jedną powyżej albo otwórz <strong>Witryny</strong>,
      aby ustawić witrynę, do której należy.
    </>
  ),
  'item.sites.openTitle': 'Otwórz tę witrynę w zakładce Witryny',
  'item.sites.remove': (site: string) => `Usuń z ${site}`,
  'item.sites.cardOff': 'karta wyłączona',
  'item.foot.assigned': (count: number) => `Jeden element, ${count} ${sites(count)}.`,
  'item.foot.none': 'Jeden element, żadnej witryny.',
  'item.delete': 'Usuń element',
  'item.deleteArmed': 'Kliknij ponownie, aby usunąć wszędzie',
  'item.removeFromSite': 'Usuń z tej witryny',

  'card.copyHint': 'Kliknij, aby skopiować',
  'card.copied': 'Skopiowano',
  'card.reveal': 'Pokaż',
  'card.hide': 'Ukryj',
  'card.collapse': 'Zwiń',
  'card.hideCard': 'Ukryj kartę',
  'card.empty': 'Brak elementów',
  'card.addItems': 'Dodaj elementy',

  'settings.appearance': 'Wygląd',
  'settings.language': 'Język',
  'settings.data': 'Dane',
  'settings.theme.title': 'Motyw',
  'settings.theme.group': 'Motyw',
  'settings.theme.light': 'Jasny',
  'settings.theme.dark': 'Ciemny',
  'settings.theme.noteSystem': (current: 'light' | 'dark') =>
    `Podąża za systemem, który teraz jest ${current === 'dark' ? 'ciemny' : 'jasny'}. Dotyczy tej strony i karty na każdej witrynie, którą masz.`,
  'settings.theme.noteFixed': (theme: 'light' | 'dark') =>
    `Zawsze ${theme === 'dark' ? 'ciemny' : 'jasny'}, niezależnie od ustawień systemu. Dotyczy tej strony i karty na każdej witrynie, którą masz.`,
  'settings.language.group': 'Język',
  'settings.language.noteSystem': (current: Locale) =>
    `Podąża za językiem przeglądarki — obecnie język ${LANGUAGE_NAME[current]}. Dotyczy tej strony i karty na każdej witrynie, którą masz.`,
  'settings.language.noteFixed': (current: Locale) =>
    `Zawsze język ${LANGUAGE_NAME[current]}, niezależnie od języka przeglądarki. Dotyczy tej strony i karty na każdej witrynie, którą masz.`,
  'settings.data.title': 'Wyczyść dane',
  'settings.data.note':
    'Wszystko, co przechowuje Save Book, jest w tej przeglądarce i nigdzie indziej, więc czyszczenia nie można cofnąć. Wybór motywu i języka nie jest danymi i zostaje.',
  'settings.data.sites': 'Witryny',
  'settings.data.sitesNote':
    'Usuwa wszystkie witryny i oddaje ich dostęp w Chrome. Elementy zostają — żadna witryna ich nie pokazuje.',
  'settings.data.sitesLabel': 'Wyczyść witryny',
  'settings.data.sitesArmed': 'Kliknij ponownie, aby wyczyścić',
  'settings.data.items': 'Elementy',
  'settings.data.itemsNote':
    'Usuwa każdą zapisaną wartość, na każdej witrynie. Witryny i pozycje kart zostają.',
  'settings.data.itemsLabel': 'Wyczyść elementy',
  'settings.data.everything': 'Wszystko',
  'settings.data.everythingNote':
    'Usuwa wszystkie witryny, wszystkie elementy i każdą zapisaną pozycję karty oraz oddaje dostęp w Chrome.',
  'settings.data.everythingLabel': 'Wyczyść wszystko',
  'settings.data.everythingArmed': 'Kliknij ponownie, aby wyczyścić wszystko',

  'count.sites': (count: number) => `${count} ${sites(count)}`,
  'count.items': (count: number) => `${count} ${items(count)}`,

  'stamp.title': (count: number, list: string) =>
    `Pokazywane na ${count} ${onSites(count)}: ${list}`,

  'toast.badDomain': 'Wpisz domenę, na przykład example.com, albo * dla wszystkich witryn',
  'toast.siteExists': 'Ta witryna już tu jest',
  'toast.siteAdded': (pattern: string) => `Dodano ${pattern}. Odśwież tę witrynę, aby zobaczyć kartę.`,
  'toast.siteTaken': (pattern: string) => `Inna witryna już używa ${pattern}`,
  'toast.siteUpdated': 'Domena zaktualizowana. Odśwież tę witrynę, aby zobaczyć kartę.',
  'toast.siteRemoved': (pattern: string) =>
    `Usunięto ${pattern}. Wszystko zapisane tylko tam jest teraz w „Nie ma na żadnej witrynie”.`,
  'toast.accessDenied': (pattern: string) => `Chrome nie ma przyznanego dostępu do ${pattern}`,
  'toast.accessMissing': (pattern: string) =>
    `Chrome nie ma przyznanego dostępu do ${pattern}, więc karta tam się nie pokaże`,
  'toast.pendingAccess': (pattern: string) =>
    `Naciśnij Dodaj, aby dać Save Book dostęp do ${pattern}.`,
  'toast.cardReset': 'Karta pojawi się znowu w prawym górnym rogu.',
  'toast.itemAssigned': (item: string, site: string) => `„${item}” jest teraz na ${site}.`,
  'toast.itemAssignedCardOff': (item: string, site: string) =>
    `„${item}” dodano do ${site}, ale karta jest tam wyłączona.`,
  'toast.itemUnassigned': (item: string, site: string, count: number) =>
    `Usunięto „${item}” z ${site} — nadal widoczne na ${count} ${otherSites(count)}.`,
  'toast.itemUnassignedLast': (item: string) =>
    `„${item}” nie ma na żadnej witrynie, więc żadna karta go nie pokaże.`,
  'toast.itemDeleted': (item: string) => `Usunięto „${item}” ze wszystkich witryn.`,
  'toast.sitesCleared': (count: number) =>
    `Usunięto ${count} ${sitesAcc(count)}. Dostęp w Chrome został oddany; każdy element jest teraz w „Nie ma na żadnej witrynie”.`,
  'toast.itemsCleared': (count: number) =>
    `Usunięto ${count} ${items(count)}. Witryny i pozycje kart zostały nietknięte.`,
  'toast.allCleared': (sitesCount: number, itemsCount: number) =>
    `Wyczyszczono ${sitesAcc(sitesCount)} i ${items(itemsCount)}, a także każdą pozycję karty. Dostęp w Chrome został oddany.`,
};
