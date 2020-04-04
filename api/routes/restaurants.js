const { Router } = require('express');
const { restaurants } = require('../../services');

const router = Router();

/**
 * Get all restaurants that have all of the given tags.
 * If no tags (i.e., no request body) given, then return all restaurants.
 * - ex. body:
 * "[ "cafe", "pizza" ]"
 */
router.get('/', async (req, res) => {
    const tags = req.body ? req.body : [];
    const result = await restaurants.getSome(tags);
    const statusCode = result.success ? 200 : 400;

    res.status(statusCode).json(result);
});

/**
 * Get the restaurant with the given ID.
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await restaurants.getOne(id);
    const statusCode = result.success ? 200 : 404;

    res.status(statusCode).json(result);
});

module.exports = router;
