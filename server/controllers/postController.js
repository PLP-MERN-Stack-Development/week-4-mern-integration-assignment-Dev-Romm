// This file contains the post controller for managing blog post-related API endpoints.

const Post = require('../models/Post.js'); // Import the Post model

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('category', 'name');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// Get a specific post by ID
const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('category', 'name');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
};

// Create a new post
const createPost = async (req, res) => {
    const { title, content, category } = req.body;
    try {
        const newPost = new Post({ title, content, category });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};

// Update an existing post
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { title, content, category }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};