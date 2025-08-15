'use client';

interface ModalHeaderProps {
  onClose: () => void;
}

export default function ModalHeader({ onClose }: ModalHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Update Location
      </h2>
      <button
        onClick={onClose}
        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Close"
        type="button"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
  );
}
