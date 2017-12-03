const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const user = mongoose.model('users');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {

    user.findById(id)
        .then(user => {
            done(null, user);
        })

});
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google_client_id,
            clientSecret: keys.google_client_secret,
            callbackURL: '/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => {
            user.findOne({ 'google_id': profile.id })
                .then((existingUser) => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new user({ google_id: profile.id }).save()
                            .then(user => {
                                done(null, user);
                            });
                    }
                });
            // console.log("access Token : " + accessToken);
            // console.log("refreshToken Token : " + refreshToken);
            // console.log("profile : " + JSON.stringify(profile));
        }
    )
);

