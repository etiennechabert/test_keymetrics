'use strict';

let User = require('../models/userModel');
let userHelper = require('./helpers/userHelper');

exports.list = function(req, res) {
    User.find(function(err, users) {
        if (err) throw err;
        res.send({users: users.map(userHelper.userFormat)});
    })
};

exports.get = function(req, res) {
    User.findByEmail(req.params.email, function (err, user) {
        try {
            if (err) throw err;
            if (user)
                res.send({user: userHelper.userFormat(user)});
            else
                res.status(404).send({userNotFound: req.params.user_id});
        } catch (error) {
            switch (error.name) {
                case 'CastError':
                    res.status(400).send({formatError: error.message});
                    break;
                case 'MongoError':
                    res.status(400).send({userError: error.message});
                    break;
                default:
                    throw error;
            }
        }
    });
};

exports.create = function(req, res) {
    User.create(req.body, (err, user) => {
        try {
            if (err) throw err;
            res.send({user: userHelper.userFormat(user)});
        } catch (error) {
            switch (error.name) {
                case 'ValidationError':
                    res.status(400).send({userError: error.message});
                    break;
                case 'MongoError':
                    res.status(400).send({userError: error.message});
                    break;
                default:
                    throw error;
            }
        }
    })
};
