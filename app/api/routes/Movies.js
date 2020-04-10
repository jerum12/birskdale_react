const express = require('express');
const router = express.Router();
const movieController = require('../controllers/Movies');
var auth = require('../authorization/Authorization');

router.get('/', auth.authClientToken, movieController.getAll);
router.post('/', auth.authClientToken, movieController.create);
router.get('/:movieId', auth.authClientToken, movieController.getById);
router.put('/:movieId', auth.authClientToken, movieController.updateById);
router.delete('/:movieId', auth.authClientToken, movieController.deleteById);

module.exports = router;