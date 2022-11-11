const router = require('express').Router();
const {isAuthenticated} = require('../../util/auth');
const {Post} = require('../../models/index');

router.get('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const postData = await Post.findOne({ where: { id: req.params.id } });
        const post = postData.get({ plain: true });
        res.render('edit', { post, login: req.isAuthenticated() });
    } catch (err) { console.error(err); }
});


module.exports = router