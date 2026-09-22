# Save Book — Store listing

The Chrome Web Store text, one section per language, English first.

This is listing-only copy: it is **not** part of the extension package, Chrome has no manifest field
for it, and nothing in the build ships it. Paste each language into the Developer Dashboard under
**Store listing → Description**, after picking that language in the listing's language selector.
The **Title** and the **Summary** need no typing — the dashboard fills them from the package: `name`
in `public/manifest.json`, and `description` resolved out of `public/_locales/<lang>/messages.json`.

Copy the block, not the fence. The four translations below follow the English text and the wording the
app itself uses (`Website` / `sitio` / `site`, `Eintrag` / `elemento` / `élément`), but they have not
been reviewed by native speakers.

## English (en)

```
Save Book keeps the logins, codes and numbers you need on a specific website one click
away, without leaving the page.

You choose which sites get a card. On those sites — and nowhere else — a small card
appears with the items you saved for them. Click a row and the value is on your
clipboard.

WHAT IT IS FOR

- Test and staging credentials you look up a dozen times a day
- Shared QA accounts, support phone numbers, order references
- Anything you keep hunting for and pasting into the same site

HOW IT WORKS

1. Open the settings page and type a domain, for example staging.example.com. Save Book
asks Chrome for access to that domain only.

2. Add the items you want, with a short label — plain text or a masked secret.

3. Open the site: the card is there. Drag it wherever suits you; the position is
remembered per site.

The card is deliberately minimal: just your items. Click to copy, reveal a masked value
with the eye toggle, collapse or hide the card with one click, or toggle it from the
toolbar icon. It only appears on domains you added yourself.

PRIVACY

Save Book has no servers and no accounts. Everything you save stays in Chrome's local
extension storage on your own device. The extension makes no network requests at all,
contains no analytics and no tracking, and cannot read anything on a page unless that
page's host is one you added.

Host access is requested one domain at a time, when you add it, and handed back when you
remove that site. The extension installs with access to no website at all.

OPEN SOURCE

Save Book is open source, released under the MIT license. The full source is public at
https://github.com/piotroszko/save-book-extension, so you can read exactly what the
extension does and verify the privacy claims above instead of taking them on trust. Bug
reports and suggestions are welcome in the issue tracker.

A NOTE ON SECRETS

Items are stored unencrypted in your browser profile, unlike Chrome's own password
manager, which encrypts with your system keychain. Anyone with access to your computer
and browser profile can read them. Keep that in mind before storing a production
credential, and use it for test accounts rather than production ones.
```

## Polski (pl)

```
Save Book trzyma loginy, kody i numery, których potrzebujesz na konkretnej stronie,
o jedno kliknięcie — bez opuszczania tej strony.

Ty wybierasz, które witryny dostają kartę. Tylko tam — i nigdzie indziej — pojawia się
mała karta z elementami, które dla nich zapisałeś. Kliknij wiersz, a wartość znajdzie się
w schowku.

DO CZEGO TO JEST

- Dane logowania do testów i środowisk staging, po które sięgasz kilkanaście razy dziennie
- Współdzielone konta QA, numery telefonów wsparcia, numery zamówień
- Wszystko, czego ciągle szukasz i co wklejasz na tę samą stronę

JAK TO DZIAŁA

1. Otwórz stronę ustawień i wpisz domenę, na przykład staging.example.com. Save Book
poprosi Chrome o dostęp tylko do tej domeny.

2. Dodaj elementy, których chcesz używać, z krótką etykietą — zwykły tekst albo ukryte
hasło.

3. Otwórz tę witrynę: karta już tam jest. Przeciągnij ją tam, gdzie ci pasuje; pozycja
jest pamiętana dla każdej witryny osobno.

Karta jest celowo minimalna: tylko twoje elementy. Kliknięcie kopiuje, oko odsłania
ukrytą wartość, jednym kliknięciem zwijasz albo ukrywasz kartę, a z ikony na pasku możesz
ją przełączyć. Pojawia się wyłącznie na domenach, które sam dodałeś.

PRYWATNOŚĆ

Save Book nie ma serwerów ani kont. Wszystko, co zapiszesz, zostaje w lokalnym magazynie
rozszerzenia w Chrome, na twoim urządzeniu. Rozszerzenie nie wykonuje żadnych żądań
sieciowych, nie zawiera analityki ani śledzenia i nie może czytać niczego na stronie,
której hosta sam nie dodałeś.

Dostęp do hosta jest proszony po jednej domenie, w momencie jej dodania, i oddawany, gdy
usuniesz tę witrynę. Rozszerzenie instaluje się bez dostępu do jakiejkolwiek witryny.

OTWARTY KOD

Save Book jest otwarty, na licencji MIT. Pełny kod źródłowy jest publiczny pod
https://github.com/piotroszko/save-book-extension, więc możesz przeczytać dokładnie, co
robi rozszerzenie, i sprawdzić powyższe deklaracje o prywatności, zamiast wierzyć na
słowo. Zgłoszenia błędów i pomysły są mile widziane w trackerze.

UWAGA O SEKRETACH

Elementy są przechowywane bez szyfrowania w profilu przeglądarki — inaczej niż własny
menedżer haseł Chrome, który szyfruje je kluczem systemowym. Każdy, kto ma dostęp do
twojego komputera i profilu przeglądarki, może je odczytać. Weź to pod uwagę, zanim
zapiszesz produkcyjne dane logowania, i używaj rozszerzenia do kont testowych, a nie
produkcyjnych.
```

