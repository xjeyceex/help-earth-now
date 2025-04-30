'use client';

import { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';
import Link from 'next/link';

interface KeyPerson {
  Name: string;
  Description: string;
  Link: string;
}

export default function WorkInClimateArea() {
  const [keyPeople, setKeyPeople] = useState<KeyPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/workInTheClimateArea');
        if (!response.ok) throw new Error('Failed to fetch key people data');

        const data = await response.json();
        console.log('data', data);

        setKeyPeople(data);
      } catch (err) {
        setError('Something went wrong. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getLinkEmoji = (platform: string) => {
    if (!platform) return '🌱';

    const name = platform.toLowerCase();

    // Social media platforms
    if (name.includes('twitter') || name.includes('x')) return '🐦'; // X (formerly Twitter)
    if (name.includes('facebook')) return '📘'; // Facebook
    if (name.includes('instagram')) return '📸'; // Instagram
    if (name.includes('linkedin')) return '💼'; // LinkedIn
    if (name.includes('bluesky') || name.includes('bsky')) return '🌤️'; // Bluesky (bsky)
    if (name.includes('tiktok')) return '🎶'; // TikTok
    if (name.includes('youtube')) return '🎥'; // YouTube
    if (name.includes('reddit')) return '👽'; // Reddit

    // Climate-related websites
    if (name.includes('climatebase') || name.includes('terra')) return '🌍'; // Earth emoji for climate sites

    return '🔗'; // Default link emoji for other cases
  };

  const getLinkText = (platform: string) => {
    if (!platform) return 'Visit their website';

    const name = platform.toLowerCase();
    console.log(name);

    // For climate-related websites (e.g., Climatebase, Terra)
    if (/climatebase|terra/i.test(name)) {
      return 'Visit their website';
    }

    // Social media platforms using regex
    if (/bluesky|bsky/i.test(name)) {
      return `Follow them on BlueSky`; // Prioritize BlueSky
    }

    if (/facebook/i.test(name)) {
      return `Follow them on Facebook`;
    }
    if (/instagram/i.test(name)) {
      return `Follow them on Instagram`;
    }
    if (/linkedin/i.test(name)) {
      return `Follow them on LinkedIn`;
    }
    if (/tiktok/i.test(name)) {
      return `Follow them on TikTok`;
    }
    if (/youtube/i.test(name)) {
      return `Follow them on YouTube`;
    }
    if (/reddit/i.test(name)) {
      return `Follow them on Reddit`;
    }
    if (/twitter|x/i.test(name)) {
      return `Follow them on X`;
    }

    // Default fallback text for other links
    return `Follow on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <div className="p-6 mx-auto max-w-3xl animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-4 dark:text-white">
          Work in the Climate Area{' '}
        </h1>
        <p className="text-lg text-center mb-8 text-gray-700 dark:text-gray-300">
          Climatebase and Terra.do are two companies doing amazing work in the
          climate space. Below, you can explore more about their efforts and
          opportunities in the climate sector.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {keyPeople.map((person) => (
            <div
              key={person.Name}
              className="p-5 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <h2 className="text-xl font-semibold mb-1 flex items-center gap-2 dark:text-white">
                  {getLinkEmoji(person.Link)} {person.Name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {person.Description}
                </p>
              </div>
              <Link
                href={person.Link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${getLinkText(person.Link)} for ${person.Name}`}
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                {getLinkText(person.Link)}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
