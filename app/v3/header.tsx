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
      setLoading(true); // Start loading indicator
  
      try {
        if (!location?.state) return; // Exit early if state is not available
  
        // Fetch data from the API
        const response = await fetch(`/api/header`);
        const mainData = await response.json();
  
        // Map state key for filtering
        const stateKey = stateAbbreviations[location.state as keyof typeof stateAbbreviations];
  
        // Filter based on state and county
        const data = mainData.filter((item: HeaderData) => {
          const matchesState = stateKey === item.state || item.state === 'ALL';
          const matchesCounty = location.county ? location.county === item.county || item.county === '' : true;
          return matchesState && matchesCounty;
        });
  
        // Prioritize county data if available, otherwise use state data
        let filteredData = [];
        if (location.county) {
          const countyData = data.filter((item: HeaderData) => item.county !== '');
          filteredData = countyData.length > 0 ? countyData : data;
        } else {
          filteredData = data.filter((item: HeaderData) => item.state !== 'ALL');
        }
  
        if (filteredData.length > 0) {
          const selectedData = filteredData[0]; // Select the highest priority data
          setWarningText(selectedData.warning || warningText);
          setQuestions([selectedData.problem1, selectedData.problem2, selectedData.problem3, selectedData.problem4].filter(Boolean)); // Only include non-empty problems
  
          // Set video URL if available
          if (selectedData.link) {
            const videoUrl = `https://www.youtube.com/embed/${selectedData.link}?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=${selectedData.link}`;
            setVideoUrl(videoUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // End loading indicator
      }
    };
  
    fetchData();
  }, [location?.state, location?.county]); // Re-run only if state or county changes
  
  return (
    <div className="w-full" id="home">
      {loading ? ( // Show loading message while data is being fetched
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-9 premise row-span-5">
            {/* Title Section - Centered (1) */}
            <div className="title col-span-5 p-2 md:p-2 text-lg md:text-3xl leading-tight md:leading-normal text-center flex justify-center items-center">
              <div>
                Climate change is hurting us all - <span className="italic text-green-500 inline-block">now</span>
              </div>
            </div>

            {/* Care About Section - Left-aligned (2) */}
            <div className="care-about col-span-4 row-span-4 flex flex-col items-start p-2 md:p-4 text-lg md:text-2xl">
              <div className="text-left">Do you care about:</div>
              <ul className="care-about-list list-disc mt-2 text-base md:text-xl leading-relaxed md:leading-tight pl-8">
                {questions.map((question: string, index: number) => (
                  <li key={index} className="pb-1 md:pb-1">
                    {question}
                  </li>
                ))}
              </ul>
            </div>

            {/* Video Section (3) */}
            <div className="col-span-5 w-full aspect-video h-full bg-black row-span-5 flex justify-center">
              <iframe
                className="w-full aspect-video"
                src={videoUrl}
                allow="autoplay; encrypted-media"
                allowFullScreen
              >
                Your browser does not support the video tag.
              </iframe>
            </div>

            {/* Exposition Section (4) */}
            <div className="flex flex-col col-span-4 row-span-2 h-full justify-center items-center">
              <div className="exposition-warning p-6 text-xl md:text-3xl lg:text-4xl bg-yellow-400 text-gray-900 h-full w-full text-center flex flex-col items-center justify-center">
                {warningText}
                <Link
                  type="button"
                  href="#what"
                  className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xl px-6 py-3 text-center me-2 mb-2 mt-10" // Changed text-lg to text-xl and adjusted padding
                >
                  What can I do? &rarr;
                </Link>
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
}
