module.exports = (error, _req, res, _next) => {
  console.log(error);

  return res.status(500).json({ message: error.message });
};