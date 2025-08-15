'use client';
import { useState, useEffect, useContext, useRef } from 'react';
import { LocationContext } from '@/context/location-provider';
import { states, counties as allCounties } from '@/app/us-datas';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationArrow,
  faSpinner,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

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
  const [isUpdating, setIsUpdating] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const [countySearch, setCountySearch] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const stateInputRef = useRef<HTMLInputElement>(null);
  const countyInputRef = useRef<HTMLInputElement>(null);

  // Filtered states and counties based on search
  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );
  const filteredCounties = counties.filter((county) =>
    county.toLowerCase().includes(countySearch.toLowerCase())
  );

  // Populate initial values
  useEffect(() => {
    if (isOpen && location) {
      setSelectedState(location.state || '');
      setSelectedCounty(location.county || '');
    }
    setStateSearch('');
    setCountySearch('');
  }, [isOpen, location]);

  // Update counties when state changes
  useEffect(() => {
    if (selectedState) {
      const stateCounties = allCounties[selectedState] || [];
      setCounties(stateCounties.sort());
    } else {
      setCounties([]);
    }
    setCountySearch('');
  }, [selectedState]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => stateInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setStateSearch(state);
    setTimeout(() => countyInputRef.current?.focus(), 100);
  };

  const handleCountySelect = (county: string) => {
    setSelectedCounty(county);
    setCountySearch(county);
  };

  const handleUpdateLocation = async () => {
    if (setManualLocation) {
      setIsUpdating(true);
      const newLocation = {
        latitude: 0,
        longitude: 0,
        region: location?.region || '',
        state: selectedState || undefined,
        country: 'United States',
        county: selectedCounty || undefined,
      };
      await setManualLocation(newLocation);
      setIsUpdating(false);
    }
    onClose();
  };

  const handleUpdateAutomatically = async () => {
    if (updateLocation) {
      setIsUpdating(true);
      await updateLocation();
      setIsUpdating(false);
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Update Location
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="state-search"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  State
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="text-gray-400"
                    />
                  </div>
                  <input
                    id="state-search"
                    ref={stateInputRef}
                    type="text"
                    value={stateSearch}
                    onChange={(e) => setStateSearch(e.target.value)}
                    placeholder="Search states..."
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  />
                  {stateSearch && (
                    <button
                      onClick={() => {
                        setStateSearch('');
                        stateInputRef.current?.focus();
                      }}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    </button>
                  )}
                </div>
                <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
                  {filteredStates.length > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredStates.map((state) => (
                        <li key={state}>
                          <button
                            onClick={() => handleStateSelect(state)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                              selectedState === state
                                ? 'bg-blue-50 dark:bg-blue-900/30'
                                : ''
                            }`}
                          >
                            {state}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                      No states found
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="county-search"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  County
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="text-gray-400"
                    />
                  </div>
                  <input
                    id="county-search"
                    ref={countyInputRef}
                    type="text"
                    value={countySearch}
                    onChange={(e) => setCountySearch(e.target.value)}
                    placeholder={
                      selectedState
                        ? 'Search counties...'
                        : 'Select a state first'
                    }
                    disabled={!selectedState}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {countySearch && (
                    <button
                      onClick={() => {
                        setCountySearch('');
                        countyInputRef.current?.focus();
                      }}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    </button>
                  )}
                </div>
                {selectedState && (
                  <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    {filteredCounties.length > 0 ? (
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredCounties.map((county) => (
                          <li key={county}>
                            <button
                              onClick={() => handleCountySelect(county)}
                              className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                selectedCounty === county
                                  ? 'bg-blue-50 dark:bg-blue-900/30'
                                  : ''
                              }`}
                            >
                              {county}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                        No counties found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={handleUpdateAutomatically}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isUpdating}
                className="flex-1 flex items-center justify-center py-3 px-4 bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white font-medium rounded-lg transition-all disabled:opacity-70"
              >
                {isUpdating ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin mr-2"
                  />
                ) : (
                  <FontAwesomeIcon icon={faLocationArrow} className="mr-2" />
                )}
                Auto Detect
              </motion.button>

              <motion.button
                onClick={handleUpdateLocation}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isUpdating || (!selectedState && !selectedCounty)}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-medium rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin mr-2"
                  />
                ) : (
                  'Save'
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
