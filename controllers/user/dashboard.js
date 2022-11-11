const router = require('express').Router();
const sequelize = require('../../config/connection');
const { isAuthenticated } = require('../../util/auth');
const { Post, User} = require('../../models/index');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const postData = await Post.findAll(
            {
                where: { user_id: req.session.passport.user },
                
                include: { model: User }
            });
        const postArr = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { postArr, login: req.isAuthenticated() });
    } catch (err) { console.error(err); }
});

module.exports = router;
