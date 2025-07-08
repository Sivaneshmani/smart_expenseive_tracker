const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/customer');

// Utility function to generate JWT
const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  return jwt.sign({ _id: userId }, secret, { expiresIn: '1d' });
};

// =======================
// @route   POST /api/customer/signup
// @desc    Register a new user
// =======================
router.post('/customer/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check for existing user
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new Users({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    // Respond with token
    return res.status(201).json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error during signup' });
  }
});

// =======================
// @route   POST /api/customer/login
// @desc    Login user and return token
// =======================
router.post('/customer/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    // Respond with token and user name
    return res.status(200).json({ token, name: user.name });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error during login' });
  }
});

module.exports = router;