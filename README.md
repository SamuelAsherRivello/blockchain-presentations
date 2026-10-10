<p>
<img src="https://raw.githubusercontent.com/SamuelAsherRivello/blockchain-integration-service/main/BIS/documentation/samuel-asher-rivello-banner.png?v=20261010" alt="Samuel Asher Rivello" width="600" /><br /><br />
<img src="https://raw.githubusercontent.com/SamuelAsherRivello/blockchain-integration-service/main/BIS/documentation/bis-marketing.png?v=20261010-marketing" alt="Blockchain Integration Service marketing image" width="600" />
</p>

# Blockchain Presentations

Developer focused Slidev presentations about the Blockchain Integration Service, Bitcoin, and games. Seven published decks share a local Mondrian theme and a route manifest.

**[Open the presentation landing page](https://samuelasherrivello.github.io/blockchain-presentations/)**

## Public decks

The [route manifest](presentations/scripts/live-preview-manifest.mjs) declares the public decks and versions: Modrian Template, Blockchain for Game Designers, Blockchain for Game Developers, Bitcoin for Games, Tease Subdeck, Games Subdeck, and Outro. `presentations/themes/mondrian` supplies their shared layouts and components.

## Run locally

Install Node.js 24 or newer, then run these commands from the repository root:

```powershell
npm ci
npm run dev:stable-preview
```

Open `http://localhost:3032/`. The supervised launcher starts the declared deck servers and serves local slide routes such as `http://localhost:3032/slidev/blockchain-for-game-designers/29#/29`. Run `npm run preview:status` to inspect the supervisor. See the [authoring guide](docs/authoring.md) for layout and editing conventions.

## Verify and build

```powershell
npm run verify:layout-contract
npm run verify:layout-contract:self-test
npm run verify:layout-mappings:self-test
npm run build:public
```

The public build is written to `dist/public/`. Temporary preview logs, browser reports, and screenshots go under the ignored `output/` directory. The [Pages workflow](.github/workflows/deploy-pages.yml) checks the layout contract, builds all public decks, and publishes `dist/public/` when `main` is pushed.

## Related projects

- [Blockchain Integration Service](https://github.com/SamuelAsherRivello/blockchain-integration-service) supplies the application discussed in the decks.
- [Blockchain Stealth & Steel Game](https://github.com/SamuelAsherRivello/blockchain-stealth-and-steel-game) is the companion game project.

## Original AI Prompt

The repository extraction was requested in a Codex conversation on 2026-10-08. A shareable URL for the initiating prompt was not provided.
