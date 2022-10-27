const connection = require('./connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales() VALUES()',
  );

  return insertId;
};

const insertSalesProduct = async (salesId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products(sales_id, product_id, quantity) VALUES(?, ?, ?)',
    [salesId, productId, quantity],
  );

  return insertId;
};

const salesListAll = async () => {
  const [salesProduct] = await connection.execute(
    `SELECT sale_id as saleId, product_id as productId, quantity, date
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales ON sale_id = id`,
  );

  return salesProduct;
};

const salesFindById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT date, product_id as productId, quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales
    ON sale_id = id
    WHERE sale_id = ?`,
    [id],
  );

  if (!sales || sales.length === 0) {
    return null;
  }

  return sales;
};

const salesDelete = async (id) => {
  const deleted = connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return deleted;
};

const salesUpdate = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
    console.log({ saleId, productId, quantity }),
  );
  return result;
};

module.exports = {
  insertSales,
  insertSalesProduct,
  salesListAll,
  salesFindById,
  salesDelete,
  salesUpdate,
};
