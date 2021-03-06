'use strict';
let mongoose = require('mongoose');
let md5 = require('md5');
let moduleSchema = require('./schemas/moduleSchema').moduleSchema;
let releaseSchema = require('./schemas/moduleSchema').releaseSchema;

mongoose.model('ModuleModel', moduleSchema);
mongoose.model('ReleaseModel', releaseSchema);
let ModuleModel = mongoose.model('ModuleModel');
let ReleaseModel = mongoose.model('ReleaseModel');

ModuleModel.get = function(name, cb) {
    ModuleModel.findOne({name: name}, cb);
};

ModuleModel.publish = function(module, data, archive, cb) {
    let release = new ReleaseModel({version: data.version, package: JSON.stringify(data), base64: archive, checkSum: md5(archive)});
    if (!module.current_version)
        module.precedent_versions = [];
    else
        module.precedent_versions.push(module.current_version);
    module.current_version = release;
    module.save(cb);
};

ModuleModel.create = function(user, moduleData, cb) {
    new ModuleModel({name: moduleData.name, user_id: user._id, user_email: user.email}).save(cb);
};

ModuleModel.download = function(module, version) {
    if (!version)
        return module.current_version;
    return module.precedent_versions.find((release) => {
        if (release.version === version)
            return version;
        return null;
    });
};

module.exports = ModuleModel;