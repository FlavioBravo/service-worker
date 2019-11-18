const CACHE_STATIC_NAME ='static-v6';
const CACHE_DYNAMIC_NAME ='dynamic-v1';
const CACHE_DYNAMIC_LIMIT = 50;

const CACHE_INMUTABLE_NAME='inmutable-v1';


function limpiarCache( cacheName, numeroItems ){


    caches.open( cacheName )
        .then( cache => {

           return cache.keys()
                    .then( keys => {
                        
                        if( keys.length > numeroItems ){
                            cache.delete( keys[0] )
                                .then( limpiarCache(cacheName, numeroItems));
                        }

                    });
        });

}

self.addEventListener('install', e =>{
    // Con OPEN si no existe lo crea, aqui creamos el APP_SHELL cache
    // donde se guarda todo lo necesario para que la app viva.
    const cacheProm = caches.open( CACHE_STATIC_NAME )
        .then( cache => {

            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                '/js/app.js',
                '/img/no-img.jpg',
                '/pages/offline.html'
            ]);

        });

    const cacheInmutable =  caches.open( CACHE_INMUTABLE_NAME )
        .then( cache => {

            return cache.add(
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
            );

    });
    

    e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );

});

self.addEventListener('activate', e => {


    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            //statice-v4
            if( key !== CACHE_STATIC_NAME && key.includes('static') ){
                return caches.delete(key);
            }

        });
    });


    e.waitUntil( respuesta );
});



self.addEventListener('fetch', e =>{


    // 2- Cache with Network fallback
    const respuesta = caches.match( e.request )
        .then( res => {

            if( res ) return res;

            // No existe el archivo

            return fetch( e.request ).then( newResp => {

                caches.open( CACHE_DYNAMIC_NAME )
                    .then( cache => {
                        cache.put( e.request, newResp);
                        limpiarCache( CACHE_DYNAMIC_NAME, 50);
                    });

                return newResp.clone();
            })
            .catch( err => {

                if( e.request.headers.get('accept').includes('text/html') ) {
                    return caches.match('/pages/offline.html');
                }
                
            });


        });






    e.respondWith( respuesta );
});