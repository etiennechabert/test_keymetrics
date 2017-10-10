'use strict';

let UserController = require('../controllers/usersController');
let express = require('express');
let router = express.Router();

router.get('/', UserController.all);
router.post('/', UserController.create);
router.post('/auth', UserController.auth);
router.get('/:user_id', UserController.get);
router.post('/:user_id', UserController.edit);

module.exports = router;