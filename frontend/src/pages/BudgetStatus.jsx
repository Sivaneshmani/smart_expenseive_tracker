import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const BudgetStatus = () => {
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [newBudget, setNewBudget] = useState({ name: '', budget: '', icon: 'fa-tags', color: 'bg-gray-500' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, [token]);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/budgets?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBudgetCategories(response.data);
      } catch (error) {
        toast.error('Error fetching budget data');
        console.error('Error fetching budget data:', error);
      }
    };

    if (userId && token) {
      fetchBudgetData();
    }
  }, [userId, token]);

  const handleAddBudget = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/budgets',
        { ...newBudget, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBudgetCategories([...budgetCategories, response.data]);
      setNewBudget({ name: '', budget: '', icon: 'fa-tags', color: 'bg-gray-500' });
      toast.success('Budget category added');
    } catch (error) {
      toast.error('Error adding budget category');
      console.error('Error adding budget:', error);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/budgets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBudgetCategories(budgetCategories.filter((budget) => budget._id !== id));
      toast.success('Budget category deleted');
    } catch (error) {
      toast.error('Error deleting budget category');
      console.error('Error deleting budget:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden p-5">
      <h3 className="text-lg font-bold mb-4">Budget Categories</h3>
      <form onSubmit={handleAddBudget} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Category Name</label>
          <input
            type="text"
            value={newBudget.name}
            onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Budget Amount</label>
          <input
            type="number"
            value={newBudget.budget}
            onChange={(e) => setNewBudget({ ...newBudget, budget: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Budget
        </button>
      </form>
      <ul className="space-y-4">
        {budgetCategories.map((budget) => (
          <li key={budget._id} className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <span className={`inline-block w-6 h-6 mr-2 ${budget.color}`}>
                <i className={`fas ${budget.icon}`}></i>
              </span>
              <span>{budget.name}</span>
              <span className="ml-4">Budget: ${budget.budget}</span>
              <span className="ml-4">Spent: ${budget.spent}</span>
            </div>
            <button
              onClick={() => handleDeleteBudget(budget._id)}
              className="text-red-600 hover:text-red-800"
            >
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetStatus;