import React, { useState } from 'react';
import { toast } from 'react-toastify';

const EditIncomeForm = ({ income, onUpdate, onCancel }) => {
  const [source, setSource] = useState(income.source);
  const [amount, setAmount] = useState(income.amount);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!source || !amount) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/income/${income._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ source, amount }),
      });

      if (res.ok) {
        onUpdate();
        toast.success('Income updated successfully');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to update income');
      }
    } catch (err) {
      toast.error('Error updating income');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditIncomeForm;