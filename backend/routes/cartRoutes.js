import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middleware/auth.js';
import {getCart, addToCart, updateCartItem, removeFromCart, clearCart, } from '../controllers/cartController.js';

// All cart routes require authentication
router.use(authenticateUser);

// Get cart items
router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove/:productId', removeFromCart);
router.delete('/clear', clearCart);

export default router;