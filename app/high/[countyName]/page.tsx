'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import BackButton from '@/app/components/BackButton';
import NavbarThree from '@/app/v4/navbar-v4';

interface ActionItem {
  action: string;
  links: {
    name?: string;
    url?: string;
  }[]; // Array to hold up to 10 links
}

const CountyPage: React.FC = () => {
  const params = useParams();
  const countyName = Array.isArray(params?.countyName)
    ? decodeURIComponent(params.countyName[0])
    : decodeURIComponent(params?.countyName || 'Unknown County');

  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActionItems = async () => {
      try {
        const response = await fetch('/api/more');
        const data = await response.json();

        const normalizedData = data.map((item: any) => ({
          action: item.Action || '',
          links: [
            { name: item['Link 1 name'], url: item['Link 1'] },
            { name: item['Link 2 name'], url: item['Link 2'] },
            { name: item['Link 3 name'], url: item['Link 3'] },
            { name: item['Link 4 name'], url: item['Link 4'] },
            { name: item['Link 5 name'], url: item['Link 5'] },
            { name: item['Link 6 name'], url: item['Link 6'] },
            { name: item['Link 7 name'], url: item['Link 7'] },
            { name: item['Link 8 name'], url: item['Link 8'] },
            { name: item['Link 9 name'], url: item['Link 9'] },
            { name: item['Link 10 name'], url: item['Link 10'] },
          ]
            .filter((link) => link.name && link.url) // Filter out empty links
            .map((link) => ({
              ...link,
              url: link.url.replace('{countyName}', countyName), // Replace placeholder
            })),
        }));

        setActionItems(normalizedData);
      } catch (error) {
        console.error('Error fetching action items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActionItems();
  }, [countyName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <>
      <NavbarThree />
      <BackButton />
      <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-4 text-center">
            How can I help in {countyName}
          </h1>

          <div className="space-y-4">
            {actionItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-3">{item.action}</h2>

                <div className="space-y-1">
                  {item.links.map((link, i) => (
                    <span key={i} className="inline-block">
                      {link.url && link.name && (
                        <Link
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-500 transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      )}

                      {/* Use a larger separator dot */}
                      {i < item.links.length - 1 && (
                        <span className="mx-3 text-gray-600 dark:text-gray-400 text-lg">
                          •
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CountyPage;
