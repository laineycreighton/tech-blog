const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// GET all posts for user
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = dbPostData.map((post) =>
            post.get({ plain: true })
        );
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one post
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const { user_id } = req.session
        const getPosts = await Post.findAll({
            where: {
                user_id: user_id
            }
        })

        const parsedPosts = getPosts.map((post) => post.get({ plain: true }))

        res.render('dashboard', { posts: parsedPosts, loggedIn: req.session.log_in })
    } catch (error) {
        res.render('error', { error, loggedIn: req.session.log_in })
    }
})

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;
