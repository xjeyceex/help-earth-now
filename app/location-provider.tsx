'use client';

import React, { useState, createContext, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface LocationState {
  latitude: number;
  longitude: number;
  region?: string;
  city?: string;
  state?: string;
  country?: string;
  countryCode?: string;
  county?: string;
}

interface LocationContextProps {
  location: LocationState | undefined;
  updateLocation: () => void;
  setManualLocation: (manualLocation: LocationState) => void;
}

export const LocationContext = createContext<LocationContextProps | undefined>(undefined);

const defaultLocation: LocationState = {
  latitude: 0,
  longitude: 0,
  region: undefined,
  city: undefined,
  state: undefined,
  country: "United States",
  countryCode: "US",
  county: undefined, 
};

const getLocation = (setLocation: (location: LocationState) => void): void => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();

          const locationData: LocationState = {
            latitude,
            longitude,
            region: data.address.region || undefined,
            city: data.address.city || data.address.town || data.address.village || undefined,
            state: data.address.state || undefined,
            country: data.address.country || undefined,
            countryCode: data.address.country_code?.toUpperCase() || undefined,
            county: data.address.county || undefined, 
          };

          setLocation(locationData);
          // Cookies.set('userLocation', JSON.stringify(locationData), { expires: 365 });
        } catch (error) {
          console.error("Error fetching location data:", error);
          setLocation(defaultLocation);
          // Cookies.set('userLocation', JSON.stringify(defaultLocation), { expires: 365 });
        }
      },
      (error) => {
        console.error("Geolocation access denied or failed:", error.message);
        setLocation(defaultLocation);
        // Cookies.set('userLocation', JSON.stringify(defaultLocation), { expires: 365 });
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    setLocation(defaultLocation);
    // Cookies.set('userLocation', JSON.stringify(defaultLocation), { expires: 365 });
  }
};

export default function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationState | undefined>(undefined);
  
  const updateLocation = () => {
    getLocation(setLocation);
  };

  const setManualLocation = (manualLocation: LocationState) => {
    setLocation(manualLocation);
    // Cookies.set('userLocation', JSON.stringify(manualLocation), { expires: 365 });
  };

  useEffect(() => {
    const cookieLocation = Cookies.get('userLocation');
    if (cookieLocation) {
      setLocation(JSON.parse(cookieLocation));
    } else {
      getLocation(setLocation);
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, updateLocation, setManualLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
