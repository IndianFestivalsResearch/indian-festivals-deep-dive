// ═══════════════════════════════════════════════════════════
// Tides of Devotion — Service Worker (Offline-First)
// ═══════════════════════════════════════════════════════════
const CACHE = 'tdod-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/changelog.html',
  '/contribute.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json',
  '/blog/',
  '/blog/index.html',
  '/blog/sambat-jalana.html',
  '/festivals/',
  '/festivals/index.html',
  '/festivals/diwali.html',
  '/festivals/holi.html',
  '/festivals/durga-puja-navaratri-dussehra.html',
  '/festivals/eid-ul-fitr-eid-ul-adha.html',
  '/festivals/onam.html',
  '/festivals/kumbh-mela.html',
  '/festivals/rath-yatra.html',
  '/festivals/muharram-ashura.html',
  '/festivals/chhath-puja.html',
  '/festivals/baisakhi-vaisakhi.html',
  '/festivals/ganesh-chaturthi.html',
  '/festivals/krishna-janmashtami.html',
  '/festivals/maha-shivaratri.html',
  '/festivals/raksha-bandhan.html',
  '/festivals/makar-sankranti-pongal.html',
  '/festivals/gurpurab-guru-nanak-jayanti.html',
  '/festivals/mahavir-jayanti.html',
  '/festivals/buddha-purnima.html',
  '/festivals/christmas-in-india.html',
  '/festivals/eid-e-milad-un-nabi.html',
  '/festivals/nowruz-jamshedi-navroz.html',
  '/festivals/hornbill-festival.html',
  '/festivals/sarhul-karma.html',
  '/festivals/bonalu-bathukamma.html',
  '/festivals/indian-new-year.html',
  '/festivals/rongali-bihu.html',
  '/festivals/easter-in-india.html',
  '/festivals/theyyam.html',
  '/festivals/karva-chauth-teej.html',
  '/festivals/losar.html',
  '/festivals/wangala-chapchar-kut.html',
  '/festivals/republic-day-independence-day.html'
];

// Install — cache all core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — cache-first for assets, network-first for HTML
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.destination === 'document' || url.pathname.endsWith('.html')) {
    event.respondWith(networkFirst(event.request));
  } else {
    event.respondWith(cacheFirst(event.request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    const cached = await caches.match(request);
    return cached || new Response('Offline — content not cached', { status: 503 });
  }
}
