# Tasks

## 1. Complete the presentation and documentation layout

- [x] 1.1 Move shared presentation folders into `presentations/` and verify that `assets/`, `components/`, `fixtures/`, `launcher/`, `public/`, `scripts/`, `setup/`, and `themes/` exist only at their intended locations.
- [x] 1.2 Split `presentations/content/` into `decks/` and `templates/`, place each current Markdown source in the appropriate directory, and verify every manifest and package source has a corresponding file.
- [x] 1.3 Create the root-level `documentation/` folder and move `slidev-server-issues.md`, `riverside-safe-area-guides.md`, and `consolidated-runtime-evaluation.md` into it; verify all repository links and OpenSpec references resolve to the new paths.
- [x] 1.4 Update relative theme, asset, component, fixture, launcher, and public-resource references for the new nesting and verify a repository-wide path scan reports no references to the old locations.

## 2. Update runtime configuration and route-aware tests

- [x] 2.1 Update npm scripts, Vite configuration, preview helpers, build helpers, layout checks, and test imports to resolve the repository root and the new `presentations/` paths; verify the manifest preflight passes.
- [x] 2.2 Update the live-preview manifest to use the new deck, template, and fixture source paths while preserving every existing ID, port, base route, landing group, and public visibility; verify the manifest unit tests pass.
- [x] 2.3 Strengthen landing-page verification to compare discovered internal links with the manifest’s visible routes and confirm each linked response is a healthy Slidev page; verify the test fails for a missing, extra, or non-Slidev landing link.
- [x] 2.4 Add or update startup smoke coverage so the declared Slidev services are checked directly, through the port-3032 launcher, and through Vite HMR after the move; verify the check reports service-specific failures.
- [x] 2.5 Update authoring and operational documentation for the new paths and verify every documented command and link points to an existing file or declared route.

## 3. Run post-migration integration verification

- [x] 3.1 Start the supervised local preview from the repository root and verify the landing page loads on port 3032 with every declared public link responding successfully.
- [x] 3.2 Run the manifest, policy, readiness, coherence, diagnostics, landing, and proxy tests and verify they pass against the reorganized tree.
- [x] 3.3 Run the Mondrian layout-contract verification and verify all declared content decks still resolve their template mappings and theme assets.
- [x] 3.4 Run the public build and verify generated output is written under `dist/public/` with representative deep links and copied assets present.
- [x] 3.5 Run `git diff --check` and review the final repository-root ASCII structure to verify the change contains only the requested reorganization, path updates, tests, documentation, and OpenSpec artifacts.
