'use client'

import { LocationContext } from './location-provider';
import { useContext } from 'react';
import Link from 'next/link';

export default function Header() {
  const video_url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const location = useContext(LocationContext);
  
  return (
    <div>

      <div className="grid grid-cols-3 premise w-screen">
        <div className="care-about col-span-3 px-8 py-4 bg-white shadow-md flex justify-between items-center">
          <p className="text-lg font-medium text-gray-800">
            This is your Location: {location?.region || location?.city || location?.state || location?.country || 'United States'}
          </p>
          
          <div className="flex items-center space-x-2">
            <Link className="text-base text-black hover:underline" href="/login">
              Sign In
            </Link>

            {/* {user.loggedin && <Link className="text-sm text-black hover:underline" href="/login">
              Sign Out
              </Link>
              <span className="text-sm text-black">|</span>
              <Link className="text-sm text-black hover:underline" href="/admin">
                Admin Panel
              </Link>
            } */}
          </div>
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