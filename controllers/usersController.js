'use strict';

let User = require('../models/userModel');

function userFormat(user) {
    let userObj = user.toObject();
    delete userObj.password;
    return userObj;
}

exports.all = function(req, res) {
    User.all(function(err, users) {
        if (err) throw err;
        res.send({users: users.map(userFormat)});
    })
};

exports.get = function(req, res) {
    User.get(req.params.user_id, function (err, user) {
        try {
            if (err) throw err;
            if (user)
                res.send({user: userFormat(user)});
            else
                res.status(404).send({userNotFound: req.params.user_id});
        } catch (error) {
            switch (error.name) {
                case 'CastError':
                    res.status(400).send({formatError: error.message});
                    break;
                case 'MongoError':
                    res.status(401).send({userError: error.message});
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
            res.send({user: userFormat(user)});
        } catch (error) {
            switch (error.name) {
                case 'ValidationError':
                    res.status(400).send({userError: error.message});
                    break;
                case 'MongoError':
                    res.status(401).send({userError: error.message});
                    break;
                default:
                    throw error;
            }
        }
    })
};
