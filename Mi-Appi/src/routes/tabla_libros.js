const express = require("express");
const Router = express.Router();
const libroController = require("../controllers/product.controller");

Router.get('/', libroController.getLibro)
Router.get('/:id', libroController.getLibroById)
Router.post('/', libroController.createLibro)
Router.put('/:id', libroController.updateLibro)
Router.delete('/:id', libroController.deleteLibro)

module.exports = Router;
