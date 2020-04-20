const express = require('express');
const router = express.Router();
const parameterController = require('../controllers/ParameterController');
const validator = require('../validators/Validation');
var auth = require('../authorization/Authorization');

// router.post('/register', validator.validateRegistrationBody, userController.create);
// router.post('/authenticate', validator.validateLoginBody, userController.authenticate);


router.get('/data',  auth.authClientToken, parameterController.getAllParameter);


module.exports = router;