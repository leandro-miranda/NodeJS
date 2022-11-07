const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().empty().required()
    .messages({
      'any.required': '400|"email" is required',
      'string.empty': '400|Some required fields are missing',
      'string.base': '422|"email" must be a string',
      'string.email': '400|"email" must be a valid email',
    }),
  password: Joi.string().empty().length(6).required()
    .messages({
      'any.required': '400|"password" is required',
      'string.empty': '400|"password" is not allowed to be empty',
      'string.base': '422|"password" must be a string',
      'string.length': '400|"password" length must be 6 characters long',
    }),
});