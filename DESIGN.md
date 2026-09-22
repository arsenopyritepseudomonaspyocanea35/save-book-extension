---
name: Save Book
description: A quiet per-site instrument — one shared record read from both of its ends.
colors:
  # ── light ─────────────────────────────────────────────
  ground: "#f6f7f9"
  surface: "#ffffff"
  surface-float: "rgba(255, 255, 255, 0.88)"
  field: "#ffffff"
  ink: "#14161a"
  muted: "#6b7280"
  line: "rgba(16, 24, 40, 0.1)"
  line-strong: "#d8dbe1"
  hover: "rgba(16, 24, 40, 0.045)"
  accent: "#4f46e5"
  accent-fg: "#ffffff"
  danger: "#d93a3a"
  raise: "#ffffff"
  scroll-thumb: "color-mix(in srgb, #14161a 16%, transparent)"
  # ── dark ──────────────────────────────────────────────
  ground-dark: "#0f1115"
  surface-dark: "#16181d"
  surface-float-dark: "rgba(20, 22, 26, 0.88)"
  field-dark: "#1b1e24"
  ink-dark: "#e9eaec"
  muted-dark: "#9aa0a6"
  line-dark: "rgba(255, 255, 255, 0.1)"
  line-strong-dark: "#333944"
  hover-dark: "rgba(255, 255, 255, 0.06)"
  accent-dark: "#a5b4fc"
  accent-fg-dark: "#0e1014"
  danger-dark: "#f0736f"
  raise-dark: "#23272f"
  scroll-thumb-dark: "color-mix(in srgb, #e9eaec 22%, transparent)"
typography:
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    letterSpacing: "-0.01em"
  brand:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    letterSpacing: "-0.01em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  control:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 520
  control-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 520
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "11.5px"
    fontWeight: 550
  hint:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "11.5px"
    fontWeight: 400
    lineHeight: 1.5
  data:
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "12.5px"
    fontWeight: 400
  data-sm:
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
  count:
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 500
    fontFeature: "tnum"
  micro:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "10.5px"
    fontWeight: 400
  card-title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.01em"
  card-label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "11.5px"
    fontWeight: 400
  card-value:
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "11.5px"
    fontWeight: 400
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "999px"
spacing:
  bar-height: "46px"
  rail-width: "292px"
  rail-width-narrow: "252px"
  list-gap: "1px"
  row-padding: "7px 9px"
  row-column-gap: "8px"
  row-line-gap: "6px"
  panel-padding: "16px 18px"
  panel-gap: "14px"
  field-gap: "16px"
  main-padding: "22px 26px 48px"
  gutter: "12px"
components:
  button-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "36px"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-fg}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "36px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "36px"
  button-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "34px"
  button-ghost-sm:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.control-sm}"
    rounded: "{rounded.md}"
    padding: "0 10px"
    height: "30px"
  button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "36px"
  icon-button:
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    size: "22px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 10px"
    height: "34px"
  input-mono:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.md}"
    padding: "0 10px"
    height: "34px"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "16px 18px"
  rail-row:
    rounded: "{rounded.md}"
    padding: "7px 9px"
  rail-row-selected:
    backgroundColor: "color-mix(in srgb, {colors.accent} 12%, transparent)"
    rounded: "{rounded.md}"
    padding: "7px 9px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.body}"
    padding: "0 12px"
    height: "46px"
  tab-selected:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "0 12px"
    height: "46px"
  count-pill:
    backgroundColor: "{colors.hover}"
    textColor: "{colors.muted}"
    typography: "{typography.count}"
    rounded: "{rounded.pill}"
    padding: "2px 6px"
  flag-pill:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.micro}"
    rounded: "{rounded.pill}"
    padding: "1px 6px"
  stamp-pill:
    backgroundColor: "{colors.hover}"
    textColor: "{colors.muted}"
    typography: "{typography.data-sm}"
    rounded: "{rounded.pill}"
    padding: "1px 6px"
  kind-switch:
    backgroundColor: "{colors.hover}"
    rounded: "{rounded.md}"
    padding: "2px"
  kind-switch-active:
    backgroundColor: "{colors.raise}"
    textColor: "{colors.ink}"
    typography: "{typography.control-sm}"
    rounded: "{rounded.sm}"
    padding: "3px 9px"
  switch-track:
    backgroundColor: "{colors.line-strong}"
    rounded: "{rounded.pill}"
    width: "34px"
    height: "20px"
  card:
    backgroundColor: "{colors.surface-float}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    width: "272px"
  card-row:
    rounded: "{rounded.md}"
    padding: "6px 7px"
  toast:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "9px 15px"
