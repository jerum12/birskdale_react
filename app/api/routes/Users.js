const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsersController');
const validator = require('../validators/Validation');

// router.post('/register', validator.validateRegistrationBody, userController.create);
// router.post('/authenticate', validator.validateLoginBody, userController.authenticate);


router.post('/register',  validator.validateRegistrationBody, userController.createUser);
router.post('/login', validator.validateLoginBody, userController.login);

module.exports = router;