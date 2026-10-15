import { existsSync } from 'node:fs'
import { chromium } from 'playwright-chromium'

const executable = chromium.executablePath()
if (!existsSync(executable)) {
  throw new Error(`Chromium is not installed at ${executable}. Run npm exec playwright install chromium.`)
}

const browser = await chromium.launch({ headless: true })
await browser.close()
process.stdout.write('Playwright Chromium is ready.\n')