---

# Design System: Save Book

## Overview

**Creative North Star: "The Quiet Instrument"**

Save Book is one record seen from both ends, and it is drawn like an instrument that is already
mid-task: hairline rules instead of boxes, one accent that means state and nothing else, and data
set in monospace so a host pattern, a stored value and a count all read as readings rather than
sentences. Nothing here is decorated. Density is deliberate — a 1px rhythm between index rows, a
292px rail, a 46px bar — because the user's job is to scan their own store and act on it, not to
admire a page.

The world was set by the on-page card and is held exactly: the same neutral ground, the same 10%
ink hairline, the same #4f46e5 in light and #a5b4fc in dark, the same label-left/value-right
anatomy, the same quiet hover. Settings extends that vocabulary rather than restating it, which is
why a full-tab options page and a 272px page-injected panel can sit side by side and read as one
tool. The card is the user's pinned craft reference; when this document and the card disagree, the
card wins.

The type is the system stack at small sizes and never grows up: the largest text in the product is
a 19px empty-state heading. Hierarchy is carried by weight, colour and family (sans for structure,
mono for data) rather than by size. Depth is carried by a ground change and a hairline — the rail
is the raised surface, the editor is the canvas — and exactly one soft float shadow exists for the
two things that genuinely float. The single authored moment is the toast arriving.

**Key Characteristics:**

- One accent, reserved for state: selection, focus, the selected tab's underline, copied values,
  links, and the single primary button per screen.
- Hairlines at 10% ink (`--line`) do the separating; `--line-strong` is reserved for the edge of an
  interactive control.
- Sans sets structure, monospace sets data — values, host patterns, counts, stamps.
- Depth is a ground change, not a stack of shadows; one `--shadow-float` for card and toast.
- Everything that is one object looks like one object: a rail row is a single button; a site row in
  an item's panel reuses the rail's own title class.
- Density with air at the edges: 1px gaps inside lists, 14–16px between panels, 22px page padding.

### Two surfaces, one world

The tokens in the shared sheet are consumed by both surfaces; neither surface defines its own
palette. Themes are bound once through `prefers-color-scheme`, and the two surfaces bind them
differently: the options page takes them at `:root`, while the on-page card carries a
`ui-tokens` class inside its shadow root so the tokens exist in that document fragment too.

**Shared, consumed by both:** `--bg`, `--surface`, `--surface-float`, `--field`, `--fg`,
`--muted`, `--line`, `--line-strong`, `--hover`, `--accent`, `--accent-fg`, `--danger`, `--raise`,
`--shadow-float`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`,
`--font`, `--mono`, `--ring`, `--scroll-thumb`.

**Owned by the settings page:** the shell metrics `--bar-h` (46px) and `--rail-w` (292px, 252px
under 1180px), the panel/rail/tab/toast/switch/segmented-kinds primitives, `::selection`,
`caret-color`, the themed scrollbars, and the whole mirror grammar described under Components.

**Owned by the on-page card:** its 272px width and 44vh list cap, its translucent `--surface-float`
fill with `blur(20px) saturate(180%)`, `user-select: none`, the grip-dotted draggable header, the
right-aligned mono value column, the collapse chevron, and `--shadow-float` as its resting depth.
It lives in a shadow root and never inherits the host page's CSS.

## Colors

A cool near-neutral ground carrying one indigo, with a single red reserved for destruction. Every
value below is defined twice — once for the light scheme, once for dark — in one shared sheet.

### Primary

- **Instrument Indigo** (`#4f46e5` light / `#a5b4fc` dark): the only accent. Light mode uses the
  deep indigo on white; dark mode flips to a pale periwinkle because the same hue has to stay
  legible on `#16181d`. It is spent on exactly five things: the selected rail row (a 12% wash, not
  a fill), the selected tab's 2px underline, focus rings and focus borders, the primary button, and
  the state words — the copied value in the card and the "Add items" link in the card's empty
  state. It is never a decorative surface.
