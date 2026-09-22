import type { JSX } from 'solid-js';
import type { Locale } from '../schema';
import type { Dictionary } from './en';

const plural = new Intl.PluralRules('fr');
const pick = (count: number, one: string, other: string): string =>
  plural.select(count) === 'one' ? one : other;

const sites = (count: number) => pick(count, 'site', 'sites');
const items = (count: number) => pick(count, 'élément', 'éléments');
const otherSites = (count: number) => pick(count, 'autre site', 'autres sites');
const removed = (count: number) => pick(count, 'supprimé', 'supprimés');

const LANGUAGE_NAME: Record<Locale, string> = {
  en: 'anglais',
  pl: 'polonais',
  es: 'espagnol',
  fr: 'français',
  de: 'allemand',
};

export const fr: Dictionary = {
  'common.system': 'Système',
  'common.everySite': 'tous les sites',

  'tabs.items': 'Éléments',
  'tabs.sites': 'Sites',
  'tabs.settings': 'Réglages',
  'tabs.label': 'Sections des réglages',

  'sites.addDomainLabel': 'Domaine à ajouter',
  'sites.add': 'Ajouter',
  'sites.note': (): JSX.Element => (
    <>
      Les cartes apparaissent sur ce domaine et ses sous-domaines. Utilisez <code>*</code> pour tous
      les sites.
    </>
  ),
  'sites.emptySelected': 'Aucune sélection',
  'sites.emptyFirst': 'Ajoutez votre premier site',
  'sites.emptyBody':
    "Saisissez un domaine dans le panneau latéral — par exemple example.com — et Save Book demandera à Chrome l'accès à ce seul domaine. Ajoutez ensuite les identifiants, les chiffres ou les extraits que vous voulez à un clic de là.",
  'sites.list.empty': "Aucun site pour l'instant.",
  'sites.list.cardOff': 'carte désactivée',
  'sites.list.noAccess': "pas d'accès",
  'sites.list.noAccessTitle': "Chrome n'a pas accès à ce domaine",

  'site.field.domain': 'Domaine',
  'site.field.label': 'Libellé',
  'site.field.labelPlaceholder': 'Facultatif, affiché sur la carte',
  'site.applyTitle': "Demander à Chrome l'accès au nouveau domaine",
  'site.applyTitleSame': "Demander à Chrome l'accès à ce domaine",
  'site.apply': 'Appliquer',
  'site.grantAccess': "Accorder l'accès",
  'site.showCard': 'Afficher la carte sur ce site',
  'site.hint.noAccess': (pattern: string) =>
    `Chrome n'a pas accès à ${pattern}, donc aucune carte ne s'y affiche encore.`,
  'site.hint.everySite': "S'applique à tous les sites.",
  'site.hint.subdomains': (pattern: string) => `S'applique à ${pattern} et à ses sous-domaines.`,
  'site.items.title': 'Éléments sur ce site',
  'site.items.note':
    'Les éléments sont partagés : une valeur modifiée ici change sur tous les sites où elle est affichée. En retirer un ici ne le retire que de ce site.',
  'site.items.empty': (): JSX.Element => (
    <>
      Rien n'est encore enregistré pour ce site. Ajoutez-en un ci-dessous, ou affectez un élément
      que vous gardez déjà sur un autre site depuis <strong>Éléments</strong>.
    </>
  ),
  'site.resetCard': 'Réinitialiser la position de la carte',
  'site.delete': 'Supprimer le site',
  'site.deleteArmed': 'Cliquez encore pour supprimer',

  'items.filterPlaceholder': 'Filtrer les éléments',
  'items.filterLabel': 'Filtrer les éléments',
  'items.note':
    "Un élément, plusieurs sites : une valeur est enregistrée une fois et affichée sur chaque site où vous l'ajoutez.",
  'items.emptyFirst': "Aucun élément pour l'instant",
  'items.emptyBody':
    "Ajoutez un identifiant, un code ou un chiffre depuis le panneau latéral, puis choisissez les sites auxquels il appartient. La même valeur s'affichera ensuite sur les cartes de ces sites : vous ne la retapez jamais.",
  'items.list.noMatch': 'Aucun élément ne correspond à ce filtre.',
  'items.list.empty': "Aucun élément pour l'instant — ajoutez-en un ci-dessus.",
  'items.list.notOnAnySite': "n'est sur aucun site",

  'item.kind.text': 'Texte',
  'item.kind.secret': 'Mot de passe',
  'item.kind.label': 'Type',
  'item.kind.group': "Type d'élément",
  'item.placeholder.text': 'Ce que vous copiez souvent',
  'item.placeholder.secret': '••••••••',
  'item.untitled': 'Élément sans nom',
  'item.field.label': 'Libellé',
  'item.field.labelPlaceholder': 'Facultatif, affiché sur la carte',
  'item.field.value': 'Valeur',
  'item.field.labelLabel': "Libellé de l'élément",
  'item.field.valueLabel': "Valeur de l'élément",
  'item.revealValue': 'Afficher la valeur',
  'item.hideValue': 'Masquer la valeur',
  'item.valueHint.assigned': (count: number) =>
    `Enregistrée une fois et affichée sur ${count} ${sites(count)} : la modifier ici la change partout.`,
  'item.valueHint.unassigned':
    "Enregistrée une fois. Tant qu'elle n'est sur aucun site, aucune carte ne l'affiche.",
  'item.sites.title': 'Sites sur lesquels se trouve cet élément',
  'item.sites.noSites':
    "Ajoutez d'abord un site dans l'onglet Sites — d'ici là, il n'y a nulle part où l'afficher.",
  'item.sites.selectLabel': 'Site auquel ajouter cet élément',
  'item.sites.noneAvailable': 'Sur tous vos sites',
  'item.sites.addTitle': 'Afficher aussi cet élément sur ce site',
  'item.sites.add': 'Ajouter',
  'item.sites.note':
    "L'ajouter affiche la même valeur là aussi ; le retirer ne le retire que de ce site et le garde pour les autres.",
  'item.sites.empty': (): JSX.Element => (
    <>
      Pas encore sur un site. Choisissez-en un ci-dessus, ou ouvrez <strong>Sites</strong> pour
      préparer un site auquel il appartient.
    </>
  ),
  'item.sites.openTitle': "Ouvrir ce site dans l'onglet Sites",
  'item.sites.remove': (site: string) => `Retirer de ${site}`,
  'item.sites.cardOff': 'carte désactivée',
  'item.foot.assigned': (count: number) => `Un élément, ${count} ${sites(count)}.`,
  'item.foot.none': 'Un élément, aucun site.',
  'item.delete': "Supprimer l'élément",
  'item.deleteArmed': 'Cliquez encore pour supprimer partout',
  'item.removeFromSite': 'Retirer de ce site',

  'card.copyHint': 'Cliquez pour copier',
  'card.copied': 'Copié',
  'card.reveal': 'Afficher',
  'card.hide': 'Masquer',
  'card.collapse': 'Réduire',
  'card.hideCard': 'Masquer la carte',
  'card.empty': "Aucun élément",
  'card.addItems': 'Ajouter des éléments',

  'settings.appearance': 'Apparence',
  'settings.language': 'Langue',
  'settings.data': 'Données',
  'settings.theme.title': 'Thème',
  'settings.theme.group': 'Thème',
  'settings.theme.light': 'Clair',
  'settings.theme.dark': 'Sombre',
  'settings.theme.noteSystem': (current: 'light' | 'dark') =>
    `Suit votre système, actuellement en ${current === 'dark' ? 'sombre' : 'clair'}. S'applique à cette page et à la carte sur tous vos sites.`,
  'settings.theme.noteFixed': (theme: 'light' | 'dark') =>
    `Toujours en ${theme === 'dark' ? 'sombre' : 'clair'}, quoi que dise votre système. S'applique à cette page et à la carte sur tous vos sites.`,
  'settings.language.group': 'Langue',
  'settings.language.noteSystem': (current: Locale) =>
    `Suit votre navigateur, actuellement en ${LANGUAGE_NAME[current]}. S'applique à cette page et à la carte sur tous vos sites.`,
  'settings.language.noteFixed': (current: Locale) =>
    `Toujours en ${LANGUAGE_NAME[current]}, quoi que dise votre navigateur. S'applique à cette page et à la carte sur tous vos sites.`,
  'settings.data.title': 'Effacer les données',
  'settings.data.note':
    "Tout ce que garde Save Book est dans ce navigateur et nulle part ailleurs : l'effacement est donc irréversible. Vos choix de thème et de langue ne sont pas des données et restent.",
  'settings.data.sites': 'Sites',
  'settings.data.sitesNote':
    "Supprime tous les sites et rend leur accès à Chrome. Les éléments sont conservés — aucun site ne les affiche.",
  'settings.data.sitesLabel': 'Effacer les sites',
  'settings.data.sitesArmed': 'Cliquez encore pour effacer',
  'settings.data.items': 'Éléments',
  'settings.data.itemsNote':
    'Supprime toutes les valeurs enregistrées, sur tous les sites. Les sites et les positions des cartes restent.',
  'settings.data.itemsLabel': 'Effacer les éléments',
  'settings.data.everything': 'Tout',
  'settings.data.everythingNote':
    "Supprime tous les sites, tous les éléments et toutes les positions enregistrées des cartes, et rend l'accès à Chrome.",
  'settings.data.everythingLabel': 'Tout effacer',
  'settings.data.everythingArmed': 'Cliquez encore pour tout effacer',

  'count.sites': (count: number) => `${count} ${sites(count)}`,
  'count.items': (count: number) => `${count} ${items(count)}`,

  'stamp.title': (count: number, list: string) =>
    `Affiché sur ${count} ${sites(count)} : ${list}`,

  'toast.badDomain': 'Saisissez un domaine comme example.com, ou * pour tous les sites',
  'toast.siteExists': 'Ce site est déjà là',
  'toast.siteAdded': (pattern: string) =>
    `${pattern} ajouté. Rechargez ce site pour voir la carte.`,
  'toast.siteTaken': (pattern: string) => `Un autre site utilise déjà ${pattern}`,
  'toast.siteUpdated': 'Domaine mis à jour. Rechargez ce site pour voir la carte.',
  'toast.siteRemoved': (pattern: string) =>
    `${pattern} supprimé. Tout ce qui était enregistré là uniquement est maintenant dans « n'est sur aucun site ».`,
  'toast.accessDenied': (pattern: string) => `Chrome n'a pas accordé l'accès à ${pattern}`,
  'toast.accessMissing': (pattern: string) =>
    `Chrome n'a pas accordé l'accès à ${pattern}, donc aucune carte ne s'y affiche`,
  'toast.pendingAccess': (pattern: string) =>
    `Appuyez sur Ajouter pour donner à Save Book l'accès à ${pattern}.`,
  'toast.cardReset': 'La carte réapparaîtra en haut à droite.',
  'toast.itemAssigned': (item: string, site: string) =>
    `« ${item} » apparaît maintenant sur ${site}.`,
  'toast.itemAssignedCardOff': (item: string, site: string) =>
    `« ${item} » a été ajouté à ${site}, mais la carte y est désactivée.`,
  'toast.itemUnassigned': (item: string, site: string, count: number) =>
    `« ${item} » a été retiré de ${site} — toujours affiché sur ${count} ${otherSites(count)}.`,
  'toast.itemUnassignedLast': (item: string) =>
    `« ${item} » n'est plus sur aucun site, donc aucune carte ne l'affiche.`,
  'toast.itemDeleted': (item: string) => `« ${item} » supprimé, sur tous les sites.`,
  'toast.sitesCleared': (count: number) =>
    `${count} ${sites(count)} ${removed(count)}. L'accès à Chrome a été rendu ; chaque élément est maintenant dans « n'est sur aucun site ».`,
  'toast.itemsCleared': (count: number) =>
    `${count} ${items(count)} ${removed(count)}. Les sites et les positions des cartes sont intacts.`,
  'toast.allCleared': (sitesCount: number, itemsCount: number) =>
    `Tout a été effacé : ${sites(sitesCount)} et ${items(itemsCount)}, ainsi que toutes les positions des cartes. L'accès à Chrome a été rendu.`,
};
