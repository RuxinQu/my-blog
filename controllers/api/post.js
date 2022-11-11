const router = require('express').Router();
const { isAuthenticated } = require('../../util/auth');
const { Post, User, Comment } = require('../../models/index');

router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },

            include: [
                { model: User },
                {
                    model: Comment,
                    include: [User]
                }]
        });
        const post = postData.get({ plain: true });
        res.render('post', { post, login: req.isAuthenticated() });
    } catch (err) { console.log(err); }
});



router.get('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const postData = await Post.findOne({ where: { id: req.params.id } });
        const post = postData.get({ plain: true });
        res.render('edit', { post, login: req.isAuthenticated() });
    } catch (err) { console.error(err); }
});


module.exports = router;