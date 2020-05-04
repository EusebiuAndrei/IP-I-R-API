const { Router } = require('express');

const router = Router();

const reviewRouter = require('./routes/reviews');

router.use('/reviews', reviewRouter);

module.exports = router;
