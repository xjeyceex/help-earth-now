'use client';
import Link from 'next/link';
import DarkModeToggle from '@/components/DarkMode';
import LocationIndicator from './LocationIndicator';

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
  if (!isOpen) return null;

  const handleLocationClick = () => {
    onLocationClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center pt-20 px-4 overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
        aria-label="Close menu"
      >
        ✕
      </button>

      <LocationIndicator onClick={handleLocationClick} isMobile />

      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="w-full max-w-xs text-center py-3 text-lg text-white border-b border-gray-800 hover:bg-gray-800 transition-colors"
          onClick={onClose}
        >
          {item.label}
        </Link>
      ))}

      <div className="w-full max-w-xs py-4 flex justify-center">
        <DarkModeToggle />
      </div>
    </div>
  );
}
