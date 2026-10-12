import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { landingLabelFor, publicPreviews } from './live-preview-manifest.mjs'

const slidevRoot = resolve(import.meta.dirname, '..', '..')
const destination = resolve(slidevRoot, 'dist', 'public')
const template = await readFile(resolve(slidevRoot, 'presentations/launcher', 'index.html'), 'utf8')
const publicBase = '/blockchain-presentations'

const previews = await Promise.all(publicPreviews().map(async (entry) => ({ entry, label: await landingLabelFor(entry) })))
const links = Object.entries(Object.groupBy(previews, ({ entry }) => entry.group))
  .map(([group, entries]) => `<section aria-labelledby="${group.toLowerCase()}-heading"><h2 id="${group.toLowerCase()}-heading">${group}</h2>${entries.map(({ entry, label }) => `<a href="${publicBase}/${entry.id}/#/1?v=${entry.version}">${label} <small>v${entry.version}</small></a>`).join('')}</section>`)
  .join('')

await mkdir(destination, { recursive: true })
await cp(resolve(slidevRoot, 'presentations/launcher', 'favicon-slidev-presentations.svg'), resolve(destination, 'favicon-slidev-presentations.svg'))
await writeFile(
  resolve(destination, 'index.html'),
  template
    .replace('href="/favicon-slidev-presentations.svg"', 'href="./favicon-slidev-presentations.svg"')
    .replace('<!-- preview-links -->', links),
)

// Keep an easy-to-remember public alias while preserving the repository-root
// landing URL used by existing links and bookmarks.
const landingAlias = resolve(destination, 'slidev', 'landing-page')
await mkdir(landingAlias, { recursive: true })
await cp(resolve(destination, 'index.html'), resolve(landingAlias, 'index.html'))
await cp(resolve(destination, 'favicon-slidev-presentations.svg'), resolve(landingAlias, 'favicon-slidev-presentations.svg'))
