'use client';

import React, { useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

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
        setEmail('');
      } else {
        const errorData = await response.json();
        setMessage(
          errorData.error || 'Something went wrong. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setMessage('Failed to submit. Please check your connection.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-left text-lg">
        Sign up to receive occasional updates on our efforts and events:
      </div>
      <form
        className="flex items-center space-x-2 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 pr-12 rounded-full text-gray-900 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter your email"
            required
          />
          <MdOutlineEmail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-200 w-24"
        >
          Save
        </button>
      </form>
      {message && (
        <div
          className={`text-sm ${
            message.includes('Thank you') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
