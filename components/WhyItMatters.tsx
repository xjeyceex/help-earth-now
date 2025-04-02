'use client';
import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
    // {
    //   image: '/article1.webp',
    //   title: 'Water Cycle in Crisis: Climate Change Threatens Global Food Security',
    //   description: 'Humanity has thrown the global water cycle off balance “for the first time in human history,” fueling a growing water disaster that will wreak havoc on economies, food production and lives, according to a landmark new report.',
    //   moreInfo: "Decades of destructive land use and water mismanagement have collided with the human-caused climate crisis to put “unprecedented stress” on the global water cycle, said the report published Wednesday by the Global Commission on the Economics of Water, a group of international leaders and experts.The water cycle refers to the complex system by which water moves around the Earth. Water evaporates from the ground — including from lakes, rivers and plants — and rises into the atmosphere, forming large rivers of water vapor able to travel long distances, before cooling, condensing and eventually falling back to the ground as rain or snow. Disruptions to the water cycle are already causing suffering. Nearly 3 billion people face water scarcity. Crops are shriveling and cities are sinking as the groundwater beneath them dries out. The consequences will be even more catastrophic without urgent action. The water crisis threatens more than 50% of global food production and risks shaving an average of 8% off countries' GDPs by 2050, with much higher losses of up to 15% projected in low-income countries, the report found. 'For the first time in human history, we are pushing the global water cycle out of balance,” said Johan Rockström, co-chair of the Global Commission on the Economics of Water and a report author. “Precipitation, the source of all freshwater, can no longer be relied upon'",
    //   learnMore: 'https://edition.cnn.com/2024/10/16/climate/global-water-cycle-off-balance-food-production?cid=ios_app',
    // },
    {
      image: '/wildfire.jpg',
      title: 'Wildfires',
      description: 'Increasing temperatures have led to more frequent and intense wildfires, devastating forests and wildlife, and endangering human lives.',
      moreInfo: 'Wildfires are exacerbated by climate change, leading to more severe damage to ecosystems and releasing significant amounts of CO2 into the atmosphere, worsening global warming. These fires threaten air quality, contribute to respiratory diseases, and force communities to evacuate, resulting in economic losses and long-term psychological impacts on affected populations.',
      learnMore: 'https://www.who.int/health-topics/wildfires',
    },
    {
      image: '/sea-level.jpg',
      title: 'Rising Sea Levels',
      description: 'Coastal cities around the world are threatened by rising sea levels, displacing communities and disrupting ecosystems.',
      moreInfo: 'Rising sea levels result from melting ice caps and glaciers and thermal expansion of seawater, leading to the loss of homes, arable land, and critical infrastructure. Increased flooding and erosion threaten freshwater supplies and create significant economic challenges, particularly for coastal communities dependent on tourism and fishing.',
      learnMore: 'https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level',
    },
    {
      image: '/drought.jpg',
      title: 'Droughts',
      description: 'Prolonged droughts are becoming more common, threatening food and water supplies for millions of people, causing economic and social instability.',
      moreInfo: 'Droughts have far-reaching consequences on agriculture, drinking water supplies, and food security, leading to famine and displacement in vulnerable regions. The agricultural sector suffers significantly, with crop failures and livestock losses, which can escalate food prices and increase competition for resources, leading to social unrest.',
      learnMore: 'https://www.drought.gov/current-conditions',
    },
    {
      image: '/storms.jpg',
      title: 'Severe Storms',
      description: 'Climate change is fueling more intense hurricanes, typhoons, and cyclones, causing widespread damage to communities and infrastructure.',
      moreInfo: 'Warmer ocean temperatures and changing weather patterns are contributing to more powerful and destructive storms, displacing millions and costing billions in damages. The increase in storm frequency and intensity leads to higher insurance premiums, infrastructure repair costs, and long-term displacement for communities, significantly affecting local economies and recovery efforts.',
      learnMore: 'https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level',
    },
    {
      image: '/heatwave.jpg',
      title: 'Heatwaves',
      description: 'Intense heatwaves are becoming more intense and prolonged, endangering public health, agriculture, and energy supplies.',
      moreInfo: 'Extreme heat events cause heat-related illnesses and deaths, strain power grids, and reduce crop yields, exacerbating food insecurity. Vulnerable populations, including the elderly and those with pre-existing health conditions, are at greater risk. The agricultural sector also faces challenges as heat stress on crops reduces yields and quality, impacting food supply and prices.',
      learnMore: 'https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health',
    },
    {
      image: '/melting.jpg',
      title: 'Melting Ice Caps',
      description: 'The polar ice caps are melting at an alarming rate, contributing to sea level rise and threatening polar ecosystems.',
      moreInfo: "The loss of Arctic and Antarctic ice disrupts global weather patterns, accelerates sea level rise, and puts species like polar bears and penguins at risk of extinction. The melting ice also impacts Indigenous communities that rely on these ecosystems for their livelihoods, as well as global climate patterns by reducing the Earth's albedo effect, which helps regulate temperatures.",
      learnMore: 'https://www.nationalgeographic.com/environment/article/antarctic-ice-melt',
    },
    {
      image: '/biodiversity.jpg',
      title: 'Biodiversity Loss',
      description: 'Many species are being driven to extinction due to habitat loss, extreme weather, and changing ecosystems.',
      moreInfo: 'Climate change disrupts ecosystems, leading to loss of biodiversity which in turn affects food chains, human livelihoods, and the natural environment. As species struggle to adapt or migrate to suitable habitats, ecosystems become imbalanced, affecting ecosystem services such as pollination, clean water, and climate regulation, which are vital for human survival.',
      learnMore: 'https://www.iucn.org/resources/issues-briefs/biodiversity-and-climate-change',
    },
  ];  

  const duplicatedItems = [...items, ...items, ...items]; // Duplicate items to make scroll smooth in both directions
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null); // Reference for modal content

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
        const halfWidth = scrollWidth / 3;

        // Reset scroll when near the left or right boundaries
        if (scrollLeft <= 0) {
          container.scrollLeft = halfWidth;
        } else if (scrollLeft >= scrollWidth - clientWidth) {
          container.scrollLeft = halfWidth;
        }
      }
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initialize scroll to the center
      container.scrollLeft = container.scrollWidth / 3;
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-8 px-4 w-full relative lg:px-20">
      <div className="max-w-screen-2xl mx-auto text-center">
        <p className="text-2xl text-gray-700 dark:text-gray-300">
          Climate change is affecting every corner of the planet, from extreme weather events to rising sea levels. By taking action now, we can slow down these effects and protect our future.
        </p>

        <div className="mt-6 relative overflow-hidden">
          <div ref={cardContainerRef} className="flex space-x-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide p-4">
            {duplicatedItems.map((item, index) => (
              <div
                key={index}
                className="min-w-[300px] snap-center border dark:border-gray-800 border-gray-300 relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-gray-900 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
                onClick={() => handleCardClick(item)}
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
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-5">
            <button 
              className="text-white bg-blue-500 dark:text-white hover:bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center" 
              onClick={scrollLeft}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-1xl" />
            </button>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-5">
            <button 
              className="text-white bg-blue-500 dark:text-white hover:bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center" 
              onClick={scrollRight}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-1xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal content */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-6">
          <div ref={modalRef} className="bg-white dark:bg-gray-800 max-w-lg mx-auto p-8 rounded-lg shadow-lg relative text-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-2xl"
            >
              &times;
            </button>
            <Image src={modalContent.image} alt={modalContent.title} width={600} height={400} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">{modalContent.title}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{modalContent.moreInfo}</p>
            <Link
              href={modalContent.learnMore}
              target="_blank"
              className="inline-block mt-4 px-6 py-3 text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 rounded-lg"
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
