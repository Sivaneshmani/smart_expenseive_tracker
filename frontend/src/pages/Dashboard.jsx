import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import BudgetStatus from './BudgetStatus';
import SpendingChart from './SpendingChart';
import BudgetTrendChart from './BudgetTrendChart';
import FinancialOverview from './FinancialOverview';
import IncomeTracker from './IncomeTracker';
import ExpenseTracker from './ExpenseTracker';

const Dashboard = ({ isDarkMode }) => {
  const { isNewUser, user } = useAppContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [balanceData, setBalanceData] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isNewUser) {
      navigate('/profile');
    }
  }, [isNewUser, navigate]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Profile
        const profileRes = await fetch('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Budgets
        const budgetsRes = await fetch('http://localhost:5000/api/budgets/get', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!budgetsRes.ok) throw new Error('Failed to fetch budgets');
        const budgetsData = await budgetsRes.json();
        setBudgets(budgetsData || []);

        // Expenses
        const expensesRes = await fetch('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!expensesRes.ok) throw new Error('Failed to fetch expenses');
        const expensesData = await expensesRes.json();
        setExpenses(expensesData || []);

        // Incomes
        const incomesRes = await fetch('http://localhost:5000/api/income', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!incomesRes.ok) throw new Error('Failed to fetch incomes');
        const incomesData = await incomesRes.json();
        setIncomes(incomesData || []);

        // Balance Data from API
        const balanceRes = await fetch('http://localhost:5000/api/user/balance', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!balanceRes.ok) throw new Error('Failed to fetch balance');
        const balanceJson = await balanceRes.json();
        setBalanceData(balanceJson);

      } catch (err) {
        console.error('Dashboard fetch error:', err);
        toast.error(err.message || 'Failed to load dashboard data');
      }
    };

    if (token) {
      fetchAllData();
    }
  }, [token]);

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen`}>
      
      {/* ✅ Navbar */}
      <Navbar userName={user} />

      {/* ✅ Fixed Sidebar */}
      <div className="fixed top-16 left-0 h-full w-64 z-40">
        <Sidebar isDarkMode={isDarkMode} />
      </div>

      {/* ✅ Main Content */}
      <div className="ml-64 mt-20 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user || 'User'}</h1>

        {profile && balanceData ? (
          <>
            <FinancialOverview balanceData={balanceData} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <BudgetTrendChart expenses={expenses} incomes={incomes} isDarkMode={isDarkMode} />
              <SpendingChart expenses={expenses} incomes={incomes} isDarkMode={isDarkMode} />
            </div>

            {/* Optional Extra: Budget status and tracking tools */}
            {/* <BudgetStatus budgets={budgets} expenses={expenses} /> */}
            {/* <IncomeTracker /> */}
            {/* <ExpenseTracker /> */}
          </>
        ) : (
          <p className="text-center text-gray-500">Loading dashboard data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
