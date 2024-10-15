'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../components/location-provider';
import Link from 'next/link';
import { faDove, faDollarSign, faSolarPanel } from '@fortawesome/free-solid-svg-icons'; // Importing Font Awesome icons
import { stateAbbreviations } from '../us-datas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons'; // Importing Font Awesome icons

export default function Header() {
  const { location } = useContext(LocationContext) || {};
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/0yMGg5VDltI?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=0yMGg5VDltI");
  const [warningText, setWarningText] = useState("It's getting hotter out there—and no, it's not just the summer. Time to face climate change head-on before we're all roasted.");
  const [questions, setQuestions] = useState<string[]>([
    'Rising temperatures',
    'Extreme weather events affecting communities',
    'The potential increase in insurance premiums due to climate-related risks',
  ]);
  const [actions, setActions] = useState<{
    free: string[];
    low: string[];
    high: string[];
  }>({
    free: [
      "Burn fewer things: fewer fires, drive less, etc.",
      "Vote for people who care",
      "Share this site with others"
    ],
    low: [
      "Insulate your doors & windows better"
    ],
    high: [
      "Make next car electric or hybrid",
      "Replace gas water heater with electric"
    ]
});

  const [loading, setLoading] = useState(true); // Loading state

  interface HeaderData {
    state: string;
    county: string;
    link: string;
    warning: string;
    problem1: string;
    problem2?: string;
    problem3?: string;
    problem4?: string;
    action1free?: string;
    action2free?: string;
    action3free?: string;
    action1low?: string;
    action2low?: string;
    action3low?: string;
    action1high?: string;
    action2high?: string;
    action3high?: string;
  }  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      try {
        if (!location?.state) return;
  
        const response = await fetch(`/api/header`);
        const mainData = await response.json();
  
        const stateKey = stateAbbreviations[location.state as keyof typeof stateAbbreviations];
  
        const data = mainData.filter((item: HeaderData) => {
          const matchesState = stateKey === item.state || item.state === 'ALL';
          const matchesCounty = location.county ? location.county === item.county || item.county === '' : true;
          return matchesState && matchesCounty;
        });
  
        let filteredData = [];
        if (location.county) {
          const countyData = data.filter((item: HeaderData) => 
            item.county !== '' && item.state !== 'ALL'
          );
          filteredData = countyData.length > 0 ? countyData : data.filter((item: HeaderData) => item.state !== 'ALL');
        } else {
          filteredData = data.filter((item: HeaderData) => item.state !== 'ALL');
        }

        if (filteredData.length > 0) {
          const selectedData = filteredData[0];
          setWarningText(selectedData.warning || warningText);
          setQuestions([selectedData.problem1, selectedData.problem2, selectedData.problem3, selectedData.problem4].filter(Boolean));
  
          // Set actions
          setActions({
            free: [selectedData.action1free, selectedData.action2free, selectedData.action3free].filter(Boolean),
            low: [selectedData.action1low, selectedData.action2low, selectedData.action3low].filter(Boolean),
            high: [selectedData.action1high, selectedData.action2high, selectedData.action3high].filter(Boolean)
          });
  
          if (selectedData.link) {
            const videoUrl = `https://www.youtube.com/embed/${selectedData.link}?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=${selectedData.link}`;
            setVideoUrl(videoUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location?.state, location?.county]);

  return (
    <div className="w-full" id="home">
      {loading ? ( // Show loading message while data is being fetched
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
        </div>
      ) : (
        <>
          <section className="bg-gray-50 dark:bg-gray-900 lg:px-16">
            <div className="grid max-w-screen-2xl px-6 py-10 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
              <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight leading-none md:text-6xl xl:text-7xl text-4xl dark:text-white">
                    Climate change is hurting us <span className="font-bold inline-block">all</span> - {' '} 
                    <span className="inline-flex items-center italic text-green-500">
                      <span className="mr-1">now</span>
                      <FontAwesomeIcon icon={faLeaf} className="text-2xl text-green-600 mb-4" />
                    </span>
                </h1>
                <div className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-xl lg:text-2xl dark:text-gray-400">
                  <div className="py-4">
                    {warningText}
                  </div>
                  <div className="text-left">Do you care about:</div>
                  <ul className="care-about-list list-disc mt-2 text-base md:text-2xl leading-relaxed md:leading-tight pl-8">
                    {questions.map((question: string, index: number) => (
                      <li key={index} className="pb-1 md:pb-2">
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="#what" className="mb-5 border border-gray-400 rounded-full hover:bg-gray-100 inline-flex items-center justify-center px-6 py-4 mr-3 text-base font-medium text-center dark:text-white text-gray-900 dark:hover:bg-gray-700 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                  Take Action
                  <svg className="w-6 h-6 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
              <div className="lg:mt-0 lg:col-span-5 lg:flex">
                <iframe
                  className="w-full aspect-video rounded-md shadow-lg"
                  src={videoUrl}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                >
                  Your browser does not support the video tag.
                </iframe>
              </div>
            </div>
          </section>
          
          <div className="w-full max-w-7xl mx-auto pt-6 pb-12 lg:px-16" id='what'>
            <h2 className="text-5xl text-center dark:text-gray-200 font-bold pb-6 px-4 italic">
                What Can I Do?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 px-6">
              {/* Free actions */}
              {actions.free.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-yellow-100 opacity-30"></div>
                  <div className="relative z-10">
                    <FontAwesomeIcon icon={faDove} className="text-5xl text-green-500 mb-4" />
                    <h3 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      What can I do for free?
                    </h3>
                    {actions.free.map((action, index) => (
                      <p key={index} className="text-2xl text-gray-700 dark:text-gray-300 mt-2">
                        {action === "Vote for people who care" ? (
                          <Link href="/v4/who" className="text-blue-500 underline hover:text-blue-700 font-bold dark:text-blue-400 dark:hover:text-blue-500">{action}&rarr;</Link>
                        ) : (
                          action
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Low-cost actions */}
              {actions.low.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-purple-100 opacity-30"></div>
                  <div className="relative z-10">
                    <FontAwesomeIcon icon={faDollarSign} className="text-5xl text-yellow-500 mb-4" />
                    <h3 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      What if I can spend a little?
                    </h3>
                    {actions.low.map((action, index) => (
                      <p key={index} className="text-2xl text-gray-700 dark:text-gray-300 mt-2">
                        {action}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* High-cost actions */}
              {actions.high.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-purple-100 opacity-30"></div>
                  <div className="relative z-10">
                    <FontAwesomeIcon icon={faSolarPanel} className="text-5xl text-cyan-600 mb-4" />
                    <h3 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      What if I can spend more?
                    </h3>
                    {actions.high.map((action, index) => (
                      <p key={index} className="text-2xl text-gray-700 dark:text-gray-300 mt-2">
                        {action}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

        </div>
      </>
      )}
    </div>
  );
}
