const homeRouter = require('express').Router();
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models/index');

homeRouter.get('/', async (req, res) => {
    const post = await Post.findAll(
        {
            attributes: {
                include: [
                    [sequelize.fn('date_format', sequelize.col('createdAt'), '%m-%d-%Y'), 'posttime']
                ],
            },
            include: { model: User }
        })
    const postArr = post.map((post) => post.get({ plain: true }));

    res.render('home', { postArr });
})

module.exports = homeRouter;