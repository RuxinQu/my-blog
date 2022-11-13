const router = require('express').Router();
const isAuthenticated = require('../../util/auth');
const { Post, User, Comment } = require('../../models/index');

//this route needs to be on top of /:id. it sends the newpost.handlebar when user click +new post
router.get('/newpost', isAuthenticated, async (req, res) => {
    try {
        res.render('newpost', { login: req.isAuthenticated() });
    } catch (err) { console.error(err); }
});

//get a single post with user and comment. 
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            include: [
                { model: User },
                // the code below will do a join between comment and user, so the username matches user_id in comment can be returned
                {
                    model: Comment,
                    include: [User]
                }]
        });
        if (!postData) {
            return res.status(404).send('404 not found');
        }
        const post = postData.get({ plain: true });
        res.render('post', { post, login: req.isAuthenticated() });
    } catch (err) { console.error(err); }
});

//return the edit page with the original title and content as default value, add authorization check, can't edit the post belongs to others
router.get('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const postData = await Post.findOne({ where: { id: req.params.id } });
        const post = postData.get({ plain: true });
        if (post.user_id !== req.user.id) {
            return res.status(400).send('lack of permisstion');
        }
        res.render('edit', { post, login: req.isAuthenticated() });
    } catch (err) { console.error(err); }
});

//handle creating new post then redirect to the dashboard page
router.post('/', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    const user_id = req.user.id;
    try {
        await Post.create({
            title,
            content,
            user_id
        });
        res.status(201).redirect('/user/dashboard');
    } catch (err) { console.error(err); }
});

//handle updating the post. the request is sent from the public/js/edit-delete file. the button type=button
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const updatePost = await Post.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(201).send(updatePost);
    } catch (err) { console.error(err); }
});

//the request is sent from the public/js/edit-delete file. the button type=button
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (err) { console.error(err); }
});

module.exports = router;