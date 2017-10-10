'use strict';

let express = require('express');
let router = express.Router();
let moduleController = require('../controllers/modulesController');
let auth = require("../middlewares/authenticate");

router.get('/', moduleController.all);
router.get('/{module_id}', moduleController.get);
router.post('/', auth.authenticate('basic', { session: false }), moduleController.publish);
router.get('/{module_id}/download(/{version})', auth.authenticate('basic', { session: false }), moduleController.download);

module.exports = router;