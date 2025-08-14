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
      className="min-w-[300px] snap-center border dark:border-gray-800 border-gray-300 relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-gray-900 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
      onClick={() => onClick(item)}
    >
      <Image
        src={item.image}
        alt={item.title}
        width={300}
        height={256}
        className="w-full h-64 object-cover rounded-t-lg transition-transform duration-500 transform hover:scale-110"
      />
      <div className="relative p-6 text-gray-900 dark:text-gray-100 text-center">
        <h3 className="text-3xl font-semibold mb-3">{item.title}</h3>
        <hr className="border-t-2 border-gray-300 dark:border-gray-700 my-6 mx-auto w-3/4" />
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default ClimateCard;
