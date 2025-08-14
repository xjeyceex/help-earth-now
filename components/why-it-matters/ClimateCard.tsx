'use client';
import { ClimateItem } from '@/app/types';
import Image from 'next/image';
import React from 'react';

interface ClimateCardProps {
  item: ClimateItem;
  onClick: (item: ClimateItem) => void;
}

const ClimateCard: React.FC<ClimateCardProps> = ({ item, onClick }) => {
  return (
    <div
      className="min-w-[300px] snap-center relative overflow-hidden rounded-xl bg-gradient-to-b from-white to-zinc-100 dark:from-gray-900 dark:to-gray-800 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
      onClick={() => onClick(item)}
    >
      {/* Image with subtle overlay for better text contrast */}
      <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 transform hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-t-xl" />
      </div>

      <div className="p-5 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {item.title}
        </h3>
        <hr className="border-t border-gray-300 dark:border-gray-700 w-16 mx-auto my-3" />
        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Optional: subtle shine/hover effect */}
      <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 hover:opacity-20 transition-opacity duration-300" />
    </div>
  );
};

export default ClimateCard;
