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
    <div className="flex flex-col flex-1 min-w-[300px] max-w-[calc(50%-1rem)] md:max-w-[calc(33%-1rem)] bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-8 relative overflow-hidden">
      <div
        className={`absolute top-0 left-0 w-full h-full ${bgColor} opacity-30`}
      />
      <div className="relative z-10 flex-grow">
        <FontAwesomeIcon icon={icon} className={`text-5xl ${iconColor} mb-4`} />
        <h3 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {title}
        </h3>
        <div className="space-y-4">
          {actions.map((action, index) => (
            <p
              key={index}
              className="text-2xl text-gray-700 dark:text-gray-300 break-words leading-tight"
            >
              {action}
            </p>
          ))}
        </div>
      </div>
      {location?.county === 'Contra Costa County' && (
        <div className="relative z-10 text-right mt-auto">
          <br />
          <Link
            href={`/${encodeURIComponent('category')}/${encodeURIComponent(
              location?.county || ''
            )}`}
            className="text-2xl font-bold text-blue-500 hover:underline"
          >
            More →
          </Link>
        </div>
      )}
    </div>
  );
}
