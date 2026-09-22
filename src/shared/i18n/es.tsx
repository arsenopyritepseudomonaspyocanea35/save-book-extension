import type { JSX } from 'solid-js';
import type { Locale } from '../schema';
import type { Dictionary } from './en';

const sites = (count: number) => (count === 1 ? 'sitio' : 'sitios');
const items = (count: number) => (count === 1 ? 'elemento' : 'elementos');
const otherSites = (count: number) => (count === 1 ? 'otro sitio' : 'otros sitios');
const removed = (count: number) => (count === 1 ? 'Eliminado' : 'Eliminados');

const LANGUAGE_NAME: Record<Locale, string> = {
  en: 'inglés',
  pl: 'polaco',
  es: 'español',
  fr: 'francés',
  de: 'alemán',
};

export const es: Dictionary = {
  'common.system': 'Sistema',
  'common.everySite': 'todos los sitios',

  'tabs.items': 'Elementos',
  'tabs.sites': 'Sitios',
  'tabs.settings': 'Ajustes',
  'tabs.label': 'Vistas',

  'sites.addDomainLabel': 'Dominio que añadir',
  'sites.add': 'Añadir',
  'sites.note': (): JSX.Element => (
    <>
      Las tarjetas aparecen en ese dominio y en sus subdominios. Usa <code>*</code> para todos los
      sitios.
    </>
  ),
  'sites.emptySelected': 'Nada seleccionado',
  'sites.emptyFirst': 'Añade tu primer sitio',
  'sites.emptyBody':
    'Escribe un dominio en el panel lateral —por ejemplo example.com— y Save Book pedirá a Chrome acceso solo a ese dominio. Después añade los inicios de sesión, números o fragmentos que quieras tener a un clic de ahí.',
  'sites.list.empty': 'Todavía no hay sitios.',
  'sites.list.cardOff': 'tarjeta desactivada',
  'sites.list.noAccess': 'sin acceso',
  'sites.list.noAccessTitle': 'Chrome no tiene acceso a este dominio',

  'site.field.domain': 'Dominio',
  'site.field.label': 'Etiqueta',
  'site.field.labelPlaceholder': 'Opcional, se muestra en la tarjeta',
  'site.applyTitle': 'Pide a Chrome acceso al dominio nuevo',
  'site.applyTitleSame': 'Pide a Chrome acceso a este dominio',
  'site.apply': 'Aplicar',
  'site.grantAccess': 'Conceder acceso',
  'site.showCard': 'Mostrar la tarjeta en este sitio',
  'site.hint.noAccess': (pattern: string) =>
    `Chrome no tiene acceso a ${pattern}, así que ahí todavía no se muestra ninguna tarjeta.`,
  'site.hint.everySite': 'Se aplica a todos los sitios.',
  'site.hint.subdomains': (pattern: string) => `Se aplica a ${pattern} y a sus subdominios.`,
  'site.items.title': 'Elementos en este sitio',
  'site.items.note':
    'Los elementos son compartidos: un valor editado aquí cambia en todos los sitios donde se muestra. Quitar uno aquí solo lo quita de este sitio.',
  'site.items.empty': (): JSX.Element => (
    <>
      Todavía no hay nada guardado para este sitio. Añade algo abajo, o asigna un elemento que ya
      tengas en otro sitio desde <strong>Elementos</strong>.
    </>
  ),
  'site.resetCard': 'Restablecer la posición de la tarjeta',
  'site.delete': 'Eliminar sitio',
  'site.deleteArmed': 'Haz clic otra vez para eliminar',

  'items.filterPlaceholder': 'Filtrar elementos',
  'items.filterLabel': 'Filtrar elementos',
  'items.note':
    'Un elemento, muchos sitios: un valor se guarda una vez y se muestra en cada sitio al que lo añadas.',
  'items.emptyFirst': 'Todavía no hay elementos',
  'items.emptyBody':
    'Añade un inicio de sesión, un código o un número desde el panel lateral y elige los sitios a los que pertenece. El mismo valor aparecerá en las tarjetas de esos sitios: no lo escribirás otra vez.',
  'items.list.noMatch': 'Ningún elemento coincide con ese filtro.',
  'items.list.empty': 'Todavía no hay elementos: añade uno arriba.',
  'items.list.notOnAnySite': 'no está en ningún sitio',

  'item.kind.text': 'Texto',
  'item.kind.secret': 'Contraseña',
  'item.kind.label': 'Tipo',
  'item.kind.group': 'Tipo de elemento',
  'item.placeholder.text': 'Algo que copias a menudo',
  'item.placeholder.secret': '••••••••',
  'item.untitled': 'Elemento sin nombre',
  'item.field.label': 'Etiqueta',
  'item.field.labelPlaceholder': 'Opcional, se muestra en la tarjeta',
  'item.field.value': 'Valor',
  'item.field.labelLabel': 'Etiqueta del elemento',
  'item.field.valueLabel': 'Valor del elemento',
  'item.revealValue': 'Mostrar el valor',
  'item.hideValue': 'Ocultar el valor',
  'item.valueHint.assigned': (count: number) =>
    `Guardado una vez y mostrado en ${count} ${sites(count)}: editar aquí el valor lo cambia en todos.`,
  'item.valueHint.unassigned':
    'Guardado una vez. Mientras no esté en ningún sitio, ninguna tarjeta lo muestra.',
  'item.sites.title': 'Sitios en los que está este elemento',
  'item.sites.noSites':
    'Añade antes un sitio en la pestaña Sitios: hasta entonces no hay dónde mostrarlo.',
  'item.sites.selectLabel': 'Sitio al que añadir este elemento',
  'item.sites.noneAvailable': 'En todos los sitios que tengas',
  'item.sites.addTitle': 'Mostrar este elemento también en ese sitio',
  'item.sites.add': 'Añadir',
  'item.sites.note':
    'Añadirlo muestra el mismo valor también ahí; quitarlo lo retira solo de ese sitio y lo mantiene en los demás.',
  'item.sites.empty': (): JSX.Element => (
    <>
      Todavía no está en ningún sitio. Elige uno arriba, o abre <strong>Sitios</strong> para preparar
      un sitio al que pertenezca.
    </>
  ),
  'item.sites.openTitle': 'Abrir este sitio en la pestaña Sitios',
  'item.sites.remove': (site: string) => `Quitar de ${site}`,
  'item.sites.cardOff': 'tarjeta desactivada',
  'item.foot.assigned': (count: number) => `Un elemento, ${count} ${sites(count)}.`,
  'item.foot.none': 'Un elemento, ningún sitio.',
  'item.delete': 'Eliminar elemento',
  'item.deleteArmed': 'Haz clic otra vez para eliminarlo en todas partes',
  'item.removeFromSite': 'Quitar de este sitio',

  'card.copyHint': 'Haz clic para copiar',
  'card.copied': 'Copiado',
  'card.reveal': 'Mostrar',
  'card.hide': 'Ocultar',
  'card.collapse': 'Contraer',
  'card.hideCard': 'Ocultar la tarjeta',
  'card.empty': 'Todavía no hay elementos',
  'card.addItems': 'Añadir elementos',

  'settings.nav': 'Secciones de ajustes',
  'settings.appearance': 'Apariencia',
  'settings.language': 'Idioma',
  'settings.data': 'Datos',
  'settings.theme.title': 'Tema',
  'settings.theme.group': 'Tema',
  'settings.theme.light': 'Claro',
  'settings.theme.dark': 'Oscuro',
  'settings.theme.noteSystem': (current: 'light' | 'dark') =>
    `Sigue tu sistema, que ahora está en ${current === 'dark' ? 'oscuro' : 'claro'}. Se aplica a esta página y a la tarjeta en todos los sitios que tengas.`,
  'settings.theme.noteFixed': (theme: 'light' | 'dark') =>
    `Siempre ${theme === 'dark' ? 'oscuro' : 'claro'}, diga lo que diga tu sistema. Se aplica a esta página y a la tarjeta en todos los sitios que tengas.`,
  'settings.language.group': 'Idioma',
  'settings.language.noteSystem': (current: Locale) =>
    `Sigue el idioma de tu navegador, que ahora es ${LANGUAGE_NAME[current]}. Se aplica a esta página y a la tarjeta en todos los sitios que tengas.`,
  'settings.language.noteFixed': (current: Locale) =>
    `Siempre en ${LANGUAGE_NAME[current]}, diga lo que diga tu navegador. Se aplica a esta página y a la tarjeta en todos los sitios que tengas.`,
  'settings.data.title': 'Borrar datos',
  'settings.data.note':
    'Todo lo que guarda Save Book está en este navegador y en ningún otro sitio, así que borrar no se puede deshacer. Tus ajustes de tema e idioma no son datos y se mantienen.',
  'settings.data.sites': 'Sitios',
  'settings.data.sitesNote':
    'Elimina todos los sitios y devuelve su acceso a Chrome. Los elementos se conservan: ningún sitio los muestra.',
  'settings.data.sitesLabel': 'Borrar sitios',
  'settings.data.sitesArmed': 'Haz clic otra vez para borrar',
  'settings.data.items': 'Elementos',
  'settings.data.itemsNote':
    'Elimina todos los valores guardados, en todos los sitios. Los sitios y las posiciones de las tarjetas se mantienen.',
  'settings.data.itemsLabel': 'Borrar elementos',
  'settings.data.everything': 'Todo',
  'settings.data.everythingNote':
    'Elimina todos los sitios, todos los elementos y todas las posiciones guardadas de las tarjetas, y devuelve el acceso a Chrome.',
  'settings.data.everythingLabel': 'Borrar todo',
  'settings.data.everythingArmed': 'Haz clic otra vez para borrarlo todo',

  'count.sites': (count: number) => `${count} ${sites(count)}`,
  'count.items': (count: number) => `${count} ${items(count)}`,

  'stamp.title': (count: number, list: string) =>
    `Mostrado en ${count} ${sites(count)}: ${list}`,

  'toast.badDomain': 'Escribe un dominio como example.com, o * para todos los sitios',
  'toast.siteExists': 'Ese sitio ya está aquí',
  'toast.siteAdded': (pattern: string) => `Añadido ${pattern}. Recarga ese sitio para ver la tarjeta.`,
  'toast.siteTaken': (pattern: string) => `Otro sitio ya usa ${pattern}`,
  'toast.siteUpdated': 'Dominio actualizado. Recarga ese sitio para ver la tarjeta.',
  'toast.siteRemoved': (pattern: string) =>
    `Eliminado ${pattern}. Todo lo que estaba guardado solo ahí está ahora en «no está en ningún sitio».`,
  'toast.accessDenied': (pattern: string) => `Chrome no ha concedido acceso a ${pattern}`,
  'toast.accessMissing': (pattern: string) =>
    `Chrome no ha concedido acceso a ${pattern}, así que ahí no se muestra ninguna tarjeta`,
  'toast.pendingAccess': (pattern: string) =>
    `Pulsa Añadir para dar a Save Book acceso a ${pattern}.`,
  'toast.cardReset': 'La tarjeta aparecerá otra vez arriba a la derecha.',
  'toast.itemAssigned': (item: string, site: string) => `«${item}» ya se muestra en ${site}.`,
  'toast.itemAssignedCardOff': (item: string, site: string) =>
    `«${item}» se ha añadido a ${site}, pero la tarjeta está desactivada ahí.`,
  'toast.itemUnassigned': (item: string, site: string, count: number) =>
    `«${item}» se ha quitado de ${site}: sigue mostrándose en ${count} ${otherSites(count)}.`,
  'toast.itemUnassignedLast': (item: string) =>
    `«${item}» ya no está en ningún sitio, así que ninguna tarjeta lo muestra.`,
  'toast.itemDeleted': (item: string) => `«${item}» eliminado, en todos los sitios.`,
  'toast.sitesCleared': (count: number) =>
    `${removed(count)} ${count} ${sites(count)}. El acceso de Chrome se ha devuelto; cada elemento está ahora en «no está en ningún sitio».`,
  'toast.itemsCleared': (count: number) =>
    `${removed(count)} ${count} ${items(count)}. Los sitios y las posiciones de las tarjetas siguen intactos.`,
  'toast.allCleared': (sitesCount: number, itemsCount: number) =>
    `Borrados ${sites(sitesCount)} y ${items(itemsCount)}, además de todas las posiciones de las tarjetas. El acceso de Chrome se ha devuelto.`,
};
