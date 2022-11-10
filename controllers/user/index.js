const userRouter = require('express').Router();
const loginRouter = require('./login');
const registerRouter = require('./register')


userRouter.use('/login', loginRouter);
userRouter.use('/register', registerRouter);

module.exports = userRouter;