import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart, clearCart, clearMessage } from '../redux/slices/cartSlice';
import Card  from '../components/ui/card';
import Button from '../components/ui/button';
import Alert from '../components/ui/alert';
import { Minus, Plus, Trash2, RefreshCw } from 'lucide-react';

export default function Cart() {
  const dispatch = useDispatch();
  const { items, loading, error, message, messageType } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleUpdateQuantity = async (productId, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity < 1) return;
    
    try {
      await dispatch(updateCartItem({ productId, quantity: newQuantity })).unwrap();
    } catch (error) {
      // Error will be handled by the reducer
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeFromCart(productId)).unwrap();
    } catch (error) {
      // Error will be handled by the reducer
    }
  };

  const handleClearCart = async () => {
    try {
      await dispatch(clearCart()).unwrap();
    } catch (error) {
      // Error will be handled by the reducer
    }
  };

  const totalAmount = items.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  );

  return (
    <div className="max-w-4xl mx-auto">
      {message && (
        <Alert 
          variant={messageType} 
          className="mb-6"
        >
          {message}
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        {items.length > 0 && (
          <Button 
            variant="destructive" 
            onClick={handleClearCart}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear Cart
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <RefreshCw className="w-8 h-8 animate-spin" />
        </div>
      ) : error ? (
        <Alert variant="error" className="my-4">
          {error}
        </Alert>
      ) : items.length === 0 ? (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-400">Add some products to your cart to see them here.</p>
        </div>
      ) : (
        <Card>
          <div className="divide-y divide-gray-700">
            {items.map((item) => (
              <div key={item.product._id} className="p-4 flex items-center gap-4">
                <img
                  src={item.product.imageUrl || '/api/placeholder/100/100'}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-400">{item.product.description}</p>
                  <div className="mt-2 text-lg font-bold">
                    R{item.product.price}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdateQuantity(item.product._id, item.quantity, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdateQuantity(item.product._id, item.quantity, 1)}
                    disabled={item.quantity >= item.product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-right min-w-[100px]">
                  <div className="font-bold">
                    R{(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>R{totalAmount.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full mt-4"
              size="lg"
            >
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}