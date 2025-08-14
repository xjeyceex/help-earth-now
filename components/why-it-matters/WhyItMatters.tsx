'use client';
import React, { useState } from 'react';
import ClimateCarousel from './ClimateCarousel';
import ClimateModal from './ClimateModal';
import { ClimateItem } from '@/app/types';

const WhyItMatters: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ClimateItem>({
    title: '',
    description: '',
    image: '',
    moreInfo: '',
    learnMore: '',
  });

  const climateItems: ClimateItem[] = [
    {
      image: '/wildfire.jpg',
      title: 'Wildfires',
      description:
        'Frequent and intense wildfires threaten forests, wildlife, and human communities.',
      moreInfo:
        'Wildfires release CO₂, harm ecosystems, reduce air quality, and force evacuations, causing both economic and health impacts.',
      learnMore: 'https://www.who.int/health-topics/wildfires',
    },
    {
      image: '/sea-level.jpg',
      title: 'Rising Sea Levels',
      description:
        'Coastal cities are at risk of flooding and community displacement due to rising seas.',
      moreInfo:
        'Melting ice caps and thermal expansion threaten homes, land, and infrastructure, creating economic challenges.',
      learnMore:
        'https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level',
    },
    {
      image: '/drought.jpg',
      title: 'Droughts',
      description:
        'Prolonged droughts threaten food, water, and livelihoods across the globe.',
      moreInfo:
        'Droughts reduce crop yields, deplete water supplies, and increase social and economic instability.',
      learnMore: 'https://www.drought.gov/current-conditions',
    },
    {
      image: '/storms.jpg',
      title: 'Severe Storms',
      description:
        'Hurricanes, typhoons, and cyclones are becoming stronger and more destructive.',
      moreInfo:
        'Warmer oceans and changing weather patterns cause destructive storms, displacing communities and affecting economies.',
      learnMore:
        'https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level',
    },
    {
      image: '/heatwave.jpg',
      title: 'Heatwaves',
      description:
        'Extreme heat events pose serious risks to health, agriculture, and energy systems.',
      moreInfo:
        'Heatwaves increase illness and mortality, strain power grids, and reduce crop yields, impacting food security.',
      learnMore:
        'https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health',
    },
    {
      image: '/melting.jpg',
      title: 'Melting Ice Caps',
      description:
        'Polar ice is melting rapidly, raising sea levels and threatening ecosystems.',
      moreInfo:
        'Ice loss disrupts weather, accelerates sea level rise, and endangers species and Indigenous communities.',
      learnMore:
        'https://www.nationalgeographic.com/environment/article/antarctic-ice-melt',
    },
    {
      image: '/biodiversity.jpg',
      title: 'Biodiversity Loss',
      description:
        'Species extinction is accelerating due to habitat and climate changes.',
      moreInfo:
        'Loss of biodiversity disrupts ecosystems, affecting food chains, livelihoods, and vital environmental services.',
      learnMore:
        'https://www.iucn.org/resources/issues-briefs/biodiversity-and-climate-change',
    },
  ];

  const handleCardClick = (item: ClimateItem) => {
    setModalContent(item);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-4 lg:px-20 w-full">
      <div className="max-w-screen-2xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Why Climate Change Matters
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Climate change affects every corner of our planet—from extreme weather
          events to rising seas. Taking action now helps protect communities,
          ecosystems, and our shared future.
        </p>

        <ClimateCarousel items={climateItems} onCardClick={handleCardClick} />
      </div>

      <ClimateModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default WhyItMatters;
