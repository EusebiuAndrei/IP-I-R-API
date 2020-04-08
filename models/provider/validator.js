const { Joi } = require('celebrate');

const schema = Joi.object().keys({
    name: Joi.string()
        .required()
        .error(new Error('Name required.'))
        .min(1)
        .error(new Error('Name cannot be empty string.')),
    description: Joi.string()
        .min(1)
        .error(new Error('Description cannot be empty string.')),
});

module.exports = schema;
