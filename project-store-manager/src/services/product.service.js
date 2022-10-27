const { productModel } = require('../models');
const { validateName } = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();

  return { errType: null, message: products };
};

const findById = async (id) => {
  const product = await productModel.findById(id);

  if (!product) return { errType: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { errType: null, message: product };
};

const createProduct = async (name) => {
  const { errType, message } = validateName(name);
  if (errType) return { errType, message };

  const newProductId = await productModel.createProduct(name);

  return { errType: null, message: { id: newProductId, name } };
};

const updateProduct = async (id, name) => {
  const formatedId = parseInt(id, 0);

  const { errType, message } = validateName(name);
  if (errType) return { errType, message };

  const productName = await productModel.findById(formatedId);
  if (!productName) return { errType: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.updateProduct(id, name);

  return { errType: null, message: { id, name } };
};

const deleteProduct = async (id) => {
  const formatedId = parseInt(id, 0);

  const resultId = await productModel.findById(formatedId);

  if (!resultId) return { errType: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.deleteProduct(formatedId);
  return { errType: null, message: '' };
};

const searchProduct = async (name) => {
  const result = await productModel.searchProduct(name);

  return { errType: null, message: result };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
