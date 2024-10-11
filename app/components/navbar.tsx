'use client';
import { useSession } from 'next-auth/react';
import { LocationContext } from './location-provider';
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { states } from '../us-datas';

interface County {
  name: string;
  countyCode: number;
}

export default function Navbar() {
  const context = useContext(LocationContext);
  const { location, setManualLocation } = context || {};
  const { data: session, status } = useSession();

  const [selectedState, setSelectedState] = useState(location?.state || '');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counties, setCounties] = useState<County[]>([]);
  const [selectedCounty, setSelectedCounty] = useState('');

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedCounty('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCounty(e.target.value);
  };

  const handleUpdateLocation = async () => {
    if (setManualLocation) {
      const newLocation = {
        latitude: 0,
        longitude: 0,
        region: undefined,
        city: undefined,
        state: selectedState || undefined,
        country: 'United States',
        countryCode: 'US',
        county: selectedCounty || undefined,
      };
      setManualLocation(newLocation);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchCountyByState = async () => {
      if (!selectedState) {
        console.warn('Please select a state');
        return;
      }
      try {
        const res = await fetch(`/api/getCounties?state=${selectedState}`);
        if (!res.ok) {
          throw new Error('Failed to fetch counties');
        }
        const data = await res.json();
        setCounties(data.counties || []);
      } catch (error) {
        console.error('Error fetching counties:', error);
      }
    };

    fetchCountyByState();
  }, [selectedState]);

  return (
    <>
      <div className="bg-rose-300 flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 w-full mx-auto">
        <div className="flex flex-1 items-center space-x-4 mb-2 md:mb-0">
          <p className="mr-1 text-xs md:text-sm text-white">
            Location: {location?.county 
              ? `${location.county}, ${location.state}` 
              : location?.state || 'United States'}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
          >
            Change Location
          </button>
        </div>

        <div className="relative flex flex-1 items-center px-4">
          <input
            type="email"
            onChange={handleEmailChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3 pr-3 py-2 w-full md:w-64"
            placeholder="Your Email address..."
          />
        </div>

        <div className="flex flex-1 justify-end items-center space-x-2 mt-2 md:mt-0">
          {status === 'authenticated' ? (
            <div className="inline-flex space-x-2 text-sm">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition">
                <Link href="/api/auth/signout">
                  Sign Out
                </Link>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition">
                <Link href="/admin">
                  Admin Panel
                </Link>
              </button>
            </div>
          ) : (
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-4 rounded-md transition">
              <Link href="/login">
                Sign In
              </Link>
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Update Location</h2>
            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                id="state"
                value={selectedState}
                onChange={handleStateChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state} className="text-gray-700">{state}</option>
                ))}
              </select>
              <div className="mb-4">
                <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2 pt-5">County</label>
                <select
                  id="county"
                  value={selectedCounty}
                  onChange={handleCountyChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <option value="">Select County</option>
                  {counties.map(county => (
                    <option key={county.countyCode} value={county.name} className="text-gray-700">
                      {county.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-900 text-sm rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateLocation}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
