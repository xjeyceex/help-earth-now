import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

    // Load the theme from local storage or default to dark mode
    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            setIsDarkMode(currentTheme === 'dark');
            document.documentElement.classList.toggle('dark', currentTheme === 'dark'); // Apply the theme immediately
        } else {
            document.documentElement.classList.add('dark'); // Ensure dark mode is applied
        }
    }, []);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            document.documentElement.classList.toggle('dark', newMode); // Apply the theme
            localStorage.setItem('theme', newMode ? 'dark' : 'light'); // Save the mode in local storage
            return newMode; // Return the new mode state
        });
    };

    return (
        <label className="flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                className="sr-only" // Hide the checkbox
            />
            <div className="relative">
                <div className={`block w-14 h-8 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <div
                    className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
                        isDarkMode ? 'translate-x-full bg-white' : 'bg-gray-900'
                    }`}
                ></div>
            </div>
        </label>
    );
};

export default DarkModeToggle;
