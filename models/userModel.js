'use strict';
let mongoose = require('mongoose');
let UserSchema = require('./schemas/userSchema');

mongoose.model('UserModel', UserSchema);
let UserModel = mongoose.model('UserModel');

UserModel.create = function(data, cb) {
    new UserModel(data).save(cb);
};

UserModel.get = function(userId, cb) {
    UserModel.findOne({_id: userId}, cb);
};

UserModel.findByEmail = function(email, cb) {
    UserModel.findOne({email: email}, cb);
};

module.exports = UserModel;