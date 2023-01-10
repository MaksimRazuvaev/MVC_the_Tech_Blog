const router = require('express').Router();

const userRoutes = require('./user-routs');

router.use('/users', userRoutes);

module.exports = router;