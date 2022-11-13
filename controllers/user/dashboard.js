const router = require('express').Router();
const isAuthenticated = require('../../util/auth');
const { Post, User } = require('../../models/index');

// only available when user is login. shows all the post from the user. 
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const postData = await Post.findAll(
            {
                where: { user_id: req.user.id },
                include: { model: User }
            });
        const postArr = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { postArr, login: req.isAuthenticated() });
    } catch (err) { console.error(err); }
});

module.exports = router;
