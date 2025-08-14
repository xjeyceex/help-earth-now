'use client';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { LocationContext } from '@/context/location-provider';
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

  const baseClasses =
    'flex items-center p-3 rounded-lg cursor-pointer transition-colors shadow-sm';

  if (isMobile) {
    return (
      <div
        onClick={onClick}
        className={`${baseClasses} w-full max-w-xs mb-6
                    bg-green-50 dark:bg-green-900/80 border border-green-500/30
                    hover:bg-green-100 dark:hover:bg-green-800`}
      >
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          className="text-green-600 dark:text-green-400 mr-3"
        />
        <p className="text-sm font-medium text-gray-800 dark:text-white flex-grow">
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
      onClick={onClick}
      className={`${baseClasses} hidden sm:flex mx-2
                  bg-green-50 dark:bg-green-900/80 border border-green-500/30
                  hover:bg-green-100 dark:hover:bg-green-800`}
    >
      <FontAwesomeIcon
        icon={faMapMarkerAlt}
        className="text-green-600 dark:text-green-400 mr-2"
      />
      <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-white flex-grow">
        {displayText}
      </p>
      <FontAwesomeIcon
        icon={faPen}
        className="text-xs text-gray-600 dark:text-gray-400 ml-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300"
      />
    </div>
  );
}
