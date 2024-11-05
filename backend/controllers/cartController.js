import User from '../models/user.js';
import Product from '../models/products.js';

// Get cart items
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('cart.product');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check if product exists and is available
    const product = await Product.findOne({ _id: productId, available: true, hidden: false });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unavailable' });
    }

    // Check if quantity is valid
    if (quantity > product.stock) {
      return res.status(400).json({ message: 'Requested quantity exceeds available stock' });
    }

    const user = await User.findById(req.user.userId);
    
    // Check if product already in cart
    const cartItemIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      // Update quantity if product already in cart
      const newQuantity = user.cart[cartItemIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        return res.status(400).json({ message: 'Requested quantity exceeds available stock' });
      }
      user.cart[cartItemIndex].quantity = newQuantity;
    } else {
      // Add new product to cart
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    
    // Populate cart items before sending response
    const updatedUser = await User.findById(user._id)
      .populate('cart.product');
    
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const product = await Product.findById(productId);
    if (quantity > product.stock) {
      return res.status(400).json({ message: 'Requested quantity exceeds available stock' });
    }

    const user = await User.findById(req.user.userId);
    const cartItem = user.cart.find(item => item.product.toString() === productId);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cartItem.quantity = quantity;
    await user.save();

    const updatedUser = await User.findById(user._id)
      .populate('cart.product');
    
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const user = await User.findById(req.user.userId);
    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    
    await user.save();
    
    const updatedUser = await User.findById(user._id)
      .populate('cart.product');
    
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.cart = [];
    await user.save();
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};

