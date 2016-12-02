function saludar() {
    swal("Hola chaka..");
}

function getFortuneFromServer(){
    //Realizando una peticion get asincrona 
    //con ajax asistida con jquery
    //Recordar cambiar el handler
    $.get("/getacookie", "",function(cookie, status){
        //Contenido del callback 
        console.log('>status: ' + status);
        //Presentando el mensaje 
        swal(cookie.message);
    },'json');
}