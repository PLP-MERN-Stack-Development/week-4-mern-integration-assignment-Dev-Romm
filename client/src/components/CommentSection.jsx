import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { fetchComments, addComment } = useApi();

    useEffect(() => {
        const loadComments = async () => {
            const fetchedComments = await fetchComments(postId);
            setComments(fetchedComments);
        };
        loadComments();
    }, [postId, fetchComments]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const commentData = await addComment(postId, { text: newComment });
            setComments([...comments, commentData]);
            setNewComment('');
        }
    };

    return (
        <div className="comment-section">
            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>{comment.text}</li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CommentSection;