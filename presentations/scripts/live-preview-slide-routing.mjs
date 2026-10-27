// Numbered preview URLs keep the same pathname as public deep links. Hash-mode
// decks need the selected slide set before Slidev creates its client router.
export function bootstrapSlideDocument(html, slide) {
  const bootstrap = `<script>if (!location.hash) history.replaceState(null, '', location.pathname + location.search + '#/${slide}')</script>`
  return html.replace(/<head\b[^>]*>/i, (head) => head + bootstrap)
}

export function serveHashSlideDocuments(entries, fetchDocument = fetch) {
  return async (request, response, next) => {
    if (request.method !== 'GET') return next()
    const url = new URL(request.url ?? '/', 'http://localhost')
    const entry = entries.find((candidate) => url.pathname.startsWith(candidate.base))
    if (!entry) return next()
    const route = url.pathname.slice(entry.base.length)
    if (route && !/^[1-9]\d*\/?$/.test(route)) return next()
    const slide = route ? Number(route.replace(/\/$/, '')) : 1
    if (!Number.isSafeInteger(slide)) return next()

    try {
      const upstream = await fetchDocument(`http://localhost:${entry.port}${url.pathname}${url.search}`, {
        signal: AbortSignal.timeout(8_000),
      })
      const html = await upstream.text()
      response.statusCode = upstream.status
      response.setHeader('content-type', upstream.headers.get('content-type') ?? 'text/html; charset=utf-8')
      response.setHeader('cache-control', 'no-store, max-age=0')
      response.end(upstream.ok && /text\/html/i.test(upstream.headers.get('content-type') ?? '')
        ? bootstrapSlideDocument(html, slide)
        : html)
    }
    catch (error) { next(error) }
  }
}
