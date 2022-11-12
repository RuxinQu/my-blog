const router = require('express').Router();
const isAuthenticated = require('../../util/auth');
const { Post, User, Comment } = require('../../models/index');

router.get('/newpost', isAuthenticated, async (req, res) => {
    try {
        res.render('newpost', { login: req.isAuthenticated() });
    } catch (err) { console.error(err); }
});

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
    } catch (err) { console.error(err); }
});

router.get('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const postData = await Post.findOne({ where: { id: req.params.id } });
        const post = postData.get({ plain: true });
        res.render('edit', { post, login: req.isAuthenticated() });
    } catch (err) { console.error(err); }
});

router.post('/', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    const user_id = req.session.passport.user;
    try {
        await Post.create({
            title,
            content,
            user_id
        });
        res.status(201).redirect('/user/dashboard');
    } catch (err) { console.error(err); }
});

router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const updatePost = await Post.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(201).send(updatePost);
    } catch (err) { console.error(err); }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (err) { console.error(err); }
});

module.exports = router;