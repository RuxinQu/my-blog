const router = require('express').Router();
const sequelize = require('../../config/connection');
const { isAuthenticated } = require('../../util/auth');
const { Post, User, Comment } = require('../../models/index');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const postData = await Post.findAll(
            {
                where: { user_id: req.session.passport.user },
                attributes: {
                    include: [[sequelize.fn('date_format', sequelize.col('createdAt'), '%m-%d-%Y'), 'posttime']],
                },
                include: { model: User }
            });
        const postArr = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { postArr, login: req.isAuthenticated() });
    } catch (err) { console.error(err); }
});

router.get('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const postData = await Post.findOne({ where: { id: req.params.id } });
        const post = postData.get({ plain: true });
        res.render('edit', { post, login: req.isAuthenticated() });
    } catch (err) { console.error(err); }
});


module.exports = router;
