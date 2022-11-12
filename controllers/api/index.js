const apiRouters = require('express').Router();
const postRouter = require('./post');
const commentRouter = require('./comment');

apiRouters.use('/post',postRouter);
apiRouters.use('/comment',commentRouter);

module.exports = apiRouters;