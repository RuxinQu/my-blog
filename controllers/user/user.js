const router = require('express').Router();
const passport = require('passport');


const User = require('../../models/User');

// return the login page
router.get('/login', (req, res) => {
    res.render('login');
});

//click on the submit butten then a post request is sent to /login/password path
//use passport.js authentication as middleware
router.post('/login/password', passport.authenticate('local', {
    successReturnToOrRedirect: '/user/dashboard',
    failureRedirect: '/user/login',
}));

//return the signup page
router.get('/register', (req, res) => {
    res.render('register');
});

//when click on the submit button on signup page, a post request is sent to /register path
//a new user is then created
router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        newUser
            ? res.redirect('/user/login')
            : res.status(400).send();
    } catch (err) { res.status(500).json({ message: 'Failed to sign up' }); }
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/user/login');
    });
});


module.exports = router;

