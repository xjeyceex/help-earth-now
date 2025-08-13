'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface DropdownItem {
  href: string;
  label: string;
}

const dropdownItems: DropdownItem[] = [
  { href: '/work-in-climate-area', label: 'Work in the Climate Area' },
  { href: '/learn-more', label: 'Learn More' },
  { href: '/follow-people', label: 'Follow Key People' },
  { href: '/learn-a-lot-more', label: 'Learn a Lot More' },
];

export default function LearnMoreDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
          isOpen
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
      >
        Learn More
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-56 bg-gray-100 dark:bg-gray-900 shadow-lg rounded-lg mt-2 p-2 border border-gray-200 dark:border-gray-800">
          {dropdownItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
