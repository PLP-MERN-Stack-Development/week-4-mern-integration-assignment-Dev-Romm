import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { fetchPost } from '../api/apiService';
import CommentSection from '../components/CommentSection';

const PostView = () => {
    const { id } = useParams();
    const { post, setPost } = useContext(AppContext);

    useEffect(() => {
        const getPost = async () => {
            const fetchedPost = await fetchPost(id);
            setPost(fetchedPost);
        };

        getPost();
    }, [id, setPost]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <CommentSection postId={post._id} />
        </div>
    );
};

export default PostView;