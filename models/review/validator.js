const { Joi } = require('celebrate');

const schema = Joi.object().keys({
    providerId: Joi.string().hex().length(24),
    reviewerId: Joi.string().hex().length(24),
    score: Joi.number().integer().min(1).max(10),
    description: Joi.string().min(1).max(1000),
});

module.exports = schema;
