import { useState } from 'react';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Hero({ isDarkMode, userName, toggleTheme, handleLogout }) {
  const [ctaHover, setCtaHover] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <NavLink to="/" className="text-2xl font-bold text-gray-900">
                Budget Tracker
              </NavLink>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <i className="fas fa-moon text-lg"></i>
              </button>
              <button className="relative text-gray-600 hover:text-gray-900">
                <i className="fas fa-bell text-lg"></i>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  3
                </span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <i className="fas fa-user-circle text-2xl"></i>
                  {userName && <span className="ml-2 text-sm font-medium hidden md:block">{userName}</span>}
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-dropdown">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </NavLink>
                  </div>
                )}
              </div>
              <button
                onClick={handleLogin}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <i className="fas fa-sign-out-alt text-lg"></i> <span className="hidden md:inline ml-2">Login</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className={`py-20 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} text-center`}>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Welcome to MySite</h2>
          <p className="text-lg mb-6">Discover an amazing experience with our interactive platform.</p>
          <button
            className={`px-6 py-3 rounded-lg text-white font-semibold transition-transform duration-300 ${
              ctaHover ? 'scale-105' : ''
            } ${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            onClick={() => alert('Get Started clicked!')}
          >
            Get Started
          </button>
        </div>
      </section>
    </>
  );
}

export default Hero;
