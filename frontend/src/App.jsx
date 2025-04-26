import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './context/AppContext';
import Navbar from './pages/Navbar';
import Hero from './pages/Hero';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AppProvider>
      <div className={isDarkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-gray-800 min-h-screen'}>
        <Routes>
          <Route path="/" element={<Hero isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
          <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
          <Route path="/signup" element={<Signup isDarkMode={isDarkMode} />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard isDarkMode={isDarkMode} />
              </PrivateRoute>
            }
          />
          <Route
            path="/budget"
            element={
              <PrivateRoute>
                <Budget isDarkMode={isDarkMode} />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transactions isDarkMode={isDarkMode} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile isDarkMode={isDarkMode} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AppProvider>
  );
}

export default App;