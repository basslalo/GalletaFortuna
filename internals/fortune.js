/*var fortunes = [
    "En todo tiempo ama el amigo",
    "Hijo de Irving que nace torcido",
    "El matrimonio es para aquellos que temen dormir solos",
    "Algunas veces el perder una batalla es una nueva forma de entender como ganar la guerra ",
    "Ningun hombre tiene suficiente memoria para ser un mentiroso exitoso",
    "Claro que quiero ser el hombre de tus sueños ... per para eso ya duermete mamacita"
    ];
    */
/*function getIntRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
*/
/*
module.exports = {
    "getFortune" : function(cb){
        // Construyo objeto respuesta
        
        var selector = getIntRandomNumber(0,fortunes.length - 1);
        var fortuneMessage = fortunes[selector];
        var fortunePaperObject = {
            "paper" : fortuneMessage
        };
        cb(JSON.stringify(fortunePaperObject));
    }
};
*/
/*
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;

module.exports = {
    "getFortune" : function(cb){
        var connectionString = "mongodb://127.0.0.1:27017/fortuneapp";
        mongoClient.connect(connectionString, function(err, db){
            if(err){
                console.log(">Error al conectarse a la base de datos mongodb://127.0.0.1/fortuneapp");
                var fortunePaperObject = {
                    "message" : "En todo tiempo ama al amigo"
                };
                var fortunePaperResponse = JSON.stringify(fortunePaperObject);

                cb(fortunePaperResponse);
            }else{
                var papersCollection = db.collection("fortunepapers");

                var objetoResultado = papersCollection.find({});

                //Arreglo
                objetoResultado.toArray(function(err, fortunepapers){
                    var fortunePaperResponse = JSON.stringify(fortunepapers[Math.floor(Math.random()*fortunepapers.lenght)]);

                    db.close()

                    console.log(">La fortuna es ") + fortunePaperResponse;
                    cb(fortunePaperResponse);
                });
            }

        });

    }
};
*/


var mongodb = require("mongodb");
// 2. Cargo al cliente de driver
var mongoClient = mongodb.MongoClient;

module.exports = {
    "getFortune" : function(cb){
        //mongoClient.connect("mongodb://127.0.0.1:27017/fortuneapp",
        mongoClient.connect("mongodb://eddo:Jorgeolp6792.@ds050869.mlab.com:50869/fortuneapp",
        function(err, db){
            if(err){
                console.log("> ERROR al conectarse a" +
                " la base de datos:"+
                " mongodb://127.0.0.1:27017/fortuneapp");
                //Armando el documento 

                var fortunePaper = {
                    "mensaje":
                    "en todo  tiempo ama el amigo"
                };
                var respuesta = JSON.stringify(fortunePaper);
                cb(respuesta);
            }else{
                var papersCollection = 
                db.collection("fortunepapers");
                var objetoRestultado = 
                papersCollection.find({});

                objetoRestultado.toArray(function(err, papers){
                    // Arreglo
                    var randomIndex = 
                    Math.round(Math.random(0)* papers.length);
                    var fortunePaperResponse = 
                    JSON.stringify(papers[randomIndex]);
                    db.close()
                    console.log("> La fortuna es: " + fortunePaperResponse);
                    cb(fortunePaperResponse);
                });
            }
        });
    }
};