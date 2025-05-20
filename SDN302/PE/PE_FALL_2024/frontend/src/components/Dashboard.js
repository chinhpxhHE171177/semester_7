import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import '../styles.css';

const Dashboard = ({ token, onLogout }) => {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProducts(products.filter(product => product._id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setShowAddForm(false); // Hide add form if visible
    };

    const handleUpdateProduct = (updatedProduct) => {
        setProducts(products.map(product =>
            product._id === updatedProduct._id ? updatedProduct : product
        ));
        setEditProduct(null);
    };

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
        setShowAddForm(false);
    };

    const handleCancelEdit = () => {
        setEditProduct(null);
    };

    return (
        <div>
            <h1>Product Dashboard</h1>
            <button onClick={onLogout}>Logout</button>
            <button onClick={() => {
                setShowAddForm(!showAddForm);
                setEditProduct(null); // Hide edit form if visible
            }}>
                {showAddForm ? 'Cancel' : 'Add Product'}
            </button>
            {showAddForm && <AddProduct token={token} onAdd={handleAddProduct} />}
            {editProduct && (
                <EditProduct
                    token={token}
                    product={editProduct}
                    onUpdate={handleUpdateProduct}
                    onCancel={handleCancelEdit}
                />
            )}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price (USD)</th>
                        <th>Image</th>
                        <th>Featured</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.productDescription}</td>
                            <td>{product.price}</td>
                            <td>
                                <img src={product.image} alt={product.productName} width="80" height="80" />
                            </td>
                            <td>{product.isFeature ? 'Yes' : 'No'}</td>
                            <td>{product.category.categoryName}</td>
                            <td>
                                <button onClick={() => handleDelete(product._id)}>Delete</button>
                                <button onClick={() => handleEdit(product)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;