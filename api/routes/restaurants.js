const { Router } = require('express');
const { restaurants } = require('../../services');

const router = Router();

router.get('/', async (req, res) => {
    const criteria = req.body ? req.body : {};
    const result = await restaurants.getSome(criteria);
    const statusCode = result.success ? 200 : 400;

    res.status(statusCode).json(result);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await restaurants.getOne(id);
    const statusCode = result.success ? 200 : 404;

    res.status(statusCode).json(result);
});

module.exports = router;