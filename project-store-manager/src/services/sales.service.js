const { salesModel } = require('../models');
const { validateSales } = require('./validations/validationsInputValues');

const checksSales = async (sales) => {
  const promises = sales.map((sale) => salesModel.salesFindById(sale.productId));
  const result = await Promise.all(promises);
  const products = result.some((product) => product === undefined);

  return products;
};

const newSalesRegister = async (saleProduct) => {
  const sales = validateSales(saleProduct);

  if (sales.errType) return sales;

  if (await checksSales(saleProduct)) {
    return { errType: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const saleId = await salesModel.insertSales();

  const promises = sales
    .map((sale) => salesModel.insertSalesProduct(saleId, sale.productId, sale.quantity));

  await Promise.all(promises);

  const returnMessage = {
    id: saleId,
    itemsSold: saleProduct,
  };

  return { errType: null, returnMessage };
};

const salesListAll = async () => {
  const sales = await salesModel.salesListAll();

  return { errType: null, message: sales };
};

const salesListId = async (id) => {
  const sale = await salesModel.salesFindById(id);

  if (sale.length > 0) {
    return { errType: null, message: sale };
  }

  return { errType: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const deleteSales = async (id) => {
  const result = await salesModel.salesFindById(id);

  if (!result) return { errType: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

  await salesModel.salesDelete(id);
  return { errType: null, message: '' };
};

const updateSales = async (id, sale) => {
  const formatedSale = sale
    .map(({ productId, quantity }) => (
      {
        productId: parseInt(productId, 0),
        quantity: parseInt(quantity, 0),
      }));
  const result = await salesModel.salesFindById(formatedSale);

  if (result.length === 0) return { errType: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

  const resultUpdate = await salesModel.salesUpdate(formatedSale);

  return {
    errType: null, message: { saleId: id, itemsUpdate: resultUpdate },
  };
};

module.exports = {
  newSalesRegister,
  salesListAll,
  salesListId,
  deleteSales,
  updateSales,
};
