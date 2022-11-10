const homeRouter = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models/index');
// const registerRouter = require('./user/register');

homeRouter.get('/', async (req, res) => {
    const postData = await Post.findAll(
        {
            attributes: {
                include: [[sequelize.fn('date_format', sequelize.col('createdAt'), '%m-%d-%Y'), 'posttime']],
            },
            include: { model: User }
        });
    const postArr = postData.map((post) => post.get({ plain: true }));
    res.render('home', { postArr, login: req.session.login });
});

function ensureAuthentication(req, res, next) {
    // Complete the if statmenet below:
    if (req.session.authenticated) {
        return next();
    } else {
        res.status(403).json({ msg: 'You\'re not authorized to view this page' });
    }
}


module.exports = homeRouter;