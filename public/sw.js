// Prime Digital Mall service worker — offline shell + fast repeat loads.
// Cache-first for static assets, network-first for navigations (fresh content,
// offline fallback). Scope is derived from the SW's own location, so it works
// at root or under a project sub-path automatically.

const VERSION = 'pdm-v1'
const SCOPE = self.registration.scope // e.g. https://host/Prime-Digital-Mall/
const OFFLINE_URL = new URL('./', SCOPE).pathname

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll([OFFLINE_URL]).catch(() => {})),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Navigations: network-first, fall back to cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(VERSION).then((c) => c.put(request, copy)).catch(() => {})
          return res
        })
        .catch(() => caches.match(request).then((r) => r || caches.match(OFFLINE_URL))),
    )
    return
  }

  // Static assets (_next, images, css, js): cache-first.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((res) => {
          if (res.ok && (url.pathname.includes('/_next/') || /\.(css|js|png|svg|woff2?|webmanifest)$/.test(url.pathname))) {
            const copy = res.clone()
            caches.open(VERSION).then((c) => c.put(request, copy)).catch(() => {})
          }
          return res
        }),
    ),
  )
})
