'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from "next/link";

export const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName, 
          lastName, 
          email, 
          password
        })
      });

      if (res.ok) {
        // Type-cast the target to `HTMLFormElement` to use reset()
        const form = e.target as HTMLFormElement;
        form.reset();
        
        // Uncomment to auto-login user after successful registration
        // const result = await signIn('credentials', {
        //   redirect: false, 
        //   email,
        //   password,
        // });
        // if (result?.error) {
        //   setError(result?.error); 
        // } else {
        //   window.location.href = '/';
        // }

        console.log('User registered successfully');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'User registration failed');
        console.log('User registration failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.log('User registration failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <p className="text-center pb-3">
          Already have an account?{' '}
          <Link className="text-indigo-500 hover:underline" href="/login">
            Login
          </Link>
        </p>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};