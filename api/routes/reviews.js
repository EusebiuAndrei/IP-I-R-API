const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const {
    helpfulnessPatchSchema,
    objectIdSchema,
} = require('../../schemas');
const { reviews } = require('../../services');
const { reviewValidationSchema } = require('../../models');

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
        query: {
            providerId: objectIdSchema.required(),
        },
    }),
    async (req, res) => {
        const { providerId } = req.query;

        const result = await reviews.getForProvider(providerId);
        const statusCode = result.success ? 200 : 404;

        res.status(statusCode).json(result);
    },
);

/**
 * Post a review; review schema detailed in /models/review/validator.
 *
 * Response data format:
 * {
 *      id: ...
 * }
 */
router.post(
    '/',
    celebrate({
        body: reviewValidationSchema,
    }),
    async (req, res) => {
        const review = req.body;
        const result = await reviews.post(review);
        const statusCode = result.success ? 201 : 400;

        res.status(statusCode).json(result);
    },
);

/**
 * Update a posted review, whose ID is given in the URL.
 * Review schema detailed in /models/review/validator.
 *
 * Response data on success is empty object.
 */
router.put(
    '/:id',
    celebrate({
        body: reviewValidationSchema,
        params: Joi.object().keys({
            id: objectIdSchema,
        }),
    }),
    async (req, res) => {
        const review = req.body;
        const { id } = req.params;
        const result = await reviews.put(id, review);

        const statusCode = result.success ? 200 : 400;

        res.status(statusCode).json(result);
    },
);

/**
 * Patch a posted review's helpfulness score, creating it if it's currently zero, and incrementing/decrementing it by delta.
 *
 * Request body format:
 * {
 *     "delta": -1
 * }
 */
router.patch(
    '/:id',
    celebrate({
        body: helpfulnessPatchSchema,
        params: Joi.object().keys({
            id: objectIdSchema,
        }),
    }),
    async (req, res) => {
        const { delta } = req.body;
        const { id } = req.params;
        const result = await reviews.patchHelfpulness(id, delta);

        const statusCode = result.success ? 200 : 404;

        res.status(statusCode).json(result);
    },
);

module.exports = router;
