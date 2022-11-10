const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

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

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('==============');
    User.findByPk(id).then(function(user) { console.log(user);done(null, user); });
});