'use strict';

let UserController = require('../controllers/usersController');
let express = require('express');
let router = express.Router();
let auth = require("../middlewares/authenticate");

router.get('/', UserController.all);
router.post('/', UserController.create);
// router.post('/auth', UserController.auth);
router.get('/:user_id', UserController.get);

module.exports = router;