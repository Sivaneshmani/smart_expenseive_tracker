const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Customer = require('../models/customer');
const { getBalanceData } = require('../controllers/userController');

// GET user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await Customer.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { monthlyIncome, savingsGoal, budget, currency } = req.body;
    if (!monthlyIncome || !savingsGoal || !budget) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await Customer.findByIdAndUpdate(
      req.user._id,
      { monthlyIncome, savingsGoal, budget, currency },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET user balance data
router.get('/balance', auth, getBalanceData);

module.exports = router;