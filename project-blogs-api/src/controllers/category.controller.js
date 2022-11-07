const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { code, newCategory } = await categoryService.createCategory(name);

  return res.status(code).json(newCategory);
};

const getAllCategories = async (_req, res) => {
  const { code, categories } = await categoryService.getAllCategories();

  return res.status(code).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};