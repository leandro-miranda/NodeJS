const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });

  return { code: 201, newCategory };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return { code: 200, categories };
};

module.exports = {
  createCategory,
  getAllCategories,
};