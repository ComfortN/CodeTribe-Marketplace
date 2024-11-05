import express from'express';
const router = express.Router();
import { authenticateUser } from'../middleware/auth.js';
import { getAllProducts, createProduct, } from'../controllers/productController.js';

// Public routes
router.get('/', getAllProducts);

// Protected routes
router.use(authenticateUser);
router.post('/', createProduct);


export default router;