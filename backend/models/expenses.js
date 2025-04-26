const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Updated to reference Customer
    required: true,
  },
  currency: { type: String, default: 'INR' },
});

expenseSchema.index({ user: 1, date: 1 }); // Added index for performance
module.exports = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

