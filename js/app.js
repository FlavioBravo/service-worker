/*VERIFICA QUE SE PUEDE USAR EL SW EN EL NAVEGADOR
if ('serviceWorker' in navigator){
 console.log('Podemos usarlo!!!');
}*/

//Confirmar si podemos usar el SW, 2da forma
if (navigator.serviceWorker){
    
    navigator.serviceWorker.register('/sw.js');
}