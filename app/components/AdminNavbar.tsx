'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminNavbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          {/* You can replace the src link with your app's logo */}
          {/* <img src="/logo.svg" className="h-8" alt="App Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MyApp
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14" aria-hidden="true">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/" className="block py-2 px-3 text-gray-900 hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">
                Home
              </Link>
            </li>
            {status === 'authenticated' && (
              <>
                <li>
                  <Link href="/content" className="block py-2 px-3 text-gray-900 hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">
                    Content Management
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="block py-2 px-3 text-gray-900 hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">
                    Admin Panel
                  </Link>
                </li>
                <li>
                  <Link href="/api/auth/signout" className="block py-2 px-3 text-red-600 hover:text-red-700 md:p-0 dark:text-red-400 md:dark:hover:text-red-500">
                    Logout
                  </Link>
                </li>
              </>
            )}
            {status !== 'authenticated' && (
              <li>
                <Link href="/login" className="block py-2 px-3 text-blue-600 hover:text-blue-700 md:p-0 dark:text-blue-400 md:dark:hover:text-blue-500">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
