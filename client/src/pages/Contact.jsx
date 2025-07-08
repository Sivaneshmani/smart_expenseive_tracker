import React from 'react';
import Navbar from './Navbar';

const Contact = ({ isDarkMode }) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      
      <div className="max-w-7xl mx-auto px-4 py-6 mt-16">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg">Reach out to us at support@budgettracker.com.</p>
      </div>
    </div>
  );
};

export default Contact;