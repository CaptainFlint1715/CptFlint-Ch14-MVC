const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// TODO: route for homepage (all existing blog posts)
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('homepage', { posts })
    } catch (err) {
        res.status(500).json(err);
    }
})


// TODO: route for individual blog post(with comments)
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })

        const post = postData.get({ plain: true });
        res.render('post', { ...post });
    } catch (err) {
        res.status(500).json(err)
    }
})


// TODO: route for user profile
router.get('/profile', withAuth, async (req,res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        })

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch(err) {
        res.status(500).json(err);
    }
})
