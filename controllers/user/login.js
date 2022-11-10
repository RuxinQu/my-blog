const loginRouter = require('express').Router();
const passport = require('../../util/passport');

loginRouter.get('/', (req, res) => {
    res.render('login');
});


loginRouter.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    });

module.exports = loginRouter;

