import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const FinancialOverview = ({ balanceData }) => {
  const { balance, incomes, expenses, currency = 'INR' } = balanceData;  // Destructure balanceData

  const [hasWarned, setHasWarned] = useState(false);  // State to track the warning

  // Format currency for display
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,  // Use the currency passed in the props
  });

  useEffect(() => {
    if (incomes === 0) {
      console.log('Income is 0, cannot compare expenses.');
      return; // Do nothing if income is 0
    }
  
    if (expenses > incomes && !hasWarned) {
      toast.warn('⚠️ Your expenses have exceeded your monthly income!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'colored',
      });
      setHasWarned(true); // Set warning flag to true
    }
  }, [expenses, incomes, hasWarned]);
  
  
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {[ 
        { title: 'Total Balance', value: balance, icon: 'fa-wallet', color: 'bg-indigo-500' },
        { title: 'Monthly Budget', value: incomes, icon: 'fa-calendar-alt', color: 'bg-blue-500' },
        { title: 'Expenses', value: expenses, icon: 'fa-arrow-up', color: 'bg-red-500' },
      ].map((item, index) => (
        <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${item.color} rounded-md p-3`}>
                <i className={`fas ${item.icon} text-white text-xl`}></i>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{item.title}</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatter.format(item.value)} {/* Format the value correctly */}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialOverview;
