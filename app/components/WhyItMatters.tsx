'use client';
import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image
import React, { useState, useRef, useEffect } from 'react';

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
      moreInfo: 'Rising sea levels result from melting ice caps and glaciers and thermal expansion of seawater, leading to the loss of homes, arable land, and critical infrastructure. Increased flooding and erosion threaten freshwater supplies and create significant economic challenges, particularly for coastal communities dependent on tourism and fishing.',
      learnMore: 'https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level',
    },
    {
      image: '/wildfire.jpg',
      title: 'Wildfires',
      description: 'Increasing temperatures have led to more frequent and intense wildfires, devastating forests and wildlife, and endangering human lives.',
      moreInfo: 'Wildfires are exacerbated by climate change, leading to more severe damage to ecosystems and releasing significant amounts of CO2 into the atmosphere, worsening global warming. These fires threaten air quality, contribute to respiratory diseases, and force communities to evacuate, resulting in economic losses and long-term psychological impacts on affected populations.',
      learnMore: 'https://www.who.int/health-topics/wildfires',
    },
    {
      image: '/drought.jpg',
      title: 'Droughts',
      description: 'Prolonged droughts are becoming more common, threatening food and water supplies for millions of people, causing economic and social instability.',
      moreInfo: 'Droughts have far-reaching consequences on agriculture, drinking water supplies, and food security, leading to famine and displacement in vulnerable regions. The agricultural sector suffers significantly, with crop failures and livestock losses, which can escalate food prices and increase competition for resources, leading to social unrest.',
      learnMore: 'https://www.drought.gov/current-conditions',
    },
    {
      image: '/melting.jpg',
      title: 'Melting Ice Caps',
      description: 'The polar ice caps are melting at an alarming rate, contributing to sea level rise and threatening polar ecosystems.',
      moreInfo: "The loss of Arctic and Antarctic ice disrupts global weather patterns, accelerates sea level rise, and puts species like polar bears and penguins at risk of extinction. The melting ice also impacts Indigenous communities that rely on these ecosystems for their livelihoods, as well as global climate patterns by reducing the Earth's albedo effect, which helps regulate temperatures.",
      learnMore: 'https://www.nationalgeographic.com/environment/article/antarctic-ice-melt',
    },
    {
      image: '/heatwave.jpg',
      title: 'Extreme Heatwaves',
      description: 'Heatwaves are becoming more intense and prolonged, endangering public health, agriculture, and energy supplies.',
      moreInfo: 'Extreme heat events cause heat-related illnesses and deaths, strain power grids, and reduce crop yields, exacerbating food insecurity. Vulnerable populations, including the elderly and those with pre-existing health conditions, are at greater risk. The agricultural sector also faces challenges as heat stress on crops reduces yields and quality, impacting food supply and prices.',
      learnMore: 'https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health',
    },
    {
      image: '/storms.jpg',
      title: 'Severe Storms',
      description: 'Climate change is fueling more intense hurricanes, typhoons, and cyclones, causing widespread damage to communities and infrastructure.',
      moreInfo: 'Warmer ocean temperatures and changing weather patterns are contributing to more powerful and destructive storms, displacing millions and costing billions in damages. The increase in storm frequency and intensity leads to higher insurance premiums, infrastructure repair costs, and long-term displacement for communities, significantly affecting local economies and recovery efforts.',
      learnMore: 'https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level',
    },
    {
      image: '/biodiversity.jpg',
      title: 'Biodiversity Loss',
      description: 'Many species are being driven to extinction due to habitat loss, extreme weather, and changing ecosystems.',
      moreInfo: 'Climate change disrupts ecosystems, leading to loss of biodiversity which in turn affects food chains, human livelihoods, and the natural environment. As species struggle to adapt or migrate to suitable habitats, ecosystems become imbalanced, affecting ecosystem services such as pollination, clean water, and climate regulation, which are vital for human survival.',
      learnMore: 'https://www.iucn.org/resources/issues-briefs/biodiversity-and-climate-change',
    },
  ];  

  const duplicatedItems = [...items, ...items];
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (item: { title: string; description: string; image: string; moreInfo: string; learnMore: string }) => {
    setModalContent(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const scrollLeft = () => {
    const container = cardContainerRef.current;
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = cardContainerRef.current;
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = cardContainerRef.current;

    const handleScroll = () => {
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        if (scrollLeft >= scrollWidth / 2) {
          container.scrollLeft = scrollLeft - scrollWidth / 2;
        } else if (scrollLeft < 0) {
          container.scrollLeft = scrollWidth / 2 + scrollLeft;
        }
      }
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-8 px-4 w-full relative">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-2xl text-gray-700 dark:text-gray-300">
          Climate change is affecting every corner of the planet, from extreme weather events to rising sea levels. By taking action now, we can slow down these effects and protect our future.
        </p>

        <div className="mt-6 relative overflow-hidden p-4">
          <div ref={cardContainerRef} className="flex space-x-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide p-4">
            {duplicatedItems.map((item, index) => (
              <div
                key={index}
                className="min-w-[300px] snap-center border dark:border-gray-800 border-gray-300 relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-gray-900 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
                onClick={() => handleCardClick(item)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={256} // Adjust height accordingly
                  className="w-full h-64 object-cover transition-transform duration-500 transform hover:scale-110"
                />
                <div className="relative p-6 text-gray-900 dark:text-gray-100">
                  <h3 className="text-3xl font-semibold">{item.title}</h3>
                  <p className="mt-3">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-1/2 transform -translate-y-1/2 left-5">
            <button className="text-2xl text-white bg-gray-700 dark:bg-gray-300 dark:text-gray-900 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center opacity-75 hover:opacity-100" onClick={scrollLeft}>
              &#8249;
            </button>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-5">
            <button className="text-2xl text-white bg-gray-700 dark:bg-gray-300 dark:text-gray-900 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center opacity-75 hover:opacity-100" onClick={scrollRight}>
              &#8250;
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 max-w-lg mx-auto p-8 rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-2xl"
            >
              &times;
            </button>
            <Image src={modalContent.image} alt={modalContent.title} width={600} height={400} className="w-full h-64 object-cover rounded-lg" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">{modalContent.title}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{modalContent.moreInfo}</p>
            <Link
              href={modalContent.learnMore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Learn More
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyItMatters;
