const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/StocksController');
const validator = require('../validators/Validation');
const auth = require('../authorization/Authorization');

// router.post('/register', validator.validateRegistrationBody, userController.create);
// router.post('/authenticate', validator.validateLoginBody, userController.authenticate);

router.get('/dataall',   stocksController.getStocks);
router.get('/data/report',   stocksController.getReports);
router.get('/data',  auth.authClientToken, stocksController.getStocks);
router.get('/data/:id', auth.authClientToken, stocksController.getById);
router.post('/data',   auth.authClientToken, stocksController.save)
router.put('/data/:id',   auth.authClientToken, stocksController.updateById)

module.exports = router;