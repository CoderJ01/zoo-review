const router = require('express').Router();
const userRoutes = require('./user');
const reviewRoutes = require('./review');
const blogRoutes = require('./blog');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;