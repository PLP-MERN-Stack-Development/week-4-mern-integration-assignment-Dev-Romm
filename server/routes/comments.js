const express = require('express');
const { createComment, getCommentsByPostId, deleteComment } = require('../controllers/commentController.js');
const { validateComment, validate } = require('../middleware/validate.js');

const router = express.Router();

// Route to create a new comment
router.post('/:postId', validateComment, validate, createComment);

// Route to get all comments for a specific post
router.get('/:postId', getCommentsByPostId);

// Route to delete a comment
router.delete('/:postId/:commentId', deleteComment);

module.exports = router;