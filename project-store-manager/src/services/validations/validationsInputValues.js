const { idSchema, productSchema, saleSchema } = require('./schemas');

const idValidate = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { errType: 'PRODUCT_NOT_FOUND', message: '"id" must be a number' };

  return { errType: null, message: '' };
};

const validateName = (name) => {
  const { error } = productSchema.validate(name);
  if (!error) return { errType: 'NAME_PRODUCT_NOT_FOUND', message: '"name" is required' };

  if (name.length < 5) {
    return {
      errType: 'NAME_PRODUCT_BAD_REQUEST',
      message: '"name" length must be at least 5 characters long',
    };
  }

  return { errType: null, message: '' };
};

const validateSales = (sale) => {
  const { error } = saleSchema.validate(sale);
  if (error) {
    return { errType: error.details[0].type, message: error.message };
  }
  return { errType: null, message: '' };
};

module.exports = {
  idValidate,
  validateName,
  validateSales,
};
