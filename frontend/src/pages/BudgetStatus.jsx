import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const MonthlyBudget = () => {
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [income, setIncome] = useState(0);
  const [savings, setSavings] = useState(0);
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, [token]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/income?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIncome(response.data.totalIncome); // make sure your backend sends 'totalIncome'
      } catch (error) {
        toast.error('Error fetching income data');
        console.error('Error fetching income:', error);
      }
    };

    const fetchMonthlyBudget = async () => {
      try {
        const response = await axios.get(`https://smart-expenseive-tracker.onrender.com/api/monthly-budget?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMonthlyBudget(response.data.monthlyBudget || 0); // If not set yet, default to 0
      } catch (error) {
        console.error('No existing monthly budget found.');
      }
    };

    if (userId && token) {
      fetchIncome();
      fetchMonthlyBudget();
    }
  }, [userId, token]);

  useEffect(() => {
    // Calculate savings whenever income or monthly budget changes
    const calculatedSavings = income - monthlyBudget;
    setSavings(calculatedSavings);

    if (calculatedSavings < 0) {
      toast.error('Your budget exceeds your income!');
    }
  }, [income, monthlyBudget]);

  const handleBudgetChange = async (e) => {
    const value = Number(e.target.value);
    setMonthlyBudget(value);
  };

  const handleBudgetSubmit = async () => {
    if (monthlyBudget <= 0) {
      toast.error('Please enter a valid monthly budget.');
      return;
    }

    try {
      await axios.post(
        `https://smart-expenseive-tracker.onrender.com/api/monthly-budget`,
        { monthlyBudget, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Monthly budget updated successfully!');
    } catch (error) {
      toast.error('Error updating monthly budget');
      console.error('Error updating budget:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto h-1/2 min-h-[300px]">
  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Monthly Budget</h2>

  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700">Set Monthly Budget</label>
      <input
        type="number"
        value={monthlyBudget}
        onChange={handleBudgetChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        min="0"
      />
    </div>

    <div className="text-gray-700">
      <p><strong>Income:</strong> ${income}</p>
      <p><strong>Monthly Budget:</strong> ${monthlyBudget}</p>
      <p><strong>Savings:</strong> ${savings < 0 ? 0 : savings}</p>
    </div>

    <button
      onClick={handleBudgetSubmit}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none"
    >
      Update Budget
    </button>
  </div>
</div>
  );
};

export default MonthlyBudget;