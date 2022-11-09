const router = require('express').Router();
// const apiRouters = require('./api');
const homeRouter = require('./homeRouter');

router.use('/', homeRouter);
// router.use('/api', apiRouters);

router.use((req, res) => {
    res.send('<h1>Wrong Route!</h1>')
})

module.exports = router;