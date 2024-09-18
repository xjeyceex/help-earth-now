'use client'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);


  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      setShowConsent(true);
      
      if (isFirstRender) {
        // Trigger sliding animation after render only on first load
        setTimeout(() => {
          setIsVisible(true);
        }, 100); // Short delay for animation
      } else {
        // No animation on subsequent renders
        setIsVisible(true);
      }

      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const handleConsent = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });

    // Generate and set visitor ID if not already set
    const visitorID = Cookies.get('visitorID');
    if (!visitorID) {
      const newVisitorID = uuidv4();
      Cookies.set('visitorID', newVisitorID, { expires: 365 });
    }

    setIsVisible(false);
    setTimeout(() => {
      setShowConsent(false);
    }, 300);
  };

  if (!showConsent) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white shadow-lg p-6 rounded-lg max-w-sm border border-gray-300 transform transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="text-sm text-gray-700">
        <p>
          This website uses cookies to ensure you get the best experience on our website.{' '}
          <Link
            href="/cookie-policy"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Cookie Policy
          </Link>.
        </p>
      </div>
      <div className="flex justify-start mt-4">
        <button
          onClick={handleConsent}
          className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
