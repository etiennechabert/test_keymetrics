'use strict';
let UserSchema = require('./schemas/userSchema');

module.exports.all = function(err, res) {
    UserSchema.find(err, res);
};

module.exports.create = function(data, cb) {
    new UserSchema(data).save(data, cb);
};

module.exports.get = function(userId, cb) {
    UserSchema.findOne({_id: userId}, cb);
};