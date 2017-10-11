'use strict';

let UserController = require('../controllers/usersController');
let express = require('express');
let router = express.Router();
let auth = require("../middlewares/authenticate");

router.get('/', UserController.list);
router.post('/', UserController.create);
// router.post('/auth', UserController.auth);
router.get('/:email', UserController.get);

module.exports = router;