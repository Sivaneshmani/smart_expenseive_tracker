import React from 'react';
import Hero from './Hero';

const Home = ({ isDarkMode, toggleTheme }) => {
  return <Hero isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
};

export default Home;