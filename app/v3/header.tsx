'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../components/location-provider';
import Link from 'next/link';

export default function Header() {
  const { location } = useContext(LocationContext) || {};
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/0yMGg5VDltI?autoplay=1&mute=1");

  useEffect(() => {
    console.log('Location state:', location?.state);
    if (location?.state) {
      switch (location.state) {
        case 'Arizona':
          setVideoUrl('https://www.youtube.com/embed/4WuLQ2hnpw8?autoplay=1&mute=1');
          break;
        case 'Nevada':
          setVideoUrl('https://www.youtube.com/embed/UjQEGYaDkSE?autoplay=1&mute=1');
          break;
        case 'Georgia':
          setVideoUrl('https://www.youtube.com/embed/h5dc6yAA84c?autoplay=1&mute=1');
          break;
        case 'Michigan':
          setVideoUrl('https://www.youtube.com/embed/oZhxV5JVRT4?autoplay=1&mute=1');
          break;
        case 'Wisconsin':
          setVideoUrl('https://www.youtube.com/embed/2UkXtCR1eEQ?autoplay=1&mute=1');
          break;
        case 'Pennsylvania':
          setVideoUrl('https://www.youtube.com/embed/N73liuUE-l4?autoplay=1&mute=1');
          break;
        case 'North Carolina':
          setVideoUrl('https://www.youtube.com/embed/uMlhkLbOnmA?autoplay=1&mute=1');
          break;
        case 'Florida':
          setVideoUrl('https://www.youtube.com/embed/ozqGvyTWeAg?autoplay=1&mute=1');
          break;
        case 'Nebraska':
          setVideoUrl('https://www.youtube.com/embed/Vox2kq3ammk?autoplay=1&mute=1');
          break;
        case 'Oregon':
          setVideoUrl('https://www.youtube.com/embed/3-4SR8vC1kA?autoplay=1&mute=1');
          break;
        case 'New Mexico':
          setVideoUrl('https://www.youtube.com/embed/TZV__hUOkJQ?autoplay=1&mute=1');
          break;
        case 'Colorado':
          setVideoUrl('https://www.youtube.com/embed/7P4fVa2_8cg?autoplay=1&mute=1');
          break;
        case 'California':
          setVideoUrl('https://www.youtube.com/embed/u_b0o-1_r9Q?autoplay=1&mute=1');
          break;
        default:
          setVideoUrl('https://www.youtube.com/embed/0yMGg5VDltI?autoplay=1&mute=1');
          break;
      }
    }
  }, [location?.state]);

  return (
    <div className="w-full" id="home">
      <div className="grid grid-cols-1 md:grid-cols-3 premise">
        <div className="title col-span-2 text-center p-4 md:p-10 text-lg md:text-3xl leading-tight md:leading-normal">
          Climate change is hurting us all - now
        </div>

        <div className="care-about p-4 md:p-6 text-lg md:text-2xl">
          Do you care about:
          <ul className="care-about-list list-disc list-inside space-y-3 text-base md:text-xl leading-relaxed mt-4">
            <li>More and larger hurricanes?</li>
            <li>Increasing insurance rates?</li>
            <li>More and deeper floods?</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <iframe
          className="col-span-2 w-full aspect-video"
          src={videoUrl} 
          allow="autoplay; encrypted-media"
          allowFullScreen
        >
          Your browser does not support the video tag.
        </iframe>

        <div className="flex flex-col h-full justify-center items-center">
          <div className="exposition-warning p-6 text-xl md:text-2xl bg-yellow-400 text-white h-full w-full text-center">
            It&apos;s bad and it&apos;s getting worse, and we need to fight it - now
          </div>
          <div className="exposition-link p-6 text-xl md:text-2xl bg-green-400 text-white h-full w-full text-center">
            <Link href='/v3/what' className="underline">What can I do?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
