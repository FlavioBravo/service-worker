/*VERIFICA QUE SE PUEDE USAR EL SW EN EL NAVEGADOR
if ('serviceWorker' in navigator){
 console.log('Podemos usarlo!!!');
}*/

//Confirmar si podemos usar el SW, 2da forma
if (navigator.serviceWorker){
    navigator.serviceWorker.register('/sw.js');
            /*.then( reg => {
                setTimeout(() => {

                    reg.sync.register('posteo-gatitos');
                    console.log('se enviaron fotos de gatitos al server');

                }, 3000);
                Notification.requestPermission().then( result => {

                    console.log(result);
                    reg.showNotification('Hola Mundo!');

            
                });
            });*/
    
}

/*if( window.caches ){

    caches.open('prueba-1');

    caches.open('prueba-2');

    //caches.has('prueba-2').then( console.log );
    
    //caches.delete('prueba-1').then( console.log );

    caches.open('cache-v1-1').then( cache => {

        //cache.add('/index.html');

        cache.addAll([
            '/index.html',
            '/css/style.css',
            '/img/main.jpg'
        ]).then( () => {

           // cache.delete('/css/style.css');

            cache.put('index.html', new Response('Hola Mundo') );


        });

        cache.match('/index.html')
                .then( res => {

                    res.text().then( console.log );

                });
    });

    caches.keys().then( keys => {
        console.log(keys);
    });
}*/

/*fetch('https://reqres.in/api/users')
    .then( resp => resp.text())
    .then( console.log );*/