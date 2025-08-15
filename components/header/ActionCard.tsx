'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}
      className="flex flex-col flex-1 min-w-[280px] max-w-[calc(50%-1rem)] md:max-w-[calc(33%-1rem)] 
                 bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
    >
      {/* Header */}
      <div
        className={`flex items-center gap-4 p-6 ${bgColor} dark:bg-opacity-30`}
      >
        <FontAwesomeIcon icon={icon} className={`text-3xl ${iconColor}`} />
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="space-y-2"
        >
          {actions.map((action, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, x: -15 },
                visible: { opacity: 1, x: 0 },
              }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 pl-0"
            >
              {action}
            </motion.li>
          ))}
        </motion.ul>

        {/* Location Link */}
        {location?.county === 'Contra Costa County' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-right"
          >
            <Link
              href={`/${encodeURIComponent('category')}/${encodeURIComponent(
                location?.county || ''
              )}`}
              className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              More →
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
