import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import PostList from '../components/PostList';
import CategoryList from '../components/CategoryList';

const Home = () => {
    const { fetchPosts, fetchCategories } = useContext(AppContext);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, [fetchPosts, fetchCategories]);

    return (
        <div>
            <h1>Welcome to the best Blog ever!</h1>
            <CategoryList />
            <PostList />
        </div>
    );
};

export default Home;