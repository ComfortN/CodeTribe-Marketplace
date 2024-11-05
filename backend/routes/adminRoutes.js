import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminController.js';
import { authenticateUser, isAdmin } from '../middleware/auth.js';

// All admin routes require authentication and admin role
router.use(authenticateUser, isAdmin);

// User Management
router.get('/users', adminController.getAllUsers);
router.get('/users/:userId', adminController.getUserDetails);
router.patch('/users/:userId/role', adminController.updateUserRole);

// Product Management
router.get('/products', adminController.getAllProducts);
router.patch('/products/:productId/status', adminController.updateProductStatus);

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/system/logs', adminController.getSystemLogs);

export default router