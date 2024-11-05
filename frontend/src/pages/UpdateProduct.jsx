import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../components/ui/card';
import Alert from '../components/ui/alert';
import Button from '../components/ui/button';
import Input from '../components/ui/input';

export default function UpdateProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { token } = useSelector(state => state.auth);
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

    useEffect(() => {
        // Fetch product data when component mounts
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3005/api/products/${id}`);
                const data = await response.json();
                
                if (response.ok) {
                    setFormData({
                        name: data.name,
                        description: data.description,
                        price: data.price.toString(),
                        imageUrl: data.imageUrl,
                        stock: data.stock.toString(),
                        category: data.category
                    });
                } else {
                    setError('Failed to fetch product details');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to fetch product details');
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!token) {
            setError('You must be logged in to update products');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:3005/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock)
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                navigate('/products');
            } else {
                setError(data.message || 'Failed to update product');
            }
        } catch (err) {
            console.error('Request error:', err);
            setError('Failed to update product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <Card.Header>
                    <h2 className="text-2xl font-bold text-center">Update Product</h2>
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
                                <label className="block text-sm font-medium mb-1 text-gray-300">
                                    Product Name
                                </label>
                                <Input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border-gray-600 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-100"
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
                                <label className="block text-sm font-medium mb-1 text-gray-300">
                                    Description
                                </label>
                                <Input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border-gray-600 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">
                                    Price
                                </label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border-gray-600 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">
                                    Image URL
                                </label>
                                <Input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border-gray-600 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">
                                    Stock Quantity
                                </label>
                                <Input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border-gray-600 rounded"
                                />
                            </div>
                        </div>
                    </Card.Body>

                    <Card.Footer className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            onClick={() => navigate('/products')}
                            variant="secondary"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            disabled={loading}
                            variant="default"
                        >
                            {loading ? 'Updating...' : 'Update Product'}
                        </Button>
                    </Card.Footer>
                </form>
            </Card>
        </div>
    );
}