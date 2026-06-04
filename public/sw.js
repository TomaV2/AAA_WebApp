const CACHE_NAME = 'aaa-robot-v1';

const urlsToCache = [
    '/',
    '/css/style.css',
    '/js/app.js',
    '/js/i18n.js',
    '/img/logo.png'
];

self.addEventListener('install', event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );

});

self.addEventListener('fetch', event => {

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );

});