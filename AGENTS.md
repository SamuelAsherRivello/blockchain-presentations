# Repository guidance

## Scope

This repository owns the Slidev decks, themes, assets, authoring runtime, and GitHub Pages publication for Blockchain Presentations. Keep public decks declared in `presentations/scripts/live-preview-manifest.mjs`; use that manifest when adding or changing a public route.

The repository root is the npm project root. Run setup, preview, checks, and builds from here. The local supervised launcher uses port 3032 and `/slidev/<deck>/<slide>` routes. The public build uses `/blockchain-presentations/` as its GitHub Pages base.

## Source and generated files

Keep deck Markdown under `presentations/content/`, with `presentations/themes/`, `presentations/components/`, `presentations/assets/`, `presentations/public/`, `presentations/launcher/`, `presentations/setup/`, and `presentations/scripts/` in the repository. Put temporary logs, screenshots, and reports under `output/<category>/<task>/`; do not commit them. Do not commit `node_modules/` or `dist/`.

`presentations/themes/mondrian` owns shared geometry. Run `npm run sync:layout-mappings` after layout edits and `npm run verify:layout-contract` before publishing. Keep teaser screenshots in `presentations/assets/tease/` so the decks build without another repository's raw file URLs.

## OpenSpec

The tracked planning root is `openspec/`. Keep active presentation changes in `openspec/changes/` and accepted specifications in `openspec/specs/`. Use generated OpenSpec skills and the installed CLI; do not hand edit generated skill files.

## GitHub

The Pages workflow publishes `dist/public/` from `main`. Verify a local public build and representative deep links before calling a publication complete. Do not create a pull request unless the user explicitly requests one.
