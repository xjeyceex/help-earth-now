'use client';
import { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';
import FeedbackButton from '@/components/FeedBack';
import {
  FaUsers,
  FaClipboardList,
  FaHandsHelping,
  FaLeaf,
} from 'react-icons/fa';
import Footer from '@/components/Footer';

type AboutUsItem = {
  header: string;
  contents: string;
};

type HeaderType =
  | 'Who We Are'
  | 'Our Mission'
  | 'What We Do'
  | 'Our Values'
  | 'Join Us';

const iconMap: Record<HeaderType, JSX.Element> = {
  'Who We Are': <FaUsers className="mr-2 text-blue-500" />,
  'Our Mission': <FaClipboardList className="mr-2 text-green-500" />,
  'What We Do': <FaHandsHelping className="mr-2 text-green-500" />,
  'Our Values': <FaLeaf className="mr-2 text-green-700" />,
  'Join Us': <FaHandsHelping className="mr-2 text-green-500" />,
};

export default function AboutUsPage() {
  const [aboutUsData, setAboutUsData] = useState<AboutUsItem[]>([]);
  const [groupedData, setGroupedData] = useState<
    { header: string; contents: string[] }[]
  >([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/aboutUs');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: AboutUsItem[] = await response.json();
        setAboutUsData(data);
      } catch (error) {
        setError('There was an error fetching the data.');
        console.error('Error fetching About Us data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let currentHeader = '';
    const grouped = aboutUsData.reduce((acc, item) => {
      if (item.header) {
        currentHeader = item.header;
        acc.push({ header: currentHeader, contents: [item.contents] });
      } else if (currentHeader) {
        acc[acc.length - 1].contents.push(item.contents);
      }
      return acc;
    }, [] as { header: string; contents: string[] }[]);
    setGroupedData(grouped);
  }, [aboutUsData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <main className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-200 py-8 px-6 text-center">
        <p className="text-lg text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <>
      <BackButton />
      <main className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-900 text-gray-900 dark:text-gray-200 py-4 px-6">
        <section className="max-w-7xl mx-auto mb-3">
          <h1 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 tracking-tight mb-3">
            About Us
          </h1>

          {groupedData.map((section, index) =>
            section.header === 'Join Us' ? (
              <div
                key={index}
                className="bg-gradient-to-r from-green-400 to-blue-500 shadow-xl rounded-lg px-8 py-6 text-center text-white transition-transform transform hover:scale-105 duration-300 mt-3" // Reduced mt-4 to mt-3
              >
                <h2 className="text-3xl font-semibold mb-2">
                  {section.header}
                </h2>{' '}
                {/* Reduced mb-3 to mb-2 */}
                {section.contents.map((content, idx) => (
                  <p key={idx} className="text-lg leading-7 mb-2">
                    {' '}
                    {/* Reduced mb-3 to mb-2 */}
                    {content}
                  </p>
                ))}
              </div>
            ) : (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg px-8 py-6 transition-transform transform hover:scale-105 duration-300 dark:bg-gray-700 mt-3" // Reduced mt-4 to mt-3
              >
                <h2 className="text-3xl font-semibold mb-2 text-gray-900 dark:text-gray-100 flex items-center">
                  {iconMap[section.header as HeaderType] || (
                    <FaHandsHelping className="mr-2 text-green-500" />
                  )}
                  {section.header}
                </h2>
                {section.contents.map((content, idx) => (
                  <p
                    key={idx}
                    className="text-lg leading-7 text-gray-600 dark:text-gray-300 mb-2"
                  >
                    {' '}
                    {/* Reduced mb-3 to mb-2 */}
                    {content}
                  </p>
                ))}
              </div>
            )
          )}
        </section>
      </main>
      <Footer />
      <FeedbackButton />
    </>
  );
}
