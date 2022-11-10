const registerRouter = require('express').Router();
const User = require('../../models/User');

registerRouter.get('/', (req, res) => {
    res.render('register');
});

registerRouter.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        newUser
            ? res.status(201).send(newUser)
            : res.status(400).send();
    } catch (err) { res.status(500).send(err); }
});

module.exports = registerRouter;

