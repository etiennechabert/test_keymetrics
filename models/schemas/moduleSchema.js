'use strict';
let mongoose = require('mongoose');

let releaseSchema = new mongoose.Schema({
    version: String,
    path: String,
    date: {
        type: Date,
        default: Date.now
    }
});

let moduleSchema = new mongoose.Schema({
    name: String,
    package: String,
    currentVersion: releaseSchema,
    precedentVersions: [releaseSchema],
});

mongoose.model('ModuleModel', moduleSchema);

module.exports = mongoose.model('ModuleModel');
