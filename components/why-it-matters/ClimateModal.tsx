'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useRef, useEffect } from 'react';
import { ClimateItem } from '@/app/types';

interface ModalProps {
  isOpen: boolean;
  content: ClimateItem;
  onClose: () => void;
}

const ClimateModal: React.FC<ModalProps> = ({ isOpen, content, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-6">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 max-w-lg w-full mx-auto p-6 rounded-lg shadow-lg relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {content.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-2xl rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            &times;
          </button>
        </div>
        <hr className="my-4 border-gray-300 dark:border-gray-600 w-full" />

        {/* Image */}
        <Image
          src={content.image}
          alt={content.title}
          width={600}
          height={400}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          {content.moreInfo}
        </p>

        {/* Learn More link */}
        <p className="mb-4 text-center">
          <a
            href={content.learnMore}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"
          >
            More info
          </a>
        </p>

        {/* Divider */}
        <hr className="my-4 border-gray-300 dark:border-gray-600 w-full" />

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg"
          >
            Close
          </button>
          <Link
            href={content.learnMore}
            target="_blank"
            className="px-6 py-3 text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 rounded-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClimateModal;
