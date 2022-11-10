const loginRouter = require('express').Router();
const { User } = require('../../models/User');

loginRouter.get('/', (req, res) => {
    res.render('login-register',{login: true});
})



module.exports = loginRouter;

