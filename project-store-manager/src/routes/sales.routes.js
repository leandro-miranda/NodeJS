const express = require('express');

const {
  newSalesRegister,
  salesListAll,
  salesListId,
  salesDelete,
  salesUpdate,
} = require('../controllers/sales.controller');

const routes = express.Router();

routes.post('/', newSalesRegister);

routes.get('/', salesListAll);

routes.get('/:id', salesListId);

routes.delete('/:id', salesDelete);

routes.put('/:id', salesUpdate);

module.exports = routes;
