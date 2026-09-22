# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers and QA testers who work against staging, pre-production, and shared accounts across
several hosts (local dev, staging, client sandboxes) and need those logins, codes, and reference
numbers while they are on the page. Primary scene: desktop Chrome with several site tabs open, and
one small card that already knows which host it is on.

## Product Purpose

Keep the logins, codes, and numbers that belong to a specific website one click away, on that
website, without leaving the page — and nowhere else. A small draggable card shows that site's
saved items. Everything is configured in the extension's settings page. Success means: adding a
value is faster than opening a note app, and copying it never requires leaving the tab.

## Positioning

Presence is scoped to the site, not to a global vault. The manifest requests **no host
permissions**; access is requested at runtime one domain at a time, and the card is registered only
for granted, enabled domains. Items render into a shadow root, so the host page's CSS cannot reach
them and the page never observes interaction. The card is draggable, collapsible and hideable per
site — an instrument that lives on the page, not a popup or a manager app.

## Operating Context

- Chrome (MV3), desktop, `minimum_chrome_version` 123.
- Shared/test credentials, not production secrets: items are stored unencrypted in
  `chrome.storage.local` and never leave the browser. `PRIVACY.md` states this caveat and it is
  part of the product's honesty, not a gap to paper over.
- Item kinds today: plain text and masked secret. The masked row reveals on demand; clicking a row
  copies the value.
- Per-site card state: position, collapsed, hidden.
- A `*` pattern means every site: its card runs wherever Chrome access exists, and its items show
  alongside the items of any narrower site that also matches the page.
- Settings is a full-tab extension page; distribution is the Chrome Web Store plus a committed
  release zip and a GitHub Actions release workflow.

## Capabilities and Constraints

- Storage key `saveBook`, valibot-validated, versioned schema (`SCHEMA_VERSION`) with tolerant
  parsing of unknown/partial records.
- Adding a site asks Chrome for that origin at runtime; removing a site hands the permission back. A
  site with no granted access carries a `no access` flag in the rail, and switching it on or pressing
  `Grant access` asks Chrome again.
- The service worker keeps registered content scripts in sync with enabled, granted sites.
- No server, no network code, no accounts, no sync.
- Items live in one shared pool: each item carries the list of sites it is shown on, so the same
  login is stored once and appears on every site assigned to it. The Sites view (a site's items) and
  the Items view (an item's sites) are two ends of the same record and stay live-consistent.
- Constraints from the user, binding for this pass: keep the two-pane shape (rail + editor); dense
  and scan-first with no large empty canvas; no skeuomorphic gimmicks; must read as specific and
  crafted rather than generic SaaS-admin; standard web-app accessibility (visible focus, keyboard
  operability, real labels, live regions for transient messages).

## Brand Commitments

- Name: **Save Book**. Author: Piotr Roszkowski. License MIT.
- Voice: plain, quiet, lowercase-practical ("Cards appear on that domain and its subdomains"), no
  hype, no exclamation. Errors name the problem and the recovery.
- The **on-page card** is the user's named craft reference for the settings redesign: compact 272px
  panel, grip-dotted draggable header, hairline separators, muted 11.5px labels on the left,
  monospace values aligned right, quiet hover, one accent used only for state (copied, focus).
- Store assets on hand: icon-128 (+ SVG), promo tiles, three screenshots.
- Visual identity outside the card is documented in `DESIGN.md` ("The Quiet Instrument"): the card's
  world extended to the settings page, with one `light-dark()` pair per colour so both surfaces read
  one sheet.

## Evidence on Hand

- `README.md` (behaviour, install, release process), `PRIVACY.md` (storage and permission honesty).
- `store/screenshot-1-card.jpg` shows the card on a staging sign-in page; `store/screenshot-2-options.jpg`
  and `store/screenshot-3-options-dark.jpg` show the settings page this pass replaces.
- `store/promo-marquee.svg`, `store/promo-small.svg`, `store/icon-128.svg`.
- Demo content used across the store art is synthetic (`qa@northwind.test`, "Staging (QA)",
  "+48 600 100 200"); there are no customers, testimonials, or benchmarks and none may be invented.

## Product Principles

1. The page is the context: presence is granted per site, deliberately, and revoked when the site
   is removed.
2. One click to the value. Every interaction added to the card or to settings must pay for the
   keystrokes it costs.
3. Local and honest: no network, no claims the storage can't back.
4. Quiet instrumentation — the card and settings are tools that disappear into the task.

## Accessibility & Inclusion

Standard web-app accessibility: keyboard operability for tabs, lists and rows, visible focus,
labelled controls, `aria-live` for transient status, and no reliance on colour alone for state.

## Open Decisions

- Store re-upload of the refreshed screenshots is the user's own step; the store listing copy was
  left as it is.
- The item's site list has no reordering or bulk-add affordance yet; the pool carries no per-site
  ordering, and none was asked for.
