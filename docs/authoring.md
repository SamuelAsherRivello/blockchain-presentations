# Slidev authoring guide

This workspace contains seven public Slidev decks that share the local **Mondrian** theme: the Modrian Template catalog, Blockchain for Game Designers, Blockchain for Game Developers, Bitcoin for Games, Tease Subdeck, Games Subdeck, and Outro. Their public routes are declared in `presentations/scripts/live-preview-manifest.mjs`. Each content slide selects a named layout through frontmatter and supplies its own content and declared slots.

`presentations/themes/mondrian` is the source of truth for layouts, shared components, responsive styling, and interactive-image behavior. See its [layout catalog](../presentations/themes/mondrian/layout-catalog.json) and [theme guide](../presentations/themes/mondrian/README.md). The decks do not inherit Markdown from each other; this is Slidev's supported theme-and-layout model.

Layout geometry belongs in the corresponding theme component, never in a catalog-only class. For example, `mondrian-image-bottom` owns its title, subtitle, and image-pane anchor positions, so a change automatically applies to every deck slide that selects it. `verify:rendered-layouts` checks each Blockchain slide against its mapped catalog example and compares shared Image Bottom text anchors, catching a catalog-only position override before review.

## Run the local approval preview

From this folder, start or reuse the single supervised authoring runtime:

```powershell
npm run dev:stable-preview
```

Open `http://localhost:3032/`. The launcher uses a pathname for the deck and Slidev currently uses a hash for the selected slide. For example, open `http://localhost:3032/slidev/blockchain-for-game-designers/29#/29` to select slide 29. The pending `update-url` OpenSpec change will make pathname-only slide links canonical. The landing page links to all seven public decks. The launcher on port 3032 proxies the deck servers declared in the manifest with no-cache headers for review.

Use `npm run preview:status` for the supervisor state and `npm run
verify:live-preview:proxy` for a non-authoring editor-routing check. Do not
start individual `dev:*` commands alongside the supervisor: it owns their
ports and will report an unowned conflict rather than replacing a listener.

Before moving, duplicating, editing, renaming, creating, linking,
resynchronizing, or changing a slide layout, use the `slidev-run` workflow to
start or reuse this runtime. The focused author-operation workflows then act
on a manifest-declared deck and check its existing shared-origin route; they
do not start a second preview server.

## Layout contract and verification

Use `layout: mondrian-*` in a declared content deck. `templateLayout` and `catalogSlide` are generated, reviewable metadata: authors may select `catalogExample` when a layout has more than one catalog example, but must not hand-maintain page numbers. The contract check audits every declared Mondrian deck and fails when a slide selects a non-Mondrian layout, maps to a different layout than it renders, maps to an example absent from the catalog, or declares another theme.

Every declared Mondrian `dev:*` and `build:*` command runs `sync:layout-mappings` first. It resolves `modrian-template.md` to the canonical catalog, discovers the matching deck entries from `package.json`, refreshes the layout catalog, and updates their generated mapping metadata. A direct `slidev` CLI invocation bypasses that supported lifecycle and is caught by the contract check.

Use `npm run sync:layout-mappings` as the explicit fallback after a suspected mismatch. It validates the complete catalog and declared deck inventory before writing any mapping metadata, then verifies the layout contract. An unknown layout or invalid catalog example stops the operation before a partial mapping set is written.

```powershell
npm run verify:layout-contract
npm run verify:layout-contract:self-test
npm run verify:layout-mappings:self-test
npm run sync:layout-mappings
npm run build:decks
npm run verify:rendered-layouts
```

`verify:rendered-layouts` requires the two Slidev servers above. It uses Playwright Chromium to compare all mapped Blockchain slides to their catalog layout and writes review screenshots under `output/screenshots/resync-deck-to-match-template/`.

The reusable safe-area coordinates remain documented in [the safe-area guide](../documentation/riverside-safe-area-guides.md); the final theme deliberately contains no visible guide overlay. The public build is published by this repository’s GitHub Pages workflow.
