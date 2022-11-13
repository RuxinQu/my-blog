const router = require('express').Router();
const isAuthenticated = require('../../util/auth');
const { Comment } = require('../../models/index');

// passport has deserialized userdata to req.user, access the user.id and get the post id from the req.param
// the request is sent from the button on views/post.handlebar
router.post('/:id', isAuthenticated, async (req, res) => {
    const user_id = req.user.id;
    const post_id = req.params.id;
    const { content } = req.body;
    try {
        await Comment.create({
            content,
            user_id,
            post_id
        });
        res.status(201).redirect(`/api/post/${post_id}`);
    } catch (err) { res.status(400).send('Failed to create new comment'); }
});

module.exports = router;