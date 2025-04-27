import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Sidebar from './Sidebar';
import BudgetTrendChart from './BudgetTrendChart';
import SpendingChart from './SpendingChart.jsx';
import FinancialOverview from './FinancialOverview';
import Chatbox from './Chatbox';

const Dashboard = ({ isDarkMode }) => {
  const { isNewUser, user } = useAppContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isNewUser) {
      navigate('/profile');
    }
  }, [isNewUser, navigate]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const profileRes = await fetch('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        setProfile(profileData);

        const budgetsRes = await fetch('http://localhost:5000/api/budgets/get', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!budgetsRes.ok) throw new Error('Failed to fetch budgets');
        const budgetsData = await budgetsRes.json();
        setBudgets(budgetsData || []);

        const expensesRes = await fetch('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!expensesRes.ok) throw new Error('Failed to fetch expenses');
        const expensesData = await expensesRes.json();
        setExpenses(expensesData || []);

        const incomesRes = await fetch('http://localhost:5000/api/income/get', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!incomesRes.ok) throw new Error('Failed to fetch incomes');
        const incomesData = await incomesRes.json();
        setIncomes(incomesData || []);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    if (token) {
      fetchAllData();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">You need to login or sign up</h1>
          <p className="text-lg">Please login to access your dashboard.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </button>
          <p className="mt-2">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}>Sign up</span></p>
        </div>
      </div>
    );
  }

  // ➡️ Calculate total income, expenses, budget, and savings
  const totalIncome = incomes.reduce((sum, income) => sum + (income.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  const currency = profile?.currency || 'INR';
  const totalBalance = totalIncome - totalExpenses;  // Calculate balance after expenses

  const balanceData = {
    incomes: totalIncome,
    expenses: totalExpenses,
    balance: totalBalance,
    currency,
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen`}>
      {/* Sidebar */}
      <div className="fixed top-16 left-0 h-full w-64 z-40">
        <Sidebar isDarkMode={isDarkMode} />
      </div>

      {/* Main Content */}
      <div className="ml-64 mt-20 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user || 'User'}</h1>

        {profile ? (
          <>
            {/* Display the financial overview once */}
            <FinancialOverview balanceData={balanceData} />

            {/* Optional: Charts for Budget and Spending Trends */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <BudgetTrendChart expenses={expenses} incomes={incomes} isDarkMode={isDarkMode} />
              <SpendingChart expenses={expenses} incomes={incomes} isDarkMode={isDarkMode} />
            </div>

          </>
        ) : (
          <p className="text-center text-gray-500">Loading dashboard data...</p>
        )}
      </div>

      {/* Chatbox component */}
      <Chatbox />
    </div>
  );
};

export default Dashboard;
