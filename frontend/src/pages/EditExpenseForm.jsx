import React, { useState } from 'react';
import { toast } from 'react-toastify';

const EditExpenseForm = ({ expense, onUpdate, onCancel }) => {
  const [category, setCategory] = useState(expense.category);
  const [amount, setAmount] = useState(expense.amount);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(`https://smart-expenseive-tracker.onrender.com/api/expenses/${expense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category, amount }),
      });

      if (res.ok) {
        onUpdate();
        toast.success('Expense updated successfully');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to update expense');
      }
    } catch (err) {
      toast.error('Error updating expense');
      console.error(err);
    }
  };

  return (
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
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditExpenseForm;