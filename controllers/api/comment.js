const router = require('express').Router();
const isAuthenticated = require('../../util/auth');
const { Comment } = require('../../models/index');

router.post('/:id', isAuthenticated, async (req, res) => {
    const user_id = req.session.passport.user;
    const post_id = req.params.id;
    const { content } = req.body;
    try {
        await Comment.create({
            content,
            user_id,
            post_id
        });
        res.status(201).redirect(`/api/post/${post_id}`);
    } catch (err) { console.error(err); }

});

module.exports = router;