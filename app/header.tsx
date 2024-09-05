'use client'

import { LocationContext } from './location-provider';
import { useContext } from 'react';

export default function Header() {
  const video_url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const location = useContext(LocationContext);
  return (
    <div>

      <div className="grid grid-cols-3 premise">
        <div className="care-about col-span-3 text-center p-2">
        This is your Location: {location?.region || location?.city || location?.state || location?.country || 'United States'}      
        </div>
        <div className="title col-span-2 text-center p-12">
          Climate change is hurting us all - now
        </div>
        <div className="care-about p-3">
          Do you care about:
          <ul className="care-about-list list-disc list-inside">
            <li>More and larger hurricanes?</li>
            <li>Increasing insurance rates?</li>
            <li>More and deeper floods?</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-3 exposition">
        <iframe className="col-span-2 row-span-2 exposition-video" src={video_url} ></iframe>
        <div className="row-span-2">
          <div className="exposition-warning p-12">
            It's bad and it's getting worse
          </div>
          <div className="exposition-link p-12">
            What can I do?
          </div>
        </div>
      </div>

    </div>
  );
}