const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const sales = Joi.object({
  productId: idSchema.label('productId'),
  quantity: idSchema.label('quantity'),
});

const saleSchema = Joi.array().items(sales);

module.exports = {
  idSchema,
  productSchema,
  saleSchema,
};
