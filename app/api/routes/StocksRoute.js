const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/StocksController');
const validator = require('../validators/Validation');
var auth = require('../authorization/Authorization');

// router.post('/register', validator.validateRegistrationBody, userController.create);
// router.post('/authenticate', validator.validateLoginBody, userController.authenticate);


router.get('/data',  stocksController.getAll);
router.get('/data/:id', auth.authClientToken, stocksController.getById);
router.post('/data', auth.authClientToken, stocksController.save)

module.exports = router;