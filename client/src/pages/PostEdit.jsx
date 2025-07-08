import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import apiService from '../api/apiService';
import PostForm from '../components/PostForm';

const PostEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setPosts } = useContext(AppContext);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await apiService.getPostById(id);
                setPost(response.data);
            } catch (err) {
                setError('Failed to fetch post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleUpdate = async (updatedPost) => {
        try {
            const response = await apiService.updatePost(id, updatedPost);
            setPosts((prevPosts) => 
                prevPosts.map((p) => (p._id === id ? response.data : p))
            );
            navigate(`/posts/${id}`);
        } catch (err) {
            setError('Failed to update post');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Edit Post</h1>
            {post && <PostForm post={post} onSubmit={handleUpdate} />}
        </div>
    );
};

export default PostEdit;