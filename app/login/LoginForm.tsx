'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from "next/link";

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const result = await signIn('credentials', {
  //     redirect: false, 
  //     email,
  //     password,
  //   });
  //   if (result?.error) {
  //     setError(result?.error); 
  //   } 
  //   else {
  //     window.location.href = '/';
  //   }
  // };

  const onSubmit = (e: React.FormEvent) => {
    // e.preventDefault
    // signIn('credentials', {
    //   email,
    //   password,
    // });
    console.log('login!')
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-white p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
            Need to create an account? {' '}
            <Link className='text-indigo-500 hover:underline' href='/register'>
            Create Account
            </Link>{' '}
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