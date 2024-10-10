'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../components/location-provider';
import Link from 'next/link';
import { useParams } from 'next/navigation'; 
import { stateData } from '../us-datas';

export default function Header() {
  const params = useParams();
  const state = params.states as string;  
  const { location } = useContext(LocationContext) || {};

  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/0yMGg5VDltI?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=0yMGg5VDltI");
  const [warningText, setWarningText] = useState("It's getting hotter out there—and no, it's not just the summer. Time to face climate change head-on before we're all roasted.");
  const [questions, setquestions] = useState<string[]>([
    'Rising temperatures?',
    'Extreme weather events affecting communities?',
    'The potential increase in insurance premiums due to climate-related risks?',
  ]);
  
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (state && stateData[state]) {
      const { video, warning, questions } = stateData[state];
      let videoUrl = `https://www.youtube.com/embed/${video}?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=${video}`;
      if (isMobile) {
        videoUrl += '&vq=small';
      }
      
      setVideoUrl(videoUrl);
      setWarningText(warning);
      setquestions(questions);
    } else {
      setVideoUrl("https://www.youtube.com/embed/0yMGg5VDltI?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=0yMGg5VDltI");
      setWarningText("It's getting hotter out there—and no, it's not just the summer. Time to face climate change head-on before we're all roasted.");
      setquestions([
        'Rising temperatures?',
        'Extreme weather events affecting communities?',
        'The potential increase in insurance premiums due to climate-related risks?',
      ]);
    }
  }, [state]);
  
  return (
    <div className="w-full" id="home">
      <div className="grid grid-cols-1 lg:grid-cols-8 premise">
        {/* Title Section - Centered */}
        <div className="title col-span-5 p-4 md:p-10 text-lg md:text-3xl leading-tight md:leading-normal flex justify-center items-center text-center">
          Climate change is hurting us all - now
        </div>

        {/* Care About Section - Left-aligned */}
        <div className="care-about col-span-3 flex flex-col items-start p-4 md:p-6 text-lg md:text-2xl">
          <div className="text-left">Do you care about:</div>
          <ul className="care-about-list list-disc list-inside md:space-y-3 md:mt-4 mt-2 text-base md:text-xl leading-relaxed ">
            {questions.map((question: string, index: number) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-8">
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
        <div className="flex flex-col col-span-3 h-full justify-center items-center">
          <div className="exposition-warning p-6 text-xl md:text-3xl lg:text-4xl bg-yellow-400 text-white h-full w-full text-center flex flex-col items-center justify-center">
            {warningText}
          </div>
          <div className="exposition-link p-6 lg:flex hidden text-xl md:text-3xl lg:text-4xl bg-green-400 text-white h-full w-full text-center flex-col items-center justify-center">
            <Link href="#what" className="text-blue-500 underline hover:text-blue-700">What can I do? &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
