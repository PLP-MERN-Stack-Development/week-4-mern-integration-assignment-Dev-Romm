const Comment = require('../models/Comment.js');

// Create a new comment
const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { postId } = req.params;
        const newComment = new Comment({ content, post: postId });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
};

// Get all comments for a specific post
const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};

module.exports = {
    createComment,
    getCommentsByPostId,
    deleteComment
};