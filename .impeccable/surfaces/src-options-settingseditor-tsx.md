---
version: 1
slug: "src-options-settingseditor-tsx"
primary_target: "src/options/SettingsEditor.tsx"
related_targets: ["src/options/SettingsList.tsx","src/options/App.tsx","src/options/options.css","src/ui/tokens.css","src/ui/segmented/segmented.css","src/content/Card.tsx","src/shared/schema.ts"]
---

---
version: 1
slug: "src-options-settings-editor-tsx"
primary_target: "src/options/SettingsEditor.tsx"
related_targets: ["src/options/SettingsList.tsx","src/options/App.tsx","src/options/options.css","src/ui/tokens.css","src/ui/segmented/segmented.css","src/content/Card.tsx","src/shared/schema.ts"]
---

# Settings — Appearance / Data

## Scope and mode

Operate. The third view of the same full-tab options page: the extension's global settings. This
pass ships two sections — Appearance (the theme override) and Data (clearing sites, items, or
everything) — and the shell that will hold later ones. Out of scope: the Items and Sites views, the
service worker's registration logic, storage beyond `settings.theme`, store-listing copy.

## Audience, job, action

The same developer/QA who keeps shared staging logins on several hosts. Their job here is rare and
deliberate: set the theme once, and have a trustworthy place to wipe data when a sandbox ends. The
action that ends the visit: the theme they picked holds on this page and on the card at every site,
or the scope they asked for reads zero and the row says so.

## Content and proof

Real material only: the user's own counts (sites, items), the theme in force, and the honest
consequence of each clear action — what is kept, what Chrome access is handed back, that clearing
cannot be undone, and that the theme choice is not data and survives. No invented numbers, no sync,
no export, no confirmation dialog that pretends to protect anything.

## Constraints

Two-pane shape kept (settings index rail + section editor); dense and scan-first, no large empty
canvas; standard web-app accessibility (keyboard, visible focus, real labels, live region for the
toast); destructive controls keep the incumbent two-step arm; the theme override governs both
surfaces and defaults to the system.

## Unresolved

Whether the theme preference counts as data for "Clear everything" (decided: no — it survives).
Whether the card should follow the host page's own scheme rather than the OS preference (unchanged
from today: the OS preference, now overridable).

## Direction contract

THESIS: settings are the same instrument read one level up. The rail that indexes a site's items or
an item's sites becomes the index of the settings sections, and each section is a panel whose rows
are title, reading, control. It refuses the category default of one long preferences column, and it
refuses the "danger zone" card of three stacked red buttons.

OWN-WORLD: the on-page card's instrument world, inherited exactly. `--bg` #f6f7f9 / `--surface`
#ffffff (dark #0f1115 / #16181d), hairlines at 10% ink, one indigo for selection, focus and state,
system sans at 13px for structure and ui-monospace for every reading, 12px panels, depth from the
ground change. The shared sheet now binds both schemes once with `light-dark()` against a
`data-theme` attribute, so a single override reaches this page and the card's shadow root alike.

STORY: someone working late opens Settings, sets Appearance to Dark, and the page and the card at
every granted site go dark together; at the end of a sandbox they read `4 sites · 9 items` in the
rail and on the rows before pressing Clear everything, and the toast tells them what went.

FIRST VIEWPORT: the 46px bar gains a third tab, Settings, after Items and Sites, with no count
pill. Below it the 292px rail on `--surface` lists the settings sections as index rows — title with
the current reading in mono beneath (`system`, `4 sites · 9 items`) — and the editor on `--bg` holds
the selected section in an 860px-capped panel: Appearance is one row, label and note left, the
System/Light/Dark segmented control right; Data is one panel whose rows each carry a count pill, the
consequence in 11.5px muted prose, and a danger button in the same right-hand slot.

FORM: inherited — the extension's own world, no tournament. The addition joins the surrounding
experience by reusing the rail row, panel, section-head, count pill, segmented control and armed
danger button as the Sites and Items views already use them; the only new primitives are the ruled
setting row (`.setting-row`, hairline-separated, label and note left, control right) and the section
index.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
verdict, and the DESIGN.md facts this pass touches brought back in line with the shipped build.
