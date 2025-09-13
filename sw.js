const CACHE_NAME = 'moja-strona-cache-v1';
const URLS_TO_CACHE = [
  './',
  './mmenu.html',
  './manifest.json',
  './id.html',
  './card.html',
  './pesel.html',
  './scanqr.html',
  './edycja_licencji.html',
  './assets/app/main.css',
  './assets/app/id.css',
  './assets/app/card.css',
  './assets/app/scan.css',
  './assets/app/images/logo.png',
  './assets/app/images/logo_large.png',
  './assets/app/images/back_blue.png',
  './assets/app/images/help.png',
  './assets/app/images/qr.png',
  './assets/app/images/scan.png',
  './assets/app/images/pesel.png',
  './assets/app/images/id.png',
  './assets/app/images/card.png',
  './assets/app/images/licence.png',
  './assets/app/images/edycja_licencji.png',
  './assets/app/images/arrow-right.png',
  './assets/app/images/arrow-down.png',
  './assets/app/images/arrow-left.png',
  './assets/app/images/arrow-up.png',
  './assets/app/images/pencil.png',
  './assets/app/images/trash.png',
  './assets/app/images/save.png',
  './assets/app/images/cancel.png',
  './assets/app/images/plus.png',
  './assets/app/images/minus.png',
  './assets/app/images/eye.png',
  './assets/app/images/eye-off.png',
  './assets/app/images/lock.png',
  './assets/app/images/unlock.png',
  './assets/app/images/clipboard.png',
  './assets/app/images/clipboard-check.png',
  './assets/app/images/clipboard-copy.png',
  './assets/app/images/clipboard-paste.png',
  './assets/app/images/clipboard-list.png',
  './assets/app/images/clipboard-alert.png',
  './assets/app/images/clipboard-x.png',
  './assets/app/images/clipboard-minus.png',
  './assets/app/images/clipboard-plus.png',
  './assets/app/images/clipboard-search.png',
  './assets/app/images/clipboard-edit.png',
  './assets/app/images/clipboard-remove.png',
  './assets/app/images/clipboard-download.png',
  './assets/app/images/clipboard-upload.png',
  './assets/app/images/clipboard-refresh.png',
  './assets/app/images/clipboard-settings.png',
  './assets/app/images/clipboard-info.png',
  './assets/app/images/clipboard-help.png',
  './assets/app/images/clipboard-warning.png',
  './assets/app/images/clipboard-error.png',
  './assets/app/images/clipboard-success.png',
  './assets/app/rozwijka.js',
  './assets/app/id.js',
  './assets/app/card.js',
  './assets/app/pesel.js',
  './assets/app/scan.js',
  './assets/app/edycja_licencji.js',
  './assets/app/main.js',
  './assets/app/qrcode.min.js',
  './assets/app/html5-qrcode.min.js',
  './assets/app/jszip.min.js',
  './assets/app/jszip-utils.min.js',
  './assets/app/FileSaver.min.js',
  './assets/app/pako.min.js',
  './assets/app/exif.min.js',
  './assets/app/html5-qrcode.min.js',
  
  
  
    
  // Dodaj tu inne pliki, które chcesz mieć offline
];
self.addEventListener("install", (e) => {
  console.log("Service Worker: Zainstalowany");
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker: Aktywny");
});

self.addEventListener("fetch", (e) => {
  // Prosty pass-through (można później dodać cache)
  e.respondWith(fetch(e.request));
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});