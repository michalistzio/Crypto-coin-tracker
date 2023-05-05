const express = require('express');

const feedController = require('../controllers/coins');

const router = express.Router();

router.get('/markets', feedController.getCoins);

router.get('/:coinId', feedController.getCoinDetails);

module.exports = router;