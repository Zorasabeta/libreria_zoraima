const connection = require("../config/connection");

exports.getLibro = (req, res) => {
    const query = 'SELECT * FROM libros';
    connection.query(query, (err, results) => {
        if (!err) {
            res.json(results);
        }else{
            throw err;
        }
    });
};

exports.getLibroById = (req, res)=> {
    const id = req.params.id;
    const query = 'SELECT * FROM libros WHERE idLibro = ?';
    connection.query(query, [id], (err, results) => {
        if (!err) {
            res.json(results);
        }else{
            throw err;
        }  
    });
};

exports.createLibro = (req, res) => {
    const {tituloLibro, autor, editorial, anioPublicacion, categoriaLibro, disponible, precioLibro} = req.body;
      const query = `
          INSERT INTO libros (tituloLibro, autor, editorial, anioPublicacion, categoriaLibro, disponible, precioLibro)
          VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
    connection.query(query, [tituloLibro, autor, editorial, anioPublicacion, categoriaLibro, disponible, precioLibro], (err, result) => {
      if (err) throw err;
      res.json({ mensaje: "Producto creado exitosamente" });
    });
  };


exports.updateLibro = (req, res) => {
    const idLibro = req.params.id;
    const {tituloLibro, autor, editorial, anioPublicacion, categoriaLibro, disponible, precioLibro} = req.body;
    const query = `UPDATE libros SET tituloLibro = ?, autor = ?, editorial = ?, anioPublicacion = ?, categoriaLibro = ?, disponible = ?, precioLibro = ? WHERE idLibro = ${idLibro}`;
    connection.query(query, [tituloLibro, autor, editorial, anioPublicacion, categoriaLibro, disponible, precioLibro], (err, result) => {
        if (!err) {
            res.json({message: 'Producto actualizado correctamente'});
        }else{
            throw err;
        }
    })
}

exports.deleteLibro = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM libros WHERE idLibro = ?'
    connection.query(query, [id], (err, results) =>{
        if (!err) {
            res.json({message: 'Producto eliminado correctamente'});
        }else{
            throw err;
        } 
    })
}

