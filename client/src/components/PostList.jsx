import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { fetchPosts } from '../api/apiService';
import Post from './Post';

const PostList = () => {
    const { posts, setPosts, loading, setLoading, error, setError } = useContext(AppContext);

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true);
            try {
                const data = await fetchPosts();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, [setPosts, setLoading, setError]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <Post post={post} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;