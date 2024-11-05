import User from '../models/user.js';
import generateToken from "../utils/index.js";


//register user
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }

        if (role && !['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Create new user
        const user = new User({ username, email, password, ...(role && {role}) });
        await user.save();

        const token = await generateToken(user._id);

        res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};


//login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await generateToken(user._id);

        res.status(200).json({
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

