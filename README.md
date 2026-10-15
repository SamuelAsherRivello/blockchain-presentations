<a href="https://github.com/SamuelAsherRivello/blockchain-presentations"><img src="https://raw.githubusercontent.com/SamuelAsherRivello/blockchain-integration-service/main/BIS/documentation/samuel-asher-rivello-banner.png?v=20261010" width="640" alt="Samuel Asher Rivello" /></a>

[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/SamuelAsherRivello/blockchain-presentations/deploy-presentations.yml?label=GitHub%20Actions)](https://github.com/SamuelAsherRivello/blockchain-presentations/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![OpenSpec](https://img.shields.io/badge/OpenSpec-enabled-6B46C1)](https://github.com/Fission-AI/OpenSpec)
[![Slidev](https://img.shields.io/badge/Slidev-53-4B6EAF)](https://sli.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

# Blockchain Presentations

Developer-focused Slidev presentations about the Blockchain Integration Service, Bitcoin, and games, using a shared Mondrian theme and manifest-backed routes.

## Original AI Prompt

<details>
<summary>Read the project origin</summary>

```text
Extract the Slidev presentations from the Blockchain Integration Service into a dedicated public repository while preserving their decks, layouts, assets, local preview routes, and GitHub Pages publication.
```

</details>

## Live Demo

- [Blockchain Presentations landing page](https://samuelasherrivello.github.io/blockchain-presentations/)

## Images

The public decks include Teaser, Games, Bitcoin, and Blockchain Integration Service presentation views.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Details](#project-details)
3. [Credits](#credits)

## Getting Started

The repository root is the npm project root.

### 🛠 Build Project

1. Install dependencies with `npm ci`.
2. Run `npm run build:public` to build every public deck and the Pages landing artifact.
3. Find the generated site under `dist/public/`.

### 🛠 Run Project

1. Run `npm run dev` to start the Vite landing server on port 3032.
2. Open `http://localhost:3032/`; the root redirects to `/slidev/landing-page/`.
3. Run an individual declared `dev:*` script for a focused Slidev deck preview.

### 🛠 Verify Project

1. Run `npm run sync:layout-mappings` after layout or catalog changes.
2. Run `npm run verify:layout-contract` to validate the Mondrian layout contract.
3. Run the focused layout self-tests when changing the manifest or catalog.

### 🛠 Release Version

1. Run the verification commands and `npm run build:public` from the repository root.
2. Push verified changes to `main`.
3. The GitHub Pages workflow publishes `dist/public/`.

## Project Details

This repository contains the presentation source, shared theme, assets, local preview launcher, and public-deployment scripts.

### 🤖 AI

- [Authoring guide](docs/authoring.md) describes the deck workflow and layout conventions.
- [Slidev server notes](docs/slidev-server-issues.md) records local preview diagnostics and known constraints.

### 🧠 Deep Dive

- [Layout catalog](presentations/themes/mondrian/layout-catalog.json) defines the reusable Mondrian layout contract.
- [Live preview manifest](presentations/scripts/live-preview-manifest.mjs) is the source of truth for local and public routes.

### 📦 Packages

- [Slidev](https://sli.dev/) provides the presentation runtime and production builds.
- [Vite](https://vite.dev/) provides the local landing server and route proxy.
- [OpenSpec](https://github.com/Fission-AI/OpenSpec) stores tracked presentation planning and specifications.

### 📝 Structure

- `presentations/content/` contains deck Markdown and source content.
- `presentations/themes/` contains the shared Mondrian layouts and styles.
- `presentations/assets/` and `presentations/public/` contain presentation-owned media and public files.
- `presentations/scripts/` contains manifest, verification, build, and deployment helpers.

## Credits

### 💡 Contributors

- Samuel Asher Rivello — game development and presentation direction.

### 💡 Related Projects

- [Blockchain Integration Service](https://github.com/SamuelAsherRivello/blockchain-integration-service)
- [Blockchain Stealth & Steel Game](https://github.com/SamuelAsherRivello/blockchain-stealth-and-steel-game)

### 💡 Contact

- [LinkedIn.com/in/SamuelAsherRivello](https://www.linkedin.com/in/SamuelAsherRivello)
- [GitHub.com/SamuelAsherRivello](https://github.com/SamuelAsherRivello)
- [SamuelAsherRivello.com](http://www.samuelasherrivello.com)

### 💡 License

- Provided as-is under the [MIT License](LICENSE).
