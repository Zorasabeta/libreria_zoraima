const express = require("express")
const libros = require("./routes/tabla_libros")
const app = express();

const PORT = 3000;
app.use(express.json())
app.use(express.static('public'))

app.use("/libros", libros);


app.listen(PORT, ()=>{
    console.log(`Servidor API escuchando en http://localhost:${PORT}`)
});


