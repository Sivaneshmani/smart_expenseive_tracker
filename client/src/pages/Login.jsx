import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";  // Import toast
import 'react-toastify/dist/ReactToastify.css';  // Import styles for toast

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://smart-expenseive-tracker.onrender.com/api/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Use toast.success() to display a success message
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_RIGHT,  // Position of the toast
          autoClose: 5000,  // Duration in ms
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        onLoginSuccess && onLoginSuccess(data.name);
        navigate("/dashboard");
      } else {
        // Use toast.error() for failed login
        toast.error(data.message || "Login failed", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 px-4">
      {/* Login Container */}
      <div className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        
        {/* Cross Button inside container */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-600">Login</h2>
          <div className="h-1 w-10 bg-indigo-500 rounded mx-auto mt-2" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="text-right text-sm text-indigo-600 hover:underline cursor-pointer">
            Forgot password?
          </div>

          <div className="flex flex-col space-y-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="border border-indigo-600 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
