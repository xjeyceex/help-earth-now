'use client';

import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="w-full">
      {/* Skeleton for the header section */}
      <div className="bg-gray-50 dark:bg-gray-900 lg:px-16">
        <div className="grid max-w-screen-2xl px-6 pb-6 pt-3 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:pb-10 lg:grid-cols-12 ">
          {/* Left column skeleton */}
          <div className="mr-auto lg:col-span-7 space-y-6 w-full">
            {/* Main title skeleton */}
            <div className="h-16 md:h-20 xl:h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5 mb-4" />
            <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3 mb-2" />

            {/* Questions section skeleton */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3 mb-4" />
            <ul className="space-y-3 pl-8">
              {[1, 2, 3].map((item) => (
                <li key={item} className="flex items-center w-1/3">
                  <div className="h-3 w-3 bg-gray-300 dark:bg-gray-600 rounded-full mr-2" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
                </li>
              ))}
            </ul>

            {/* Email form skeleton */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2 mb-4 mt-8" />
            <div className="flex items-center space-x-2 w-full max-w-md">
              <div className="relative flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="h-12 w-24 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Right column (video) skeleton */}
          <div className="lg:mt-0 lg:col-span-5 lg:flex lg:ml-8 mt-6">
            <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-md shadow-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Action cards skeleton */}
      <div className="w-full max-w-7xl mx-auto pt-6 pb-12 lg:px-16">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4 mx-auto mb-12" />

        <div className="flex flex-wrap gap-6 justify-center px-6">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="flex flex-col flex-1 min-w-[300px] max-w-[calc(33%-1rem)] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative overflow-hidden h-64 animate-pulse"
            >
              <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full mb-4" />
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-6" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
