/* Spoor service worker.
   Network-first for the app shell so new deploys show up immediately,
   cache-first for Wikipedia photos so seen images work offline in the bush. */
const SHELL = "spoor-shell-v3";
const IMGS  = "spoor-imgs-v2";
const SHELL_FILES = ["./","index.html","manifest.json","icon-180.png","icon-192.png","icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== SHELL && k !== IMGS).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);

  // Wikipedia / Wikimedia: cache-first (photos + api results)
  if (url.hostname.endsWith("wikimedia.org") || url.hostname.endsWith("wikipedia.org")) {
    e.respondWith(
      caches.open(IMGS).then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res && (res.status === 200 || res.type === "opaque")) cache.put(req, res.clone());
          return res;
        } catch (err) { return hit || Response.error(); }
      })
    );
    return;
  }

  // App shell on our own origin: NETWORK-FIRST so updates always apply
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(SHELL).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match("index.html")))
    );
  }
});
