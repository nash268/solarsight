// service-worker.js
const CACHE_NAME = 'solarsight-app-cache-v2';
const urlsToCache = [
  '/', 
  '/index.html', 
  '/public/manifest.json', 
  '/public/assets/eye-512px.png',
  '/public/assets/eye-256px.png',
  '/src/styles/style.css',
  '/src/scripts/main.js',
  '/src/scripts/timer.js',
  '/pages/about.html',
  '/pages/readings.html',
  '/pages/statistics.html',
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