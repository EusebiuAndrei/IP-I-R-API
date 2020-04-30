const { Joi } = require('celebrate');
const objectIdSchema = require('./objectId');

const schema = Joi.object().keys({
    providerId: objectIdSchema.required(),
    orderBy: Joi.string().regex(/-?(score|helpfulness|timeCreated)/),
    skip: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
});

module.exports = schema;
