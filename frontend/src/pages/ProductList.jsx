import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Input  from '../components/ui/input';
import Alert from '../components/ui/alert';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
        const response = await fetch('http://localhost:3005/api/products');
        const data = await response.json();
        
        if (response.ok) {
            setProducts(data);
        } else {
            setError('Failed to fetch products');
        }
        } catch (err) {
        setError('Error loading products');
        } finally {
        setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.ok) {
            setProducts(products.filter(product => product.id !== id));
        }
        } catch (err) {
        setError('Failed to delete product');
        }
    };

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <LoadingSpinner />;
    return (
        <div>
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {error && <Alert variant="error" className="mb-4">{error}</Alert>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
    )
}
