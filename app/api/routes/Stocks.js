const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/StocksController');
const validator = require('../validators/Validation');

// router.post('/register', validator.validateRegistrationBody, userController.create);
// router.post('/authenticate', validator.validateLoginBody, userController.authenticate);


router.get('/getAllData',  stocksController.getAll);

module.exports = router;