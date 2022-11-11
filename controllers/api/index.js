const apiRouters = require('express').Router();
const postRouter = require('./post');

apiRouters.use('/post',postRouter);


module.exports = apiRouters;