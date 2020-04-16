const { Joi } = require('celebrate');

const schema = Joi.string().hex().length(24);

module.exports = schema;
