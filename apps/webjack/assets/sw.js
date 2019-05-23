const cacheName = 'WEBJACK_CACHE';
const filesToCache = [
    '/'
];

function handleStaticResourceRequests(requestCopy, event) {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if (response) {
                return response;
            } else {
                return fetch(event.request).then((response) => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    } else {
                        const responseCopy = response.clone();
                        caches.open(cacheName)
                            .then((cache) => {
                                return cache.put(requestCopy, responseCopy);
                            });
                        return response;
                    }
                });
            }
        })
    );
};

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    const requestCopy = event.request.clone();
    if (event.request.method === 'GET' && event.request.url.indexOf('webjack-api') < 0) {
        handleStaticResourceRequests(requestCopy, event);
    } else {
        event.respondWith(fetch(event.request));
    }
}); 