'use strict';

let Module = require('../models/moduleModels');

exports.all = function(req, res) {
    Module.find(function(err, modules) {
        if (err)
            console.error(err);
        res.send(modules);
    });
};

exports.get = function(req, res) {

};

exports.download = function(req, res) {

};

exports.publish = function(req, res) {

};