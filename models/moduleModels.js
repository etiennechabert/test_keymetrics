'use strict';
let ModuleSchema = require('./schemas/moduleSchema');

module.exports.all = function(err, cb) {
    ModuleSchema.find(err, cb);
};

module.exports.create = (function(data, err, cb) {
    new ModuleSchema(data).save();
});