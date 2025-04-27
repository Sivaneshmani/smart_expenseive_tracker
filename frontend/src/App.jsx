// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AppProvider } from './context/AppContext';
// import Navbar from './pages/Navbar';
// import Hero from './pages/Hero';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import Budget from './pages/Budget';
// import Transactions from './pages/Transactions';
// import NotFound from './pages/NotFound';
// import PrivateRoute from './pages/PrivateRoute';
// import './index.css';
// // import Chatbox from './pages/Chatbox';

// function App() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [userName, setUserName] = useState(localStorage.getItem('user') || '');
//   const location = useLocation(); // listen to route changes

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   useEffect(() => {
//     // Whenever route changes, update the user name from localStorage
//     setUserName(localStorage.getItem('user') || '');
//   }, [location]);

//   return (
//     <AppProvider>
//       <div className={isDarkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-gray-800 min-h-screen'}>
//         {/* <Chatbox> */}
//         {/* Navbar will show on every page */}
//         <Navbar userName={userName} />

//         <Routes>
//           <Route path="/" element={<Hero isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
//           <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
//           <Route path="/signup" element={<Signup isDarkMode={isDarkMode} />} />
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard isDarkMode={isDarkMode} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/budget"
//             element={
//               <PrivateRoute>
//                 <Budget isDarkMode={isDarkMode} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/transactions"
//             element={
//               <PrivateRoute>
//                 <Transactions isDarkMode={isDarkMode} />
//               </PrivateRoute>
//             }
//           />
          
//           <Route path="*" element={<NotFound />} />
//         </Routes>
        
//         <ToastContainer position="top-right" autoClose={3000} />
//         {/* </Chatbox> */}
//       </div>
//     </AppProvider>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import NotFound from './pages/NotFound';
import PrivateRoute from './pages/PrivateRoute';
import './index.css';
import Chatbox from './pages/Chatbox'; // Import the Chatbox component

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('user') || '');
  const location = useLocation(); // listen to route changes
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleChatbox = () => {
    setIsChatboxVisible(!isChatboxVisible);
  };

  useEffect(() => {
    // Whenever route changes, update the user name from localStorage
    setUserName(localStorage.getItem('user') || '');
  }, [location]);

  return (
    <AppProvider>
      <div className={isDarkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-gray-800 min-h-screen'}>
        {/* Navbar will show on every page */}
        <Navbar userName={userName} />

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

          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />

        {/* Floating Chatbox Toggle Button */}
        <button
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition duration-300 z-50"
          onClick={toggleChatbox}
          aria-label="Toggle Chat"
        >
          💬
        </button>

        {/* Conditionally render the Chatbox */}
        {isChatboxVisible && <Chatbox />}
      </div>
    </AppProvider>
  );
}

export default App;