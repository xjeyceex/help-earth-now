'use client';
import { useContext, useState, useEffect } from 'react';
import { LocationContext } from './location-provider';
import { states, counties as allCounties } from './us-locations';

export default function LocationAndEmail() {
  const { location, setManualLocation } = useContext(LocationContext) || {};
  const [selectedState, setSelectedState] = useState<string>(location?.state || '');
  const [email, setEmail] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [counties, setCounties] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [isEmailSaved, setIsEmailSaved] = useState<boolean>(false);

  useEffect(() => {
    if (selectedState) {
      const stateCounties = allCounties[selectedState] || [];
      setCounties(stateCounties);
    } else {
      setCounties([]);
    }
  }, [selectedState]);

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
    setIsModalOpen(false);
  };

  const handleSaveEmail = () => {
    setIsEmailSaved(true);
    setTimeout(() => {
      setIsEmailSaved(false);
    }, 2000);
  };

  return (
    <>
      {/* Footer-like subtle section */}
      {/* Footer Section */}
<div className="fixed bottom-0 w-full bg-black p-4 flex flex-col md:flex-row justify-center md:justify-between items-center text-white shadow-lg">
  {/* Location Button */}
  <div className="flex items-center mb-4 md:mb-0">
    <p className="mr-4 text-sm md:text-base text-center md:text-left">
      Location: {location?.county 
        ? `${location.county}${location.region ? ', ' + location.region : location.city ? ', ' + location.city : location.state ? ', ' + location.state : ''}`
        : location?.region || location?.city || location?.state || location?.country || 'United States'}
    </p>
    <button
      onClick={() => setIsModalOpen(true)}
      className="px-3 py-1 bg-blue-600 text-white text-xs md:text-sm rounded hover:bg-blue-700 transition"
    >
      Change Location
    </button>
  </div>

  {/* Email Input */}
  <div className="flex items-center w-full md:w-auto justify-center md:justify-start">
    <input
      type="email"
      value={email}
      onChange={handleEmailChange}
      className="w-full md:w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 pl-3 pr-3 py-1"
      placeholder="Enter email..."
    />
    <button
      onClick={handleSaveEmail}
      className="ml-2 px-3 py-1 bg-green-600 text-white text-xs md:text-sm rounded hover:bg-green-700 transition"
    >
      Save
    </button>
  </div>
</div>

{/* Modal for changing location */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Update Location</h2>
      {/* State Input */}
      <div className="w-full mb-4">
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

      {/* County Input */}
      <div className="w-full mb-4">
        <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">County</label>
        <select
          id="county"
          value={selectedCounty}
          onChange={handleCountyChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
        >
          <option value="">Select County</option>
          {counties.map((county, index) => (
            <option key={index} value={county} className="text-gray-700">
              {county}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 w-full">
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


      {/* Modal for changing location */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
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
            </div>
            <div className="mb-4">
              <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">County</label>
              <select
                id="county"
                value={selectedCounty}
                onChange={handleCountyChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
              >
                <option value="">Select County</option>
                {counties.map((county, index) => (
                  <option key={index} value={county} className="text-gray-700">
                    {county}
                  </option>
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

      {/* Modal to confirm email save */}
      {isEmailSaved && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-lg font-semibold mb-4">Email Saved!</h2>
            <button
              onClick={() => setIsEmailSaved(false)}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
