import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import EditIncomeForm from './EditIncomeForm';

const IncomeTracker = ({ onUpdate }) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [editingIncome, setEditingIncome] = useState(null);
  const token = localStorage.getItem('token');

  const fetchIncome = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/income', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setIncomes(data);
        if (onUpdate) onUpdate();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error('Error fetching income');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!source || !amount) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ source, amount }),
      });

      if (res.ok) {
        setSource('');
        setAmount('');
        fetchIncome();
        toast.success('Income added successfully');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to add income');
      }
    } catch (err) {
      toast.error('Error adding income');
      console.error(err);
    }
  };

  const handleEdit = (income) => {
    setEditingIncome(income);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/income/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchIncome();
        toast.success('Income deleted successfully');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to delete income');
      }
    } catch (err) {
      toast.error('Error deleting income');
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchIncome();
  }, [token]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-bold mb-2">Add Income</h3>
      {editingIncome ? (
        <EditIncomeForm
          income={editingIncome}
          onUpdate={() => {
            setEditingIncome(null);
            fetchIncome();
          }}
          onCancel={() => setEditingIncome(null)}
        />
      ) : (
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
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Income
          </button>
        </form>
      )}
      <ul className="mt-4 space-y-2">
        {incomes.map((inc) => (
          <li key={inc._id} className="flex justify-between items-center p-2 border rounded">
            <span>
              {inc.source}: {inc.amount} {inc.currency || 'INR'}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(inc)}
                className="text-blue-600 hover:text-blue-800"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => handleDelete(inc._id)}
                className="text-red-600 hover:text-red-800"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeTracker;