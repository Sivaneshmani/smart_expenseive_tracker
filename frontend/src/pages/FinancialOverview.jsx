import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const FinancialOverview = ({ balanceData }) => {
  const { total, income, expenses, savings, currency, budget } = balanceData;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'INR',
  });

  useEffect(() => {
    if (expenses > budget) {
      toast.warn('⚠️ Your expenses have exceeded your monthly budget!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'colored',
      });
    }
  }, [expenses, budget]);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { title: 'Total Balance', value: total, icon: 'fa-wallet', color: 'bg-indigo-500' },
        { title: 'Income', value: income, icon: 'fa-arrow-down', color: 'bg-green-500' },
        { title: 'Expenses', value: expenses, icon: 'fa-arrow-up', color: 'bg-red-500' },
        { title: 'Savings', value: savings, icon: 'fa-piggy-bank', color: 'bg-amber-500' },
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
                      {formatter.format(item.value)}
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
