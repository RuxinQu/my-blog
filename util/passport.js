const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// implement passport-local authentication, to see more detail: https://www.passportjs.org/packages/passport-local/
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { email: email } });
                if (!user) {
                    return done(null, false, {
                        message: 'email not registered',
                    });
                }
                const matchPassword = await user.checkPassword(password);
                return matchPassword
                    ? done(null, user)
                    : done(null, false, { message: 'Incorrect password' });
            } catch (error) {
                done(error);
            }
        }
    )
);

// to persist userdata into session. Here we saved the user id, eg: req.session.passport.user = 1
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

//to get the userdata from session, attach the user data to req as req.user. For more detail about serialize and deserialize user
// check: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.deserializeUser(function(id, done) {
    User.findByPk(id).then(function(user) { done(null, user); });
});