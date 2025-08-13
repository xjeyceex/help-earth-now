'use client';

import React, { useContext, useEffect, useState, useCallback } from 'react';
import { LocationContext } from '@/components/location-provider';
import Link from 'next/link';
import {
  faDove,
  faDollarSign,
  faSolarPanel,
} from '@fortawesome/free-solid-svg-icons';
import { stateAbbreviations } from '@/app/us-datas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineEmail } from 'react-icons/md';

interface HeaderData {
  state: string;
  county: string;
  link: string;
  warning: string;
  problem1: string;
  problem2?: string;
  problem3?: string;
  problem4?: string;
  action1free?: string;
  action2free?: string;
  action3free?: string;
  action4free?: string;
  action1low?: string;
  action2low?: string;
  action3low?: string;
  action1high?: string;
  action2high?: string;
  action3high?: string;
}

export default function Header() {
  const { location } = useContext(LocationContext) || {};
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
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [lastLocationKey, setLastLocationKey] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch('/api/recipients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Thank you for signing up!');
        setEmail('');
      } else {
        const errorData = await response.json();
        setMessage(
          errorData.error || 'Something went wrong. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setMessage('Failed to submit. Please check your connection.');
    }
  };

  // Create a stable location key for comparison
  const getLocationKey = useCallback((loc: typeof location) => {
    if (!loc) return 'no-location';
    return `${loc.state || 'no-state'}-${loc.county || 'no-county'}`;
  }, []);

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

  return (
    <div className="w-full" id="home">
      {loading ? (
        <div className="w-full">
          {/* Skeleton for the header section */}
          <div className="bg-gray-50 dark:bg-gray-900 lg:px-16">
            <div className="grid max-w-screen-2xl px-6 pb-6 pt-3 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:pb-10 lg:grid-cols-12 ">
              {/* Left column skeleton */}
              <div className="mr-auto lg:col-span-7 space-y-6 w-full">
                {/* Main title skeleton */}
                <div className="h-16 md:h-20 xl:h-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5 mb-4"></div>

                {/* Questions section skeleton */}
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3 mb-4"></div>
                <ul className="space-y-3 pl-8">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-center w-1/3">
                      <div className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                    </li>
                  ))}
                </ul>

                {/* Email form skeleton */}
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2 mb-4 mt-8"></div>
                <div className="flex items-center space-x-2 w-full max-w-md">
                  <div className="relative flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="h-12 w-24 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Right column (video) skeleton */}
              <div className="lg:mt-0 lg:col-span-5 lg:flex lg:ml-8 mt-6">
                <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-md shadow-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Action cards skeleton */}
          <div className="w-full max-w-7xl mx-auto pt-6 pb-12 lg:px-16">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4 mx-auto mb-12"></div>

            <div className="flex flex-wrap gap-6 justify-center px-6">
              {[1, 2, 3].map((card) => (
                <div
                  key={card}
                  className="flex flex-col flex-1 min-w-[300px] max-w-[calc(33%-1rem)] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative overflow-hidden h-64 animate-pulse"
                >
                  <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <section className="bg-gray-50 dark:bg-gray-900 lg:px-16">
            <div className="grid max-w-screen-2xl px-6 pb-6 pt-3 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:pb-10 lg:grid-cols-12">
              <div className="mr-auto lg:col-span-7 space-y-6">
                <h1 className="max-w-3xl font-extrabold tracking-tight leading-none text-5xl md:text-6xl xl:text-7xl dark:text-white">
                  Climate change is hurting us all -{' '}
                  <span className="inline-flex items-center italic text-green-500">
                    <span className="mr-1">now</span>
                    <FontAwesomeIcon
                      icon={faLeaf}
                      className="text-2xl text-green-600 mb-4"
                    />
                  </span>
                </h1>

                <div className="max-w-2xl font-light text-gray-700 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed">
                  {/* Location indicator for debugging */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="text-sm text-gray-500 mb-2">
                      Location: {location?.state || 'No State'},{' '}
                      {location?.county || 'No County'}
                    </div>
                  )}

                  {/* Warning text with reduced spacing */}
                  <div className="pb-2 leading-snug">{warningText}</div>

                  {/* Extra spacing after warning text */}
                  <div className="pb-2"></div>

                  {/* Title with reduced spacing before bullets */}
                  {questions.length > 0 && (
                    <>
                      <div className="text-left font-semibold text-xl sm:text-2xl mb-2">
                        Do you care about:
                      </div>

                      {/* Bullet points with reduced spacing */}
                      <ul className="care-about-list list-disc pl-8 space-y-1">
                        {questions.map((question: string, index: number) => (
                          <li key={index} className="pb-1">
                            {question.endsWith('?') ? question : `${question}?`}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div className="text-left text-lg">
                  Sign up to receive occasional updates on our efforts and
                  events:
                </div>
                <form
                  className="flex items-center space-x-2 w-full max-w-md"
                  onSubmit={handleSubmit}
                >
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-3 pr-12 rounded-full text-gray-900 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="Enter your email"
                      required
                    />
                    <MdOutlineEmail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-200 w-24"
                  >
                    Save
                  </button>
                </form>
                {message && (
                  <div
                    className={`text-sm ${
                      message.includes('Thank you')
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {message}
                  </div>
                )}
              </div>
              <div className="lg:mt-0 lg:col-span-5 lg:flex lg:ml-8 mt-6">
                <iframe
                  className="w-full aspect-video rounded-md shadow-lg"
                  src={videoUrl}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                >
                  Your browser does not support the video tag.
                </iframe>
              </div>
            </div>
          </section>

          <div
            className="w-full max-w-7xl mx-auto pt-6 pb-12 lg:px-16"
            id="what"
          >
            <h2 className="text-5xl text-center dark:text-gray-200 font-bold pb-6 px-4 italic">
              You CAN make a difference!
            </h2>
            <div className="flex flex-wrap gap-6 justify-center px-6">
              {/* Free actions */}
              {actions.free.length > 0 && (
                <div className="flex flex-col flex-1 min-w-[300px] max-w-[calc(50%-1rem)] md:max-w-[calc(33%-1rem)] bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-yellow-100 opacity-30"></div>
                  <div className="relative z-10 flex-grow">
                    <FontAwesomeIcon
                      icon={faDove}
                      className="text-5xl text-green-500 mb-4"
                    />
                    <h3 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      What can I do for free?
                    </h3>
                    <div className="space-y-4">
                      {actions.free.map((action, index) => (
                        <p
                          key={index}
                          className="text-2xl text-gray-700 dark:text-gray-300 break-words leading-tight"
                        >
                          {action}
                        </p>
                      ))}
                    </div>
                  </div>
                  {location?.county === 'Contra Costa County' && (
                    <div className="relative z-10 text-right mt-auto">
                      <br />
                      <Link
                        href={`/${encodeURIComponent(
                          'category'
                        )}/${encodeURIComponent(location?.county || '')}`}
                        className="text-2xl font-bold text-blue-500 hover:underline"
                      >
                        More →
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Low-cost actions */}
              {actions.low.length > 0 && (
                <div className="flex flex-col flex-1 min-w-[300px] max-w-[calc(50%-1rem)] md:max-w-[calc(33%-1rem)] bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-purple-100 opacity-30"></div>
                  <div className="relative z-10 flex-grow">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="text-5xl text-yellow-500 mb-4"
                    />
                    <h3 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      What if I can spend a little?
                    </h3>
                    <div className="space-y-4">
                      {actions.low.map((action, index) => (
                        <p
                          key={index}
                          className="text-2xl text-gray-700 dark:text-gray-300 mt-2"
                        >
                          {action}
                        </p>
                      ))}
                    </div>
                  </div>
                  {location?.county === 'Contra Costa County' && (
                    <div className="relative z-10 text-right mt-auto">
                      <br />
                      <Link
                        href={`/${encodeURIComponent(
                          'category'
                        )}/${encodeURIComponent(location?.county || '')}`}
                        className="text-2xl font-bold text-blue-500 hover:underline"
                      >
                        More →
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* High-cost actions */}
              {actions.high.length > 0 && (
                <div className="flex flex-col flex-1 min-w-[300px] max-w-[calc(50%-1rem)] md:max-w-[calc(33%-1rem)] bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-purple-100 opacity-30"></div>
                  <div className="relative z-10 flex-grow">
                    <FontAwesomeIcon
                      icon={faSolarPanel}
                      className="text-5xl text-cyan-600 mb-4"
                    />
                    <h3 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      What if I can spend more?
                    </h3>
                    <div className="space-y-4">
                      {actions.high.map((action, index) => (
                        <p
                          key={index}
                          className="text-2xl text-gray-700 dark:text-gray-300 mt-2"
                        >
                          {action}
                        </p>
                      ))}
                    </div>
                  </div>
                  {location?.county === 'Contra Costa County' && (
                    <div className="relative z-10 text-right mt-auto">
                      <br />
                      <Link
                        href={`/${encodeURIComponent(
                          'category'
                        )}/${encodeURIComponent(location?.county || '')}`}
                        className="text-2xl font-bold text-blue-500 hover:underline"
                      >
                        More →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
