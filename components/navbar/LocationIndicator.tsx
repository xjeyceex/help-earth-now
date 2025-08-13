'use client';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { LocationContext } from '@/components/location-provider';
import { stateAbbreviations } from '@/app/us-datas';

interface LocationIndicatorProps {
  onClick: () => void;
  isMobile?: boolean;
}

export default function LocationIndicator({
  onClick,
  isMobile = false,
}: LocationIndicatorProps) {
  const { location } = useContext(LocationContext) || {};

  const displayText = location?.county
    ? `${location.county}, ${stateAbbreviations[location.state ?? '']}`
    : location?.state
    ? stateAbbreviations[location.state]
    : 'United States';

  if (isMobile) {
    return (
      <div
        onClick={onClick}
        className="w-full max-w-xs flex items-center 
                   bg-gray-200 dark:bg-gray-800 p-3 rounded-lg mb-6 
                   cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 
                   transition-colors"
      >
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          className="text-green-600 dark:text-green-400 mr-3"
        />
        <p className="text-sm text-gray-900 dark:text-white flex-grow">
          {displayText}
        </p>
        <FontAwesomeIcon
          icon={faPen}
          className="text-xs text-gray-600 dark:text-gray-400"
        />
      </div>
    );
  }

  return (
    <div
      className="hidden sm:flex items-center 
                 bg-gray-200/75 dark:bg-gray-800/75 p-2 rounded-lg 
                 cursor-pointer group mx-2 hover:bg-gray-300/90 dark:hover:bg-gray-700/90 
                 transition-all duration-300"
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={faMapMarkerAlt}
        className="text-green-600 dark:text-green-400 mr-2"
      />
      <p className="text-xs md:text-sm text-gray-900 dark:text-white flex-grow">
        {displayText}
      </p>
      <FontAwesomeIcon
        icon={faPen}
        className="text-xs text-gray-600 dark:text-gray-400 ml-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300"
      />
    </div>
  );
}
