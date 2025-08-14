'use client';
import Link from 'next/link';
import DarkModeToggle from '@/components/DarkMode';
import LocationIndicator from './LocationIndicator';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationClick: () => void;
}

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/work-in-climate-area', label: 'Work in Climate' },
  { href: '/follow-people', label: 'Follow Key People' },
  { href: '/learn-more', label: 'Learn More' },
  { href: '/learn-a-lot-more', label: 'Learn a Lot More' },
];

export default function MobileMenu({
  isOpen,
  onClose,
  onLocationClick,
}: MobileMenuProps) {
  const handleLocationClick = () => {
    onLocationClick();
    onClose();
  };

  return (
    <>
      {/* Overlay with smoother transition */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Slide-over panel with better animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl z-50"
          >
            {/* Header with better styling */}
            <div className="p-6 flex justify-between items-center border-b border-gray-700 bg-gray-900/50">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-600">
                Navigation
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-700 transition-all duration-200"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content with better spacing and animations */}
            <div className="p-6 h-[calc(100%-64px)] overflow-y-auto">
              <div className="mb-8">
                <LocationIndicator onClick={handleLocationClick} isMobile />
              </div>

              <nav className="space-y-2 mb-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 px-4 rounded-lg hover:bg-gray-700/50 transition-all duration-200 group"
                      onClick={onClose}
                    >
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <span className="text-gray-200 group-hover:text-white font-medium">
                          {item.label}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-4 border-t border-gray-700"
              >
                <DarkModeToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
