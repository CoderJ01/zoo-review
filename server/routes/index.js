const router = require('express').Router();
const apiRoutes = require('./api/index');
const authRoutes = require('./auth');

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

module.exports = router;