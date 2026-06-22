/* Spoor service worker — lets the app open offline and keeps photos
   you've already seen available without signal (handy in the bush). */
const SHELL = "spoor-shell-v2";
const IMGS  = "spoor-imgs-v1";
const SHELL_FILES = [
  "./",
  "index.html",
  "manifest.json",
  "icon-180.png",
  "icon-192.png",
  "icon-512.png"
];

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

  // Wikimedia photos: cache-first, then network (so seen images work offline)
  if (url.hostname.endsWith("wikimedia.org") || url.hostname.endsWith("wikipedia.org")) {
    e.respondWith(
      caches.open(IMGS).then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res && (res.status === 200 || res.type === "opaque")) cache.put(req, res.clone());
          return res;
        } catch (err) {
          return hit || Response.error();
        }
      })
    );
    return;
  }

  // App shell: cache-first, fall back to network
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  }
});
