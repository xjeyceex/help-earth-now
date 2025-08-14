'use client';
import { useState, useEffect, useContext, useRef } from 'react';
import { LocationContext } from '@/context/location-provider';
import { states, counties as allCounties } from '@/app/us-datas';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { location, setManualLocation, updateLocation } =
    useContext(LocationContext) || {};
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [counties, setCounties] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  // Populate initial values
  useEffect(() => {
    if (isOpen && location) {
      setSelectedState(location.state || '');
      setSelectedCounty(location.county || '');
    }
  }, [isOpen, location]);

  // Update counties when state changes
  useEffect(() => {
    if (selectedState) {
      const stateCounties = allCounties[selectedState] || [];
      setCounties(stateCounties);
    } else {
      setCounties([]);
    }
  }, [selectedState]);

  // Handlers
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedCounty('');
  };

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCounty(e.target.value);
  };

  const handleUpdateLocation = () => {
    if (setManualLocation) {
      const newLocation = {
        latitude: 0,
        longitude: 0,
        region: location?.region || '',
        state: selectedState || undefined,
        country: 'United States',
        county: selectedCounty || undefined,
      };
      setManualLocation(newLocation);
    }
    onClose();
    window.location.reload();
  };

  const handleUpdateAutomatically = () => {
    if (updateLocation) {
      updateLocation();
    }
    onClose();
    window.location.reload();
  };

  // Close on outside click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md flex flex-col items-center"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Update Location
        </h2>

        <div className="w-full mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            State
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <option value="">United States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-4">
          <label
            htmlFor="county"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            County
          </label>
          <select
            id="county"
            value={selectedCounty}
            onChange={handleCountyChange}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <option value="">Select County</option>
            {[...counties].sort().map((county, index) => (
              <option key={index} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-full gap-2 mt-4">
          <button
            onClick={handleUpdateAutomatically}
            className="flex-1 py-2 px-3 bg-green-600 hover:bg-green-700 focus:ring-1 focus:ring-green-400 text-white font-medium rounded-md transition-colors"
          >
            Auto Detect
          </button>

          <button
            onClick={handleUpdateLocation}
            className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:ring-blue-400 text-white font-medium rounded-md transition-colors"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
