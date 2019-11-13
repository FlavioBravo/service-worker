
//Ciclo de vida del SW

self.addEventListener('install', event =>{

    // Descargar archivos de js, css, assests, etc
    // Creamos un Cache
    console.log('SW: Instalando SW');

    const instalacion = new Promise( (resolve, reject) => {

        setTimeout(()=> {
            console.log('SW: Instalaciones terminadas');
            self.skipWaiting(); // Ayuda a que no se haga el skip de forma manual en el navegador
            resolve();
        }, 1);

    });


    event.waitUntil( instalacion ); // Espera hasta que la fase de instalacion termine para pasar con Activado


});


//Cuando el SW toma el control de la app
self.addEventListener('activate', event =>{
   
    // Borrar cache viejo

    console.log('SW: Activo y listo para controlar la app');


});


//Manejo de peticiones HTTP
self.addEventListener('fetch', event =>{
   
    //Aplicar las estrategias del cache
    /*console.log('SW:', event.request.url );

    if ( event.request.url.includes('https://reqres.in/') ) {

        const resp = new Response(`{ ok: false, mensajes: 'jajajaja' }`);

        event.respondWith(resp );

    }*/

});

// SYNC: Recuperamos la conexión a internet
self.addEventListener('sync', event => {

    console.log('Tenemos conexión');
    console.log(event);
    console.log(event.tag);


});