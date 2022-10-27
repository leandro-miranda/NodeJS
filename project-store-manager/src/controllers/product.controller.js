const { productService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listAllProducts = async (_req, res) => {
  const { errType, message } = await productService.findAll();

  if (errType) return res.status(mapError(errType)).json({ message });

  res.status(200).json(message);
};

const listProduct = async (req, res) => {
  const { id } = req.params;
  const { errType, message } = await productService.findById(id);

  if (errType) return res.status(mapError(errType)).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { errType, message } = await productService.createProduct(name);

  if (errType) return res.status(mapError(errType)).json({ message });

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { errType, message } = await productService.updateProduct(
    id,
    name,
  );

  if (errType) return res.status(mapError(errType)).json({ message });

  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { errType, message } = await productService.deleteProduct(id);

  if (errType) return res.status(mapError(errType)).json({ message });

  res.status(204).end();
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { message } = await productService.searchProduct(q);

  return res.status(200).json(message);
};

module.exports = {
  listAllProducts,
  listProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
