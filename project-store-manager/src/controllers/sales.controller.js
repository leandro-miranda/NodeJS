const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const newSalesRegister = async (req, res) => {
  const sales = req.body;
  const { errType, message } = await salesService.newSalesRegister(sales);

  if (errType) return res.status(mapError(errType)).json({ message });

  res.status(201).json(message);
};

const salesListAll = async (req, res) => {
  const { errType, message } = await salesService.salesListAll();

  if (errType) return res.status(mapError(errType)).json({ message });

  res.status(200).json(message);
};

const salesListId = async (req, res) => {
  const { id } = req.params;
  const { errType, message } = await salesService.salesListId(id);

  if (errType) return res.status(mapError(errType)).json({ message });

  res.status(200).json(message);
};

const salesDelete = async (req, res) => {
  const { id } = req.params;
  const { errType, message } = await salesService.deleteSales(id);

  if (errType) return res.status(mapError(errType)).json({ message });

  res.status(204).end();
};

const salesUpdate = async (req, res) => {
  const { id } = req.params;
  const itemsSold = req.body;

  const { errType, message } = await salesService.updateSales(
    id,
    itemsSold,
  );

  if (errType) return res.status(mapError(errType)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  newSalesRegister,
  salesListId,
  salesListAll,
  salesDelete,
  salesUpdate,
};
