# Save Book

Keep the logins, codes and numbers you need on a specific website one click away, without leaving
the page. A small, draggable card shows your saved items on the sites you choose — and nowhere else.

![The Save Book card open on a staging sign-in page](store/screenshot-1-card.jpg)

## What it does

- You pick the sites; each one gets its own list of items — a label plus a value, or a masked secret.
- On those sites, and only those, the card appears. Click a row to copy the value.
- Drag the card wherever suits you. Position, collapsed state and visibility are remembered per site.
- Everything is configured in the extension's settings page. Toggle the card from the toolbar icon.

## Install for testing

No toolchain needed: download `save-book-<version>.zip` from the
[latest release](../../releases/latest), unzip it, then open `chrome://extensions`, enable
**Developer mode**, click **Load unpacked**, and select the unzipped folder — the one that directly
contains `manifest.json`. It has to be unzipped first: Chrome cannot load an extension from a zip.

To build it yourself instead:

```sh
bun install
bun run build
```

Then load the `dist/` folder the same way. `bun run package` builds and produces
`release/save-book-<version>.zip` locally.

Then open the extension's options page, add a domain, and approve Chrome's prompt for that host.

## How it works

- The manifest requests **no host permissions**. Access is requested at runtime, one domain at a
  time, when you add it in the settings page.
- The service worker registers the content script only for granted, enabled domains, and hands the
  permission back when that site is removed.
- The card renders into a shadow root, so the host page's CSS cannot reach it, and it stops click
  propagation so pages never observe interaction with it.
- Items live in `chrome.storage.local`. There is no server and no network code.

## Development

```sh
bun install         # the committed lockfile is bun's; npm works too
bun run build       # dist/ — load this folder as an unpacked extension
bun run watch       # rebuild the content script on change
bun run typecheck   # tsc --noEmit
bun run package     # build + release/save-book-<version>.zip
```

```
src/
  background/   service worker — keeps registered content scripts in sync
  content/      the on-page card
  options/      the settings page
  shared/       schema, storage, host matching, item registry
  ui/           shared components and design tokens
store/          Chrome Web Store listing assets (icon, screenshots, promo tiles)
```

## Releasing

Releases are cut manually from the **Release** workflow — **Actions → Release → Run workflow**:

1. Bump `version` in `public/manifest.json` and commit it.
2. Run the workflow. It typechecks, then refuses to continue unless the version is
   `MAJOR.MINOR.PATCH` and strictly higher than every existing `v*` tag, so a version can never be
   reused or moved backwards.
3. It builds, attaches `save-book-<version>.zip` to a new release tagged `v<version>`, and that same
   zip is what you upload to the Chrome Web Store dashboard.

Set **dry_run** to typecheck, validate and build without creating the tag or release.

## Privacy

Nothing you save leaves your browser. See [PRIVACY.md](PRIVACY.md) for the full policy, including
the caveat that items are stored unencrypted in your browser profile — which makes this a good fit
for test and shared accounts rather than production credentials.

Bug reports and suggestions are welcome as issues.

## License

[MIT](LICENSE) © 2026 Piotr Roszkowski
