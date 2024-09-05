'use client'

import React, { useState, createContext, useEffect } from 'react';

interface LocationState {
  latitude: number;
  longitude: number;
  region?: string;
  city?: string;
  state?: string;
  country?: string;
}

export const LocationContext = createContext<LocationState | undefined>(undefined);

const getLocation = (setLocation: (location: LocationState) => void): void => {
  // Geolocation is supported
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
          });
        } catch (error) {
          console.error("Error fetching location data:", error);
          // Default to a US city in case of API failure
          setLocation({
            latitude: 40.7128, 
            longitude: -74.0060, 
            region: "New York",
            city: "New York City",
            state: "New York",
            country: "United States",
          });
        }
      },
      (error) => {
        console.log("Geolocation access denied or failed:", error.message);
        // Default to a US city in case of geolocation failure
        setLocation({
          latitude: 40.7128, 
          longitude: -74.0060, 
          region: "New York",
          city: "New York City",
          state: "New York",
          country: "United States",
        });
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
    // Default to a US city if geolocation is not supported
    setLocation({
      latitude: 40.7128, 
      longitude: -74.0060, 
      region: "New York",
      city: "New York City",
      state: "New York",
      country: "United States",
    });
  }
};


export default function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationState | undefined>(undefined);

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  return (  
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
}