import React, { useState } from 'react';
import { toast } from 'react-toastify';
import EditExpenseForm from './EditExpenseForm';

const Expensetracker = ({ onUpdate = () => {} }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category, amount }),
      });

      if (res.ok) {
        setCategory('');
        setAmount('');
        onUpdate();
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

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        onUpdate();
        toast.success('Expense deleted successfully');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to delete expense');
      }
    } catch (err) {
      toast.error('Error deleting expense');
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      {editingExpense ? (
        <EditExpenseForm
          expense={editingExpense}
          onUpdate={() => {
            setEditingExpense(null);
            onUpdate();
          }}
          onCancel={() => setEditingExpense(null)}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Category</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Amount</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Add Expense
          </button>
        </form>
      )}
    </div>
  );
};

export default Expensetracker;