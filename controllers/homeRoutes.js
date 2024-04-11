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






// TODO: route for user profile

