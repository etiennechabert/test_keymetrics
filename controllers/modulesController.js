'use strict';

let ModuleModel = require('../models/moduleModels');
let md5 = require('md5');
let packageJsonValidator = require('package-json-validator').PJV;

function moduleFormat(module) {
    let lol = true;
    return {
        name: module.name,
        updated_at: module.updated_at,
        created_at: module.created_at,
        user_email: module.current_version.package.author,
        keywords: module.current_version.package.keywords,
        version: module.current_version.package.version,
        precedent_versions: module.precedent_versions.map((e) => {
            return {
                version: e.version,
                package: JSON.parse(e.package),
                checkSum: e.tgzCheckSum,
                created_at: e.created_at
            }
        })
    };
}

exports.all = function(req, res) {
    ModuleModel.all(function(err, modules) {
        if (err)
            console.error(err);
        res.send({modules: modules});
    });
};

exports.get = function(req, res) {
    ModuleModel.get(req.params.module_name, (err, module) => {
        if (err)
            throw err;
        else if (module)
            res.send({module: moduleFormat(module)});
        else
            res.status(404).send({notFound: req.params.module_name});
    });
};

exports.publishCheck = function(req, res, next) {
    let validation = packageJsonValidator.validate(JSON.stringify(req.body.package), 'npm');
    if (req.body.checkSum !== md5(req.body.base64Content))
        res.status(400).send({corruptedFile: 'checkSum didn\'t march'});
    else if (validation.valid === false)
        res.status(400).send({errors: validation.errors});
    else
        next();
};

exports.publishCreate = function(req, res, next) {
    let lol = true;
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

exports.publish = function(req, res, next) {
    ModuleModel.publish(req.module, req.body.package, req.body.base64Content, (err, module) => {
        if (err)
            throw err;
        res.status(200).send({module: moduleFormat(module)})
    });
};

exports.download = function(req, res) {
    ModuleModel.get(req.params.module_name, function(err, module) {
        if (err)
            throw err;
        res.send({tgzBase64: module.current_version.tgzBase64, tgzCheckSum: module.current_version.tgzCheckSum});
    });
};
