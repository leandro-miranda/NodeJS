const Joi = require('joi');

module.exports = Joi.object({
  title: Joi.string().required().empty().messages({
    'any.required': '400|"title" is required',
    'string.empty': '400|Some required fields are missing',
    'string.base': '422|"title" must be a string',
  }),
  content: Joi.string().required().messages({
    'any.required': '400|"content" is required',
    'string.base': '422|"content" must be a string',
  }),
  // https://joi.dev/api/?v=15.1.1#anyforbidden e https://stackoverflow.com/questions/59474717/joi-forbidden-equivalent-in-mongoose
  categoryIds: Joi.forbidden().messages({
    'any.unknown': '400|Categories cannot be edited',
  }),
});
