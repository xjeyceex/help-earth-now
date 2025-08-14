'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface ActionCardProps {
  icon: IconDefinition;
  iconColor: string;
  bgColor: string;
  title: string;
  actions: string[];
  location?: { county?: string };
}

export default function ActionCard({
  icon,
  iconColor,
  bgColor,
  title,
  actions,
  location,
}: ActionCardProps) {
  return (
    <div
      className="flex flex-col flex-1 min-w-[280px] max-w-[calc(50%-1rem)] md:max-w-[calc(33%-1rem)] 
                    bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:scale-105 overflow-hidden"
    >
      {/* Header */}
      <div
        className={`flex items-center gap-4 p-6 ${bgColor} dark:bg-opacity-30`}
      >
        <FontAwesomeIcon icon={icon} className={`text-4xl ${iconColor}`} />
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        <ul className="space-y-2">
          {actions.map((action, index) => (
            <li
              key={index}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-500"
            >
              {action}
            </li>
          ))}
        </ul>

        {/* Location Link */}
        {location?.county === 'Contra Costa County' && (
          <div className="mt-4 text-right">
            <Link
              href={`/${encodeURIComponent('category')}/${encodeURIComponent(
                location?.county || ''
              )}`}
              className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              More →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
