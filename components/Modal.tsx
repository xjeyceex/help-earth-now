import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 dark:bg-black/60 z-50">
      <div className="relative bg-white dark:bg-gray-900 rounded shadow-lg p-4 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
