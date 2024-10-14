// components/DarkModeToggle.tsx
import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load the theme from local storage or default to light mode
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            setIsDarkMode(savedMode === 'true');
            document.documentElement.classList.toggle('dark', savedMode === 'true');
        }
    }, []);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
        const newMode = !isDarkMode;
        document.documentElement.classList.toggle('dark', newMode);
        localStorage.setItem('darkMode', String(newMode)); // Save the mode in local storage
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
                        isDarkMode ? 'translate-x-full bg-white' : 'bg-white'
                    }`}
                ></div>
            </div>
        </label>
    );
};

export default DarkModeToggle;
