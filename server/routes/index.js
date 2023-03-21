const router = require('express').Router();
const apiRoutes = require('./api/index');
const authRoutes = require('./auth');
const dashboardRoutes = require('./dashboard');

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;