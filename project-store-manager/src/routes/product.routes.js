const express = require('express');
const {
  listAllProducts,
  listProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} = require('../controllers/product.controller');

const routes = express.Router();

routes.get('/search', searchProduct);

routes.get('/', listAllProducts);

routes.get('/:id', listProduct);

routes.post('/', createProduct);

routes.put('/:id', updateProduct);

routes.delete('/:id', deleteProduct);

module.exports = routes;
