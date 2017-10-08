'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
});

mongoose.model('UserModel', moduleSchema);

module.exports = mongoose.model('UserModel');
