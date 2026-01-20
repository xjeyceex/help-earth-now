'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
  disabled = false,
}) => {
  const isLeft = direction === 'left';
  const positionClass = isLeft ? 'left-5' : 'right-5';
  const icon = isLeft ? faArrowLeft : faArrowRight;

  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 ${positionClass}`}
    >
      <button
        className={`
          w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
          ${
            disabled
              ? 'bg-gray-400 dark:bg-gray-600 text-gray-300 dark:text-gray-500 cursor-not-allowed opacity-50'
              : 'text-white bg-blue-500 dark:text-white hover:bg-blue-600 hover:scale-105 active:scale-95'
          }
        `}
        onClick={onClick}
        disabled={disabled}
        aria-label={`Scroll ${direction}`}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`text-xl transition-transform duration-200 ${
            disabled ? '' : 'group-hover:scale-110'
          }`}
        />
      </button>
    </div>
  );
};

export default NavigationButton;
