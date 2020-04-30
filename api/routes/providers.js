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
    let tags = req.query.tag;
    if (!tags) {
        tags = [];
    } else if (!Array.isArray(tags)) {
        tags = [tags];
    }
    const result = await providers.getSome(tags);
    res.status(200).json(result);
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
