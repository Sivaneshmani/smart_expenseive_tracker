const Expense = require('../models/expenses');
const Income = require('../models/Income');
const UserProfile = require('../models/customer');

const getBalanceData = async (req, res) => {
  try {
    const userId = req.user.id;

    const incomes = await Income.find({ userId });
    const expenses = await Expense.find({ userId });
    const profile = await UserProfile.findOne({ userId });

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const savings = totalIncome - totalExpenses;

    res.json({
      income: totalIncome,
      expenses: totalExpenses,
      savings,
      total: savings,
      budget: profile?.budget || 0,
      currency: profile?.currency || 'INR',
    });
  } catch (error) {
    console.error('Balance fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch balance data' });
  }
};

module.exports = { getBalanceData };