import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [isConsentGiven, setIsConsentGiven] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (consent) {
      setIsConsentGiven(true);
    }
  }, []);

  const handleConsent = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    setIsConsentGiven(true);
  };

  if (isConsentGiven) return null; 

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
