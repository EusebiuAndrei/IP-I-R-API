const { Joi } = require('celebrate');

const schema = Joi.object().keys({
    delta: Joi.number().valid(-1, 1).required(),
});

module.exports = schema;
