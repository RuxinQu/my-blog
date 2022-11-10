const loginRouter = require('express').Router();
const passport = require('passport');

const User = require('../../models/User');
const chalk = require('chalk');

loginRouter.get('/', (req, res) => {
    res.render('login');
});

// loginRouter.post('/', async (req, res) => {
//     console.log(chalk.bgRed('ksksksks'));
// });

loginRouter.post('/password', passport.authenticate('local', {
    // successRedirect: '/',
    successReturnToOrRedirect: '/dashboard',
    failureRedirect: '/user/login',
})
);
module.exports = loginRouter;

