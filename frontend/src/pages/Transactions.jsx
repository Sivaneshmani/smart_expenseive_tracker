import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Errorboundry from './Errorboundry';
import EditExpenseForm from './EditExpenseForm';
import EditIncomeForm from './EditIncomeForm';

const Transactions = ({ isDarkMode }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [profile, setProfile] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState('transactions');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const profileRes = await fetch('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = await profileRes.json();
      if (!profileRes.ok) throw new Error(profileData.message);
      setProfile(profileData);

      const expenseRes = await fetch('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const expenseData = await expenseRes.json();
      if (!expenseRes.ok) throw new Error(expenseData.message);
      setExpenses(expenseData);

      const incomeRes = await fetch('http://localhost:5000/api/income', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const incomeData = await incomeRes.json();
      if (!incomeRes.ok) throw new Error(incomeData.message);
      setIncomes(incomeData);
    } catch (err) {
      toast.error('Error fetching transactions');
      console.error('Error fetching transactions:', err);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const handleDelete = async (transaction) => {
    try {
      const url = transaction.type === 'expense'
        ? `http://localhost:5000/api/expenses/${transaction._id}`
        : `http://localhost:5000/api/income/${transaction._id}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchData();
        toast.success(`${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} deleted`);
      } else {
        const data = await res.json();
        toast.error(data.message || `Failed to delete ${transaction.type}`);
      }
    } catch (err) {
      toast.error(`Error deleting ${transaction.type}`);
      console.error(err);
    }
  };

  const transactions = [
    ...expenses.map((exp) => ({ ...exp, type: 'expense' })),
    ...incomes.map((inc) => ({ ...inc, type: 'income' })),
  ]
    .filter((transaction) => {
      const transactionDate = new Date(transaction.date || Date.now());
      if (startDate && endDate) {
        return transactionDate >= startDate && transactionDate <= endDate;
      }
      return true;
    })
    .sort((a, b) => new Date(b.date || Date.now()) - new Date(a.date || Date.now()));

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: profile?.currency || 'INR',
  });

  return (
    <Errorboundry>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar userName={profile?.name} />
        <div className="flex-1 flex overflow-hidden pt-16">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-6">
                Transaction History
              </h2>
              <div className="mb-6 flex space-x-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="End Date"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              {editingTransaction ? (
                editingTransaction.type === 'expense' ? (
                  <EditExpenseForm
                    expense={editingTransaction}
                    onUpdate={() => {
                      setEditingTransaction(null);
                      fetchData();
                    }}
                    onCancel={() => setEditingTransaction(null)}
                  />
                ) : (
                  <EditIncomeForm
                    income={editingTransaction}
                    onUpdate={() => {
                      setEditingTransaction(null);
                      fetchData();
                    }}
                    onCancel={() => setEditingTransaction(null)}
                  />
                )
              ) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="p-5">
                    <ul className="divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <li key={transaction._id} className="py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`flex-shrink-0 rounded-full p-2 ${
                                transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                              }`}
                            >
                              <i className="fas fa-dollar-sign text-sm"></i>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {transaction.category || transaction.source}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(transaction.date || Date.now()).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="ml-3 flex items-center space-x-2">
                            <span
                              className={`text-sm font-medium ${
                                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                              }`}
                            >
                              {transaction.type === 'income' ? '+' : '-'}{formatter.format(Math.abs(Number(transaction.amount)))}
                            </span>
                            <button
                              onClick={() => setEditingTransaction(transaction)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(transaction)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </Errorboundry>
  );
};

export default Transactions;