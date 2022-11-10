const userRouter = require('express').Router();
const loginRouter = require('./login');
const registerRouter = require('./register');


userRouter.use('/login', loginRouter);
userRouter.use('/register', registerRouter);
userRouter.post('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.status(204).end();
    });
});

module.exports = userRouter;