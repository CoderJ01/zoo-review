const router = require('express').Router();
const apiRoutes = require('./api/index');
const authRoutes = require('./auth');
const homepageRoutes = require('./homepage');
const dashboardRoutes = require('./dashboard');
const postBlogRoutes = require('./post-blog');
const postReviewRoutes = require('./post-review');
const singleReview = require('./single-review');

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);
router.use('/homepage', homepageRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post-blog', postBlogRoutes);
router.use('/post-review', postReviewRoutes);
router.use('/single-review', singleReview);

module.exports = router;