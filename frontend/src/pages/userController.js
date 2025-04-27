// controllers/userController.js
const User = require('../models/User');
const Expense = require('../models/Expense');
const Income = require('../models/Income');

exports.getBalanceData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const incomes = await Income.find({ user: req.user.id });
    const expenses = await Expense.find({ user: req.user.id });

    const incomeTotal = incomes.reduce((sum, entry) => sum + entry.amount, 0);
    const expenseTotal = expenses.reduce((sum, entry) => sum + entry.amount, 0);

    const monthlyIncome = user.monthlyIncome || 0;
    const budget = user.budget || 0;
    const savingsGoal = user.savingsGoal || 0;

    const total = incomeTotal - expenseTotal;
    const savings = total > 0 ? Math.min(total, savingsGoal) : 0;

    res.json({
      total,
      income: incomeTotal,
      expenses: expenseTotal,
      savings,
      budget,
      currency: user.currency || 'INR',
    });
  } catch (err) {
    console.error('Error fetching balance:', err);
    res.status(500).json({ message: 'Server error' });
  }
};