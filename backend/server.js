const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ DB connection error:', err));

// Route Imports
const authRoutes = require('./routes/authroute');     // Handles /api/login, /signup
const expenseRoutes = require('./routes/Expense');    // Handles /api/expenses
const incomeRoutes = require('./routes/income');      // Handles /api/income
const budgetRoutes = require('./routes/budget');      // Handles /api/budgets
const userRoutes = require('./routes/user');          // Handles /api/user (profile, balance)

// Route Mounts
app.use('/api', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/user', userRoutes);

// Default Test Route
app.get('/', (req, res) => {
  res.send('🌐 Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));