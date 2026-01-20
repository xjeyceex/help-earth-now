'use client';

import { useState, useCallback, useEffect } from 'react';
import { stateAbbreviations } from '@/app/us-datas';
import { HeaderData } from '@/app/types';

interface UseHeaderDataReturn {
  videoUrl: string;
  warningText: string;
  questions: string[];
  actions: {
    free: string[];
    low: string[];
    high: string[];
  };
  loading: boolean;
}

export function useHeaderData(location?: {
  state?: string;
  county?: string;
}): UseHeaderDataReturn {
  const [videoUrl, setVideoUrl] = useState(
    'https://www.youtube.com/embed/0yMGg5VDltI?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=0yMGg5VDltI'
  );
  const [warningText, setWarningText] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [actions, setActions] = useState<{
    free: string[];
    low: string[];
    high: string[];
  }>({ free: [], low: [], high: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (currentLocation: typeof location) => {
    const stateKey = currentLocation?.state
      ? stateAbbreviations[
          currentLocation.state as keyof typeof stateAbbreviations
        ]
      : 'US';

    if (!stateKey) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/sheet-data/header`);
      if (!response.ok)
        throw new Error(`Failed to fetch data: ${response.statusText}`);

      const mainData: HeaderData[] = await response.json();

      // More precise filtering logic
      const relevantData = mainData.filter((item) => {
        const normalizedItemState = item.state?.trim();
        const normalizedItemCounty = item.county?.trim();

        // Check for exact state match or state-ALL or global ALL
        const stateMatches =
          normalizedItemState === stateKey ||
          normalizedItemState === `${stateKey} - ALL` ||
          normalizedItemState === 'ALL';

        // Check for county match - either exact match or empty (applies to all counties)
        const countyMatches = currentLocation?.county
          ? normalizedItemCounty === currentLocation.county ||
            normalizedItemCounty === ''
          : true;

        return stateMatches && countyMatches;
      });

      // Priority-based selection: exact match > state-ALL > global ALL
      const selectedData =
        relevantData.find(
          (item) =>
            item.state === stateKey && item.county === currentLocation?.county
        ) ||
        relevantData.find((item) => item.state === `${stateKey} - ALL`) ||
        relevantData.find((item) => item.state === 'ALL') ||
        ({} as HeaderData);

      // Reset all state before setting new values
      setWarningText('');
      setQuestions([]);
      setActions({ free: [], low: [], high: [] });

      // Set new values
      setWarningText(selectedData.warning?.trim() || '');
      setQuestions(
        [
          selectedData.problem1,
          selectedData.problem2,
          selectedData.problem3,
          selectedData.problem4,
        ].filter((item): item is string => Boolean(item?.trim()))
      );

      setActions({
        free: [
          selectedData.action1free,
          selectedData.action2free,
          selectedData.action3free,
          selectedData.action4free,
        ].filter((item): item is string => Boolean(item?.trim())),
        low: [
          selectedData.action1low,
          selectedData.action2low,
          selectedData.action3low,
        ].filter((item): item is string => Boolean(item?.trim())),
        high: [
          selectedData.action1high,
          selectedData.action2high,
          selectedData.action3high,
        ].filter((item): item is string => Boolean(item?.trim())),
      });

      if (selectedData.link?.trim()) {
        const cleanLink = selectedData.link.trim();
        setVideoUrl(
          `https://www.youtube.com/embed/${cleanLink}?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=${cleanLink}`
        );
      }
    } catch (error) {
      console.error('Error fetching header data:', error);
      // Set fallback values on error
      setWarningText('Unable to load location-specific data');
      setQuestions([]);
      setActions({ free: [], low: [], high: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!location) return;
    fetchData(location);
  }, [location, fetchData]);

  return {
    videoUrl,
    warningText,
    questions,
    actions,
    loading,
  };
}
