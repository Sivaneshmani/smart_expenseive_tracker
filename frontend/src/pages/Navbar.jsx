import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('user')); // <- Fetch userName directly

  // Create a reference for the Contact section
  const contactRef = useRef(null);

  useEffect(() => {
    // Update token and userName every time route changes
    setToken(localStorage.getItem('token'));
    setUserName(localStorage.getItem('user')); // Update user name also
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
    setToken(null);
    setUserName(null); // Important: clear username also
  };

  const handleLogin = async () => {
    // assuming your API gives you a token and user object
    const response = await loginAPI(); 
    
    localStorage.setItem('token', response.token); 
    localStorage.setItem('user', response.user.name); // <- Save username properly here
    
    toast.success('Login successful');
    navigate('/dashboard');
  };

  const handleScrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
      
    }
    navigate('/#contact'); // Navigate to the contact section
  };

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-gray-900">
              Budget Tracker
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <NavLink to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  Home
                </NavLink>
                <NavLink to="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  Dashboard
                </NavLink>

                {/* Updated Contact link to trigger smooth scroll */}
                <button
                  onClick={handleScrollToContact}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  Contact
                </button>

                <span className="ml-2 text-sm font-medium hidden md:block">
                  {userName}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  <i className="fas fa-sign-out-alt"></i> 
                  <span className="hidden md:inline ml-2">Logout</span>
                </button>
              </>
            ) : (
              <NavLink to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
