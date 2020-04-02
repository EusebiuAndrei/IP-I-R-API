const { Router } = require('express');

const router = Router();

const restaurantRouter = require('./routes/restaurants');

router.use('/restaurants', restaurantRouter);

module.exports = router;
