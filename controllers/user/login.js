const loginRouter = require('express').Router();
const { User } = require('../../models/User');

loginRouter.get('/', (req, res) => {
    res.render('login');
})



module.exports = loginRouter;

