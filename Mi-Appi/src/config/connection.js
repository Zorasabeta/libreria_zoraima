const mysql = require("mysql");
console.log("Intentado conectar a la base")

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "CastanedaHerrera07",
    database: "libreria",
})

mysqlConnection.connect(
    (err)=> {
        if(!err){
            console.log("Estoy conectado a la base de datos")
        }
        else{
            console.log("No estoy conectado, pipipi", err)
        }
    }
)

module.exports= mysqlConnection