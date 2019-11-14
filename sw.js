


self.addEventListener('install', e =>{
    // Con OPEN si no existe lo crea, aqui creamos el APP_SHELL cache
    // donde se guarda todo lo necesario para que la app viva.
    const cacheProm = caches.open('cache-1')
        .then( cache => {

            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                '/js/app.js'
            ]);

        });
    

    e.waitUntil( cacheProm );


});



self.addEventListener('fetch', e =>{






    // 1- Cache Only: Es usada cuando toda la app será servida desde el cache, no accedera a la web.
    e.respondWith( caches.match( e.request ) );

});