import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/authController.js';
import { authenticateUser }  from '../middleware/auth.js';

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route example - Get user profile
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

export default router;