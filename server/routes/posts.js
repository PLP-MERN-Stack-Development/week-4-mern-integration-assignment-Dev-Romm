// server/src/routes/posts.js

const express = require('express');
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController.js');
const { validatePost } = require('../middleware/validate.js');
const router = express.Router();

// GET all posts
router.get('/', getAllPosts);

// GET a specific post by ID
router.get('/:id', getPostById);

// POST a new post
router.post('/', validatePost, createPost);

// PUT update an existing post
router.put('/:id', validatePost, updatePost);

// DELETE a post
router.delete('/:id', deletePost);

module.exports = router;