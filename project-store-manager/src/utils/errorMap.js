const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  NAME_PRODUCT_NOT_FOUND: 400,
  NAME_PRODUCT_BAD_REQUEST: 422,
};

const mapError = (errType) => errorMap[errType] || 500;

module.exports = {
  errorMap,
  mapError,
};
