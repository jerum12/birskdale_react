const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsersController');
const validator = require('../validators/Validation');
const auth = require('../authorization/Authorization');

// router.post('/register', validator.validateRegistrationBody, userController.create);
// router.post('/authenticate', validator.validateLoginBody, userController.authenticate);

router.get('/data',  auth.authClientToken, userController.getAll);
router.post('/register',  validator.validateRegistrationBody, userController.createUser);
router.post('/login', validator.validateLoginBody, userController.login);
router.post('/data', auth.authClientToken, userController.createUser);
router.put('/data/:id', auth.authClientToken, userController.updateUser);


module.exports = router;