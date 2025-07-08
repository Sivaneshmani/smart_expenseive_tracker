import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSignupSuccess = () => {
    setIsNewUser(true);
  };

  const handleProfileComplete = () => {
    setIsNewUser(false);
  };

  return (
    <AppContext.Provider value={{ isDarkMode, toggleTheme, isNewUser, handleSignupSuccess, handleProfileComplete }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);