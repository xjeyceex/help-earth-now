'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '@/components/location-provider';
import Link from 'next/link';
import {
  faDove,
  faDollarSign,
  faSolarPanel,
} from '@fortawesome/free-solid-svg-icons'; // Importing Font Awesome icons
import { stateAbbreviations } from '@/app/us-datas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons'; // Importing Font Awesome icons

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
  const [loading, setLoading] = useState(true); // Loading state

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

  useEffect(() => {
    const fetchData = async () => {
      const stateKey = location?.state
        ? stateAbbreviations[location.state as keyof typeof stateAbbreviations]
        : 'US';
      if (!stateKey) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/header`);
        if (!response.ok)
          throw new Error(`Failed to fetch data: ${response.statusText}`);

        const mainData: HeaderData[] = await response.json();

        const relevantData = mainData.filter((item) => {
          const matchesState =
            item.state === stateKey ||
            item.state === `${stateKey} - ALL` ||
            item.state === 'ALL';
          const matchesCounty = location?.county
            ? location.county === item.county || item.county === ''
            : true;
          return matchesState && matchesCounty;
        });

        const selectedData =
          relevantData.find((item) => item.county === location?.county) ||
          relevantData.find((item) => item.state === `${stateKey} - ALL`) ||
          relevantData.find((item) => item.state === 'ALL') ||
          ({} as HeaderData);

        setWarningText(selectedData.warning?.trim() || '');
        setQuestions(
          [
            selectedData.problem1,
            selectedData.problem2,
            selectedData.problem3,
            selectedData.problem4,
          ].filter(Boolean) as string[]
        );
        setActions({
          free: [
            selectedData.action1free,
            selectedData.action2free,
            selectedData.action3free,
          ].filter(Boolean) as string[],
          low: [
            selectedData.action1low,
            selectedData.action2low,
            selectedData.action3low,
          ].filter(Boolean) as string[],
          high: [
            selectedData.action1high,
            selectedData.action2high,
            selectedData.action3high,
          ].filter(Boolean) as string[],
        });

        if (selectedData.link) {
          setVideoUrl(
            `https://www.youtube.com/embed/${selectedData.link}?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=${selectedData.link}`
          );
        }
      } catch (error) {
        console.error('Error fetching header data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location?.state, location?.county]);

  return (
    <div className="w-full" id="home">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
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
                  {/* Warning text with reduced spacing */}
                  <div className="pb-2 leading-snug">{warningText}</div>

                  {/* Extra spacing after warning text */}
                  <div className="pb-2"></div>

                  {/* Title with reduced spacing before bullets */}
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
                </div>

                <Link
                  href="#what"
                  className="mb-5 border border-gray-400 rounded-full hover:bg-gray-200 inline-flex items-center justify-center px-6 py-4 text-lg sm:text-xl font-semibold text-center text-gray-900 dark:text-white dark:hover:bg-gray-700 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 transition duration-200"
                >
                  What can I do?
                  <svg
                    className="w-7 h-7 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
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
                      {' '}
                      {/* Added container div with space-y */}
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
                        href={`/high/${encodeURIComponent(
                          location?.county || ''
                        )}`}
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
                        href={`/high/${encodeURIComponent(
                          location?.county || ''
                        )}`}
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
                        href={`/high/${encodeURIComponent(
                          location?.county || ''
                        )}`}
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
