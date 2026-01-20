'use client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface ActionButtonsProps {
  onAutoDetect: () => void;
  onSave: () => void;
  isUpdating: boolean;
  isSaveDisabled: boolean;
}

export default function ActionButtons({
  onAutoDetect,
  onSave,
  isUpdating,
  isSaveDisabled,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-row gap-3">
      <motion.button
        onClick={onAutoDetect}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={isUpdating}
        className="w-1/2 flex items-center justify-center py-2.5 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-white font-medium rounded-lg transition-all disabled:opacity-70 text-base"
        type="button"
      >
        {isUpdating ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin mr-2 text-base"
          />
        ) : (
          <FontAwesomeIcon icon={faLocationArrow} className="mr-2 text-base" />
        )}
        Auto Detect
      </motion.button>

      <motion.button
        onClick={onSave}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={isUpdating || isSaveDisabled}
        className="w-1/2 flex items-center justify-center py-2.5 px-4 bg-green-600 hover:bg-green-700 focus:ring-1 focus:ring-green-500 focus:ring-opacity-50 text-white font-medium rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed text-base"
        type="button"
      >
        {isUpdating ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin mr-2 text-base"
          />
        ) : (
          'Save'
        )}
      </motion.button>
    </div>
  );
}
