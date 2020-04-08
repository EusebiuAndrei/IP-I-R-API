const { Router } = require('express');

const router = Router();

const providerRouter = require('./routes/providers');

router.use('/providers', providerRouter);

module.exports = router;
