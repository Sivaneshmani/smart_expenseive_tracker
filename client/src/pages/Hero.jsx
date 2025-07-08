import { useState } from 'react';
import React from 'react';
import Navbar from './Navbar';
import image3 from '../assets/image/image3.jpg'; // Import the image
function Hero({ isDarkMode }) {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className={`py-20 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
        } text-center`}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Content */}
            <div className="md:w-1/2">
              <h1 className="text-5xl font-extrabold mb-6">
                Smart Expense Tracker
              </h1>
              <p className="text-xl mb-8">
                Take control of your finances with ease. Track, manage, and
                analyze your expenses in one place.
              </p>
            </div>

            {/* Image */}
            <div className="md:w-1/2">
              <img
                src={image3}
                alt="Smart Expense Tracker"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                Track Expenses
              </h3>
              <p>
                Log your daily expenses effortlessly and keep a detailed record
                of your spending habits.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                Set Budgets
              </h3>
              <p>
                Create budgets for different categories and stay on top of your
                financial goals.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                Analyze Trends
              </h3>
              <p>
                Visualize your spending patterns with insightful charts and
                reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="Contact"
        className={`${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
        } py-20`}
      >
        <div className="container mx-auto text-center bg-gray-200 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg mb-6">
            We’d love to hear from you! Whether you have questions, feedback, or
            just want to say hi, feel free to reach out.
          </p>

          <div className="text-left max-w-2xl mx-auto">
            <div className="mb-4">
              <strong>Email:</strong> sivaneshmani7@gmail.com;
            </div>
            <div className="mb-4">
              <strong>Address:</strong> Sri Shakthi Institute of Engineering and Technology, Coimbatore, Tamil Nadu, India
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;