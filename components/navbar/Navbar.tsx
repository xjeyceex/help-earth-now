'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import DarkModeToggle from '@/components/DarkMode';
import LocationIndicator from './LocationIndicator';
import LearnMoreDropdown from './LearnMoreDropdown';
import MobileMenu from './MobileMenu';
import LocationModal from './LocationModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const linkClasses = (path: string) =>
    `block px-3 py-2 text-sm transition-colors ${
      pathname === path
        ? 'text-gray-900 dark:text-white'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
    }`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <nav className="bg-gray-100 dark:bg-gray-900 w-full sticky top-0 z-50 py-2 border-b border-gray-200 dark:border-gray-800">
        <div className="w-full lg:container mx-auto flex items-center justify-between px-3 py-2">
          {/* Brand / Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logodark.png" // now dark logo shows in light mode
                alt="MyApp Logo"
                width={160}
                height={40}
                className="h-auto w-auto max-h-10 dark:hidden"
                priority
              />
              <Image
                src="/logowhite.png" // now white logo shows in dark mode
                alt="MyApp Logo"
                width={160}
                height={40}
                className="h-auto w-auto max-h-10 hidden dark:block"
                priority
              />
            </Link>
          </div>

          {/* Location indicator - hidden on small screens */}
          <LocationIndicator onClick={openModal} />

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className={linkClasses('/')}>
              Home
            </Link>

            <Link href="/about-us" className={linkClasses('/about-us')}>
              About Us
            </Link>

            <LearnMoreDropdown />

            <DarkModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={openModal}
              className="sm:hidden text-gray-900 dark:text-white p-1 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              aria-label="Location"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </button>
            <button
              className="text-gray-900 dark:text-white focus:outline-none hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
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
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onLocationClick={openModal}
      />

      {/* Location Modal */}
      <LocationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
