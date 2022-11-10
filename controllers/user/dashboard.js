const router = require('express').Router();
const sequelize = require('../../config/connection');
const { isAuthenticated } = require('../../util/auth');
const { Post, User } = require('../../models/index');

router.get('/', async (req, res) => {
    try {
        console.log(req.session.passport.user+ '======================')
        const postData = await Post.findAll(
            {
                // where:{username: req.session.passport.user},
                attributes: {
                    include: [[sequelize.fn('date_format', sequelize.col('createdAt'), '%m-%d-%Y'), 'posttime']],
                },
                include: { model: User }
            });
        const postArr = postData.map((post) => post.get({ plain: true }));
        res.render('home', { postArr });
    } catch (err) { console.error(err); }
});


module.exports = router;
