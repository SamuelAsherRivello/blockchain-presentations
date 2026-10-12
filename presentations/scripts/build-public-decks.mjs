import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { spawn } from 'node:child_process'
import { publicPreviews } from './live-preview-manifest.mjs'

const slidevRoot = resolve(import.meta.dirname, '..', '..')
const destination = resolve(slidevRoot, 'dist', 'public')
const pagesBase = '/blockchain-presentations'
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'

async function renderedSlideCount(source) {
  const sourcePath = resolve(slidevRoot, source)
  const content = await readFile(sourcePath, 'utf8')
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(content)
  const delegatedSource = frontmatter?.[1].match(/^src:\s*\.\/(.+)$/m)?.[1]
  if (delegatedSource) {
    const delegatedPath = resolve(dirname(sourcePath), delegatedSource)
    return renderedSlideCount(relative(slidevRoot, delegatedPath))
  }
  const body = frontmatter ? content.slice(frontmatter[0].length) : content
  return 1 + (body.match(/^---\s*$/gm) ?? []).length
}

async function materializeDeepLinks(deck) {
  const deckOutput = resolve(destination, deck.id)
  const shell = resolve(deckOutput, 'index.html')
  const shellHtml = await readFile(shell, 'utf8')
  if (!shellHtml.includes('<head>')) throw new Error(`${deck.id}: missing HTML head`)
  const total = await renderedSlideCount(deck.source)
  await Promise.all(Array.from({ length: total }, async (_, index) => {
    const slide = index + 1
    const slideDirectory = resolve(deckOutput, String(slide))
    await mkdir(slideDirectory, { recursive: true })
    // Slidev currently uses hash routing. Set the requested slide before its app boots.
    const bootstrap = `<script>if (!location.hash) history.replaceState(null, '', location.pathname + location.search + '#/${slide}')</script>`
    await writeFile(resolve(slideDirectory, 'index.html'), shellHtml.replace('<head>', '<head>' + bootstrap))
  }))
}

await rm(destination, { recursive: true, force: true })
await mkdir(destination, { recursive: true })

for (const deck of publicPreviews()) {
  await new Promise((resolveBuild, rejectBuild) => {
    // Each deck declares its local theme in front matter. Passing a second
    // --theme here makes Slidev resolve the theme twice during production
    // builds, which silently drops the custom Mondrian layouts.
    const child = spawn(npx, ['slidev', 'build', resolve(slidevRoot, deck.source), '--base', `${pagesBase}/${deck.id}/`, '--out', resolve(destination, deck.id)], {
      cwd: slidevRoot, shell: process.platform === 'win32',
      stdio: 'inherit',
    })
    child.once('error', rejectBuild)
    child.once('exit', (code) => code === 0 ? resolveBuild() : rejectBuild(new Error(`${deck.id}: Slidev build exited ${code}`)))
  })
  // Slidev preserves frontmatter image URLs such as `../../assets/...` instead of
  // bundling them. Publish the shared source tree beneath every deck base so
  // those URLs resolve on GitHub Pages as well as in local preview.
  await cp(resolve(slidevRoot, 'presentations/assets'), resolve(destination, deck.id, 'assets'), { recursive: true })
  await materializeDeepLinks(deck)
}

await import('./build-public-landing.mjs')
