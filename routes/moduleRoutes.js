'use strict';

let express = require('express');
let router = express.Router();
let moduleController = require('../controllers/moduleController');

router.get('/', moduleController.all);
router.post('/', moduleController.publish);
router.get('/{module_id}', moduleController.get);
router.get('/{module_id}/download(/{version})', moduleController.download);

module.exports = router;