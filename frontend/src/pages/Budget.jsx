import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Errorboundry from './Errorboundry';
import IncomeTracker from './IncomeTracker';
import Expensetracker from './Expensetracker';
import BudgetStatus from './BudgetStatus';

const Budget = ({ isDarkMode }) => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('budget');
  const token = localStorage.getItem('token');

  const fetchProfile = async () => {
    try {
      const profileRes = await fetch('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = await profileRes.json();
      if (!profileRes.ok) throw new Error(profileData.message);
      setProfile(profileData);
    } catch (err) {
      toast.error('Error fetching profile');
      console.error('Error fetching profile:', err);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  return (
    <Errorboundry>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar userName={profile?.name} />
        <div className="flex-1 flex overflow-hidden pt-16">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-6">
                Budget Management
              </h2>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="space-y-5">
                  <IncomeTracker onUpdate={fetchProfile} />
                  <Expensetracker onUpdate={fetchProfile} />
                </div>
                <BudgetStatus />
              </div>
            </div>
          </main>
        </div>
      </div>
    </Errorboundry>
  );
};

export default Budget;