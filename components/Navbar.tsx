'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';
import { LocationContext } from '@/components/location-provider';
import {
  states,
  counties as allCounties,
  stateAbbreviations,
} from '@/app/us-datas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import DarkModeToggle from '@/components/DarkMode';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { location, setManualLocation, updateLocation } =
    useContext(LocationContext) || {};
  const [selectedState, setSelectedState] = useState<string>(
    location?.state || ''
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [counties, setCounties] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };

  const linkClasses = (path: string) =>
    `block px-3 py-2 text-sm transition ${
      pathname === path ? 'text-white' : 'text-gray-400 hover:text-gray-300'
    }`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleUpdateAutomatically = () => {
    if (updateLocation) {
      updateLocation();
    }
    setIsModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    if (isModalOpen && location) {
      setSelectedState(location.state || '');
      setSelectedCounty(location.county || '');
    }
  }, [isModalOpen, location]);

  useEffect(() => {
    if (selectedState) {
      const stateCounties = allCounties[selectedState] || [];
      setCounties(stateCounties);
    } else {
      setCounties([]);
    }
  }, [selectedState]);

  return (
    <>
      <nav className="bg-gray-900 w-full sticky top-0 z-50 py-2">
        <div className="w-full lg:container mx-auto flex items-center justify-between px-3 py-2">
          {/* Brand / Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logowhite.png"
                alt="MyApp Logo"
                width={160}
                height={40}
                className="h-auto w-auto max-h-10"
                priority
              />
            </Link>
          </div>

          {/* Location indicator - hidden on small screens */}
          <div className="hidden sm:flex items-center bg-gray-800 bg-opacity-75 p-2 rounded-lg cursor-pointer group mx-2">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-green-400 mr-2"
            />
            <p className="text-xs md:text-sm text-white flex-grow">
              {location?.county
                ? `${location.county}, ${
                    stateAbbreviations[location.state ?? '']
                  }`
                : location?.state
                ? stateAbbreviations[location.state]
                : 'United States'}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-2 flex items-center justify-center w-5 h-5 bg-gray-600 text-white rounded-full hover:bg-blue-700 transition duration-300 group-hover:bg-blue-700"
              aria-label="Edit Location"
            >
              <FontAwesomeIcon icon={faPen} className="text-xs" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className={linkClasses('/')}>
              Home
            </Link>

            <Link href="/about-us" className={linkClasses('/about-us')}>
              About Us
            </Link>

            {/* Learn More dropdown */}
            <div className="relative">
              <button
                onClick={toggleAboutDropdown}
                className={`flex items-center px-3 py-1 rounded-lg text-sm text-gray-200 hover:text-white transition-all duration-200 ${
                  aboutDropdownOpen ? 'text-white' : ''
                }`}
              >
                Learn More
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    aboutDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {aboutDropdownOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-56 bg-gray-900 shadow-lg rounded-lg mt-2 p-2">
                  <Link
                    href="/work-in-climate-area"
                    className="block px-3 py-2 text-sm text-white hover:bg-gray-800 transition rounded"
                  >
                    Work in the Climate Area
                  </Link>
                  <Link
                    href="/learn-more"
                    className="block px-3 py-2 text-sm text-white hover:bg-gray-800 transition rounded"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/follow-people"
                    className="block px-3 py-2 text-sm text-white hover:bg-gray-800 transition rounded"
                  >
                    Follow Key People
                  </Link>
                  <Link
                    href="/learn-a-lot-more"
                    className="block px-3 py-2 text-sm text-white hover:bg-gray-800 transition rounded"
                  >
                    Learn a Lot More
                  </Link>
                </div>
              )}
            </div>

            <DarkModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="sm:hidden text-white p-1"
              aria-label="Location"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </button>
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center pt-20 px-4 overflow-y-auto">
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </button>

            {/* Location in mobile menu */}
            <div
              onClick={() => {
                setIsModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="w-full max-w-xs flex items-center bg-gray-800 p-3 rounded-lg mb-6 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-green-400 mr-3"
              />
              <p className="text-sm text-white flex-grow">
                {location?.county
                  ? `${location.county}, ${
                      stateAbbreviations[location.state ?? '']
                    }`
                  : location?.state
                  ? stateAbbreviations[location.state]
                  : 'United States'}
              </p>
              <FontAwesomeIcon icon={faPen} className="text-xs text-gray-400" />
            </div>

            <Link
              href="/"
              className="w-full max-w-xs text-center py-3 text-lg text-white border-b border-gray-800 hover:bg-gray-800 transition"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className="w-full max-w-xs text-center py-3 text-lg text-white border-b border-gray-800 hover:bg-gray-800 transition"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              href="/work-in-climate-area"
              className="w-full max-w-xs text-center py-3 text-lg text-white border-b border-gray-800 hover:bg-gray-800 transition"
              onClick={toggleMenu}
            >
              Work in Climate
            </Link>
            <Link
              href="/follow-people"
              className="w-full max-w-xs text-center py-3 text-lg text-white border-b border-gray-800 hover:bg-gray-800 transition"
              onClick={toggleMenu}
            >
              Follow Key People
            </Link>
            <Link
              href="/learn-more"
              className="w-full max-w-xs text-center py-3 text-lg text-white border-b border-gray-800 hover:bg-gray-800 transition"
              onClick={toggleMenu}
            >
              Learn More
            </Link>
            <Link
              href="/learn-a-lot-more"
              className="w-full max-w-xs text-center py-3 text-lg text-white border-b border-gray-800 hover:bg-gray-800 transition"
              onClick={toggleMenu}
            >
              Learn a Lot More
            </Link>

            {/* Dark mode toggle in mobile menu */}
            <div className="w-full max-w-xs py-4 flex justify-center">
              <DarkModeToggle />
            </div>
          </div>
        )}
      </nav>

      {/* Location Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 dark:text-black">
              Update Location
            </h2>
            <div className="w-full mb-4">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                State
              </label>
              <select
                id="state"
                value={selectedState}
                onChange={handleStateChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state} className="text-gray-700">
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full mb-4">
              <label
                htmlFor="county"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                County
              </label>
              <select
                id="county"
                value={selectedCounty}
                onChange={handleCountyChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
              >
                <option value="">Select County</option>
                {[...counties].sort().map((county, index) => (
                  <option key={index} value={county} className="text-gray-700">
                    {county}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleUpdateAutomatically}
              className="mt-2 w-full py-2 px-4 border bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Update Automatically
            </button>
            <button
              onClick={handleUpdateLocation}
              className="mt-2 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-2 w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
