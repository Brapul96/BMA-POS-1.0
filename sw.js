const CACHE = 'bma-minimarket-v35';
const ASSETS = ['./','./index.html','./styles.css','./app.js','./manifest.json','./logo-96.png','./logo-192.png','./logo-512.png','./icon.svg','./payment-cash.svg','./payment-card.svg','./payment-yape.svg','./payment-mixed.svg'];
const NETWORK_FIRST = new Set(['./','./index.html','./app.js','./styles.css','./manifest.json']);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  const path = new URL(event.request.url).pathname.replace(/\\/g, '/');
  const networkFirst = NETWORK_FIRST.has('.' + path.substring(path.lastIndexOf('/')) ) || /\/(index\.html|app\.js|styles\.css|manifest\.json)$/.test(path);
  event.respondWith(
    (networkFirst ? fetch(event.request).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
    : caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
