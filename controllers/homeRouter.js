const homeRouter = require('express').Router();
const { Post, User } = require('../models/index');

homeRouter.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: { model: User }
    });
    const postArr = postData.map((post) => post.get({ plain: true }));
    res.render('home', { postArr, login: req.isAuthenticated() });
});

module.exports = homeRouter;