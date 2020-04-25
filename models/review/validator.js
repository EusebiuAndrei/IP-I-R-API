const { Joi } = require('celebrate');
const { objectIdSchema } = require('../../schemas');

const schema = Joi.object().keys({
    providerId: objectIdSchema.required(),
    reviewerId: objectIdSchema.required(),
    score: Joi.number().integer().min(1).max(10).required(),
    description: Joi.string().min(1).max(1000),
});

module.exports = schema;
