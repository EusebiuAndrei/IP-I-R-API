const { Router } = require('express');

const router = Router();

const providerRouter = require('./routes/providers');
const reviewRouter = require('./routes/reviews');

router.use('/providers', providerRouter);
router.use('/reviews', reviewRouter);

module.exports = router;
