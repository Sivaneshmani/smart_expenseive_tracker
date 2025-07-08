const mongoose = require('mongoose');

// Define the schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  monthlyIncome: { type: Number, default: 0 },
  savingsGoal: { type: Number, default: 0 },
  budget: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwriting
module.exports = mongoose.models.Customer || mongoose.model('customer', customerSchema);