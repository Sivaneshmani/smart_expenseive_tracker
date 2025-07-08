import React, { useState, useEffect } from 'react';

const RecentTransactions = ({ expenses, incomes, onEditExpense, onEditIncome, onDeleteExpense, onDeleteIncome }) => {
  const [filterText, setFilterText] = useState('');

  const transactions = [
    ...expenses.map((exp) => ({ ...exp, type: 'expense' })),
    ...incomes.map((inc) => ({ ...inc, type: 'income' })),
  ]
    .filter((transaction) => {
      const searchText = filterText.toLowerCase();
      return (
        transaction.category?.toLowerCase().includes(searchText) ||
        transaction.paymentMethod?.toLowerCase().includes(searchText) ||
        transaction.source?.toLowerCase().includes(searchText) // for income
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: transactions[0]?.currency || 'INR',
  });

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Search by category or payment method..."
          className="border px-3 py-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-3">
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded">
              <div>
                <div className="font-medium">{transaction.category || transaction.source}</div>
                <div className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'} {formatter.format(transaction.amount)}
                </span>
                </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;