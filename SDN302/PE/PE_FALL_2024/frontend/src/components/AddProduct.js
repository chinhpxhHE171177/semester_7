import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'

const AddProduct = ({ token, onAdd }) => {
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        image: '',
        price: '',
        isFeature: false,
        category: ''
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/products/add-product`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onAdd(response.data);
            setErrors([]);
        } catch (error) {
            setErrors(error.response?.data.errors || [{ msg: error.response?.data.message }]);
        }
    };

    return (
        <div>
            <h2>Add New Product</h2>
            {errors.length > 0 && (
                <ul style={{ color: 'red' }}>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error.msg}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price (USD):</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        max="9999"
                        step="0.01"
                        required
                    />
                </div>
                <div>
                    <label>Featured:</label>
                    <input
                        type="checkbox"
                        name="isFeature"
                        checked={formData.isFeature}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;