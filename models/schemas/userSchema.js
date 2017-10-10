'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let config = require('config');
let _BaseSchema = require('./_baseSchema');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// This callback is here to hash the password
UserSchema.pre('save', function(next) {
        let user = this;

        if (!user.isModified('password')) return next();
        bcrypt.genSalt(config.get('bcrypt_salt_work_factor'), function(err, salt) {
            if (err)
                return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err)
                    return next(err);

                user.password = hash;
                next();
            });
        });
    });
// This function is here to edit updated_date
UserSchema.pre('save', _BaseSchema.dateUpdate);

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

mongoose.model('UserModel', UserSchema);

module.exports = mongoose.model('UserModel');
