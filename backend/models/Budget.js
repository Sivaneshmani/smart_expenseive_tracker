const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    icon: {
      type: String,
      default: 'fa-tags',
    },
    color: {
      type: String,
      default: 'bg-gray-500',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Budget', budgetSchema);
