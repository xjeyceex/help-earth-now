'use client';
import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setIsDarkMode(currentTheme === 'dark');
      document.documentElement.classList.add(currentTheme);
      document.documentElement.classList.remove(
        currentTheme === 'dark' ? 'light' : 'dark'
      );
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleDarkMode = (e: React.MouseEvent | React.ChangeEvent) => {
    e.preventDefault(); // Prevent label/checkbox from scrolling page
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      const newTheme = newMode ? 'dark' : 'light';
      document.documentElement.classList.add(newTheme);
      document.documentElement.classList.remove(newMode ? 'light' : 'dark');
      localStorage.setItem('theme', newTheme);
      return newMode;
    });
  };

  return (
    <label
      className="flex items-center cursor-pointer"
      onClick={toggleDarkMode} // Handle click at label level
    >
      <input
        type="checkbox"
        checked={isDarkMode}
        readOnly
        className="sr-only"
        aria-label="Toggle dark mode"
      />
      <div className="relative w-14 h-8">
        <div
          className={`block w-full h-full rounded-full ${
            isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        />
        <div
          className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform duration-300 ease-in-out ${
            isDarkMode
              ? 'translate-x-full bg-white text-blue-500'
              : 'bg-gray-900 text-white'
          }`}
        >
          {isDarkMode ? <FaMoon /> : <FaSun />}
        </div>
      </div>
    </label>
  );
};

export default DarkModeToggle;
