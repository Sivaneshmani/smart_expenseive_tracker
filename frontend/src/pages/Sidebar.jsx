import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-home', path: '/dashboard' },
    { id: 'transactions', label: 'Transactions', icon: 'fa-exchange-alt', path: '/transactions' },
    { id: 'budget', label: 'Budget', icon: 'fa-wallet', path: '/budget' },
    // Removed { id: 'profile', label: 'Profile', icon: 'fa-user', path: '/profile' }
  ];

  return (
    <aside
      className={`bg-white shadow fixed top-16 left-0 h-screen overflow-y-auto transition-all duration-300 ease-in-out z-40 ${
        isHovered ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="mt-5">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 ${
                    isActive || activeTab === item.id ? 'bg-gray-100 text-gray-900 font-semibold' : ''
                  }`
                }
                onClick={() => setActiveTab(item.id)}
              >
                <i className={`fas ${item.icon} text-lg ${isHovered ? 'mr-3' : ''}`}></i>
                {isHovered && <span className="text-sm">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;