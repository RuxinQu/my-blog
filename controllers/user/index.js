const userRouter = require('express').Router();
const loginRouter = require('./login');



userRouter.use('/login', loginRouter);


module.exports = userRouter;