## Español (es)

```
Save Book guarda los inicios de sesión, los códigos y los números que necesitas en un
sitio concreto a un clic, sin salir de la página.

Tú eliges qué sitios reciben una tarjeta. Solo ahí —y en ningún otro sitio— aparece una
tarjeta pequeña con los elementos que has guardado para ellos. Haz clic en una fila y el
valor estará en tu portapapeles.

PARA QUÉ SIRVE

- Credenciales de prueba y de staging que consultas una docena de veces al día
- Cuentas de QA compartidas, teléfonos de soporte, referencias de pedidos
- Todo lo que buscas una y otra vez y pegas siempre en el mismo sitio

CÓMO FUNCIONA

1. Abre la página de ajustes y escribe un dominio, por ejemplo staging.example.com. Save
Book pedirá a Chrome acceso solo a ese dominio.

2. Añade los elementos que quieras, con una etiqueta corta: texto normal o una contraseña
oculta.

3. Abre el sitio: la tarjeta está ahí. Arrástrala donde te venga bien; la posición se
recuerda por sitio.

La tarjeta es deliberadamente mínima: solo tus elementos. Un clic copia, el ojo muestra un
valor oculto, con un clic contraes u ocultas la tarjeta, y desde el icono de la barra
puedes alternarla. Solo aparece en los dominios que hayas añadido tú.

PRIVACIDAD

Save Book no tiene servidores ni cuentas. Todo lo que guardas se queda en el almacenamiento
local de la extensión en Chrome, en tu propio dispositivo. La extensión no hace ninguna
petición de red, no incluye analíticas ni seguimiento y no puede leer nada en una página
cuyo host no hayas añadido tú.

El acceso al host se pide dominio a dominio, al añadirlo, y se devuelve al eliminar ese
sitio. La extensión se instala sin acceso a ningún sitio web.

CÓDIGO ABIERTO

Save Book es de código abierto, con licencia MIT. El código completo es público en
https://github.com/piotroszko/save-book-extension, así que puedes leer exactamente qué
hace la extensión y comprobar estas afirmaciones sobre privacidad en lugar de creértelas.
Los informes de errores y las sugerencias son bienvenidos en el gestor de incidencias.

UNA NOTA SOBRE LOS SECRETOS

Los elementos se guardan sin cifrar en tu perfil del navegador, a diferencia del propio
gestor de contraseñas de Chrome, que cifra con el llavero del sistema. Cualquiera con
acceso a tu ordenador y a tu perfil del navegador puede leerlos. Tenlo en cuenta antes de
guardar una credencial de producción y úsalo para cuentas de prueba, no de producción.
```

## Français (fr)

