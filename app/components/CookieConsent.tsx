import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if the consent cookie is set
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      // If no consent cookie, show the consent banner
      setShowConsent(true);
      
      // Trigger sliding animation after render
      setTimeout(() => {
        setIsVisible(true);
      }, 100); // Short delay for animation
    }
  }, []);

  const handleConsent = () => {
    // Set the cookie consent
    Cookies.set('cookieConsent', 'true', { expires: 365 });

    // Generate and set visitor ID if not already set
    const visitorID = Cookies.get('visitorID');
    if (!visitorID) {
      const newVisitorID = uuidv4();
      Cookies.set('visitorID', newVisitorID, { expires: 365 });
    }

    // Hide the consent banner after setting consent
    setIsVisible(false);
    setTimeout(() => {
      setShowConsent(false);
    }, 300); // Match the duration of the slide out animation
  };

  // Render nothing if consent is given
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
          <a
            href="/cookie-policy"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Cookies Policy
          </a>.
        </p>
      </div>
      <div className="flex justify-start mt-4">
        <button
          onClick={handleConsent}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
