import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../api/apiService';

const PostForm = ({ isEditing }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiService.getCategories();
                setCategories(response.data);
            } catch (err) {
                setError('Failed to fetch categories');
            }
        };

        if (isEditing && id) {
            const fetchPost = async () => {
                try {
                    const response = await apiService.getPostById(id);
                    setTitle(response.data.title);
                    setContent(response.data.content);
                    setSelectedCategory(response.data.category);
                } catch (err) {
                    setError('Failed to fetch post');
                }
            };
            fetchPost();
        }

        fetchCategories();
    }, [isEditing, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || !content || !selectedCategory) {
            setError('All fields are required');
            return;
        }

        const postData = { title, content, category: selectedCategory };

        try {
            if (isEditing) {
                await apiService.updatePost(id, postData);
            } else {
                await apiService.createPost(postData);
            }
            navigate('/');
        } catch (err) {
            setError('Failed to save post');
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Post' : 'Create Post'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{isEditing ? 'Update Post' : 'Create Post'}</button>
            </form>
        </div>
    );
};

export default PostForm;