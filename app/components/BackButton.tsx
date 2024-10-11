// BackButton.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); // Navigates to the previous page
  };

  return (
    <button
      onClick={handleBackClick}
      className="fixed top-20 left-4 py-2 px-4  bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-200 flex items-center space-x-2 z-50"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
    </button>
  );
};

export default BackButton;
