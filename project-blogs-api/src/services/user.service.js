const { User } = require('../models');
const jwtGenerator = require('../helpers/jwtGenerator');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });

  if (user) return { code: 409, message: 'User already registered' };

  const newUser = await User.create({ displayName, email, password, image });

  const token = jwtGenerator({ id: newUser.id, displayName });

  return { code: 201, token };
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return { code: 200, users };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id,
    { attributes: { exclude: ['password'] } });

  if (!user) return { code: 404, message: 'User does not exist' };

  return { code: 200, user };
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);

  if (!user) return { code: 404, message: 'User does not exist' };

  await user.destroy();

  return { code: 204 };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};