'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavbarTwo() {
  const { status } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClasses = (path: string) =>
    `block px-4 py-2 transition text-sm ${
      pathname === path ? 'text-white' : 'text-gray-400 hover:text-gray-300'
    }`;

  if (status !== 'authenticated') {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black w-full sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 p-4">
        {/* Brand / Logo */}
        <div className="text-white text-2xl font-bold">MyApp</div>

        {/* Spacer */}
        <div className="w-auto"></div>

        {/* Hamburger button for small screens */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex items-center space-x-8">
          {status === 'authenticated' ? (
            <>
              <Link href="/" className={linkClasses('/')}>
                Home
              </Link>
              <Link href="/content" className={linkClasses('/content')}>
                Content Management
              </Link>
              <Link href="/admin" className={linkClasses('/admin')}>
                Admin Panel
              </Link>
              <Link
                href="/api/auth/signout"
                className="px-4 py-2 text-gray-400 text-sm hover:text-red-500 transition"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <Link
              href="/dontlogmein"
              className="px-4 py-2 text-white hover:text-blue-500 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-full bg-black bg-opacity-90 z-50 flex flex-col space-y-4 p-4">
          <button
            onClick={toggleMenu}
            className="text-white self-end text-xl"
          >
            ✕
          </button>
          {status === 'authenticated' ? (
            <>
              <Link href="/" className={linkClasses('/')}>
                Home
              </Link>
              <Link href="/content" className={linkClasses('/content')}>
                Content Management
              </Link>
              <Link href="/admin" className={linkClasses('/admin')}>
                Admin Panel
              </Link>
              <Link
                href="/api/auth/signout"
                className="block px-4 py-2 text-white hover:text-red-500 transition"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <Link
              href="/dontlogmein"
              className="block px-4 py-2 text-white hover:text-blue-500 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
