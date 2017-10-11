'use strict';

let ModuleModel = require('../models/moduleModels');
let md5 = require('md5');
let packageJsonValidator = require('package-json-validator').PJV;
let moduleHelper = require('./helpers/moduleHelper');

exports.all = function(req, res) {
    ModuleModel.all(function(err, modules) {
        if (err)
            console.error(err);
        res.send({modules: modules.map(moduleHelper.moduleFormat)});
    });
};

exports.get = function(req, res) {
    ModuleModel.get(req.params.module_name, (err, module) => {
        if (err)
            throw err;
        else if (module)
            return res.send({module: moduleHelper.moduleFormat(module)});
        res.status(404).send(moduleHelper.notFoundError(req.params.module_name));
    });
};

exports.publishCheck = function(req, res, next) {
    let validation = packageJsonValidator.validate(JSON.stringify(req.body.package), 'npm');
    if (req.body.checkSum !== md5(req.body.base64Content))
        return res.status(400).send({corruptedFile: 'checkSum didn\'t march'});
    else if (validation.valid === false)
        return res.status(400).send({errors: validation.errors});
    next();
};

exports.publishCreate = function(req, res, next) {
    ModuleModel.get(req.body.package.name, function(err, module) {
        if (!module)
            ModuleModel.create(req.user, req.body.package, (err, module) => {
                if (err)
                    throw err;
                req.module = module;
                next();
            });
        else if (module.user_id !== req.user._id.toString())
            res.status(400).send({badUserUpdate: 'Bad user try to publish a new version of the module'});
        else {
            req.module = module;
            next();
        }
    });
};

exports.publish = function(req, res) {
    ModuleModel.publish(req.module, req.body.package, req.body.base64Content, (err, module) => {
        if (err)
            throw err;
        res.status(200).send({module: moduleHelper.moduleFormat(module)})
    });
};

exports.download = function(req, res) {
    ModuleModel.get(req.params.module_name, function(err, module) {
        if (err)
            throw err;
        else if (!module)
            res.status(404).send(moduleHelper.notFoundError(req.params.module_name));
        else {
            let download = ModuleModel.download(module, req.params.version);

            if (!download)
                res.status(404).send(moduleHelper.notFoundVersionError(module, req.params.version));
            else
                res.send(download);
        }
    });
};
