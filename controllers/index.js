const router = require('express').Router();
const homeRouter = require('./homeRouter');
const userRouter = require('./user');
const apiRouter = require('./api');


router.use('/', homeRouter);
router.use('/api', apiRouter);
router.use('/user',userRouter);

// catches all the unmatched route
router.use((req, res) => {
    res.send('<h1>Wrong Route!</h1>');
});

module.exports = router;