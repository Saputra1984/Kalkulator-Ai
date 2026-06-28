const CACHE_NAME = 'smart-calc-pro-v1';
const ASSETS = [
  './index.html',
  './brain.js',
  './database.js',
  './manifest.json',
  './icon.png' 
];

// Instalasi dan caching file
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Menangkap request dan menyajikannya dari cache saat offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Membersihkan cache lama jika ada update versi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
