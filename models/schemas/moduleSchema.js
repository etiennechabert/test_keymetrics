'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let releaseSchema = new Schema({
    version: String,
    path: String,
    date: Date
});

let moduleSchema = new Schema({
    name: String,
    package: String,
    currentVersion: releaseSchema,
    precedentsVersion: [releaseSchema]
});

mongoose.model('ModuleModel', moduleSchema);

module.exports = mongoose.model('ModuleModel');
