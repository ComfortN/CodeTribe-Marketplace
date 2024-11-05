import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = {
      userId: decoded.id,
      role: decoded.role
    };
    console.log('req.user:', req.user);
    next();
  } catch (error) {
    console.error('Auth error:', error); 
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    console.log('check', req.user.role, req.user)
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
