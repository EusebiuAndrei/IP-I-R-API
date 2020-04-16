const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const { providers } = require('../../services');
const { objectIdSchema } = require('../../schemas');

const router = Router();

/**
 * Get all providers that have all of the given tags.
 * If no tags (i.e., no request body) given, then return all providers.
 * - ex. body:
 * "[ "cafe", "pizza" ]"
 */
router.get('/', async (req, res) => {
    const tags = req.body ? req.body : [];
    const result = await providers.getSome(tags);
    const statusCode = result.success ? 200 : 400;

    res.status(statusCode).json(result);
});

/**
 * Get the provider with the given ID.
 */
router.get(
    '/:id',
    celebrate({
        params: Joi.object().keys({
            id: objectIdSchema,
        }),
    }),
    async (req, res) => {
        const { id } = req.params;
        const result = await providers.getOne(id);
        const statusCode = result.success ? 200 : 404;

        res.status(statusCode).json(result);
    },
);

module.exports = router;
