'use client'
import { useSession } from 'next-auth/react';
import { LocationContext } from './location-provider';
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { states } from './us-locations';

export default function Navbar() {
  const context = useContext(LocationContext);
  const { location, setManualLocation } = context || {};
  const { data: session, status } = useSession();

  const [selectedRegion, setSelectedRegion] = useState(location?.region || '');
  const [selectedState, setSelectedState] = useState(location?.state || '');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location) {
      setSelectedRegion(location.region || '');
      setSelectedState(location.state || '');
    }
  }, [location]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUpdateLocation = () => {
    if (setManualLocation) {
      const newLocation = {
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
        region: selectedRegion || location?.region,
        city: location?.city,
        state: selectedState || location?.state,
        country: location?.country || 'United States',
        countryCode: location?.countryCode
      };
      setManualLocation(newLocation);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white shadow-md flex justify-between items-center px-8 py-4 w-screen max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-4">
          <p className="text-lg font-medium text-gray-800">
            Current Location: {location?.region || location?.city || location?.state || location?.country || 'United States'}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
          >
            Change Location
          </button>
        </div>

        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
            </svg>
          </div>
          <input
            type="email"
            id="email-input"
            aria-describedby="email-helper-text"
            onChange={handleEmailChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 pr-3 py-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Your Email address..."
          />
        </div>

        <div className="flex items-center space-x-2">
          {status === 'authenticated' ? (
            <div className="inline-flex space-x-2 text-sm">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition">
                <Link href="/api/auth/signout">
                  Sign Out
                </Link>
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition">
                <Link href="/admin">
                  Admin Panel
                </Link>
              </button>
            </div>
          ) : (
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition">
            <Link href="/login">
              Sign In
            </Link>
          </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 text-sm rounded-md hover:bg-gray-400 transition"
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