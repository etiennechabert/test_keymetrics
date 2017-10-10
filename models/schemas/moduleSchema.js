'use strict';
let mongoose = require('mongoose');

let releaseSchema = new mongoose.Schema({
    version: {type: String, required: true,},
    tgzBase64: {type: String, required: true,},
    tgzCheckSum: {type: String, required: true,},
    package: {type: String, required: true,},
    created_at: {type: Date, default: Date.now},
});

let moduleSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    user_id: {type: String, required: true,},
    user_email: {type: String, required: true,},
    current_version: releaseSchema,
    precedent_versions: [releaseSchema],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports.moduleSchema = moduleSchema;
module.exports.releaseSchema = releaseSchema;
