import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balanceData, setBalanceData] = useState({
    monthlyIncome: 0,
    budget: 0,
    savingsGoal: 0,
  });

  const updateBalance = async (newBalance) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to update balance');
      return;
    }
    if (!newBalance || typeof newBalance !== 'object') {
      console.error('Invalid newBalance:', newBalance);
      toast.error('Invalid balance data');
      return;
    }
    try {
      console.log('Updating balance with:', newBalance);
      const response = await fetch('https://smart-expenseive-tracker.onrender.com/api/user/balance', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBalance),
      });
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorText = 'Unknown error';
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorText = errorData.message || errorText;
        } else {
          errorText = await response.text();
          console.error('Balance update error response:', errorText);
        }
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
      const data = await response.json();
      setBalanceData(data);
      toast.success('Balance updated successfully');
    } catch (err) {
      console.error('Error updating balance:', err.message);
      toast.error('Failed to update balance: ' + err.message);
    }
  };

  return (
    <BalanceContext.Provider value={{ balanceData, updateBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);