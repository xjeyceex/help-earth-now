'use client';
import { useState } from 'react';

export default function LocationAndEmail() {
  const [email, setEmail] = useState<string>('');
  const [isEmailSaved, setIsEmailSaved] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(e.target.value));
  };

  const handleSaveEmail = () => {
    if (email.trim() === '') {
      alert('Email cannot be empty.');
      return;
    }
    if (isEmailValid) {
      setIsEmailSaved(true);
      setTimeout(() => {
        setIsEmailSaved(false);
      }, 2000);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <>
      <div className="sticky bottom-0 w-full bg-black p-2 md:p-4 text-white shadow-lg z-50">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="flex items-center justify-center w-full mx-2">
            <p className="mr-2 text-xs md:text-sm text-center">
              If you would like occasional updates:
            </p>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full md:w-auto bg-gray-50 border ${isEmailValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 text-xs md:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 px-2 py-1`}
              placeholder="Enter email..."
            />
            <button
              onClick={handleSaveEmail}
              className="ml-2 px-2 py-1 bg-green-600 text-white text-xs md:text-sm rounded hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {isEmailSaved && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-lg font-semibold mb-4">Email Saved!</h2>
            <button
              onClick={() => setIsEmailSaved(false)}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
