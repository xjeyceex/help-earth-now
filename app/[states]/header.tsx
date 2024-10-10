'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../components/location-provider';
import Link from 'next/link';
import { useParams } from 'next/navigation'; 


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

  const stateData: { [key: string]: { video: string, warning: string, questions: string[] } } = {
    'fl': {
      video: 'ozqGvyTWeAg',
      warning: 'Storm surge from hurricanes in Florida is devastating communities, and insurance prices are on the rise.',
      questions: [
        'Hurricanes getting stronger, more frequent, and cause more damage due to rising sea levels?',
        'Insurance cancelled or prices rising?',
        'Sea level rising & beaches and houses at risk?',
        'Temperatures increasing regularly',
      ],
    },
    'az': {
      video: 'wxr-W5f0EzQ',
      warning: 'Phoenix breaks temperature record with 19th day of extreme heat. Insurance prices are also increasing each year.',
      questions: [
        'Temperatures are getting hotter?',
        'Insurance cancelled or prices rising?',
        'Droughts getting worse?'
      ],
    },
    'nv': {
      video: 'UjQEGYaDkSE',
      warning: 'Temperatures are increasing regularly in Nevada. Insurance prices are on the rise.',
      questions: [
        'Temperatures are getting hotter?',
        'Insurance prices going up?',
        'Droughts getting worse?'
      ],
    },
    'ga': {
      video: 'h5dc6yAA84c',
      warning: 'Hurricanes are getting stronger and more frequent in Georgia, leading to significant damage and rising insurance prices.',
      questions: [
        'Hurricanes getting stronger, more frequent, and cause more damage?',
        'Flooding destroying homes and communities?',
        'Insurance prices going up?',
      ],
    },
    'mi': {
      video: 'oZhxV5JVRT4',
      warning: 'Michigan auto insurance rates are rising every year, affecting residents statewide.',
      questions: [
        'Insurance prices increasing each year?',
        'Flooding destroying homes and communities?',
        'Temperatures are getting hotter?',
      ],
    },
    'wi': {
      video: '2UkXtCR1eEQ',
      warning: 'Car insurance rates are expected to increase by 8.4% in Wisconsin due to various climate impacts.',
      questions: [
        'Insurance prices increasing each year?',
        'Flooding destroying homes and communities?',
        'Temperatures are getting hotter?',
      ],
    },
    'pa': {
      video: 'N73liuUE-l4',
      warning: 'Car insurance rates are soaring in Pennsylvania, coupled with flooding damaging homes and communities.',
      questions: [
        'Insurance prices increasing each year?',
        'Flooding destroying homes and communities?',
        'Temperatures are getting hotter?',
        'Problems with Agriculture?'
      ],
    },
    'nc': {
      video: 'uMlhkLbOnmA',
      warning: 'Hurricanes are causing more damage in North Carolina, resulting in rising insurance costs.',
      questions: [
        'Hurricanes getting stronger, more frequent, and cause more damage?',
        'Flooding destroying homes and communities?',
        'Insurance prices going up?',
      ],
    },
    'ne': {
      video: '0yMGg5VDltI',
      warning: 'Wildfires burning large areas, and destroying homes in Nebraska. Temperatures and insurance prices are increasing.',
      questions: [
        'Wildfires burning large areas, and destroying homes?',
        'Insurance cancelled or prices rising?',
        'Temperatures increasing rapidly?',
      ],
    },
    'or': {
      video: '0yMGg5VDltI',
      warning: 'Oregon faces increasing wildfires, rising temperatures, and growing insurance premiums.',
      questions: [
        'Wildfires burning large areas, and destroying homes?',
        'Insurance cancelled or prices rising?',
        'Temperatures increasing rapidly?',
      ],
    },
    'nm': {
      video: '0yMGg5VDltI',
      warning: 'New Mexico is experiencing regular temperature increases, wildfires, and rising insurance rates.',
      questions: [
        'Wildfires burning large areas, and destroying homes?',
        'Temperatures increasing regularly?',
        'Insurance cancelled or prices rising?',
      ],
    },
    'co': {
      video: '0yMGg5VDltI',
      warning: 'Colorado is seeing stronger winds, wildfires, and rising insurance rates as extreme weather increases.',
      questions: [
        'Wildfires burning large areas, and destroying homes?',
        'Insurance cancelled or prices rising?',
        'Strong winds increasing, with more tornadoes?',
      ],
    },
    'ca': {
      video: '0yMGg5VDltI',
      warning: 'Wildfires and droughts in California are increasing, leading to rising temperatures and insurance premiums.',
      questions: [
        'Wildfires burning large areas, and destroying homes?',
        'Insurance cancelled or prices rising?',
        'Temperatures increasing rapidly?',
        'Droughts increasing, with less water for longer periods?',
      ],
    },
  };
  
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
            <Link href="#what-test" className="underline">What can I do?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
