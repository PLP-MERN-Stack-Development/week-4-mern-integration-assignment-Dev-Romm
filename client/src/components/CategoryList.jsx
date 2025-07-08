import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../api/apiService';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, []);

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories: {error}</p>;

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category._id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;