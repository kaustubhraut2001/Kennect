const express = require('express');
const router = express.Router();
const Post = require('../Models/Posts');
const Comment = require('../Models/Comment');
const User = require('../Models/User');


// working
router.post('/add/posts', async(req, res) => {
    try {
        const { author, title, content } = req.body;
        const newPost = new Post({ author, title, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ "Error from /add/post": error.message });
    }
});

//working
router.get('/posts/:postId', async(req, res) => {
    try {

        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });


    }
});



// router.post('/api/posts/:postId/comments', async(req, res) => {
//     try {
//         const { postId } = req.params;
//         const { user, message } = req.body;

//         const post = await Post.findById(postId);
//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         post.comments.push({ user, message });
//         await post.save();

//         res.status(200).json(post);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// Fetch all posts
//working
router.get('/posts', async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


router.post("/comment/:postid/comments/:username", async(req, res) => {

    try {

        const { postid, username } = req.params;
        const { comment } = req.body;
        const newComment = new Comment({ postid, user: username, comment });

        await newComment.save();

        res.status(201).json(newComment);



    } catch (error) {
        res.status(500).json({ "Error from /add/comment": error.message });



    }




})




module.exports = router;