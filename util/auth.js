const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        next(new Error(401));
    }
};

const destroySession = (req, res, next) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
};

module.exports = { isAuthenticated, destroySession };