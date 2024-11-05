import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import Button from './ui/button';
import Alert from './ui/alert';
import { ShoppingCart, Trash2 } from 'lucide-react';

export default function ProductCard({ product, onDelete }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, user } = useSelector(state => state.auth);
    const { items: cartItems, message, messageType } = useSelector(state => state.cart);

    const handleAddToCart = async () => {
        try {
        await dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap();
        } catch (error) {
        // Error will be handled by the reducer
        }
    };

    const isInCart = cartItems.some(item => item.product._id === product._id);


    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
        return;
        }
    
        try {
        const response = await fetch(`http://localhost:3005/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });
    
        if (response.ok) {
            // Refresh the products list or remove the product from the current view
            onDelete(productId);
        } else {
            const data = await response.json();
            console.error('Failed to delete product:', data.message);
        }
        } catch (error) {
        console.error('Error deleting product:', error);
        }
    };
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        {message && (
            <Alert 
            variant={messageType} 
            className="mb-4"
            >
            {message}
            </Alert>
        )}
        <img 
            src={product.imageUrl || '/api/placeholder/400/300'} 
            alt={product.name}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-400 mb-2">{product.description}</p>
            <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">R{product.price}</span>
            <span className="text-gray-400">Stock: {product.stock}</span>
            </div>
            <div className="flex gap-2">
            <Button 
                variant={isInCart ? "secondary" : "primary"}
                className="flex-1"
                onClick={handleAddToCart}
                disabled={isInCart || product.stock === 0}
            >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isInCart ? 'In Cart' : 'Add to Cart'}
            </Button>
            {user && user.id === product.seller && (
                <Button 
                variant="destructive"
                onClick={() => navigate(`/products/${product._id}/edit`)}
                >
                <Trash2 className="w-4 h-4" />
                </Button>
            )}
            </div>
        </div>
        </div>
    );
}