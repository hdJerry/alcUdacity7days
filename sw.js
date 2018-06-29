var CACHE_NAME = 'static-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>{
      return cache.addAll([
          '.',
          'index.html',
          'style/main.css',
          'style/bootstrap.min.css',
          'style/bootstrap.min.css.map',
          'style/bootstrap-theme.css',
          'js/bootstrap.min.js',
          'js/jquery-3.1.0.min.js',
          'js/currency.js',
          'sw/index.js',
          'js/fdb-all.min.js',
          'img/tenor.gif'
        ]);
    })
  );

});




self.addEventListener('activate', (event) =>{
  event.waitUntil(
    caches.keys().then((cacheNames) =>{
      return Promise.all(
        cacheNames.filter((cacheName) =>{
          return cacheName.startsWith('static-') && cacheName != CACHE_NAME;
        }).map((cacheName) =>{
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log(event.request);
  var requestUrl = new URL(event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then((response) =>{
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url)
  .then((response) =>{
    // Check if we received a valid response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(CACHE_NAME)
    .then((cache) =>{
      cache.put(url, response.clone());
      return response;
    });
  })
  .catch((error) =>{
    console.log('Request failed:', error);
    // You could return a custom offline 404 page here

  });
}

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
