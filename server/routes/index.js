const router = require('express').Router();
const apiRoutes = require('./api/index');
const authRoutes = require('./auth');
const homepageRoutes = require('./homepage');
const dashboardRoutes = require('./dashboard');
const postBlogRoutes = require('./post-blog');

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);
router.use('/homepage', homepageRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post-blog', postBlogRoutes);

module.exports = router;