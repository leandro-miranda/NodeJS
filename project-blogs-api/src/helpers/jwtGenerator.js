const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const token = (data = {}) => jwt.sign({ data }, secret, jwtConfig);

module.exports = token;