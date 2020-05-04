const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const {
    reviewPutSchema,
    getReviewsQueryParamsSchema,
    helpfulnessPatchSchema,
    objectIdSchema,
} = require('../../schemas');
const { reviews } = require('../../services');
const { reviewValidationSchema } = require('../../models');

const router = Router();

router.get(
    '/',
    celebrate({
        query: getReviewsQueryParamsSchema,
    }),
    async (req, res) => {
        const { providerId, orderBy, skip, limit } = req.query;

        const result = await reviews.getForProvider(
            providerId,
            orderBy,
            skip,
            limit,
        );
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
        const statusCode = result.success ? 201 : 400;

        res.status(statusCode).json(result);
    },
);

router.put(
    '/:id',
    celebrate({
        body: reviewPutSchema,
        params: Joi.object().keys({
            id: objectIdSchema,
        }),
    }),
    async (req, res) => {
        const review = req.body;
        const { id } = req.params;
        const result = await reviews.put(id, review);

        const statusCode = result.success ? 200 : 404;

        res.status(statusCode).json(result);
    },
);

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
