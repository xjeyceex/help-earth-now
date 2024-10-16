'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const WhyItMatters: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    description: '',
    image: '',
    moreInfo: '',
    learnMore: '',
  });

  const items = [
    {
      image: '/sea-level.jpg',
      title: 'Rising Sea Levels',
      description: 'Coastal cities around the world are threatened by rising sea levels, displacing communities and disrupting ecosystems.',
      moreInfo: 'Rising sea levels result from melting ice caps and glaciers and thermal expansion of seawater.',
      learnMore: 'https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level',
    },
    {
      image: '/wildfire.jpg',
      title: 'Wildfires',
      description: 'Increasing temperatures have led to more frequent and intense wildfires, devastating forests and wildlife.',
      moreInfo: 'Wildfires are exacerbated by climate change, leading to more severe damage to ecosystems.',
      learnMore: 'https://www.who.int/health-topics/wildfires',
    },
    {
      image: '/drought.jpg',
      title: 'Droughts',
      description: 'Prolonged droughts are becoming more common, threatening food and water supplies for millions of people.',
      moreInfo: 'Droughts can have devastating impacts on agriculture, drinking water supplies, and can lead to food shortages.',
      learnMore: 'https://www.drought.gov/current-conditions',
    },
  ];

  const handleCardClick = (item: { title: string; description: string; image: string; moreInfo: string; learnMore: string }) => {
    setModalContent(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 pt-8 pb-12 px-4 w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mt-4 text-2xl text-gray-700 dark:text-gray-300">
          Climate change is affecting every corner of the planet, from extreme weather events to rising sea levels. By taking action now, we can slow down these effects and protect our future.
        </p>

        {/* Visual Example */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-gray-900 transform cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-black hover:scale-105 transition-all duration-300 ease-in-out" // Animation on hover
              onClick={() => handleCardClick(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transition-transform duration-500 transform hover:scale-110" // Image scale animation
              />
              <div className="relative p-6 text-gray-900 dark:text-gray-100">
                <h3 className="text-3xl font-semibold">{item.title}</h3>
                <p className="mt-3">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detailed information */}
      {isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity duration-300 ease-in-out" 
          onClick={closeModal}  // Close modal when clicking outside
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 scale-100" 
            onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside the modal
          >
            <button 
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-3xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <img src={modalContent.image} alt={modalContent.title} className="w-full h-64 object-cover" />
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{modalContent.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{modalContent.description}</p>
              <p className="text-gray-600 dark:text-gray-400">{modalContent.moreInfo}</p>
              <Link 
                href={modalContent.learnMore} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 inline-block bg-blue-600 text-white rounded-md px-4 py-2 transition duration-300 hover:bg-blue-700"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyItMatters;
