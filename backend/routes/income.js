const express = require('express');
const router = express.Router();
const Income = require('../models/Income');
const auth = require('../middleware/auth');

// GET all income entries for a user
router.get('/', auth, async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    console.error('Error fetching income:', err);
    res.status(500).json({ message: 'Server error fetching income' });
  }
});

// POST a new income entry
router.post('/', auth, async (req, res) => {
  const { source, amount, currency } = req.body;

  if (!source || amount == null) {
    return res.status(400).json({ message: 'Source and amount are required' });
  }

  try {
    const newIncome = new Income({
      userId: req.user._id,
      source,
      amount,
      currency: currency || 'INR',
    });

    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (err) {
    console.error('Error saving income:', err);
    res.status(500).json({ message: 'Server error saving income' });
  }
});

// DELETE an income entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json({ message: 'Income deleted' });
  } catch (err) {
    console.error('Error deleting income:', err);
    res.status(500).json({ message: 'Error deleting income' });
  }
});

// UPDATE an income entry
router.put('/:id', auth, async (req, res) => {
  try {
    const { source, amount, currency } = req.body;
    if (!source || amount == null) {
      return res.status(400).json({ message: 'Source and amount are required' });
    }
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { source, amount, currency: currency || 'INR' },
      { new: true }
    );
    if (!updatedIncome) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json(updatedIncome);
  } catch (err) {
    console.error('Error updating income:', err);
    res.status(500).json({ message: 'Error updating income' });
  }
});

module.exports = router;