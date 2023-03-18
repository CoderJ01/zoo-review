const router = require('express').Router();
const userRoutes = require('./user');
const reviewRoutes = require('./review');
const blogRoutes = require('./blog');
const zooRoutes = require('./zoo');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/blogs', blogRoutes);
router.use('/zoos', zooRoutes);

module.exports = router;