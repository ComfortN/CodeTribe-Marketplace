import express from'express';
const router = express.Router();
import { authenticateUser } from'../middleware/auth.js';
import { getAllProducts, createProduct, updateProduct, deleteProduct, toggleHidden, } from'../controllers/productController.js';

// Public routes
router.get('/', getAllProducts);


router.use(authenticateUser);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Toggle product visibility
router.patch('/:id/toggle-visibility', toggleHidden);

export default router;