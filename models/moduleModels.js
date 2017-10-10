'use strict';
let mongoose = require('mongoose');
let md5 = require('md5');
let moduleSchema = require('./schemas/moduleSchema').moduleSchema;
let releaseSchema = require('./schemas/moduleSchema').releaseSchema;

mongoose.model('ModuleModel', moduleSchema);
mongoose.model('ReleaseModel', releaseSchema);
let ModuleModel = mongoose.model('ModuleModel');
let ReleaseModel = mongoose.model('ReleaseModel');

ModuleModel.all = function(cb) {
    ModuleModel.find(cb);
};

ModuleModel.get = function(name, cb) {
    ModuleModel.findOne({name: name}, cb);
};

ModuleModel.publish = function(module, data, archive, cb) {
    let release = new ReleaseModel({version: data.version, package: JSON.stringify(data), tgzBase64: archive, tgzCheckSum: md5(archive)});
    if (!module.current_version)
        module.precedent_versions = [];
    else
        module.precedent_versions.push(module.current_version);
    module.current_version = release;
    module.save(cb);
};

ModuleModel.create = (function(user, moduleData, cb) {
    new ModuleModel({name: moduleData.name, user_id: user._id, user_email: user.email}).save(cb);
});

module.exports = ModuleModel;