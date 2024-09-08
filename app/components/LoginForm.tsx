'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      setLoading(false);

      if (result?.error) {
        setError(result.error);
      } else {
        alert('Logged in successfully!');
        router.push('/');
      }
    } catch (error) {
      setLoading(false);
      setError('An unexpected error occurred');
      console.error('Error during login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-6 w-screen max-w-md rounded-xl">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        {error && <p className="text-red-500 mb-4">Invalid Username or Password</p>}

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

        {/* For Registration if ever needed */}
        {/* <p className="text-center pb-3">
          Need to create an account?{' '}
          <Link className="text-indigo-500 hover:underline" href="/register">
            Create Account
          </Link>
        </p> */}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};