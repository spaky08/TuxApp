const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const router = express.Router(); // eslint-disable-line new-cap
const TransportController = require('../controllers/transport.controller');

const passport = require('passport');

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.json({status:200,msg:"Ok"})
);

router.get('/transport',TransportController.index);
router.get('/transport/:id',TransportController.show);
router.get('/transportLoad',TransportController.store);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
