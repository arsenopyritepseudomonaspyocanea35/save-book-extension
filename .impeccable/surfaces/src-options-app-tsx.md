---
version: 1
slug: "src-options-app-tsx"
primary_target: "src/options/App.tsx"
related_targets: ["src/options/options.css","src/ui/tokens.css","src/content/Card.tsx"]
---

# Settings — Sites / Items

## Scope and mode

Operate. The extension's full-tab options page (`index.html` → `src/options/App.tsx`), both of its
views (Sites, Items), the shared design tokens it draws from, and the storage model both views read
and write. Out of scope: the on-page card's composition (token parity only), the service worker's
registration logic, store-listing copy.

## Audience, job, action

Developers and QA who keep shared staging logins on several hosts. Their job on this surface: get a
site granted, get a login in once, then add it to every host that shares it and remove it from the
ones that don't. Today that job costs a re-typed duplicate per site, and the page has no way to show
that one value lives on three hosts. Action that ends the visit: an item sits on the right sites and
each of those sites says so.

## Content and proof

Real material only: the user's own sites, patterns, labels, values, and the item kinds (text,
masked secret). Every count on the page is derived from their store — the sites an item is on, the
items a site carries, the rail counts — so the interface demonstrates its own mechanism with their
data. Chrome's granted/denied state is shown, never faked.

## Constraints

Two-pane shape kept (rail + editor); dense and scan-first, no large empty canvas; no skeuomorphic
gimmicks; must read specific and crafted, not generic SaaS-admin; standard web-app accessibility
(keyboard, visible focus, real labels, live region for transient messages); items live in one
shared pool with per-item site assignment, and both views are the same data, live-consistent.

## Unresolved

Whether the shared accent hue stays the incumbent indigo (decided: yes for this pass, since the
user pinned the card and the card uses it); whether the item's site list needs its own reorder or
bulk-add affordance (not asked for; the pool has no per-site ordering).

## Direction contract

THESIS: Settings is one record seen from both ends. A site owns a list of the items it shows; an
item owns a list of the sites it is added to; editing either end changes the same record. It refuses
the category default of a per-entity admin form reached from a nav list, and it refuses the
board-shaped view the first cut proposed (the user rejected the kanban: an item's sites belong in a
list on the item, as the mirror of a site's items).

OWN-WORLD: The on-page card's instrument world, held exactly. Neutral ground `--bg` #f6f7f9,
`--surface` #ffffff (dark #0f1115 / #16181d); hairline rules at 10% ink; one indigo accent
(#4f46e5 light, #a5b4fc dark) reserved for selection, focus and state; system sans at 13px for all
structure; ui-monospace for every value, pattern, and count; 8px row rhythm; 12px panel radius;
depth from the ground change between rail and editor instead of stacked shadows.

STORY: A developer enters a login once, adds it to the three hosts that share it from the item's own
site list, then opens any of those sites and finds the same value already in its item list — and
understands that editing it there edits it everywhere, while removing it there takes it off that
site only.

FIRST VIEWPORT: A 46px top bar carries the brand mark and name, then the Sites / Items tab strip
whose 2px accent underline sits on the bar's own hairline. Below it a 292px rail on `--surface` (site
index on one tab, item index on the other, both with a count pill per row) and the editor on `--bg`.
Sites tab: domain + label fields, the card switch, then "Items on this site" as a list of rows —
kind switch, label, mono value, and a `n sites` stamp on anything shared. Items tab: kind, label and
value for the selected item, then "Sites this item is on" as a list of site rows (name, mono
pattern, item count, remove) with a site picker row above it and "Delete item" in the panel foot.
Primary actions: `+ Text` / `+ Password` in either rail, `Add` in the site picker, and the site
row's `×` to take an item off one site.

FORM: Mirror of the site editor — user-pinned. The seed's dealt structures were shown on the
decision page and the routed board (dealt lead, index 7 of seven grounded structures) was taken,
then rejected on sight as a kanban; the user's steer replaces it with this mirror, whose list-of-
sites is also candidate 1 in the rejected ranking (inspector table). Seed key dd601ab2. Signature
interaction: the `Add` row in the item's own panel — pick a site, and the same value walks onto that
site's card and into its item list, with the rail count and the `n sites` stamps following live.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
verdict, DESIGN.md, and every shipping raster carrying its provenance.
