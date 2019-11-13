/*VERIFICA QUE SE PUEDE USAR EL SW EN EL NAVEGADOR
if ('serviceWorker' in navigator){
 console.log('Podemos usarlo!!!');
}*/

//Confirmar si podemos usar el SW, 2da forma
if (navigator.serviceWorker){
    navigator.serviceWorker.register('/sw.js')
            .then( reg => {
                setTimeout(() => {

                    reg.sync.register('posteo-gatitos');
                    console.log('se enviaron fotos de gatitos al server');

                }, 3000);
            });
}

/*fetch('https://reqres.in/api/users')
    .then( resp => resp.text())
    .then( console.log );*/