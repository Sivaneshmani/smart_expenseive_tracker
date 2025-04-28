import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import EditExpenseForm from './EditExpenseForm';
import RecentTransactions from './RecentTransactions';

// Helper to get today's date in yyyy-mm-dd format
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [date, setDate] = useState(getTodayDate()); // Set today's date initially
  const [editingExpense, setEditingExpense] = useState(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const token = localStorage.getItem('token');

  const fetchExpenses = async () => {
    try {
      const url = new URL('https://smart-expenseive-tracker.onrender.com/api/expenses');
      const params = { start: startDate, end: endDate };
      Object.keys(params).forEach((key) => params[key] || delete params[key]);
      url.search = new URLSearchParams(params).toString();

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setExpenses(data);
      } else {
        toast.error(data.message || 'Failed to fetch expenses');
      }
    } catch (err) {
      toast.error('Error fetching expenses');
      console.error(err);
    }
  };

  const fetchIncomes = async () => {
    try {
      const res = await fetch('https://smart-expenseive-tracker.onrender.com/api/income/get', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setIncomes(data);
      } else {
        toast.error(data.message || 'Failed to fetch incomes');
      }
    } catch (err) {
      toast.error('Error fetching incomes');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, [startDate, endDate]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!category || !amount || !paymentMethod) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const res = await fetch('https://smart-expenseive-tracker.onrender.com/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category, amount, notes, paymentMethod, date }),
      });

      if (res.ok) {
        setCategory('');
        setAmount('');
        setNotes('');
        setPaymentMethod('');
        setDate(getTodayDate()); // Reset back to today's date
        fetchExpenses();
        toast.success('Expense added successfully');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to add expense');
      }
    } catch (err) {
      toast.error('Error adding expense');
      console.error(err);
    }
  };

  const handleUpdateExpense = async () => {
    setEditingExpense(null);
    fetchExpenses();
  };

 
  return (
    <div className="space-y-8">
      {editingExpense ? (
        <EditExpenseForm
          expense={editingExpense}
          onUpdate={handleUpdateExpense}
          onCancel={() => setEditingExpense(null)}
        />
      ) : (
        <form onSubmit={handleAddExpense} className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
          <div>
            <label className="block mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            >
              <option value="">Select Method</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Add Expense
          </button>
        </form>
      )}

      <RecentTransactions
        expenses={expenses}
        incomes={incomes}
      />
    </div>
  );
};

export default ExpenseTracker;