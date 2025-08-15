'use client';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { LocationContext } from '@/context/location-provider';
import { stateAbbreviations } from '@/app/us-datas';
import { motion } from 'framer-motion';

interface LocationIndicatorProps {
  onClick: () => void;
  isMobile?: boolean;
}

export default function LocationIndicator({
  onClick,
  isMobile = false,
}: LocationIndicatorProps) {
  const { location } = useContext(LocationContext) || {};

  const displayText = location
    ? location.county && location.state && stateAbbreviations[location.state]
      ? `${location.county}, ${stateAbbreviations[location.state]}`
      : location.state && stateAbbreviations[location.state]
      ? stateAbbreviations[location.state]
      : 'United States'
    : 'United States';

  const baseClasses = `flex items-center rounded-lg cursor-pointer transition-all 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                      bg-green-50 dark:bg-green-900/80 border border-green-500/30
                      hover:bg-green-100 dark:hover:bg-green-800`;

  const LocationButton = ({ className = '' }: { className?: string }) => (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${className}`}
      aria-label="Change location"
    >
      <FontAwesomeIcon
        icon={faMapMarkerAlt}
        className="text-green-600 dark:text-green-400 flex-shrink-0"
      />
      <p className="text-gray-800 dark:text-white font-medium truncate">
        {displayText}
      </p>
      <FontAwesomeIcon
        icon={faPen}
        className="text-gray-600 dark:text-gray-400 flex-shrink-0"
      />
    </motion.button>
  );

  if (isMobile) {
    return (
      <div className="w-full px-4 mb-4">
        <LocationButton className="w-full p-3 gap-3" />
      </div>
    );
  }

  return (
    <div className="hidden sm:block mx-2">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LocationButton className="py-2 px-3 gap-2 text-sm min-w-[120px] max-w-[180px]" />
      </motion.div>
    </div>
  );
}
