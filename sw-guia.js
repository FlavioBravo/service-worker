



self.addEventListener('fetch', event =>{

    /* Intercepto los estilos y envío otro.
    if( event.request.url.includes('style.css') ) {      
        let respuesta = new Response(`
            body {
                background-color: red !important;
                color: pink;
            }
        `, {
            headers:{
                'Content-Type': 'text/css'
            }
        }); 

        event.respondWith(respuesta); 
    }*/

    /*Interceptamos la imagen y devolvemos otra
    if( event.request.url.includes('main.jpg') ) {
           
        event.respondWith(fetch('img/main-patas-arriba.jpg'));
      
    }*/

    /*Los error 404 no es interpretado por el catch, debes manejarlo en el then
    const resp = fetch( event.request )
        .then( resp => {

            return resp.ok ? resp : fetch('img/main.jpg');  
               
        });

    event.respondWith( resp );*/
});