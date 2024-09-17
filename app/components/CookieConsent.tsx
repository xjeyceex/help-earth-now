import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState<boolean>(false);

  useEffect(() => {
    // Check if the consent cookie is set
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      // If no consent cookie, show the consent banner
      setShowConsent(true);
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
    setShowConsent(false);
  };

  // Render nothing if consent is given
  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white shadow-md p-4 flex justify-between items-center">
      <p className="text-sm text-gray-700">
        We use cookies to improve your experience. By continuing to use our site, you accept our cookie policy. We do not keep any personal information.
      </p>
      <button 
        onClick={handleConsent}
        className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;
