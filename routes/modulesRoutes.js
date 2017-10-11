'use strict';

let express = require('express');
let router = express.Router();
let moduleController = require('../controllers/modulesController');
let auth = require("../middlewares/authenticate");

router.get('/', moduleController.list);
router.get('/:module_name', moduleController.get);
router.post('/', auth.authenticate('basic', { session: false }), moduleController.publishCheck, moduleController.publishCreate, moduleController.publish);
router.get('/:module_name/download/:version?', auth.authenticate('basic', { session: false }), moduleController.download);

module.exports = router;