const router = require('express').Router();
const userRoutes = require('./user');
const reviewRoutes = require('./review');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;