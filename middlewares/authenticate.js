/**
 * Created by chaber_e on 10/10/2017.
 */
let passport = require('passport');
let BasicStrategy = require('passport-http').BasicStrategy;
let UserModel = require('../models/userModel');

passport.use(new BasicStrategy(
    function(email, password, done) {
        UserModel.findByEmail(email, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            user.comparePassword(password, (e1, e2, e3) => {
                done(null, false);
                done(null, user);
            });
        });
    }
));

module.exports = passport;