'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';
import { LocationContext } from './location-provider';
import { states, counties as allCounties } from '../us-locations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function NavbarTwo() {
  const { status } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { location, setManualLocation } = useContext(LocationContext) || {};
  const [selectedState, setSelectedState] = useState<string>(location?.state || '');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [counties, setCounties] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>('');


  const linkClasses = (path: string) =>
    `block px-4 py-2 transition text-sm ${
      pathname === path ? 'text-white' : 'text-gray-400 hover:text-gray-300'
    }`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  return (
    <>
    <nav className="bg-black w-full sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 p-4">
        {/* Brand / Logo */}
        <div className="text-white text-2xl font-bold hidden sm:block"><Link href='#home'>MyApp</Link></div>

        <div className="flex items-center mb-2 md:mb-0">
          <p className="mr-2 text-xs md:text-sm text-center md:text-left text-white">
            Location: {location?.county 
              ? `${location.county}${location.region ? ', ' + location.region : location.city ? ', ' + location.city : location.state ? ', ' + location.state : ''}` 
              : location?.region || location?.city || location?.state || location?.country || 'United States'}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center w-6 h-6 bg-gray-600 text-white text-xs rounded-full hover:bg-blue-700 transition"
          >
            <FontAwesomeIcon icon={faPen} className="text-xs" /> {/* Adjusted icon size */}
          </button>
        </div>

        {/* Hamburger button for small screens */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-8 h-8"
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

        {/* Links for larger screens */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#home" className={linkClasses('/')}>
            Home
          </Link>
          <Link href="#what" className={linkClasses('/#what')}>
            What
          </Link>
          <Link href="#who" className={linkClasses('/#who')}>
            Who
          </Link>
          
          {/* Show only if authenticated */}
          {status === 'authenticated' && (
            <>
              <Link href="/content" className={linkClasses('/#content')}>
                Content Management
              </Link>
              <Link href="/admin" className={linkClasses('/#admin')}>
                Admin Panel
              </Link>
              <Link
                href="/api/auth/signout"
                className="px-4 py-2 text-gray-400 text-sm hover:text-red-500 transition"
              >
                Sign Out
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-full bg-black bg-opacity-90 z-50 flex flex-col space-y-4 p-4">
          <button
            onClick={toggleMenu}
            className="text-white self-end text-xl"
          >
            ✕
          </button>

          <Link href="#home" className={linkClasses('/')}>
            Home
          </Link>
          <Link href="#what" className={linkClasses('/what')}>
            What
          </Link>
          <Link href="#who" className={linkClasses('/who')}>
            Who
          </Link>

          {/* Show only if authenticated */}
          {status === 'authenticated' && (
            <>
              <Link href="/content" className={linkClasses('/content')}>
                Content Management
              </Link>
              <Link href="/admin" className={linkClasses('/admin')}>
                Admin Panel
              </Link>
              <Link
                href="/api/auth/signout"
                className="block px-4 py-2 text-white hover:text-red-500 transition"
              >
                Sign Out
              </Link>
            </>
          )}
        </div>
      )}
    </nav>

    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Update Location</h2>
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
    </>
  );
}
