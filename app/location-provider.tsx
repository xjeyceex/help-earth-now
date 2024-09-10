'use client'

import React, { useState, createContext, useEffect, ReactNode } from 'react';

interface LocationState {
  latitude: number;
  longitude: number;
  region?: string;
  city?: string;
  state?: string;
  country?: string;
  countryCode?: string;
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
};

const getLocation = (setLocation: (location: LocationState) => void): void => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          setLocation({
            latitude,
            longitude,
            region: data.address.region || undefined,
            city: data.address.city || data.address.town || data.address.village || undefined,
            state: data.address.state || undefined,
            country: data.address.country || undefined,
            countryCode: data.address.country_code?.toUpperCase() || undefined,
          });
        } catch (error) {
          console.error("Error fetching location data:", error);
          setLocation(defaultLocation);
        }
      },
      (error) => {
        console.error("Geolocation access denied or failed:", error.message);
        setLocation(defaultLocation);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    setLocation(defaultLocation);
  }
};

export default function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationState | undefined>(undefined);
  console.log('location',location)
  const updateLocation = () => {
    getLocation(setLocation);
  };

  const setManualLocation = (manualLocation: LocationState) => {
    setLocation(manualLocation);
  };

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  return (
    <LocationContext.Provider value={{ location, updateLocation, setManualLocation }}>
      {children}
    </LocationContext.Provider>
  );
}