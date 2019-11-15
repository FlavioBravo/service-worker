

//const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME ='static-v2';
const CACHE_DYNAMIC_NAME ='dynamic-v1';

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
                '/js/app.js'
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



self.addEventListener('fetch', e =>{




    // 2- Cache with Network fallback: primo intenta leer en el cache, si no lo encuentra va a la web a buscarlo.
    // Desventaja: se mezcla el APP_SHELL(recursos importantes para la web) con recursos dinamicos.
    const respuesta = caches.match( e.request )
        .then( res => {

            if( res ) return res;

            // No existe el archivo
            // Tengo que ir a la web
            console.log('No existe', e.request.url );


            return fetch( e.request ).then( newResp => {

                caches.open( CACHE_DYNAMIC_NAME )
                    .then( cache => {
                        cache.put( e.request, newResp);
                        limpiarCache( CACHE_DYNAMIC_NAME, 5);
                    });
                return newResp.clone();
            });
        });






    e.respondWith( respuesta );


    // 1- Cache Only: Es usada cuando toda la app será servida desde el cache, no accedera a la web.
    // Desventaja: se tiene que actualizar el SW para que se actualicen los archivos en la cache.
    // Tambien si alguien intenta acceder a un archivo que no se encuentra en la cache, la app se caerá.
    //e.respondWith( caches.match( e.request ) );

});