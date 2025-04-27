import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ErrorBoundary from './ErrorBoundary';
import IncomeTracker from './IncomeTracker';
import Expensetracker from './Expensetracker';

const Budget = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('budget');

  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen flex flex-col ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`}
      >
        {/* Sidebar and Main Content */}
        <div className="flex-1 flex overflow-hidden pt-16">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main
            className={`flex-1 overflow-y-auto p-4 md:p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg shadow-lg`}
          >
            <div className="max-w-7xl mx-auto">
              {/* Page Title */}
              <h2 className="text-3xl font-extrabold leading-7 sm:text-4xl sm:truncate mb-6">
                Budget Management
              </h2>

              {/* Two-Column Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Add Income */}
                <div className="p-6 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold mb-4 text-blue-600">
                    Add Income
                  </h3>
                  <IncomeTracker />
                </div>

                {/* Add Expense */}
                <div className="p-6 bg-red-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold mb-4 text-red-600">
                    Add Expense
                  </h3>
                  <Expensetracker />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Budget;
