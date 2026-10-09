# Design

## Context

The repository is already an npm-root Slidev workspace with a manifest-backed
landing proxy. The earlier structural move placed shared presentation folders
under `presentations/` and deck Markdown under `presentations/content/`, but
the move is incomplete: the deck/template split and root-level
`documentation/` folder are still pending, and runtime paths still point at
the previous locations.

## Goals / Non-Goals

**Goals:**

- Make `presentations/` the home for presentation runtime code and resources.
- Separate runnable deck content from reusable template content.
- Keep the npm project root, public route IDs, preview ports, and GitHub Pages
  base unchanged.
- Make the landing-page verification derive expected routes from the existing
  live-preview manifest and verify that each route responds as a Slidev page.
- Preserve the existing supervised preview checks for direct servers, the
  launcher proxy, and Vite HMR readiness.

**Non-Goals:**

- No new public decks, routes, themes, or runtime dependencies.
- No change to the existing Mondrian layout-contract requirements.
- No redesign of the launcher or migration to a multi-entry Slidev server.

## Decisions

1. **Keep the npm root at the repository root.** Package scripts continue to
   run from the repository root, while their source paths explicitly point into
   `presentations/`. This preserves the existing commands and output locations.

2. **Use two content directories.** Runnable deck and subdeck Markdown goes in
   `presentations/content/decks/`; Slidev layout references and wrappers go in
   `presentations/content/templates/`. Moved deck frontmatter will use paths
   relative to its new directory, such as `../../themes/mondrian` and
   `../../assets/...`.

3. **Keep operational notes in a root-level `documentation/` folder.** The
   three notes are project documentation rather than Slidev content. Existing
   links and OpenSpec references will be updated to their new paths.

4. **Keep manifest entries authoritative.** Manifest `source` values will
   become repository-root-relative paths such as
   `presentations/content/decks/blockchain-for-game-designers.md`. The
   manifest will remain the source for landing labels, proxy ownership, and
   route expectations.

5. **Strengthen landing verification at two levels.** The existing unit tests
   will validate that every manifest source resolves and that every visible
   entry has a canonical route. The running landing verifier will parse the
   actual landing HTML, require exactly the declared visible routes, request
   every discovered route, and confirm each response contains Slidev page
   markers. The existing supervised readiness checks will continue to confirm
   direct Slidev startup, proxied startup, and HMR for the declared services.

6. **Use existing test infrastructure.** Tests remain Node test files and
   existing fetch/Playwright checks. No new dependency is needed. The final
   verification will start the local preview, run landing-link and fast
   readiness checks, and run the broader integration check when the environment
   permits it.

## Risks / Trade-offs

- [Risk] Relative Markdown paths can silently break after the extra
  `content/decks` and `content/templates` level → Update frontmatter and scan
  all moved Markdown references before running Slidev.
- [Risk] A stale hard-coded path in a helper script can pass unit tests while
  breaking a public build → Run manifest, layout-contract, public-build, and
  landing-preview checks after the move.
- [Risk] Full integration verification requires local ports and a browser
  runtime → Keep fast static/manifest checks separate and report integration
  prerequisites clearly when the supervised preview cannot start.
