const { User } = require('../models');
const jwtGenerator = require('../helpers/jwtGenerator');

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) return { code: 400, message: 'Invalid fields' };

  const token = jwtGenerator({ id: user.id, name: user.displayName });

  return { code: 200, token };
};
module.exports = {
  login,
};