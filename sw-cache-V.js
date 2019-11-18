

//const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME ='static-v2';
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
                '/img/no-img.jpg'
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

    // 5- Cache & Network Race:hace una competencia para ver quien responde primero, el cache o el internet

    const respuesta = new Promise( (resolve, reject) => {

        let rechazada = false;

        const falloUnaVez = () => {

            if( rechazada ) {
                
                if( /\.(png|jpg)$/.test(e.request.url ) ){

                    resolve( caches.match('/img/no-img.jpg') );
                } else {
                    reject('No se encontro respuesta');
                }

            } else {
                rechazada = true;
            }
        };

        fetch( e.request ).then( res => {
            res.ok ? resolve(res) : falloUnaVez();
        }).catch( falloUnaVez );


        caches.match( e.request ).then( res => {
            res ? resolve(res) : falloUnaVez();
        }).catch( falloUnaVez );
    });

    e.respondWith( respuesta );

    // 4- Cache with network update
    // Cuando el Rendimiento es crítico
    // Siempre estarán un paso atrás
    /*if( e.request.url.includes('bootstrap') ){
        return e.respondWith( caches.match( e.request ) );
    }

    const respuesta = caches.open( CACHE_STATIC_NAME ).then( cache => {

        fetch( e.request ).then( newRes => cache.put( e.request, newRes ));
        return cache.match( e.request );

    });

    e.respondWith( respuesta );*/

    // 3-Network with Cache fallback: primero se va al web para obtener el recurso, si lo obtiene guardalo en el
    //cache (DYNAMIC) y muestralo sino lo obtiene ve al cache a ver si existe allí.
    // Desventaja: siempre trae el info mas actual, o sea siempre hace un consumo de datos y es mucho mas lenta
    // que el cache first. Si estas en un internet lento va pasar segundos para traer info o error de lentitud. 
    /*const respuesta = fetch( e.request ).then( res => {

        if( !res ) return caches.match( e.request );
        //console.log('Fetch', res );

        caches.open( CACHE_DYNAMIC_NAME )
            .then( cache => {
                cache.put(e.request, res);
                limpiarCache( CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
            });


        return res.clone();

    }).catch( err => {
        return caches.match( e.request );
    });



    e.respondWith( respuesta );*/

    // 2- Cache with Network fallback: primero intenta leer en el cache, si no lo encuentra va a la web a buscarlo.
    // Desventaja: se mezcla el APP_SHELL(recursos importantes para la web) con recursos dinamicos.
    /*const respuesta = caches.match( e.request )
        .then( res => {

            if( res ) return res;

            // No existe el archivo
            // Tengo que ir a la web
            console.log('No existe', e.request.url );


            return fetch( e.request ).then( newResp => {

                caches.open( CACHE_DYNAMIC_NAME )
                    .then( cache => {
                        cache.put( e.request, newResp);
                        limpiarCache( CACHE_DYNAMIC_NAME, 50);
                    });
                return newResp.clone();
            });
        });






    e.respondWith( respuesta );*/


    // 1- Cache Only: Es usada cuando toda la app será servida desde el cache, no accedera a la web.
    // Desventaja: se tiene que actualizar el SW para que se actualicen los archivos en la cache.
    // Tambien si alguien intenta acceder a un archivo que no se encuentra en la cache, la app se caerá.
    //e.respondWith( caches.match( e.request ) );

});