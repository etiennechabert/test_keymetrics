'use strict';

let UserController = require('../controllers/userController');
let express = require('express');
let router = express.Router();

router.get('/', UserController.all);
router.get('/{user_id}', UserController.get);
router.post('/auth', UserController.auth);
router.post('/register', UserController.create);

module.exports = router;