const registerRouter = require('express').Router();


registerRouter.get('/', (req, res) => {
    res.render('login-register',{register: true});
})



module.exports = registerRouter;