- **Accent Ink** (`#ffffff` light / `#0e1014` dark): text sitting on the accent. It inverts with the
  accent so the primary button keeps contrast in both schemes.

### Neutral

- **Canvas Ground** (`#f6f7f9` light / `#0f1115` dark): the page behind everything, the editor's
  colour, and the dark scheme's base. It is the *lower* surface.
- **Instrument Surface** (`#ffffff` light / `#16181d` dark): panels, the top bar and the rail. It is
  the *raised* surface; the rail being surface-coloured against a ground-coloured editor is the
  primary depth statement of the whole page.
- **Float Surface** (`rgba(255, 255, 255, 0.88)` light / `rgba(20, 22, 26, 0.88)` dark): the card's
  translucent fill, always paired with its backdrop blur.
- **Field White** (`#ffffff` light / `#1b1e24` dark): input and select fills — surface-white in
  light, one step *lighter* than the panel in dark so a field still reads as a well.
- **Instrument Ink** (`#14161a` light / `#e9eaec` dark): all primary text and every icon's
  `currentColor`.
- **Readout Grey** (`#6b7280` light / `#9aa0a6` dark): labels, hints, notes, inactive tab labels,
  count pills, flag pills, icon buttons at rest, and the dimmed "—" placeholder in the card.
- **Hairline** (`rgba(16, 24, 40, 0.1)` light / `rgba(255, 255, 255, 0.1)` dark): every separator —
  bar bottom, rail edge, panel outline, card separator, footer top, list item rules.
- **Control Edge** (`#d8dbe1` light / `#333944` dark): the border of anything interactive (inputs,
  selects, neutral buttons, flag pills) and the switch track's off fill. Heavier than a hairline on
  purpose: it is a control's boundary, not a division.
- **Hover Wash** (`rgba(16, 24, 40, 0.045)` light / `rgba(255, 255, 255, 0.06)` dark): the single
  hover treatment, also used as the fill of count/stamp pills, code chips, and the segmented-kind
  track.
- **Raise** (`#ffffff` light / `#23272f` dark): the lifted segment of the segmented kind control —
  white on a wash in light, one step above the field in dark.

### Semantic — Danger

- **Signal Red** (`#d93a3a` light / `#f0736f` dark): destructive text and borders only. It appears
  in exactly three places: the danger button (red on `color-mix(danger 35%)` border, a 10% wash on
  hover), the danger icon button's hover, and the error toast (red text with a
  `color-mix(danger 40%)` border). Nothing else in the product is red.

### Named Rules

**The Reserved Accent Rule.** The accent never fills a large area. Its widest uses are the primary
button and the 12% selected-row wash; if a new screen needs a coloured block, it is wrong.

**The Hairline Rule.** Division is 1px of `--line` at 10% ink. Use `--line-strong` only where an
element is a control the user clicks or types into. Never a 2px divider, never a grey box.

**The Ground Change Rule.** Rail is `--surface`, editor is `--bg`. The two grounds plus their shared
hairline are the layout; do not add a third ground to identify a region.

## Typography

**Display Font:** none — this world has no display face. The largest type in the product is a 19px
system-sans heading inside an empty state.

**Body Font:** system sans (`-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`).

**Label/Mono Font:** system sans for labels; `ui-monospace, SFMono-Regular, 'SF Mono', Menlo,
Consolas, monospace` for data.

**Character:** a small, tight, unglamorous pairing. The sans carries all structure and UI voice;
the mono carries anything the user could copy or count. Sizes move between 10.5px and 19px only, so
hierarchy is built out of weight (400 / 520 / 550 / 600) and colour (ink vs muted) rather than
scale. Weights are set numerically rather than in keyword steps, which keeps the intermediate
values available on variable system faces.

### Hierarchy

