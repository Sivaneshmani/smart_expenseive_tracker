const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const authMiddleware = require('../middleware/auth');

// GET all budgets for the logged-in user
router.get('/get', authMiddleware, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user._id });
    res.json(budgets);
  } catch (err) {
    console.error('Error fetching budgets:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new budget category
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, budget, icon = 'fa-tags', color = 'bg-gray-500' } = req.body;

    if (!name || budget == null) {
      return res.status(400).json({ message: 'Name and budget are required' });
    }

    const newBudget = new Budget({
      userId: req.user._id,
      name,
      budget,
      icon,
      color,
    });

    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    console.error('Error adding budget:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE a budget category
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({ message: 'Budget deleted' });
  } catch (err) {
    console.error('Error deleting budget:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;