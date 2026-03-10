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

      // Find all relevant data sources in priority order
      let countyData: HeaderData | undefined;
      let stateData: HeaderData | undefined;
      let globalData: HeaderData | undefined;

      // Find county-specific data (most specific)
      if (currentLocation?.county) {
        countyData = mainData.find(
          (item) =>
            item.state?.trim() === stateKey &&
            item.county?.trim() === currentLocation.county
        );
      }

      // Find state-level data (including state-ALL)
      stateData = mainData.find(
        (item) =>
          item.state?.trim() === `${stateKey} - ALL` ||
          (item.state?.trim() === stateKey && !item.county?.trim())
      );

      // Find global ALL data (least specific, acts as ultimate fallback)
      globalData = mainData.find((item) => item.state?.trim() === 'ALL');

      // Helper function to get value with fallbacks
      const getValue = <T>(
        countyValue: T | undefined,
        stateValue: T | undefined,
        globalValue: T | undefined,
        defaultValue: T
      ): T => {
        return countyValue ?? stateValue ?? globalValue ?? defaultValue;
      };

      // Helper function to get array values with fallbacks
      const getArrayValue = (
        countyArray: (string | undefined)[],
        stateArray: (string | undefined)[],
        globalArray: (string | undefined)[],
        indices: number[]
      ): string[] => {
        return indices
          .map((index) => {
            const countyVal = countyArray[index]?.trim();
            const stateVal = stateArray[index]?.trim();
            const globalVal = globalArray[index]?.trim();
            return countyVal || stateVal || globalVal;
          })
          .filter((item): item is string => Boolean(item));
      };

      // Get warning text with fallbacks
      const warning = getValue(
        countyData?.warning,
        stateData?.warning,
        globalData?.warning,
        ''
      );

      // Get questions with fallbacks
      const questionIndices = [0, 1, 2, 3];
      const questions_array = getArrayValue(
        [
          countyData?.problem1,
          countyData?.problem2,
          countyData?.problem3,
          countyData?.problem4,
        ],
        [
          stateData?.problem1,
          stateData?.problem2,
          stateData?.problem3,
          stateData?.problem4,
        ],
        [
          globalData?.problem1,
          globalData?.problem2,
          globalData?.problem3,
          globalData?.problem4,
        ],
        questionIndices
      );

      // Get actions with fallbacks
      const freeActions = getArrayValue(
        [
          countyData?.action1free,
          countyData?.action2free,
          countyData?.action3free,
          countyData?.action4free,
        ],
        [
          stateData?.action1free,
          stateData?.action2free,
          stateData?.action3free,
          stateData?.action4free,
        ],
        [
          globalData?.action1free,
          globalData?.action2free,
          globalData?.action3free,
          globalData?.action4free,
        ],
        [0, 1, 2, 3]
      );

      const lowActions = getArrayValue(
        [
          countyData?.action1low,
          countyData?.action2low,
          countyData?.action3low,
        ],
        [stateData?.action1low, stateData?.action2low, stateData?.action3low],
        [
          globalData?.action1low,
          globalData?.action2low,
          globalData?.action3low,
        ],
        [0, 1, 2]
      );

      const highActions = getArrayValue(
        [
          countyData?.action1high,
          countyData?.action2high,
          countyData?.action3high,
        ],
        [
          stateData?.action1high,
          stateData?.action2high,
          stateData?.action3high,
        ],
        [
          globalData?.action1high,
          globalData?.action2high,
          globalData?.action3high,
        ],
        [0, 1, 2]
      );

      // Get video link with fallbacks
      const link = getValue(
        countyData?.link,
        stateData?.link,
        globalData?.link,
        '0yMGg5VDltI' // Default video ID
      );

      // Set all the merged values
      setWarningText(warning);
      setQuestions(questions_array);
      setActions({
        free: freeActions,
        low: lowActions,
        high: highActions,
      });

      if (link?.trim()) {
        const cleanLink = link.trim();
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
