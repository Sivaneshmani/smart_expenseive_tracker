import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';
import currencyCodes from 'currency-codes';

const Profile = ({ isDarkMode }) => {
  const { handleProfileComplete, isNewUser } = useAppContext();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    monthlyIncome: '',
    savingsGoal: '',
    budget: '',
    currency: 'INR',
  });

  const currencyList = currencyCodes.data.map(curr => ({
    code: curr.code,
    currency: curr.currency
  }));

  useEffect(() => {
    if (!isNewUser) {
      navigate('/dashboard');
    }
  }, [isNewUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { monthlyIncome, savingsGoal, budget, currency } = formData;

    if (!monthlyIncome || !savingsGoal || !budget) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          monthlyIncome: Number(monthlyIncome),
          savingsGoal: Number(savingsGoal),
          budget: Number(budget),
          currency,
        }),
      });

      if (res.ok) {
        toast.success('Profile set up successfully');
        handleProfileComplete();
        navigate('/dashboard');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to set up profile');
      }
    } catch (err) {
      toast.error('Error setting up profile');
      console.error(err);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center`}>
      <div className={`w-full max-w-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
        <h2 className="text-2xl font-bold text-center mb-6">Set Up Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Monthly Income</label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Savings Goal</label>
            <input
              type="number"
              name="savingsGoal"
              value={formData.savingsGoal}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Monthly Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {currencyList.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} - {curr.currency}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;