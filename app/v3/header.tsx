'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../components/location-provider';
import Link from 'next/link';

export default function Header() {
  const { location } = useContext(LocationContext) || {};
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/0yMGg5VDltI?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=0yMGg5VDltI");
  const [warningText, setWarningText] = useState("It's getting hotter out there—and no, it's not just the summer. Time to face climate change head-on before we're all roasted.");

  const stateQuestions: { [key: string]: string[] } = {
    'Florida': [
      'More and larger hurricanes?', 
      'Increasing insurance rates?',
      'More and deeper floods?',
    ],
    'Arizona': [
      'Temperatures increasing regularly?',
      'Insurance prices increasing each year?',
    ],
    'Nevada': [
      'Temperatures increasing regularly?',
      'Insurance prices increasing each year?',
    ],
    'Georgia': [
      'Hurricanes are getting stronger, more frequent, and cause more damage due to rising sea levels?',
      'Flooding destroying homes and communities?',
      'Insurance prices increasing each year?',
    ],
    'Michigan': [
      'Insurance prices increasing each year?',
    ],
    'Wisconsin': [
      'Insurance prices increasing each year?',
    ],
    'Pennsylvania': [
      'Insurance prices increasing each year?',
      'Flooding destroying homes and communities?',
    ],
    'North Carolina': [
      'Hurricanes are getting stronger, more frequent, and cause more damage due to rising sea levels?',
      'Flooding destroying homes and communities?',
      'Insurance prices increasing each year?',
    ],
    'Nebraska': [
      'Wildfires burning large areas, and destroying homes?',
      'Insurance prices increasing each year?',
      'Temperatures increasing regularly?',
    ],
    'Oregon': [
      'Wildfires burning large areas, and destroying homes?',
      'Insurance prices increasing each year?',
      'Temperatures increasing regularly?',
    ],
    'New Mexico': [
      'Wildfires burning large areas, and destroying homes?',
      'Temperatures increasing regularly?',
      'Insurance prices increasing each year?',
    ],
    'Colorado': [
      'Wildfires burning large areas, and destroying homes?',
      'Insurance prices increasing each year?',
      'Strong winds increasing, with more tornadoes?',
    ],
    'California': [
      'Wildfires burning large areas, and destroying homes?',
      'Insurance prices increasing each year?',
      'Temperatures increasing regularly?',
      'Droughts increasing, with less water for longer periods?',
    ],
  };
  
  useEffect(() => {
    const isMobile = window.innerWidth <= 768; 

    if (location?.state) {
      let baseVideoUrl = 'https://www.youtube.com/embed/';
      switch (location?.state) {
        case 'Arizona':
          baseVideoUrl += 'wxr-W5f0EzQ?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=wxr-W5f0EzQ';
          setWarningText('Phoenix breaks temperature record with 19th day of extreme heat. Insurance prices are also increasing each year.');
          break;
        case 'Nevada':
          baseVideoUrl += 'UjQEGYaDkSE?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=UjQEGYaDkSE';
          setWarningText('Temperatures are increasing regularly in Nevada. Insurance prices are on the rise.');
          break;
        case 'Georgia':
          baseVideoUrl += 'h5dc6yAA84c?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=h5dc6yAA84c';
          setWarningText('Hurricanes are getting stronger and more frequent in Georgia, leading to significant damage and rising insurance prices.');
          break;
        case 'Michigan':
          baseVideoUrl += 'oZhxV5JVRT4?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=oZhxV5JVRT4';
          setWarningText('Michigan auto insurance rates are rising every year, affecting residents statewide.');
          break;
        case 'Wisconsin':
          baseVideoUrl += '2UkXtCR1eEQ?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=2UkXtCR1eEQ';
          setWarningText('Car insurance rates are expected to increase by 8.4% in Wisconsin due to various climate impacts.');
          break;
        case 'Pennsylvania':
          baseVideoUrl += 'N73liuUE-l4?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=N73liuUE-l4';
          setWarningText('Car insurance rates are soaring in Pennsylvania, coupled with flooding damaging homes and communities.');
          break;
        case 'North Carolina':
          baseVideoUrl += 'uMlhkLbOnmA?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=uMlhkLbOnmA';
          setWarningText('Hurricanes are causing more damage in North Carolina, resulting in rising insurance costs.');
          break;
        case 'Florida':
          baseVideoUrl += 'ozqGvyTWeAg?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=ozqGvyTWeAg';
          setWarningText('Storm surge from hurricanes in Florida is devastating communities, and insurance prices are on the rise.');
          break;
        default:
          baseVideoUrl += '0yMGg5VDltI?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=0yMGg5VDltI';
          setWarningText("It's getting hotter out there—and no, it's not just the summer. Time to face climate change head-on before we're all roasted.");
          break;
      }

      if (isMobile) {
        baseVideoUrl += '&vq=small';
      }

      setVideoUrl(baseVideoUrl);
    }
  }, [location?.state]);
  
  return (
    <div className="w-full" id="home">
      <div className="grid grid-cols-1 md:grid-cols-3 premise">
        {/* Title Section - Centered */}
        <div className="title col-span-2 p-4 md:p-10 text-lg md:text-3xl leading-tight md:leading-normal flex justify-center items-center">
          Climate change is hurting us all - now
        </div>

        {/* Care About Section - Left-aligned */}
        <div className="care-about col-span-1 flex flex-col items-start p-4 md:p-6 text-lg md:text-2xl">
          <div className="text-left">
            Do you care about:
          </div>
          <ul className="care-about-list list-disc list-inside pl-5 space-y-3 text-base md:text-xl leading-relaxed mt-4">
            {!location?.state || !stateQuestions[location.state] ? (
              <>
                <li>Rising temperatures?</li>
                <li>Extreme weather events affecting communities?</li>
                <li>The potential increase in insurance premiums due to climate-related risks?</li>
              </>
            ) : (
              location.state && stateQuestions[location.state]?.map((question: string, index: number) => (
                <li key={index}>{question}</li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Video Section */}
        <iframe
          className="col-span-2 w-full aspect-video"
          src={videoUrl}
          allow="autoplay; encrypted-media"
          allowFullScreen
        >
          Your browser does not support the video tag.
        </iframe>

        {/* Exposition Section */}
        <div className="flex flex-col h-full justify-center items-center">
          <div className="exposition-warning p-6 text-xl md:text-3xl lg:text-4xl bg-yellow-400 text-white h-full w-full text-center flex flex-col items-center justify-center">
            {warningText}{' '}
            {/* <div>
              <Link href="/resources" className="underline text-blue-500 hover:text-blue-700 text-2xl">Read More.</Link>
            </div> */}
          </div>
          <div className="exposition-link p-6 md:flex hidden text-xl md:text-3xl lg:text-4xl bg-green-400 text-white h-full w-full text-center flex-col items-center justify-center" id="what">
            <Link href="#what" className="underline">What can I do?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