```
Save Book garde les identifiants, les codes et les chiffres dont vous avez besoin sur un
site précis, à un clic, sans quitter la page.

C'est vous qui choisissez les sites qui reçoivent une carte. Sur ceux-là — et nulle part
ailleurs — apparaît une petite carte avec les éléments que vous avez enregistrés pour eux.
Cliquez sur une ligne et la valeur est dans votre presse-papiers.

À QUOI CELA SERT

- Des identifiants de test et de staging que vous consultez une dizaine de fois par jour
- Des comptes QA partagés, des numéros de support, des références de commande
- Tout ce que vous cherchez sans cesse et collez toujours sur le même site

COMMENT CELA FONCTIONNE

1. Ouvrez la page des réglages et saisissez un domaine, par exemple staging.example.com.
Save Book demande à Chrome l'accès à ce seul domaine.

2. Ajoutez les éléments que vous voulez, avec un libellé court — texte brut ou mot de passe
masqué.

3. Ouvrez le site : la carte est là. Faites-la glisser où vous voulez ; la position est
mémorisée par site.

La carte est volontairement minimale : seulement vos éléments. Un clic copie, l'œil révèle
une valeur masquée, un clic replie ou masque la carte, et vous pouvez la basculer depuis
l'icône de la barre d'outils. Elle n'apparaît que sur les domaines que vous avez ajoutés
vous-même.

CONFIDENTIALITÉ

Save Book n'a ni serveurs ni comptes. Tout ce que vous enregistrez reste dans le stockage
local de l'extension, dans Chrome, sur votre propre appareil. L'extension n'effectue
aucune requête réseau, ne contient ni analyse ni suivi, et ne peut rien lire sur une page
dont l'hôte n'est pas un domaine que vous avez ajouté.

L'accès à l'hôte est demandé domaine par domaine, au moment où vous l'ajoutez, et rendu
quand vous supprimez ce site. L'extension s'installe sans accès à aucun site web.

OPEN SOURCE

Save Book est open source, publié sous licence MIT. Le code source complet est public sur
https://github.com/piotroszko/save-book-extension : vous pouvez donc lire exactement ce que
fait l'extension et vérifier les affirmations ci-dessus sur la confidentialité au lieu de
les prendre pour argent comptant. Les rapports de bugs et les suggestions sont bienvenus
dans le suivi des issues.

UNE REMARQUE SUR LES SECRETS

Les éléments sont stockés non chiffrés dans votre profil de navigateur, contrairement au
gestionnaire de mots de passe de Chrome, qui les chiffre avec le trousseau du système.
Quiconque a accès à votre ordinateur et à votre profil de navigateur peut les lire.
Gardez-le en tête avant d'enregistrer un identifiant de production, et réservez l'extension
aux comptes de test plutôt qu'aux comptes de production.
```

## Deutsch (de)

```
Save Book hält die Logins, Codes und Nummern, die du auf einer bestimmten Website
brauchst, einen Klick entfernt — ohne die Seite zu verlassen.

Du entscheidest, welche Websites eine Karte bekommen. Nur dort — und nirgendwo sonst —
erscheint eine kleine Karte mit den Einträgen, die du für sie gespeichert hast. Ein Klick
auf eine Zeile, und der Wert liegt in deiner Zwischenablage.

WOFÜR ES GEDACHT IST

- Test- und Staging-Zugangsdaten, die du ein Dutzend Mal am Tag nachschlägst
- Geteilte QA-Konten, Support-Telefonnummern, Bestellnummern
- Alles, wonach du ständig suchst und was du immer wieder in dieselbe Website einfügst

SO FUNKTIONIERT ES

1. Öffne die Einstellungsseite und gib eine Domain ein, zum Beispiel staging.example.com.
Save Book fragt Chrome nach Zugriff nur auf diese Domain.

2. Füge die Einträge hinzu, die du willst, mit einer kurzen Bezeichnung — reiner Text oder
ein verborgenes Passwort.

3. Öffne die Website: Die Karte ist da. Zieh sie dorthin, wo es dir passt; die Position
wird pro Website gemerkt.

Die Karte ist bewusst minimal: nur deine Einträge. Ein Klick kopiert, das Auge zeigt einen
verborgenen Wert, mit einem Klick klappst du die Karte ein oder blendest sie aus, und über
das Symbol in der Symbolleiste schaltest du sie um. Sie erscheint nur auf Domains, die du
selbst hinzugefügt hast.

DATENSCHUTZ

Save Book hat keine Server und keine Konten. Alles, was du speicherst, bleibt im lokalen
Speicher der Erweiterung in Chrome, auf deinem eigenen Gerät. Die Erweiterung stellt
überhaupt keine Netzwerkanfragen, enthält keine Analytik und kein Tracking und kann auf
einer Seite nichts lesen, deren Host du nicht selbst hinzugefügt hast.

Der Zugriff auf den Host wird Domain für Domain angefragt, beim Hinzufügen, und
zurückgegeben, wenn du die Website entfernst. Die Erweiterung wird ohne Zugriff auf
irgendeine Website installiert.

OPEN SOURCE

Save Book ist Open Source und unter der MIT-Lizenz veröffentlicht. Der vollständige
Quellcode ist öffentlich unter https://github.com/piotroszko/save-book-extension, du
kannst also genau nachlesen, was die Erweiterung tut, und die Aussagen zum Datenschutz
oben überprüfen, statt sie zu glauben. Fehlerberichte und Anregungen sind im Issue-Tracker
willkommen.

EIN HINWEIS ZU GEHEIMNISSEN

Einträge werden unverschlüsselt in deinem Browserprofil gespeichert — anders als bei
Chromes eigenem Passwort-Manager, der sie mit dem Systemschlüsselbund verschlüsselt. Wer
Zugriff auf deinen Computer und dein Browserprofil hat, kann sie lesen. Bedenke das, bevor
du ein Produktions-Login speicherst, und nutze die Erweiterung für Testkonten statt für
Produktionskonten.
```
