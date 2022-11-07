const userService = require('../services/user.service');

const createUser = async (req, res) => {
  const { code, token, message } = await userService.createUser(req.body);

  if (message) return res.status(code).json({ message });

  return res.status(code).json({ token });
};

const getAllUsers = async (_req, res) => {
  const { code, users } = await userService.getAllUsers();

  return res.status(code).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { code, message, user } = await userService.getUserById(id);

  if (message) return res.status(code).json({ message });

  return res.status(code).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.tokenData;

  const { code } = await userService.deleteUser(id);

  return res.status(code).send();
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};