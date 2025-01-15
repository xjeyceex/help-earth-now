'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setMessage(''); // Reset the message

    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch('/api/recipients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Thank you for signing up!');
        setEmail(''); // Clear the input
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setMessage('Failed to submit. Please check your connection.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-6 px-4 w-full">
      {/* Email Registration Section */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm mb-2 text-center">
          Sign up to receive occasional updates on our efforts and events
        </p>
        <form className="flex space-x-2" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded text-gray-900 w-52"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-24"
          >
            Save
          </button>
        </form>
        {message && <p className="text-sm mt-2">{message}</p>}
      </div>
      {/* Bottom Section */}
      <div className="mt-6 text-center text-sm border-t border-gray-700 pt-4">
        <p>&copy; 2024 Help You Help You. All rights reserved.</p>
      </div>
    </footer>
  );
}
