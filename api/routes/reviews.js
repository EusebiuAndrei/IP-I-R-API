const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const { reviews } = require('../../services');
const { reviewValidationSchema } = require('../../models');
const { objectIdSchema } = require('../../schemas');

const router = Router();

/**
 * Get all reviews for the provider with the given ID, as well as their average score.
 *
 * Response data format:
 * {
 *     score: <1..10>
 *     reviews: [
 *         ...
 *     ]
 * }
 */
router.get(
    '/',
    celebrate({
        body: Joi.object().keys({
            providerId: objectIdSchema,
        }),
    }),
    async (req, res) => {
        const { providerId } = req.body;

        const result = await reviews.getForProvider(providerId);
        const statusCode = result.success ? 200 : 404;

        res.status(statusCode).json(result);
    },
);

router.post(
    '/',
    celebrate({
        body: reviewValidationSchema,
    }),
    async (req, res) => {
        const review = req.body;
        const result = await reviews.post(review);
        const statusCode = result.success ? 200 : 500;

        res.status(statusCode).json(result);
    },
);

module.exports = router;
