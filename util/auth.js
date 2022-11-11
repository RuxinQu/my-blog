const isAuthenticated = async(req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/user/login');
    }
};

const destroySession = (req, res, next) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
};

module.exports = { isAuthenticated, destroySession };