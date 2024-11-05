import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../components/ui/card';
import Alert from '../components/ui/alert';
import Button from '../components/ui/button';
import Input from '../components/ui/input';

export default function AddProduct() {
    const navigate = useNavigate();
    const { token, user } = useSelector(state => state.auth);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        stock: '',
        category: ''
    });

    const categories = [
        'Rings',
        'Necklaces',
        'Earings',
        'Bracelets',
        'Watches'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!token) {
            setError('You must be logged in to add products');
            return;
        }

        if (!formData.category) {
            setError('Please select a category');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3005/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                    seller: user._id
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                navigate('/products');
            } else {
                setError(data.message || 'Failed to add product');
                console.error('Server error:', data.error);
            }
        } catch (err) {
            console.error('Request error:', err);
            setError('Failed to add product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <Card.Header>
                    <h2 className="text-2xl font-bold text-center">Add New Product</h2>
                </Card.Header>
                
                <form onSubmit={handleSubmit}>
                    <Card.Body>
                        {error && (
                            <Alert className="mb-4 bg-red-900/50 text-red-300 p-3 rounded">
                                {error}
                            </Alert>
                        )}
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-300">
                                    Product Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium mb-1 text-gray-300">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 p-2 text-gray-100"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-300">
                                    Description
                                </label>
                                <Input
                                    id="description"
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium mb-1 text-gray-300">
                                    Price
                                </label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium mb-1 text-gray-300">
                                    Image URL
                                </label>
                                <Input
                                    id="imageUrl"
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium mb-1 text-gray-300">
                                    Stock Quantity
                                </label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </Card.Body>

                    <Card.Footer className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            onClick={() => navigate('/products')}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Product'}
                        </Button>
                    </Card.Footer>
                </form>
            </Card>
        </div>
    );
}