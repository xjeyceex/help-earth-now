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
      'Severe drought conditions?',
      'Rising temperatures and heatwaves?',
      'Impact of wildfires on air quality?',
    ],
    'Nevada': [
      'Increasing desertification?',
      'Water shortages and their impact?',
      'More frequent heatwaves?',
    ],
    'Georgia': [
      'Stronger and more frequent hurricanes?',
      'Flooding in coastal areas?',
      'Rising insurance costs due to storms?',
    ],
    'Michigan': [
      'Rising lake levels causing flooding?',
      'More intense winter storms?',
      'Changes in agricultural viability?',
    ],
    'Wisconsin': [
      'Increased rainfall and flooding?',
      'Changes in winter weather patterns?',
      'Impact of climate on agriculture?',
    ],
    'Pennsylvania': [
      'Rising flood risks in urban areas?',
      'More severe storms impacting infrastructure?',
      'Changes in local ecosystems?',
    ],
    'North Carolina': [
      'Increasing hurricane threats?',
      'Flooding in coastal communities?',
      'Higher insurance costs due to climate impacts?',
    ],
    'Nebraska': [
      'Increasing drought periods affecting agriculture?',
      'More severe storms impacting crops?',
      'Higher insurance premiums for farmers?',
    ],
    'Oregon': [
      'Increasing wildfires threatening communities?',
      'Rising insurance costs due to natural disasters?',
      'Impact of climate on local wildlife?',
    ],
    'New Mexico': [
      'Increasing frequency of wildfires?',
      'Drought conditions impacting water supply?',
      'Effects of climate change on agriculture?',
    ],
    'Colorado': [
      'Rising risks of wildfires in mountain areas?',
      'Increased flooding from snowmelt?',
      'Higher costs of insurance for homeowners?',
    ],
    'California': [
      'Severe wildfires causing air quality issues?',
      'Rising sea levels impacting coastal cities?',
      'Higher insurance rates due to climate risk?',
    ],
  };
  
  useEffect(() => {
    if (location?.state) {
      switch (location.state) {
        case 'Arizona':
          setVideoUrl('https://www.youtube.com/embed/wxr-W5f0EzQ?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=wxr-W5f0EzQ');
          setWarningText('Phoenix breaks temperature record with 19th day of extreme heat. Insurance prices are also increasing each year.');
          break;
        case 'Nevada':
          setVideoUrl('https://www.youtube.com/embed/UjQEGYaDkSE?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=UjQEGYaDkSE');
          setWarningText('Temperatures are increasing regularly in Nevada. Insurance prices are on the rise.');
          break;
        case 'Georgia':
          setVideoUrl('https://www.youtube.com/embed/h5dc6yAA84c?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=h5dc6yAA84c');
          setWarningText('Hurricanes are getting stronger and more frequent in Georgia, leading to significant damage and rising insurance prices.');
          break;
        case 'Michigan':
          setVideoUrl('https://www.youtube.com/embed/oZhxV5JVRT4?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=oZhxV5JVRT4');
          setWarningText('Michigan auto insurance rates are rising every year, affecting residents statewide.');
          break;
        case 'Wisconsin':
          setVideoUrl('https://www.youtube.com/embed/2UkXtCR1eEQ?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=2UkXtCR1eEQ');
          setWarningText('Car insurance rates are expected to increase by 8.4% in Wisconsin due to various climate impacts.');
          break;
        case 'Pennsylvania':
          setVideoUrl('https://www.youtube.com/embed/N73liuUE-l4?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=N73liuUE-l4');
          setWarningText('Car insurance rates are soaring in Pennsylvania, coupled with flooding damaging homes and communities.');
          break;
        case 'North Carolina':
          setVideoUrl('https://www.youtube.com/embed/uMlhkLbOnmA?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=uMlhkLbOnmA');
          setWarningText('Hurricanes are causing more damage in North Carolina, resulting in rising insurance costs.');
          break;
        case 'Florida':
          setVideoUrl('https://www.youtube.com/embed/ozqGvyTWeAg?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=ozqGvyTWeAg');
          setWarningText('Storm surge from hurricanes in Florida is devastating communities, and insurance prices are on the rise.');
          break;
        case 'Nebraska':
          setVideoUrl('https://www.youtube.com/embed/Vox2kq3ammk?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=Vox2kq3ammk');
          setWarningText('Wildfires in Nebraska are burning large areas and destroying homes, causing insurance prices to increase.');
          break;
        case 'Oregon':
          setVideoUrl('https://www.youtube.com/embed/3-4SR8vC1kA?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=3-4SR8vC1kA');
          setWarningText('Wildfires in Oregon have devastated communities, leading to rising insurance costs.');
          break;
        case 'New Mexico':
          setVideoUrl('https://www.youtube.com/embed/TZV__hUOkJQ?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=TZV__hUOkJQ');
          setWarningText('Wildfires in New Mexico are spreading and destroying homes, with insurance prices increasing.');
          break;
        case 'Colorado':
          setVideoUrl('https://www.youtube.com/embed/7P4fVa2_8cg?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=7P4fVa2_8cg');
          setWarningText('Colorado wildfires are burning hundreds of homes, driving insurance prices up.');
          break;
        case 'California':
          setVideoUrl('https://www.youtube.com/embed/u_b0o-1_r9Q?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=u_b0o-1_r9Q');
          setWarningText('California wildfires have devastated communities and caused insurance prices to rise significantly.');
          break;
        default:
          setVideoUrl('https://www.youtube.com/embed/0yMGg5VDltI?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=0yMGg5VDltI');
          setWarningText("It's getting hotter out there—and no, it's not just the summer. Time to face climate change head-on before we're all roasted.");
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
        <iframe
          className="col-span-2 w-full aspect-video"
          src={videoUrl}
          allow="autoplay; encrypted-media"
          allowFullScreen
        >
          Your browser does not support the video tag.
        </iframe>

        <div className="flex flex-col h-full justify-center items-center">
          <div className="exposition-warning flex justify-center items-center p-6 text-xl md:text-3xl lg:text-4xl bg-yellow-400 text-white h-full w-full text-center">
            {warningText}
          </div>
          <div className="exposition-link flex justify-center items-center p-6 text-xl md:text-3xl lg:text-4xl bg-green-400 text-white h-full w-full text-center" id="what">
            <Link href="#what" className="underline">What can I do?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
