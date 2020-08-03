const express = require('express');
const router = express.Router();
const stocksHistoryController = require('../controllers/StocksHistoryController');
const validator = require('../validators/Validation');
var auth = require('../authorization/Authorization');

// router.post('/register', validator.validateRegistrationBody, userController.create);
// router.post('/authenticate', validator.validateLoginBody, userController.authenticate);


router.get('/data',  auth.authClientToken, stocksHistoryController.getStocksHistory);
router.get('/data/:id', auth.authClientToken, stocksHistoryController.getStocksHistoryById);
router.post('/data',   auth.authClientToken, stocksHistoryController.saveStocksHistory)
router.put('/data/:id',   auth.authClientToken, stocksHistoryController.updateStocksHistory)

module.exports = router;