import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const slidevDirectory = resolve(scriptDirectory, '..', '..')
const deckFiles = [
  'presentations/content/templates/template-deck-b.md',
  'presentations/content/decks/blockchain-for-game-designers.md',
  'presentations/content/decks/blockchain-for-game-developers.md',
  'presentations/content/decks/bitcoin-for-game-development.md',
  'presentations/content/decks/tease-subdeck.md',
  'presentations/content/decks/games-subdeck.md',
  'presentations/content/decks/outro.md',
]
const terminalPunctuation = /[.!?;:]$/u
const violations = []

for (const deckFile of deckFiles) {
  const lines = readFileSync(resolve(slidevDirectory, deckFile), 'utf8').split(/\r?\n/)
  let inFence = false

  lines.forEach((line, index) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      return
    }
    if (inFence || !/^\s*[-*+]\s+/.test(line)) return

    const bulletText = line.replace(/^\s*[-*+]\s+/, '').trim()
    if (terminalPunctuation.test(bulletText))
      violations.push(`${deckFile}:${index + 1} ends with punctuation`)
  })
}

if (violations.length > 0) {
  console.error('Slide bullets must not end with punctuation:')
  violations.forEach((violation) => console.error(`- ${violation}`))
  process.exitCode = 1
} else {
  console.log('Slide bullet-style verification passed.')
}
