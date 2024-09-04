'use client'

import React, { useState, createContext, useEffect } from 'react';

interface LocationState {
  latitude: number,
  longitude: number,
}

export const LocationContext = createContext<LocationState | undefined>(undefined);

const getLocation = (setLocation: any): void => {

  // Geolocation is supported
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      setLocation({
        latitude: latitude,
        longitude: longitude
      });
    },
    (error) => {
      throw new Error("Error getting the location: " + error.message);
    });
  }
};

export default function LocationProvider ({ children, }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationState|undefined>(undefined);

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  return <LocationContext.Provider value={location}>
    { children }
  </LocationContext.Provider>;
}
