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
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const linkClasses = (path: string) =>
    `block px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      pathname === path
        ? 'text-primary-600 dark:text-primary-400'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
    }`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md w-full sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 shadow-sm"
      >
        <div className="w-full lg:container mx-auto flex items-center justify-between px-4 py-3">
          {/* Brand / Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center" aria-label="Home">
              <Image
                src="/logodark.png"
                alt="MyApp Logo"
                width={160}
                height={40}
                className="h-auto w-auto max-h-10 dark:hidden transition-opacity hover:opacity-90"
                priority
              />
              <Image
                src="/logowhite.png"
                alt="MyApp Logo"
                width={160}
                height={40}
                className="h-auto w-auto max-h-10 hidden dark:block transition-opacity hover:opacity-90"
                priority
              />
            </Link>
          </motion.div>

          {/* Location indicator - hidden on small screens */}
          <LocationIndicator onClick={openModal} />

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className={linkClasses('/')}>
              <motion.span whileHover={{ scale: 1.05 }} className="block">
                Home
              </motion.span>
            </Link>

            <Link href="/about-us" className={linkClasses('/about-us')}>
              <motion.span whileHover={{ scale: 1.05 }} className="block">
                About Us
              </motion.span>
            </Link>

            <LearnMoreDropdown />

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2"
            >
              <DarkModeToggle />
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={openModal}
              className="flex items-center justify-center w-8 h-8 rounded-full
               bg-green-50 dark:bg-green-900/80 text-green-600 dark:text-green-400
               border border-green-500/30 hover:bg-green-100 dark:hover:bg-green-800
               shadow-sm transition-all"
              aria-label="Location"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-sm" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-700 dark:text-gray-200 focus:outline-none transition-colors"
              onClick={toggleMenu}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onLocationClick={openModal}
          />
        )}
      </AnimatePresence>

      {/* Location Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <LocationModal isOpen={isModalOpen} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}
