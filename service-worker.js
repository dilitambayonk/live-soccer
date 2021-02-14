importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

if (workbox) {
    console.log('workbox berhasil dimuat');

    workbox.precaching.precacheAndRoute([{
            url: '/',
            revision: '1'
        },
        {
            url: '/nav.html',
            revision: '1'
        },
        {
            url: '/index.html',
            revision: '1'
        },
        {
            url: '/detail.html',
            revision: '1'
        },
        {
            url: '/pages/home.html',
            revision: '1'
        },
        {
            url: '/pages/favorite.html',
            revision: '1'
        },
        {
            url: '/css/materialize.min.css',
            revision: '1'
        },
        {
            url: '/js/materialize.min.js',
            revision: '1'
        },
        {
            url: '/js/nav.js',
            revision: '1'
        },
        {
            url: '/js/api.js',
            revision: '1'
        },
        {
            url: '/js/db.js',
            revision: '1'
        },
        {
            url: '/js/idb.js',
            revision: '1'
        },
        {
            url: '/image/favicon.ico',
            revision: '1'
        },
        {
            url: '/image/icon-192x192.png',
            revision: '1'
        },
        {
            url: '/image/icon-256x256.png',
            revision: '1'
        },
        {
            url: '/image/icon-384x384.png',
            revision: '1'
        },
        {
            url: '/image/icon-512x512.png',
            revision: '1'
        },
        {
            url: '/image/logo.svg',
            revision: '1'
        },
        {
            url: '/image/mohamed-salah.png',
            revision: '1'
        },
        {
            url: '/image/premier-league-icon.png',
            revision: '1'
        },
        {
            url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
            revision: '1'
        },
        {
            url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
            revision: '1'
        },
        {
            url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
            revision: '1'
        },
        {
            url: 'https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2',
            revision: '1'
        },
        {
            url: '/manifest.json',
            revision: '1'
        },
        {
            url: '/sw-register.js',
            revision: '1'
        }
    ], {
        // Ignore all URL parameters
        ignoreURLParametersMatching: [/.*/]
    });

    workbox.core.skipWaiting();

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        new workbox.strategies.StaleWhileRevalidate()
    );

    workbox.routing.registerRoute(
        new RegExp('https://fonts.googleapis.com/'),
        new workbox.strategies.StaleWhileRevalidate()
    );

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        new workbox.strategies.CacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxAgeSeconds: 14 * 24 * 60 * 60,
                    maxEntries: 30,
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg|ico)$/,
        new workbox.strategies.CacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 200,
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.CacheFirst({
            cacheName: 'static-resources',
        })
    );
} else {
    console.log('workbox gagal dimuat');
}

// Push Notif
self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push tanpa payload berhasil';
    }

    var option = {
        body: body,
        icon: 'image/premier-league-icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(self.registration.showNotification('Push Notification', option));
});