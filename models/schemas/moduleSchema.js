'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let releaseSchema = new Schema({
    version: String,
    path: String,
    date: {
        type: Date,
        default: Date.now
    }
});

let moduleSchema = new Schema({
    name: String,
    package: String,
    currentVersion: releaseSchema,
    precedentVersions: [releaseSchema],
});

mongoose.model('ModuleModel', moduleSchema);

module.exports = mongoose.model('ModuleModel');
