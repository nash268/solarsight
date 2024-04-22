// service-worker.js
const CACHE_NAME = 'solarsight-app-cache-v1';
const urlsToCache = [
  '/', 
  '/index.html', 
  '/public/manifest.json', 
  '/public/assets/eye-512px.png',
  '/public/assets/eye-256px.png',
  '/src/scripts/main.js',
  '/src/styles/style.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});