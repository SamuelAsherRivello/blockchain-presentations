# Proposal

## Why

The repository is partway through a presentation-focused reorganization, but its Slidev commands, manifest, relative asset paths, and verification scripts still assume the old root-level locations. The change should finish the organization and add regression coverage so a folder move cannot silently break Slidev startup or landing-page navigation.

## What Changes

- Complete the `presentations/` structure for shared assets, components, fixtures, launcher files, public files, scripts, setup code, and themes.
- Organize presentation Markdown under `presentations/content/decks/` and `presentations/content/templates/`.
- Move the three repository-level operational and architecture notes into a new root-level `documentation/` folder.
- Update Slidev package commands, the live-preview manifest, Vite configuration, scripts, tests, documentation links, and relative Markdown references to the new paths.
- Add or strengthen automated checks that verify the landing page exposes the declared links and that every discovered local landing-page link reaches a healthy Slidev route.
- Run the route and Slidev startup checks after the reorganization, including the existing fast and integration preview verification where the local environment supports them.

## Capabilities

### New Capabilities

None. This is a repository-structure and verification change that preserves the existing presentation and preview behavior.

### Modified Capabilities

None. The existing `slidev-theme-layout-contract` requirements remain the behavior being protected; their implementation paths are changing, not their requirements.

## Impact

- Affects the root-relative npm scripts and all files under `presentations/`.
- Affects local preview startup on port 3032 and the independently served Slidev deck ports.
- Affects public build source resolution and GitHub Pages asset copying.
- Affects documentation links and OpenSpec task references that name moved files.
- No public route names, deck IDs, or GitHub Pages base URL should change.
