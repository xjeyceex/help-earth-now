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
        'More frequent and intense wildfires threaten forests, wildlife, and human lives.',
      moreInfo:
        'Wildfires release CO2, damage ecosystems, reduce air quality, and force evacuations, causing economic and health impacts.',
      learnMore: 'https://www.who.int/health-topics/wildfires',
    },
    {
      image: '/sea-level.jpg',
      title: 'Rising Sea Levels',
      description:
        'Coastal cities face flooding and community displacement due to rising seas.',
      moreInfo:
        'Melting ice caps and thermal expansion threaten homes, land, and infrastructure, creating economic challenges.',
      learnMore:
        'https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level',
    },
    {
      image: '/drought.jpg',
      title: 'Droughts',
      description:
        'Prolonged droughts threaten food, water, and livelihoods globally.',
      moreInfo:
        'Droughts reduce crop yields, deplete water supplies, and increase social and economic instability.',
      learnMore: 'https://www.drought.gov/current-conditions',
    },
    {
      image: '/storms.jpg',
      title: 'Severe Storms',
      description:
        'Hurricanes, typhoons, and cyclones are more intense, damaging communities.',
      moreInfo:
        'Warmer oceans and changing patterns cause destructive storms, displacing people and affecting economies.',
      learnMore:
        'https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level',
    },
    {
      image: '/heatwave.jpg',
      title: 'Heatwaves',
      description:
        'Extreme heat events endanger health, agriculture, and energy systems.',
      moreInfo:
        'Heatwaves increase illness and death, strain power grids, and reduce crop yields, affecting food security.',
      learnMore:
        'https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health',
    },
    {
      image: '/melting.jpg',
      title: 'Melting Ice Caps',
      description:
        'Polar ice is melting fast, raising sea levels and threatening ecosystems.',
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
        'Loss of biodiversity disrupts ecosystems, affecting food chains, livelihoods, and essential environmental services.',
      learnMore:
        'https://www.iucn.org/resources/issues-briefs/biodiversity-and-climate-change',
    },
  ];

  const handleCardClick = (item: ClimateItem) => {
    setModalContent(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-8 px-4 w-full relative lg:px-20">
      <div className="max-w-screen-2xl mx-auto text-center">
        <p className="text-2xl text-gray-700 dark:text-gray-300">
          Climate change is affecting every corner of the planet, from extreme
          weather events to rising sea levels. By taking action now, we can slow
          down these effects and protect our future.
        </p>

        <ClimateCarousel items={climateItems} onCardClick={handleCardClick} />
      </div>

      <ClimateModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={closeModal}
      />
    </section>
  );
};

export default WhyItMatters;
