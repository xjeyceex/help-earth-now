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
        <>
          <div className="grid grid-cols-1 lg:grid-cols-9 premise">
            {/* Title Section - Centered */}
            <div className="title col-span-5 p-2 md:p-2 text-lg md:text-3xl leading-tight md:leading-normal text-center flex justify-center items-center">
              <div>
                Climate change is hurting us <span className="font-bold text-red-500 inline-block">all</span> - <span className="italic text-green-500 inline-block">now</span>
              </div>
            </div>
            {/* Care About Section - Left-aligned */}
            <div className="care-about col-span-4 flex flex-col items-start p-2 md:p-4 text-lg md:text-2xl">
              <div className="text-left">Do you care about:</div>
              <ul className="care-about-list list-disc mt-2 text-base md:text-xl leading-relaxed md:leading-tight pl-8">
                {questions.map((question: string, index: number) => (
                  <li key={index} className="pb-1 md:pb-1">
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-9">
            {/* Video Section */}
            <iframe
              className="col-span-5 w-full aspect-video"
              src={videoUrl}
              allow="autoplay; encrypted-media"
              allowFullScreen
            >
              Your browser does not support the video tag.
            </iframe>

            {/* Exposition Section */}
            <div className="flex flex-col col-span-4 h-full justify-center items-center">
              <div className="exposition-warning p-6 text-xl md:text-3xl lg:text-4xl bg-yellow-400 text-gray-900 h-full w-full text-center flex flex-col items-center justify-center">
                {warningText}
              </div>
              <div className="exposition-link p-6 lg:flex hidden text-xl md:text-3xl lg:text-4xl bg-green-400 text-white h-full w-full text-center flex-col items-center justify-start">
                <Link href="#what" className="text-blue-500 underline hover:text-blue-700 font-bold">What can I do? &rarr;</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
