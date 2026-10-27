import assert from 'node:assert/strict'
import test from 'node:test'
import { runInNewContext } from 'node:vm'
import { bootstrapSlideDocument, serveHashSlideDocuments } from './live-preview-slide-routing.mjs'

const deck = { base: '/slidev/example/', port: 3051 }
const html = '<!doctype html><html><head><script type="module" src="/client.js"></script></head><body></body></html>'

test('numbered documents select the slide before the client module runs', () => {
  const result = bootstrapSlideDocument(html, 29)
  assert.ok(result.indexOf('history.replaceState') < result.indexOf('type="module"'))
  const script = /<script>(.*?)<\/script>/.exec(result)[1]
  for (const hash of ['', '#/7']) {
    let replacedUrl
    runInNewContext(script, {
      location: { pathname: '/slidev/example/29', search: '?review=1', hash },
      history: { replaceState: (_state, _title, url) => { replacedUrl = url } },
    })
    assert.equal(replacedUrl, hash ? undefined : '/slidev/example/29?review=1#/29')
  }
})

test('only slide documents are bootstrapped, leaving modules, assets and editor requests to the proxy', async () => {
  for (const [method, url] of [
    ['GET', '/slidev/example/@vite/client'], ['GET', '/slidev/example/assets/image.png'],
    ['GET', '/slidev/example/export'], ['GET', '/slidev/example/0'],
    ['GET', '/slidev/history-deck/1'], ['POST', '/slidev/example/1'],
  ]) {
    let forwarded = false
    await serveHashSlideDocuments([deck], () => assert.fail('unexpected fetch'))({ method, url }, {}, () => { forwarded = true })
    assert.equal(forwarded, true, `${method} ${url}`)
  }
})

test('proxy returns bootstrapped HTML for first slides, deep links and trailing slashes', async () => {
  for (const [route, slide] of [['', 1], ['1', 1], ['29/?review=1', 29]]) {
    const headers = {}
    let body
    const response = { setHeader: (key, value) => { headers[key] = value }, end: (value) => { body = value } }
    const serve = serveHashSlideDocuments([deck], async (url) => {
      assert.equal(url, `http://localhost:3051${deck.base}${route}`)
      return new Response(html, { headers: { 'content-type': 'text/html' } })
    })
    await serve({ method: 'GET', url: deck.base + route }, response, (error) => { throw error ?? new Error('unexpected fallback') })
    assert.equal(response.statusCode, 200)
    assert.equal(headers['cache-control'], 'no-store, max-age=0')
    assert.equal(body, bootstrapSlideDocument(html, slide))
  }
})

test('upstream failures retain their status and body', async () => {
  let body
  const response = { setHeader() {}, end(value) { body = value } }
  await serveHashSlideDocuments([deck], async () => new Response('Unavailable', { status: 503 }))(
    { method: 'GET', url: deck.base + '1' }, response, assert.fail,
  )
  assert.equal(response.statusCode, 503)
  assert.equal(body, 'Unavailable')
})
