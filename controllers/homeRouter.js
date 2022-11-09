const homeRouter = require('express').Router();
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models/index');

homeRouter.get('/', async (req, res) => {
    const post = await Post.findAll({ include: { model: User } })
    const postArr = post.map(post => post.dataValues);
    res.render('home', { postArr });
})

module.exports = homeRouter;