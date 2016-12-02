var http = require ('http');
var fs = require('fs');
var mime = require ('mime');
var colors = require ('colors');
var staticServer = require ("./internals/static-server")
//Importando el objetoc onfigurador
var config = require('./config/config'); 
//Importando manejadores 
var handlers = require("./internals/handlers");
//Estableciendo tema de colores 
colors.setTheme(config.colorTheme);
//Importando configuraciones 
var IP = config.IP,
    PORT = config.PORT;

var server = http.createServer(function(req, res){
    var url = req.url;
    console.log(`> Recurso Solicitado: ${url}`.data);
    if(url  === "/")
    {
        url = '/index.html'
    }
    //Verificando si la URL esta asociada a una accion 
    //que puede hacer el server 
    if (typeof(handlers[url]) === "function") {
        //Si existe una funcion en handlers llamada como el ocne¿tenido de la variable URL
        handlers[url](req, res);
    }
    else
     {
         //Noo se encontro un manejador para la 
         //url solicitada por el usa¿uario  
         //SE intantara servir de manera estatica
         
          //Generar la ruta real 
        //del archivo solicitado
        staticServer.serve(url, res);
     }
});

server.listen(PORT,IP,function(){
        console.log(`> Server corriendo en http://${IP}:${PORT} ...`.data);
    });