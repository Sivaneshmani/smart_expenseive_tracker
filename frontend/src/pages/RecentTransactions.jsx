import React from 'react';
import { toast } from 'react-toastify';

const RecentTransactions = ({ expenses, incomes, onEditExpense, onEditIncome, onDeleteExpense, onDeleteIncome }) => {
  const token = localStorage.getItem('token');

  const transactions = [
    ...expenses.map((exp) => ({ ...exp, type: 'expense' })),
    ...incomes.map((inc) => ({ ...inc, type: 'income' })),
  ].sort((a, b) => new Date(b.date || Date.now()) - new Date(a.date || Date.now())).slice(0, 5);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: transactions[0]?.currency || 'INR',
  });

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
        if (transaction.type === 'expense') {
          onDeleteExpense(transaction._id);
        } else {
          onDeleteIncome(transaction._id);
        }
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

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h3>
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
              All
            </button>
            <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
              Income
            </button>
            <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
              Expenses
            </button>
          </div>
        </div>
        <div className="mt-4 flow-root">
          <ul className="divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <li key={index} className="py-3 flex items-center justify-between">
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
                    onClick={() =>
                      transaction.type === 'expense'
                        ? onEditExpense(transaction)
                        : onEditIncome(transaction)
                    }
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
    </div>
  );
};

export default RecentTransactions;