const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ success: true, data: { user: { id: user._id, name, email }, token } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ success: true, data: { user: { id: user._id, name: user.name, email }, token } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
