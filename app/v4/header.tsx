'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../components/location-provider';
import Link from 'next/link';
import { stateAbbreviations } from '../us-datas';

export default function Header() {
  const { location } = useContext(LocationContext) || {};
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/0yMGg5VDltI?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=0yMGg5VDltI");
  const [warningText, setWarningText] = useState("It's getting hotter out there—and no, it's not just the summer. Time to face climate change head-on before we're all roasted.");
  const [questions, setQuestions] = useState<string[]>([
    'Rising temperatures?',
    'Extreme weather events affecting communities?',
    'The potential increase in insurance premiums due to climate-related risks?',
  ]);
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
  }  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the start
      try {
        if (location?.state) {
          // Assuming API returns data based on state in JSON format
          const response = await fetch(`/api/header`);
          const mainData = await response.json();
  
          // Filter data based on the state or 'ALL'
          const data = mainData.filter((item: HeaderData) => {
            const stateKey = stateAbbreviations[location.state as keyof typeof stateAbbreviations];
  
            return stateKey === item.state || item.state === 'ALL';
          });
    
          // Remove 'ALL' if there's more than one entry in data
          const filteredData = data.length > 1 
            ? data.filter((item: HeaderData) => item.state !== 'ALL') // Remove 'ALL' if there are multiple entries
            : data; // Keep the original data if there's only one entry
  
          if (filteredData.length > 0) {
            const selectedData = filteredData[0]; // Get the first matching data
            setWarningText(selectedData.warning || warningText);
            setQuestions([
              selectedData.problem1,
              selectedData.problem2,
              selectedData.problem3,
              selectedData.problem4,
            ].filter(Boolean)); // Filter out empty problems
  
            if (selectedData.link) {
              const baseVideoUrl = `https://www.youtube.com/embed/${selectedData.link}?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=${selectedData.link}`;
              setVideoUrl(baseVideoUrl);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
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
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="grid max-w-screen-2xl px-6 py-10 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-7xl dark:text-white">
                Climate change is hurting us <span className="font-bold inline-block">all</span> - <span className="italic text-red-500 inline-block">now</span>
              </h1>
              <div className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-xl lg:text-2xl dark:text-gray-400">
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
              <Link href="#what" className="mb-5 border border-gray-300 rounded-lg hover:bg-gray-100 inline-flex items-center justify-center px-6 py-4 mr-3 text-base font-medium text-center dark:text-white text-gray-900 dark:hover:bg-gray-700 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                What can I do?
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
      )}
    </div>
  );
}