- **Headline** (600, 19px, -0.01em): empty-state headings only ("Add your first site", "No items
  yet"). The ramp ceiling.
- **Brand** (600, 14px, -0.01em): the "Save Book" wordmark in the top bar, once per page.
- **Body** (400, 13px/1.5): the page default — body text, inputs, selects, tab labels, the
  switch caption, section headings (13px/600), and rail row titles (13px/550).
- **Control** (520, 13.5px): button labels.
- **Control Small** (520, 12.5px): the compact `+ Text` / `+ Password` rail buttons (30px tall) and
  the segmented kind control's segments (11.5px/520 inside a 2px-padded track).
- **Label** (550, 11.5px, muted): field labels — "Domain", "Label", "Kind", "Value", "Sites this
  item is on" sits at 13px/600 instead. Uppercase is never used.
- **Hint** (400, 11.5px/1.5, muted): help text under controls, footnote lines, and the smaller
  empty-state prose. Capped at 62ch for section notes and 48ch in a panel footer.
- **Data** (mono, 400, 12.5px): a stored value or a host pattern — the mono input, the value field.
- **Data Small** (mono, 400, 11px): the rail's second line: the site pattern, or an item's value
  (masked as a run of dots when the kind is secret).
- **Count** (mono, 500, 11px, tabular figures): count pills and the `n sites` route stamp — mono
  here because a count is a reading and must not shift width as it changes.
- **Micro** (400, 10.5px): the flag pill only — `card off`, `not on any site`. It is the one place
  a smaller-than-11px size is allowed, and the pill explicitly resets to the sans stack rather than
  inheriting the mono of the rail subline it sits in.
- **Card Title** (600, 12px, 0.01em): the card's header title — one step smaller than the settings
  rail title, because the card is 272px wide.
- **Card Label / Card Value** (11.5px muted sans / 11.5px mono, right-aligned): the card's row
  anatomy, a compressed echo of the settings rows.

### Named Rules

**The Mono Is Data Rule.** Monospace is applied when the string is a reading — a stored value, a
host pattern, a count, a stamp. Monospace is never applied to a name, a label, a button, a tab, or
a heading. When a mono line needs a sans word inside it (the flag pill), the pill resets its own
family.

**The Ramp Ceiling Rule.** Nothing exceeds 19px. A screen that needs a bigger number is a screen
that needs less content.

## Layout

The shell is a two-row grid: a 46px top bar over a `292px + 1fr` view. The bar holds the brand and
the Items/Sites tab strip — Items first, and the view the page opens on — with the tab underline
sitting on the bar's own bottom hairline. The rail
sits on `--surface` with a right hairline and scrolls independently; the editor sits on `--bg` with
padding of 22px 26px 48px and a content cap of 860px so the form never stretches into a wide empty
canvas. Both panes scroll inside a 100vh shell rather than the page scrolling.

Spacing rhythm is intentionally two-speed. Index lists are dense: a 1px gap between rail rows and
between site rows, with 7px 9px of padding inside each row, so a long list reads as a ruled table.
Anything editable gets air: 6px between item rows (8px between the columns inside one), 16px
between the columns of the field grid, 14px between the field groups, 14px between panels, 16px 18px
inside a panel. A control that sits beside a field matches the field's height: a picker row's button
is 34px, not the 36px it takes on its own.

Responsive behaviour is two steps. Under 1180px the rail narrows to 252px. Under 900px the shell
stops being a viewport grid: the bar becomes auto-height, the view collapses to one column, the rail
becomes a block capped at 48vh with a bottom hairline instead of a right one, the main pane drops to
16px 14px 36px padding and scrolls with the page, and the two-column field grid becomes one column.
An item row also reflows, from six columns onto three named lines over
`118px minmax(0, 1fr) 28px` with a 6px row gap: `'kind label label' / 'value value reveal' /
'stamp stamp remove'`. The fields change rows but never lose their own column, so the narrow layout
is a rewrap of the same grid rather than a different structure.

### Named Rules

**The Fixed Slot Rule.** A field's position and width are its own grid column, never a consequence
of what its row happens to contain. The reveal slot and the stamp slot are rendered in every item row
whether or not there is an eye or a pill to put in them, and the editor's value field keeps the same
28px for its reveal button whether the item is text or secret. The same field therefore lands on the
same x and the same width in every row of a list — measured identical at 1440, 1280 and 1024, and
identical per column at 390. A fixed column fixes where a control starts, not that it stretches: the
kind column keeps its 128px while the segmented control inside it sizes to its own content
(`justify-self: start`).

The on-page card is not part of this grid. It is a fixed, absolutely-positioned 272px panel
(dark or light by the page's scheme) clamped 12px from the viewport edges, moved with a transform
and capped at 44vh of rows before its list scrolls.

## Elevation & Depth

This system is flat by construction. There are no stacked surfaces, no nested cards, and no drop
shadows on panels or rows: panel outlines are a single hairline, and the difference between the rail
and the editor is a *ground* change (`--surface` against `--bg`). Selection is shown with a wash, not
a lifted card. Exactly one shadow token — the float shadow — is spent, on the two things that are
genuinely floating above the page: the on-page card and the toast. Two micro-lifts exist and are not
the float shadow: the active segment of the segmented kind control and the switch knob, each a 1px
soft drop that separates them from the track they sit on.

### Shadow Vocabulary

- **Float** (`0 1px 2px rgba(16, 24, 40, 0.06), 0 10px 30px -8px rgba(16, 24, 40, 0.28)`; dark
  `0 1px 2px rgba(0, 0, 0, 0.4), 0 10px 30px -8px rgba(0, 0, 0, 0.6)`): the card resting on top of
  a host page, and the toast resting on top of settings. The only shadow in the vocabulary.
- **Segment** (`0 1px 2px rgba(16, 24, 40, 0.1)`): the selected segment of the kind control.
- **Knob** (`0 1px 2px rgba(0, 0, 0, 0.25)`): the switch knob, which stays white in both schemes.

The on-page card additionally uses `backdrop-filter: blur(20px) saturate(180%)` over its translucent
float surface, so the host page shows through as colour rather than as legible content.

**The One Float Rule.** Only the card and the toast get `--shadow-float`. A panel, a rail row, a
menu or a dialog answered from this vocabulary gets a hairline and a ground, never a shadow.

## Shapes

Corners are small and functional, and the radius signals the object's rank: **12px** for the large
containers (panels, the on-page card), **8px** for anything you click or type into (inputs, selects,
buttons, rail rows, site rows, the segmented track), **6px** for the small things inside those
(icon buttons, the segment chip, inline `code` chips, the focus corner of a rail title), and a
**999px pill** for anything that counts, flags or toasts (count pills, the `n sites` stamp, the flag
pill, the switch track, the toast). Nothing is square-cornered and nothing is round-cornered.

The form language is otherwise rectangular and quiet: 1px borders, no bevels, no notches, no icons
standing in for text. The one deliberately soft silhouette is the toast, whose pill radius sits at
the bottom of the viewport like a status light. Clipping is used twice for containment: the card
does `overflow: hidden` so its header and list respect the 12px radius, and the segmented control
gets its shape from a padded wash rather than per-segment borders.

Icons are authored SVG, 16×16 viewBox at 13–14px render, `currentColor`, one stroke family:
1.3–1.6px strokes with round caps and joins, `fill="none"` for strokes and solid fills only for
the eye's pupil and the grip's dot grid. Icons are never glyphs, never emoji, never an icon font,
and never the only carrier of meaning — every icon button carries both `title` and `aria-label`,
and a toggle's `title` names the action it will take next ("Reveal the value" / "Hide the value",
"Reveal" / "Hide" in the card) alongside `aria-pressed`.

## Components

### Buttons

Four variants of one button, all 36px tall with an 8px radius and a 13.5px/520 label, all shifting
colour on hover and taking a 2px accent outline offset by 1px on focus.

- **Shape:** 36px tall, `--radius-md` (8px), `0 14px` padding, 6px gap when a leading icon is
  present. Beside a field — a picker row's "Add", a domain row's "Apply" — a button drops to 34px so
  the row reads as one line rather than as a field with a slightly taller object next to it. The
  compact rail variant (`+ Text` / `+ Password`) drops to 30px tall with `0 10px` padding and a
  12.5px label.
- **Default:** `--surface` fill, `--line-strong` border, `--fg` text. This is the "Apply" and site
  picker "Add" button.
- **Primary:** `--accent` fill, `--accent-fg` text, transparent border. Used exactly once per rail —
  "Add a domain" in the Sites rail. Hover brightens via `filter: brightness(1.08)` rather than
  swapping the token, so the accent stays the single source of the hue.
- **Ghost:** no fill, no border, `--muted` text, which resolves to `--fg` on a `--hover` wash. Used
  for the `+ Text` / `+ Password` adders and "Reset card position".
- **Danger:** no fill, `--danger` text with a 35% danger border, and a 10% danger wash on hover.
  Used for "Delete site" and "Delete item".
- **Disabled:** `opacity: 0.5`, default cursor — the state used by "Apply" before the domain draft
  differs, and by "Add" when no site is available.

### Chips

Three pill-shaped small objects, all at `--radius-pill`, all muted text, all reserved for a reading
rather than an action.

- **Count pill:** the `n` of items on a site, or sites on an item. `--hover` fill, mono 500 at 11px
  with tabular figures, `min-width: 20px` (18px inside a tab) and centred so the number never moves
  its neighbours. Present on every rail row on both tabs and on every site row.
- **Route stamp:** the `n sites` badge on an item row, saying out loud that one value stands on
  several hosts. Same pill treatment as a count, plus a `title` naming the sites. The pill itself
  renders only when the count exceeds one, but the `.stamp-slot` that holds it is always rendered,
  so a row without a badge keeps the same column widths as one with it.
- **Flag pill:** a bordered, unfilled pill — 1px `--line-strong`, 10.5px sans text, `1px 6px`.
  Two payloads only: `card off` (the site is disabled) and `not on any site` (the item is in the
  pool with no assignment). It sits inside the mono subline and deliberately resets to the sans
  family so it reads as a stamp rather than as data. Icons are never used inside pills.

### Cards / Containers

- **Panel:** the only container in settings. `--surface` fill, 1px `--line` hairline,
  `--radius-lg` (12px), `16px 18px` padding, and a 14px gap between stacked panels — no shadow
  ever. A panel's footer is a separated band: a `1px` top hairline, 14px of padding above it and
  16px of margin, with the primary-ish action on the left and the destructive action on the right.
- **Placeholder:** the empty editor state, capped at 520px wide with 36px of vertical padding, a
  19px/600 heading and a 13px muted paragraph.
- **Toast:** fixed 20px from the bottom, horizontally centred, capped at 520px, on the `--surface`
  fill with a `--line-strong` border, pill radius, `--shadow-float` and 12.5px centred text; the
  error variant swaps text and border to red. It is the single animated moment (see below) and it
  is announced through a live region.
- **The on-page card:** the pinned reference for everything above. 272px wide (or the viewport
  minus 24px on a narrow page), translucent `--surface-float` with backdrop blur, 1px hairline
  border, 12px radius, `--shadow-float`. Its header is drag-only (`cursor: grab`, grabbing while
  held) and carries a grip of six 1.1px dots at 45% opacity, the title at 12px/600, the collapse
  chevron and the hide button, in a `7px 7px 7px 9px` band. Under it a full-bleed 1px hairline,
  then rows in a 5px 6px 7px list with 1px gaps and 44vh of scroll.

### Inputs / Fields

- **Style:** 34px tall, `--field` fill, 1px `--line-strong` border, `--radius-md` (8px), `0 10px`
  padding, 13px inherited text, muted placeholder. Selects share the treatment exactly, so a picker
  and a text field are the same object. Fields are always wrapped by a label whose `.field-label`
  span sits 11.5px/550 muted, 6px above the control.
- **Data fields:** any input carrying a host pattern or a stored value switches to mono at 12.5px
  (`input-mono`, `.item-value`, and the editor's value input) — the one typographic change a field
  can make.
- **Focus:** no outline. The border becomes `--accent` and gains `--ring`, a 3px
  `color-mix(accent 18%)` halo. This is distinct from the 2px solid accent outline used on
  buttons and rows.
- **Reserved reveal slot:** the editor's value field is a two-column grid,
  `minmax(0, 1fr) 28px`, and the second column holds a `.field-actions` span whether or not the item
  is a secret. The value input's right edge is therefore the same for a text item and a masked one,
  and the eye appears in a space that was already reserved for it.
- **Hidden field note:** the switch's checkbox is `position: absolute; opacity: 0` — the real
  control is the track, so focus styling lands on the track and the input keeps native semantics.

### Navigation

- **Top bar:** `--surface`, 1px bottom hairline, 46px tall, `0 16px` padding, 20px gap. It holds the
  brand (a 16px accent-coloured SVG mark, the only place the accent is used as a colour block, plus
  a 14px/600 wordmark) and the tab strip.
- **Tabs:** a `role="tablist"` sitting on the bar's baseline, reading **Items then Sites**. Items is
  the default view: the page opens on the shared pool, because that is where a value is entered once
  and routed. The one thing that moves a user to Sites is the card's pending-domain path, which
  switches the view and focuses the domain field for the `Add` the card just asked them to press.
  Each tab is `--muted` at 13px/520 with `0 12px` padding, and carries its own count pill. Selection
  is announced three ways: `--fg` text, `aria-selected`, and a 2px `--accent` underline inset 8px
  from each side and dropped 1px so it sits *on* the bar's hairline rather than above it. Hover only
  shifts the text to `--fg`. Focus is a 2px accent outline inset 3px. Arrow keys move selection and
  focus together; the strip is one tab stop.
- **Rail rows:** the index row, used by both tabs. The row is a single `<button>` — one object for
  hover, click and focus — laid out in a grid of `minmax(0,1fr) auto`, or
  `auto minmax(0,1fr) auto` on the Items tab where a 13px kind icon occupies the first column and
  spans both lines. Line one is the name (13px/550, ellipsised); line two spans the full width in
  mono 11px (the host pattern, or the item's value / a dot mask) with an optional flag pill; the
  count pill sits in the last column. Site tab rows carry no icon; item tab rows carry the text or
  padlock glyph. Hover is a `--hover` wash, selection a 12% accent wash, focus a 2px accent outline
  offset inward by 2px, and a disabled site's name drops to `--muted`.
- **The site element is a button, not a row:** the site's *name* inside a site row is itself a
  button (to open that site on the Sites tab) while the row around it is a hover target — hence the
  row's hover rule is paired with `:focus-within`.

### Signature component — The mirror

Both settings views are the same record read from opposite ends, and the code makes the mirror
literal: an item's site rows reuse the rail's own title class rather than a copy of its styles.

- **A site's items (Sites tab panel):** a list of `.item` rows, each a single line built as a
  six-column grid — `128px minmax(0, 1fr) minmax(0, 1.15fr) 28px 74px 30px` at `gap: 8px` — holding,
  in order, the `.kind-switch` (start-aligned, so its track ends at the Password segment rather
  than stretching across the 128px column), the `.item-label` input, the mono `.item-value` input, a
  `.field-actions` slot, a `.stamp-slot`, and the remove icon button (28px, `justify-self: end`).
  Two of those columns are slots rather than content: `.field-actions` carries the reveal eye only
  for a masked item, and `.stamp-slot` carries the `n sites` pill only for an item on more than one
  site — both are always rendered, and they share one rule,
  `.field-actions, .stamp-slot { display: flex; align-items: center; justify-content: flex-end }`.
  Rows are 6px apart. Removing here takes the item off this site only, and the panel says so above
  the list.
- **An item's sites (Items tab panel):** a picker row (a select of the sites the item is *not* yet
  on, plus an "Add" button) above a list of `.site-row`s, each a grid of
  `minmax(0,1fr) auto auto` — the site name as a rail-title button, the count pill of items on that
  site, a 26px danger icon button, and a mono subline beneath carrying the pattern and the
  `card off` flag when that site's card is disabled.
- **Shared grammar:** both views use the same rail vocabulary (`rail-list`, `rail-row`,
  `rail-open`, `rail-title`, `rail-sub`, `count`, `flag`), the same panel and footer, the same
  `items-empty` / `rail-empty` empty treatment (12.5px muted, with the actionable phrase in
  `--fg` 600), the same 1px row rhythm inside lists, and the same danger button in the footer.
- **The `Add` row is the signature interaction:** choosing a site in the item's own panel writes the
  same value onto that site's card, into its item list, and increments the rail count and every
  `n sites` stamp — one record, two ends, live.

### Segmented kind switch

The item kind (Text / Password) is one control wherever a kind is shown: a `role="group"` of two
buttons on a 2px-padded `--hover` wash with an 8px radius. The active button is a `--raise` chip
with a 6px radius, `--fg` text and a 1px soft lift; the inactive one is plain `--muted` text that
goes `--fg` on hover. Focus is a 2px accent outline offset by 1px. It is a segmented control, not a
toggle: both options are always visible, and each button is `aria-pressed`.

The switch owns its width, not its column. Inside an item row it sits in a fixed 128px kind column
but is `justify-self: start`, so the `--hover` track ends where the Password segment ends instead of
running on as a bare grey strip to the column edge; the row's copy and the editor's copy therefore
measure the same 119px, the 2px between the last segment and the track's edge being the control's own
padding. A fixed column fixes where a control starts, not how wide it stretches.

### Toggle switch

The card's per-site on/off is a 34×20px pill track with a 16px white knob. Off is
`--line-strong`; on is `--accent` with the knob translated 14px. Both background and transform
transition in 160ms ease. The 6px-tall gap between track and caption is fixed, the caption is 13px,
and focus lands on the track as `--ring`. State is carried by position and colour together, never by
colour alone.

### Motion

Motion is minimal and entirely in service of state: `transform 0.16s ease` and
`background 0.16s ease` on the chevron, the switch track and the switch knob. The one authored
moment is the toast arriving — `toast-in 0.18s ease-out`, from `opacity: 0` and a 6px downward
offset to rest — and nothing else in the product has a keyframe. Rows, panels and tabs appear
instantly; there are no entrance animations on lists.

### Browser surface

Four platform surfaces are themed, and nothing else is. Text selection inside the settings page
takes a 26% accent tint. Carets in text inputs, selects and textareas take `--accent`. Scrollbars
are thin (`scrollbar-width: thin`) with a 10px webkit track, a transparent track background and a
`--scroll-thumb` thumb — 16% ink in light, 22% in dark — inset 3px inside its own pill via
`background-clip: content-box`, darkening to 30% ink on hover. The scrollbar rules are global to the
settings page and are not shipped into the card's shadow root, where the browser keeps its own.
The fourth surface is deliberately *not* themed: the Items rail's filter is `input[type='search']`,
and its clear affordance is the browser's own control rendered inside a themed field. No
`::-webkit-search-cancel-button` rule exists in the build, and adding one would be a new decision
rather than a documented rule.

### Shipped raster assets

The store rasters keep their provenance and must not be silently regenerated:

- `store/screenshot-2-options.jpg` and `store/screenshot-3-options-dark.jpg` were captured by this
  build thread from the running extension on 2026-09-22, and show the settings page as recorded
  here (light and dark).
- `store/screenshot-1-card.jpg`, `store/promo-marquee-1400x560.jpg`,
  `store/promo-small-440x280.jpg`, `store/icon-128.png` and the store SVGs pre-date this work.

## Do's and Don'ts

### Do:

- **Do** use `--accent` only for state: focus rings, the selected rail row's 12% wash, the selected
  tab's 2px underline, the copied value, links, and one primary button per rail.
- **Do** separate with a 1px `--line` hairline or a ground change; reach for `--line-strong` only on
  the edge of something interactive.
- **Do** set every value, host pattern, count and stamp in `var(--mono)`, and give counters
  `font-variant-numeric: tabular-nums` so widths never shift.
- **Do** keep the 1px rhythm inside index lists and give editable rows 6px, panels 14px, and the
  field grid 16px.
- **Do** reuse the rail's classes (`rail-title`, `rail-sub`, `count`, `flag`) when a new view shows
  the same record from another end — the mirror in this product is literal in code, not a lookalike.
- **Do** give every field its own column and render its slot even when it is empty — the reveal and
  stamp slots in an item row, and the editor's 28px value slot — so a field never moves or resizes
  because of what a neighbouring row contains.
- **Do** cap prose at 62ch (sections) and 48ch (panel footers), and cap editor content at 860px.
- **Do** keep body text at 13px, labels at 11.5px/550, and never exceed 19px.
- **Do** give destructive controls the red token plus the two-step arm (the label becomes
  "Click again to delete", reverting after 4s) and put them alone in the panel footer's right slot.

### Don't:

- **Don't** add a shadow to a panel, a row, or a menu: `--shadow-float` belongs to the on-page card
  and the toast, and the segments/knob micro-lifts are the only other permitted drops.
- **Don't** introduce a third ground; the rail is `--surface` and the editor is `--bg`.
- **Don't** fill anything large with the accent, and don't tint a neutral with it to "add warmth".
- **Don't** put mono on a name, label, tab, heading or button — and don't put sans on a value,
  pattern, count or stamp.
- **Don't** use a glyph, emoji or icon font where an authored SVG icon belongs, and never let an
  icon carry meaning alone.
- **Don't** raise font weight or size to create hierarchy where `--muted` vs `--fg` already does.
- **Don't** restyle the browser's own affordances beyond what the build already themes (selection
  tint, accent caret, themed scrollbars); the rest of the chrome is the platform's.
