const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/expenses');
const Budget = require('../models/Budget');

// Get all expenses for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new expense
router.post('/', auth, async (req, res) => {
  try {
    const { category, amount, currency } = req.body;
    if (!category || amount == null) {
      return res.status(400).json({ message: 'Category and amount are required' });
    }

    // Create new expense
    const newExpense = new Expense({
      category,
      amount,
      user: req.user._id,
      currency: currency || 'INR',
    });

    // Update budget spent amount
    const budget = await Budget.findOne({ userId: req.user._id, name: category });
    if (budget) {
      budget.spent = (budget.spent || 0) + amount;
      await budget.save();
    }

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    console.error('Error adding expense:', err);
    res.status(500).json({ message: 'Error adding expense' });
  }
});

// Delete an expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Update budget spent amount
    const budget = await Budget.findOne({ userId: req.user._id, name: expense.category });
    if (budget) {
      budget.spent = Math.max(0, (budget.spent || 0) - expense.amount);
      await budget.save();
    }

    await Expense.deleteOne({ _id: req.params.id });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({ message: 'Error deleting expense' });
  }
});

// Update an expense
router.put('/:id', auth, async (req, res) => {
  try {
    const { category, amount, currency } = req.body;
    if (!category || amount == null) {
      return res.status(400).json({ message: 'Category and amount are required' });
    }

    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Update budget spent amount (subtract old amount, add new amount)
    const oldBudget = await Budget.findOne({ userId: req.user._id, name: expense.category });
    if (oldBudget) {
      oldBudget.spent = Math.max(0, (oldBudget.spent || 0) - expense.amount);
      await oldBudget.save();
    }

    const newBudget = await Budget.findOne({ userId: req.user._id, name: category });
    if (newBudget) {
      newBudget.spent = (newBudget.spent || 0) + amount;
      await newBudget.save();
    }

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { category, amount, currency: currency || 'INR' },
      { new: true }
    );

    res.json(updatedExpense);
  } catch (err) {
    console.error('Error updating expense:', err);
    res.status(500).json({ message: 'Error updating expense' });
  }
});

module.exports = router;