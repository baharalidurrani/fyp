const passport = require('passport');
const UserModel = require('../Models/User');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {

    UserModel.findById(id).then((user) => {

        if(!user) return done(null,false);

        done(null,user);
    });

});



passport.use('local', new LocalStrategy({
    usernameField: 'EMAIL',
    passwordField: 'PASS',
    passReqToCallback: true
}, function (req, EMAIL, PASS, done) {

    UserModel.findOne({
        _email: EMAIL
    }).then((user) => {

        if (!user) return done(null, false);

        user.comparePassword(PASS, (error, Ismatch) => {

            if (!Ismatch) return done(null, false);

            done(null, user);

        });


    }).catch((err) => {
        done(err);
    });
}));