const loginService = require('../services/login.service');

const login = async (req, res) => {
  const { code, token, message } = await loginService.login(req.body);

  if (message) return res.status(code).json({ message });

  return res.status(code).json({ token });
};

module.exports = {
  login,
};