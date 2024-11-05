import User from '../models/user.js';
import Product from '../models/products.js';

const adminController = {
  // User Management
  getAllUsers: async (req, res) => {
    try {
        console.log('check')
      const users = await User.find({})
        .select('-password')
        .sort({ createdAt: -1 });
      
        res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({
        success: true,
        count: users.length,
        users
      });
    } catch (error) {
        console.error('Error in getAllUsers:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: error.message
      });
    }
  },

  // Get user details including their products and purchase history
  getUserDetails: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId)
        .select('-password')
        .populate('cart.product');
      
      const products = await Product.find({ seller: userId });
      
      res.status(200).json({
        success: true,
        data: {
          user,
          products,
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user details',
        error: error.message
      });
    }
  },

  // Update user role (make admin or remove admin privileges)
  updateUserRole: async (req, res) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role'
        });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating user role',
        error: error.message
      });
    }
  },

  // Product Management
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find({})
        .populate('seller', 'username email')
        .sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: products.length,
        products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching products',
        error: error.message
      });
    }
  },

  // Update product status (approve/reject/hide)
  updateProductStatus: async (req, res) => {
    try {
      const { productId } = req.params;
      const { status, hidden } = req.body;

      const product = await Product.findByIdAndUpdate(
        productId,
        {
          available: status === 'approved',
          hidden: hidden || false
        },
        { new: true }
      ).populate('seller', 'username email');

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product status updated successfully',
        product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating product status',
        error: error.message
      });
    }
  },

  // Dashboard Statistics
  getDashboardStats: async (req, res) => {
    try {
      const stats = {
        users: await User.countDocuments(),
        products: await Product.countDocuments(),
        activeProducts: await Product.countDocuments({ available: true, hidden: false }),
        newUsersToday: await User.countDocuments({
          createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        })
      };

      res.status(200).json({
        success: true,
        stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching statistics',
        error: error.message
      });
    }
  },

  // System Logs (basic version)
  getSystemLogs: async (req, res) => {
    try {
      // This is a basic example. In a real application, you'd want to implement
      // proper logging with tools like Winston or Morgan
      const logs = await SystemLog.find({})
        .sort({ timestamp: -1 })
        .limit(100);
      
      res.status(200).json({
        success: true,
        count: logs.length,
        logs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching logs',
        error: error.message
      });
    }
  }
};

export default adminController;